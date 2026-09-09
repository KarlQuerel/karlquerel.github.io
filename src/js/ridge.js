// Shaded relief for the journey's ridgelines: the ground we leave from and the range we land in.

import { DEPARTURE_RIDGE, ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01, smoothstep } from './math.js'
import { norm } from './vec3.js'
import {
	ditherIndex,
	ditherThreshold,
	fbm1,
	fbm2,
	hash1,
	ridged1,
	seamIndex,
} from './pixelNoise.js'

// One cell is the same size on every viewport; `dpr` snaps it to whole device pixels so dither cannot wobble.
export function cellFor(frame) {
	const cell = Math.max(ENTRY.ridgeCellPx, frame.w / ENTRY.ridgeMaxCells)
	return frame.dpr ? Math.round(cell * frame.dpr) / frame.dpr : cell
}

// The grid a band is cut on. `frame.bleed` is how far past the frame the sprite runs, for the cursor's lean.
function gridFor(band, frame) {
	const cell = cellFor(frame)
	const bleed = frame.bleed ?? 0
	return {
		w: Math.max(8, Math.ceil((frame.w + 2 * bleed) / cell)),
		h: Math.max(2, Math.ceil(((band.heightVh / 100) * frame.h + bleed) / cell)),
		cell,
	}
}

// size the canvas to the grid and hand back a pixel writer onto it
function openSprite(el, w, h) {
	el.width = w
	el.height = h
	const ctx = el.getContext('2d')
	const img = ctx.createImageData(w, h)
	const px = img.data
	const put = (x, y, [r, g, b]) => {
		if (x < 0 || y < 0 || x >= w || y >= h) return
		const i = (y * w + x) * 4
		px[i] = r
		px[i + 1] = g
		px[i + 2] = b
		px[i + 3] = 255
	}
	return { ctx, img, put }
}

// The tidy pass every sprite takes: a cell whose four neighbours all agree becomes what they are.
export function tidySprite(img, w, h, passes) {
	const cells = new Uint32Array(img.data.buffer)
	for (let pass = 0; pass < passes; pass++) {
		for (let y = 1; y < h - 1; y++) {
			for (let x = 1; x < w - 1; x++) {
				const i = y * w + x
				const around = cells[i - 1]
				if (
					around !== cells[i] &&
					cells[i + 1] === around &&
					cells[i - w] === around &&
					cells[i + w] === around
				) {
					cells[i] = around
				}
			}
		}
	}
}

// Each column is lit by its facing, darkened with depth, then dithered onto the band's ramp.
export function drawRidge(el, band, visitSeed, frame) {
	const { w, h, cell } = gridFor(band, frame)
	const { ctx, img, put } = openSprite(el, w, h)
	// a band names its ramp; the colours themselves live in one place
	const shades = band.shades.map(name => PALETTE[name])
	const crest = PALETTE[band.crest]
	const levels = shades.length
	// optional snowcaps: a second ramp above the band's snowline (see band.snow)
	const snow = band.snow
	const snowShades = snow ? snow.shades.map(name => PALETTE[name]) : null
	const snowCrest = snow ? PALETTE[snow.crest] : null
	// The crest walks a short ramp by facing rather than wearing one colour the whole way.
	const crestShades = [shades[levels - 2], shades[levels - 1], crest]
	const snowCrestShades = snow
		? [snowShades[snowShades.length - 2], snowShades[snowShades.length - 1], snowCrest]
		: null
	// The sun touches what is near it: `sunGlow` bands promote up their ramp with distance falloff.
	const sun = band.sunGlow ? ENTRY.sun : null
	const sunX = sun ? sun.x * w : 0
	const sunY = sun ? (sun.y * frame.h - (frame.h - h * cell)) / cell : 0

	// the whole profile first, so a column can be compared with its neighbour
	const profile = new Array(w)
	for (let x = 0; x < w; x++) {
		// walked at a fixed rate per cell: the crop shows as much range as it has room for, at one size
		const u = (x / ENTRY.ridgeRefCells) * band.freq
		const seed = band.seed + visitSeed
		const shape = ENTRY.ridgeBlend * ridged1(u, seed) + (1 - ENTRY.ridgeBlend) * fbm1(u, seed)
		// The massif swell: tall clusters and low passes, spanning the frame so a narrow crop still has both.
		const massif =
			1 -
			ENTRY.ridgeMassifDepth +
			ENTRY.ridgeMassifDepth * 2 * fbm1((x / w) * ENTRY.ridgeMassifFreq, seed + 71)
		profile[x] = Math.min(ENTRY.ridgeCeiling, band.base + shape * band.amp * massif)
	}

	// Shading reads off a smoothed copy: `face` is one value per column, so raw neighbours stripe.
	const relief = new Array(w)
	const blur = ENTRY.ridgeReliefBlur
	for (let x = 0; x < w; x++) {
		let sum = 0
		for (let d = -blur; d <= blur; d++) sum += profile[Math.max(0, Math.min(w - 1, x + d))]
		relief[x] = sum / (blur * 2 + 1)
	}

	// Snow is a cap, not a stratum: how far a summit pokes over the ruffled snowline sets its depth.
	const faceAt = x => {
		const span = ENTRY.ridgeSlopeSpan
		const lo = relief[Math.max(0, x - span)]
		const hi = relief[Math.min(w - 1, x + span)]
		return 0.5 - ((hi - lo) / (2 * span)) * h * band.slopeGain * ENTRY.ridgeLight
	}

	const caps = new Float32Array(w)
	if (snow) {
		// How far each column stands above its own neighbourhood — a summit, not merely high ground.
		const P = ENTRY.snowProminence
		const wide = new Float32Array(w)
		for (let x = 0; x < w; x++) {
			let sum = 0
			for (let i = -P.cells; i <= P.cells; i++) {
				sum += profile[Math.max(0, Math.min(w - 1, x + i))]
			}
			wide[x] = sum / (P.cells * 2 + 1)
		}
		for (let x = 0; x < w; x++) {
			const line =
				snow.line +
				(fbm1(x / ENTRY.snowRuffleCells, band.seed + visitSeed + 9) - 0.5) * snow.ruffle
			let cap = (profile[x] - line) * h * snow.depth
			if (cap <= 0) continue
			cap += (0.5 - faceAt(x)) * snow.aspect
			cap *= P.base + (1 - P.base) * clamp01((profile[x] - wide[x]) / P.ref)
			cap *= 1 + (fbm1(x / snow.gullyCells, band.seed + visitSeed + 71) - 0.5) * snow.gully
			caps[x] = cap
		}
		for (let x = 0; x < w; ) {
			if (caps[x] <= snow.minCap) {
				x++
				continue
			}
			let end = x
			while (end < w && caps[end] > snow.minCap) end++
			if (end - x < snow.minRun) caps.fill(0, x, end)
			x = end
		}
	}

	for (let x = 0; x < w; x++) {
		const ridge = profile[x]
		const yTop = Math.round(h * (1 - ridge))
		const face = faceAt(x)
		const rf = 1 / ENTRY.ridgeRoughCells
		const vf = 1 / ENTRY.ridgeRoughVaryCells
		const capCells = caps[x]
		// This column's shift of the strata beds: a gentle undulation, plus a steady dip across the range.
		const bedShift =
			(fbm1(x / ENTRY.strataWobbleCells, band.seed + visitSeed + 31) - 0.5) *
				ENTRY.strataWobble +
			x * ENTRY.strataDip
		for (let y = yTop; y < h; y++) {
			// the face is a band under the crest; below it the mass goes dark
			const depth = Math.min(1, (y - yTop) / band.faceDepth)
			// Crag texture in 2D. How MUCH a place carries varies on a far longer wavelength than the crags.
			const vary = fbm2(x * vf, y * vf, band.seed + visitSeed + 67)
			const rough =
				(fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) *
				ENTRY.ridgeRough *
				(1 - ENTRY.ridgeRoughVary + 2 * ENTRY.ridgeRoughVary * vary)
			let lit = clamp01((face + rough) * (1 - depth * ENTRY.ridgeDepthFade))
			// Dither is for boundaries, not fill: the S-curve gathers the checker where two tones meet.
			lit += (smoothstep(lit) - lit) * ENTRY.ridgeContrast
			// Skylight after the curve, not before: a slope turned from the sun still sits under an open sky.
			lit = ENTRY.ridgeAmbient + (1 - ENTRY.ridgeAmbient) * lit
			// Aerial haze pools in the valleys: a foot lifts toward the palest step of its ramp, the sky's own tone.
			if (band.haze) {
				const H = band.haze
				lit += (1 - lit) * H.lift * clamp01((y - yTop) / (H.depth * h)) ** H.power
			}
			// Inside the cap, the same lit walked on the snow ramp, keeping the rock's facets and shadow.
			const edge = capCells - (y - yTop)
			const ramp =
				snow &&
				capCells > snow.minCap &&
				edge > 0 &&
				(edge >= snow.edge || edge / snow.edge > ditherThreshold(x, y))
					? snowShades
					: shades
			const rampLen = ramp === shades ? levels : ramp.length
			// `seam` holds the checker to a narrow window either side of a step and leaves the rest solid.
			let idx = seamIndex(lit, rampLen, x, y, ENTRY.ridgeSeam)
			// Strata: sparse darker seams undulating across the faces, so rock reads as bedded stone.
			if (ramp === shades && lit > ENTRY.strataMinLit) {
				const bed = (y + bedShift) / ENTRY.strataSpacing
				const which = Math.floor(bed)
				// Each bed gets its own thickness and its own bite, hashed off its index.
				const r = hash1(which, band.seed + visitSeed + 53)
				// Each seam sits a little off the regular grid, so the eye stops counting them.
				const jitter = (hash1(which, band.seed + visitSeed + 89) - 0.5) * ENTRY.strataJitter
				const off = (((bed - which - jitter) % 1) + 1) % 1
				if (off < ENTRY.strataWidth * (0.4 + 1.6 * r)) {
					idx = Math.max(0, idx - (r > ENTRY.strataDeepAt ? 2 : 1))
				}
			}
			if (sun) {
				const reach = clamp01(1 - Math.hypot(x - sunX, y - sunY) / ENTRY.sunGlowCells)
				idx = Math.min(rampLen - 1, idx + ditherIndex(reach, ENTRY.sunGlowLevels, x, y))
			}
			put(x, y, ramp[idx])
		}
		// the lit rim along the top: snow-capped where a cap hangs, warmed where the crest runs near the disc
		const crestRamp = snow && capCells > snow.minCap ? snowCrestShades : crestShades
		const crestGlow = sun
			? clamp01(1 - Math.hypot(x - sunX, yTop - sunY) / ENTRY.sunGlowCells)
			: 0
		put(x, yTop, crestRamp[ditherIndex(clamp01(face + crestGlow), crestRamp.length, x, yTop)])
	}

	// The habitat (band.habitat): one dome in the middle stretch — the journey was TO somewhere.
	let vent = null
	const hab = band.habitat
	if (hab) {
		const shellShades = hab.shades.map(name => PALETTE[name])
		const rim = PALETTE[hab.rim]
		const light = PALETTE[hab.light]
		const half = (hab.w - 1) / 2
		// wherever the middle stretch is lowest; the footing buries the downhill edge
		let hx = Math.round(w * 0.5)
		for (let x = Math.round(w * 0.25); x < w * 0.75; x++) {
			if (profile[x] < profile[hx]) hx = x
		}
		// footed on the lowest ground it spans
		let base = 0
		for (let dx = -half; dx <= half; dx++) {
			base = Math.max(
				base,
				Math.round(h * (1 - profile[Math.max(0, Math.min(w - 1, hx + dx))]))
			)
		}
		// The shell is lit off a real surface normal, gathering sun and sky separately at each cell.
		const sunDir = norm([ENTRY.ridgeLight, hab.sunUp, hab.sunFront])
		const edgeShades = [shellShades[0], shellShades[2], shellShades[3], rim]
		for (let dx = -half; dx <= half; dx++) {
			const x = hx + dx
			if (x < 0 || x >= w) continue
			// The shell springs from `sink` cells UNDER the ground, so what stands above is the top of a bigger dome.
			const rise = Math.round((hab.h + hab.sink) * Math.sqrt(1 - (dx / (half + 0.5)) ** 2))
			// A dome is its own shape, but it stands in the mountain's light and not in its own.
			const u = dx / (half + 0.5)
			const bedded = hab.bed + (1 - hab.bed) * clamp01(faceAt(x))
			// The hill in front buries it. `base` is the LOWEST ground the shell spans, so other columns stand above.
			const ground = Math.round(h * (1 - profile[x]))
			const foot = base + hab.sink
			// what is left of the column once the hill has buried it; too little is a stray cell
			if (rise - Math.max(0, foot - ground) < hab.minRise) continue
			let crownLit = 0
			let footCourse = true
			for (let dy = 0; dy < rise; dy++) {
				const y = foot - dy
				const v = dy / (hab.h + hab.sink)
				const nz = Math.sqrt(Math.max(0, 1 - u * u - v * v))
				const lit = clamp01(
					hab.ambient +
						hab.sun * bedded * clamp01(u * sunDir[0] + v * sunDir[1] + nz * sunDir[2]) +
						hab.sky * v
				)
				crownLit = lit
				if (y > ground) continue
				// Panel seams run as longitude, not screen x: across the width they came out as a cylinder's meridians.
				const lon = Math.atan2(u, Math.max(nz, 1e-3))
				const m = (lon / Math.PI + 0.5) * hab.panels
				const onSeam =
					v < hab.panelTop && Math.abs(m - Math.round(m)) * (1 / hab.panelSeam) < 1
				// The base course: the lowest cell a column shows is where shell meets ground, and it drops a notch.
				const shade = clamp01(
					lit - (onSeam ? hab.panelDip : 0) - (footCourse ? hab.footDip : 0)
				)
				footCourse = false
				put(x, y, shellShades[seamIndex(shade, shellShades.length, x, y, ENTRY.ridgeSeam)])
			}
			// The crown is lit by the sky too. `lip` is the skylight floor, so the top edge stays above the body.
			const edgeY = foot - rise + 1
			if (edgeY <= ground) {
				// Seamed, not checkered: a one-cell rim alternating shades is a dotted line, and that is not an edge.
				const lip = clamp01(crownLit + hab.rimLift)
				put(
					x,
					edgeY,
					edgeShades[seamIndex(lip, edgeShades.length, x, edgeY, ENTRY.ridgeSeam)]
				)
			}
		}
		// the shell's ground shadow, thrown along the surface away from the sun — a shape without one floats
		const shadowDir = -Math.sign(ENTRY.ridgeLight)
		for (let i = 1; i <= hab.shadowLen; i++) {
			const x = hx + (half + i) * shadowDir
			if (x < 0 || x >= w) continue
			const y = Math.round(h * (1 - profile[x]))
			if (i > hab.shadowLen - 2 && ditherThreshold(x, y) > 0.5) continue
			put(x, y, shellShades[0])
		}
		// The worn path down the face: a solid tread with a dithered fringe, widening as it nears.
		const trailShades = hab.pathShades.map(name => PALETTE[name])
		for (let y = base + 1; y < h; y++) {
			const t = (y - base) / Math.max(1, h - 1 - base)
			const cx =
				hx +
				0.5 +
				(fbm1(y / hab.pathWanderCells, band.seed + visitSeed + 13) - 0.5) *
					hab.pathMeander *
					t
			const wPath = (1 + hab.pathSpread * t) / 2
			for (let dx = -Math.ceil(wPath) - 1; dx <= Math.ceil(wPath) + 1; dx++) {
				const x = Math.floor(cx) + dx
				if (x < 0 || x >= w) continue
				if (y <= Math.round(h * (1 - profile[x]))) continue
				const d = Math.abs(x + 0.5 - cx)
				if (d > wPath + 0.5) continue
				if (d > wPath - 0.5 && ditherThreshold(x, y) > 0.5) continue
				put(x, y, trailShades[ditherIndex(1 - t, trailShades.length, x, y)])
			}
		}
		// The doorway's light, squashed along the ground and applied only where something is there to be lit.
		const spillShades = hab.spillShades.map(name => PALETTE[name])
		const R = hab.spillR
		for (let sy = -R; sy <= R; sy++) {
			for (let sx = -R; sx <= R; sx++) {
				const x = hx + sx
				const y = base + hab.spillDrop + sy
				if (x < 0 || x >= w || y < 0 || y >= h) continue
				if (img.data[(y * w + x) * 4 + 3] === 0) continue
				const f = clamp01(1 - Math.hypot(sx, sy * hab.spillSquash) / R) ** hab.spillPower
				if (f <= ditherThreshold(x, y)) continue
				put(x, y, spillShades[seamIndex(f, spillShades.length, x, y, ENTRY.ridgeSeam)])
			}
		}

		// The entrance is an arch, not a slab: ember walls around a hotter core read as light from inside.
		const glow = PALETTE[hab.glow]
		put(hx - 1, base, light)
		put(hx + 1, base, light)
		put(hx - 1, base - 1, light)
		put(hx + 1, base - 1, light)
		put(hx, base - 2, light)
		put(hx, base, glow)
		put(hx, base - 1, glow)

		// The chimney: one column standing off the shell, its lip on the rim shade so the sun catches it.
		const vx = hx + hab.vent.at
		const shell = Math.max(
			1,
			Math.round((hab.h + hab.sink) * Math.sqrt(1 - (hab.vent.at / (half + 0.5)) ** 2)) -
				hab.sink
		)
		const lip = base - shell - hab.vent.h + 1
		const ventGround = Math.round(h * (1 - profile[Math.max(0, Math.min(w - 1, vx))]))
		for (let y = lip; y <= base - shell; y++) {
			if (y <= ventGround) put(vx, y, y === lip ? rim : shellShades[1])
		}
		vent = { x: (vx + 0.5) / w, y: lip / h }
	}

	// No pixel stands alone: a lone cell inside another is the tell of a generated sprite.
	tidySprite(img, w, h, ENTRY.tidyPasses)
	ctx.putImageData(img, 0, 0)
	return { cols: w, rows: h, cell, vent }
}

// Hills standing on the horizon row, built as the plain is: a height field of massifs seen edge-on.
function paintHills(put, w, h, yH, Hh, seed, sun, fillBelow) {
	const M = DEPARTURE_RIDGE.moon
	const shades = Hh.shades.map(name => PALETTE[name])
	const crest = Hh.crest.map(name => PALETTE[name])
	// the massifs: cones with concave flanks (`shape` > 1), scattered across the width and back through `depth`
	const Pk = Hh.peaks
	const count = Math.round((Pk.count * w) / ENTRY.ridgeRefCells)
	// one per stride with a jitter, so the range runs the whole width; `big` are placed by hand
	const peaks = Pk.big.map(p => ({ ...p, x: p.at * w }))
	for (let i = 0; i < count; i++) {
		const u = (i + hash1(i * 5, seed + 3)) / count
		peaks.push({
			x: (u * (1 + 2 * Pk.overhang) - Pk.overhang) * w,
			z: Pk.zMin + (Hh.depth - Pk.zMin) * hash1(i * 5 + 1, seed + 3),
			r: Pk.rMin + (Pk.rMax - Pk.rMin) * hash1(i * 5 + 2, seed + 3),
			h: Pk.hMin + (Pk.hMax - Pk.hMin) * hash1(i * 5 + 3, seed + 3) ** Pk.power,
		})
	}
	const N = Hh.notch ? { ...Hh.notch, x: Hh.notch.at * w } : null
	const height = (X, Z) => {
		let hgt = 0
		for (const p of peaks) {
			const d = Math.hypot(X - p.x, Z - p.z) / p.r
			if (d < 1) hgt += p.h * (1 - d) ** Pk.shape
		}
		// rock on the masses, scaled by how tall they stand, so the floor stays flat
		hgt *=
			1 + (fbm2(X / Hh.texture.cells, Z / Hh.texture.cells, seed + 71) - 0.5) * Hh.texture.amp
		if (N) {
			const d = Math.hypot(X - N.x, Z - N.z) / N.r
			if (d < 1) hgt -= N.depth * (1 - d * d)
		}
		return hgt
	}
	// the sun in the range's frame: x across, y up, z into the depth (away from us)
	const len = Math.hypot(...sun)
	const L = [sun[0] / len, sun[2] / len, -sun[1] / len]
	// Each column's field is sampled once along the depth and kept, instead of re-evaluated per row.
	const K = Math.floor(Hh.depth / Hh.step)
	const col = new Float32Array(K + 1)
	const skyline = new Array(w)
	for (let x = 0; x < w; x++) {
		let top = 0
		for (let k = 0; k <= K; k++) {
			col[k] = height(x, k * Hh.step)
			top = Math.max(top, col[k])
		}
		skyline[x] = top
		const first = Math.round(yH[x] - top)
		for (let y = Math.max(0, first); y < yH[x]; y++) {
			// the first mass this ray meets, walking into the depth at the cell's height
			const hw = yH[x] - y
			let k = 0
			while (k < K && col[k] < hw) k++
			const z = k * Hh.step
			const gx = (height(x + 1, z) - height(x - 1, z)) / 2
			const gz = (height(x, z + 1) - height(x, z - 1)) / 2
			const lit = Math.max(0, (-gx * L[0] + L[1] - gz * L[2]) / Math.hypot(gx, 1, gz))
			let shadow = false
			for (let k = 1; k <= Hh.shadowSteps && !shadow; k++) {
				const sd = k * Hh.step * 2
				shadow = height(x + L[0] * sd, z + L[2] * sd) > hw + L[1] * sd
			}
			const v = clamp01(
				shadow ? M.ambient * M.shade : M.ambient + (1 - M.ambient) * lit * Hh.gain
			)
			const ramp = y === first ? crest : shades
			put(x, y, ramp[seamIndex(v, ramp.length, x, y, Hh.seam)])
		}
		if (fillBelow) for (let y = Math.max(0, yH[x]); y < h; y++) put(x, y, shades[0])
	}
	return skyline
}

// The departure's ground. A moon is not a skyline: a band is a height field seen in perspective.
export function drawMoon(el, band, visitSeed, frame) {
	const M = DEPARTURE_RIDGE.moon
	const { w, h, cell } = gridFor(band, frame)
	const { ctx, img, put } = openSprite(el, w, h)
	const seed = band.seed + visitSeed
	// counts are authored per ridgeRefCells of width, so a narrow frame crops rather than densifies
	const per = n => Math.round((n * w) / ENTRY.ridgeRefCells)

	// the plain's far edge per column: a wander, plus the limb's curve bowing away toward both edges
	const yH = new Array(w)
	for (let x = 0; x < w; x++) {
		const limb = band.curve * ((x - w / 2) / (w / 2)) ** 2
		yH[x] = Math.round(
			h * band.horizon + limb + (fbm1(x / M.rollCells, seed + 21) - 0.5) * band.roll
		)
	}
	// the sun as a unit vector, its direction along the ground, and which side of a thing it is on
	const len = Math.hypot(...M.sun)
	const [lx, ly, lz] = M.sun.map(v => v / len)
	const along = Math.hypot(lx, ly)
	const ux = lx / along
	const uy = ly / along
	const tanEl = lz / along
	const sunSide = -Math.sign(lx)

	const skyline = band.hills
		? paintHills(put, w, h, yH, band.hills, seed, M.sun, !band.plain)
		: null
	// the cut, to size the canvas by and stand things on: the plain's far edge and where the hills top out
	const cut = {
		cols: w,
		rows: h,
		cell,
		horizon: yH,
		hillTop: skyline && skyline.map((s, x) => Math.round(yH[x] - s)),
	}
	const P = band.plain
	if (!P) {
		tidySprite(img, w, h, M.tidyPasses)
		ctx.putImageData(img, 0, 0)
		return cut
	}
	const ramp = P.shades.map(name => PALETTE[name])
	const levels = ramp.length
	const rowsOf = x => h - 1 - yH[x]
	const [sFar, sNear] = P.squash
	// Screen -> world. `squash` is a crater's vertical radius over its horizontal, so depth Y integrates down.
	const depthAt = (rows, t) =>
		(rows * (Math.log(sFar + (sNear - sFar) * t) - Math.log(sFar))) / (sNear - sFar)
	const toWorld = (x, y) => {
		const rows = rowsOf(x)
		const t = clamp01((y - yH[x]) / rows)
		return { X: (x - w / 2) * (1 + P.spread * (1 - t)), Y: depthAt(rows, t) }
	}
	const worldW = w * (1 + P.spread)
	const worldD = depthAt(h - 1 - Math.round(h * band.horizon), 1)

	// The crater field: radius rolls as a power, and age flattens the bowl, so one age cannot read as bubble wrap.
	const C = M.crater
	const shape = (c, age) => ({
		...c,
		age,
		depth: c.r * (C.depth[0] - C.depth[1] * age),
		rimH: c.r * (C.rimHeight[0] - C.rimHeight[1] * age),
	})
	const craters = []
	for (let i = 0; i < per(P.craters.count); i++) {
		const roll = hash1(i * 7, seed + 1) ** P.craters.power
		const r = P.craters.rMin + (P.craters.rMax - P.craters.rMin) * roll
		const x = (hash1(i * 7 + 1, seed + 1) - 0.5) * worldW
		const y = hash1(i * 7 + 2, seed + 1) * worldD
		craters.push(shape({ x, y, r }, hash1(i * 7 + 3, seed + 1)))
	}
	for (const c of P.craters.big) craters.push(shape(c, C.freshAge))
	const boulders = P.boulders.big.map(b => ({ ...b, height: b.r * M.boulder.height }))
	for (let i = 0; i < per(P.boulders.count); i++) {
		const r = M.boulder.rMin + (M.boulder.rMax - M.boulder.rMin) * hash1(i * 5 + 2, seed + 9)
		const x = (hash1(i * 5, seed + 9) - 0.5) * worldW
		const y = hash1(i * 5 + 1, seed + 9) * worldD
		boulders.push({ x, y, r, height: r * M.boulder.height })
	}

	// the field itself: swells and regolith texture, then every crater and boulder
	const height = (X, Y) => {
		// the regolith's grain runs across the frame: low angles foreshorten detail into streaks
		let hgt =
			(fbm2(X / M.swell.cells, Y / M.swell.cells, seed) - 0.5) * M.swell.amp +
			(fbm2(X / M.rough.cellsX, Y / M.rough.cellsY, seed + 5) - 0.5) * M.rough.amp
		// a low rise along the band's far edge, so the near band has a lit face to stand on
		if (P.rise) hgt += P.rise.amp * clamp01(1 - Y / P.rise.depth) ** 2
		// Long lines across the plain: dug below it a rille (a collapsed lava tube), raised above it a wrinkle ridge.
		if (P.lines) {
			for (const R of P.lines) {
				const d =
					Math.abs(Y - R.y - (fbm1(X / R.cells, seed + 57) - 0.5) * R.wander) /
					R.halfWidth
				if (d < 1) {
					const ends = clamp01((X - R.from) / R.taper) * clamp01((R.to - X) / R.taper)
					hgt += R.height * (1 - d * d) * ends
				}
			}
		}
		for (const c of craters) {
			const dx = X - c.x
			const dy = Y - c.y
			const reach = c.r * C.ejectaTo
			if (Math.abs(dx) > reach || Math.abs(dy) > reach) continue
			const d = Math.hypot(dx, dy) / c.r
			if (d < 1) {
				// the bowl: parabolic walls down to a floor, flat across the basins
				const floor = c.r > C.basinR ? C.floor[1] : C.floor[0]
				hgt -= c.depth * (d < floor ? 1 : 1 - ((d - floor) / (1 - floor)) ** 2)
				if (c.r > C.peakR && d < C.peakAt) hgt += c.depth * C.peak * (1 - d / C.peakAt)
			}
			// the raised rim at the lip, and the ejecta blanket sloping off it
			if (Math.abs(d - 1) < C.rimWidth) hgt += c.rimH * (1 - Math.abs(d - 1) / C.rimWidth)
			else if (d > 1 && d < C.ejectaTo) {
				hgt +=
					c.rimH *
					C.ejectaGain *
					(1 - (d - 1 - C.rimWidth) / (C.ejectaTo - 1 - C.rimWidth))
			}
		}
		for (const b of boulders) {
			const dx = X - b.x
			const dy = Y - b.y
			if (Math.abs(dx) > b.r * M.boulder.reach || Math.abs(dy) > b.r * M.boulder.reach)
				continue
			hgt += b.height * Math.exp(-(dx * dx + dy * dy) / (b.r * b.r))
		}
		return hgt
	}

	// Albedo, separate from height: mare against highland, fresh-crater blankets, and the big basin's rays.
	const big = craters.reduce((a, c) => (c.r > a.r ? c : a), craters[0])
	const albedo = (X, Y) => {
		let a = 1 + (fbm2(X / M.mare.cells, Y / M.mare.cells, seed + 3) - 0.5) * M.mare.amp
		for (const c of craters) {
			if (c.age > C.freshBelow) continue
			const d = Math.hypot(X - c.x, Y - c.y) / c.r
			if (d < C.freshTo) a *= 1 + C.freshGain * (1 - d / C.freshTo)
		}
		if (big) {
			const dx = X - big.x
			const dy = Y - big.y
			const d = Math.hypot(dx, dy) / big.r
			if (d > M.rays.from && d < M.rays.reach) {
				const th = Math.atan2(dy, dx)
				const wobble = fbm1(th * M.rays.wobbleFreq, seed + 11) * M.rays.wobble
				const ray = Math.max(0, Math.cos(th * M.rays.count + wobble)) ** M.rays.sharpness
				a *= 1 + M.rays.gain * ray * (1 - (d - M.rays.from) / (M.rays.reach - M.rays.from))
			}
		}
		return a
	}

	const shadowed = (X, Y, h0) => {
		let s = M.shadow.first
		for (let k = 0; k < M.shadow.steps; k++) {
			s *= M.shadow.grow
			if (height(X + ux * s, Y + uy * s) > h0 + s * tanEl) return true
		}
		return false
	}
	// the plain: normal from the gradient, one sun, hard shadow, then the ramp
	const idxAt = new Int8Array(w * h).fill(-1)
	for (let x = 0; x < w; x++) {
		for (let y = yH[x]; y < h; y++) {
			const { X, Y } = toWorld(x, y)
			const h0 = height(X, Y)
			// the ground darkens toward the viewer: it frames the title and reads as depth
			const near = 1 - P.nearShade * clamp01((y - yH[x]) / rowsOf(x))
			const gx = (height(X + 1, Y) - height(X - 1, Y)) / 2
			const gy = (height(X, Y + 1) - height(X, Y - 1)) / 2
			const lit = Math.max(0, (lz - gx * lx - gy * ly) / Math.hypot(gx, gy, 1))
			const a = albedo(X, Y) * near
			const v =
				lit > M.shadow.skipBelow && shadowed(X, Y, h0)
					? M.ambient * M.shade * a
					: (M.ambient + (1 - M.ambient) * lit * M.gain) * a
			const idx = seamIndex(clamp01(v), levels, x, y, M.seam)
			idxAt[y * w + x] = idx
			put(x, y, ramp[idx])
		}
	}

	tidySprite(img, w, h, M.tidyPasses)

	// Micro-pocks: a dark cell with a lit cell on its sun side — the two-pixel crater of every drawn moon.
	for (let i = 0; i < per(P.pocks); i++) {
		const x = Math.floor(hash1(i * 3, seed + 77) * w)
		const t = hash1(i * 3 + 1, seed + 77) ** M.pockNearBias
		const y = Math.round(yH[x] + rowsOf(x) * (M.pockFrom + (1 - M.pockFrom) * t))
		if (y >= h - 1) continue
		const cur = idxAt[y * w + x]
		if (cur < 2) continue
		put(x, y, ramp[cur - 2])
		put(x + sunSide, y, ramp[Math.min(levels - 1, cur + 1)])
	}

	// the hand-placed boulders as sprites over their bumps, found back on screen from their world place
	const S = M.boulderSprites
	for (const b of P.boulders.big) {
		const sprite = b.r >= S.bigFrom ? S.big : S.small
		let x = Math.round(w / 2 + b.x)
		let rows = rowsOf(x)
		let t = (sFar * Math.exp((b.y * (sNear - sFar)) / rows) - sFar) / (sNear - sFar)
		// the column depends on the spread at this depth, which depends on the column; one refinement lands it
		x = Math.round(w / 2 + b.x / (1 + P.spread * (1 - t)))
		rows = rowsOf(x)
		t = (sFar * Math.exp((b.y * (sNear - sFar)) / rows) - sFar) / (sNear - sFar)
		const foot = Math.round(yH[x] + t * rows)
		sprite.forEach((row, dy) =>
			row.forEach((idx, dx) => {
				if (idx >= 0) put(x - 1 + dx, foot - (sprite.length - 1) + dy, ramp[idx])
			})
		)
	}

	ctx.putImageData(img, 0, 0)
	return cut
}
