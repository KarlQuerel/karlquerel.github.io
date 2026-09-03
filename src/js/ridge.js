// Shaded relief for the journey's ridgelines — the ground we leave from at the
// departure and the range we land in at the arrival. Kept out of the components so
// both ends of the trip are cut from one grid with one shading model, and so the
// drawing code reads as drawing code.
//
// A band is a window onto a range at a fixed scale rather than a whole range
// squeezed into the frame: `ridgeCellPx` is how big one cell lands on screen and
// the noise is walked at `ridgeRefCells` cells per `freq` cycle, so a narrow
// viewport simply gets fewer cells — same chunk size, same slopes, fewer peaks.

import { DEPARTURE_RIDGE, ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01, smoothstep } from './math.js'
import {
	ditherIndex,
	ditherThreshold,
	fbm1,
	fbm2,
	hash1,
	ridged1,
	seamIndex,
} from './pixelNoise.js'

// One cell is the same size on every viewport, so the grid the departure and the
// arrival are quantised onto never changes — a narrow frame just gets fewer cells.
// A frame that names its `dpr` gets the cell snapped to whole device pixels: a cell
// of 5.6 CSS px stretched over a frame lands as a run of 5s and 6s, and every dither
// wobbles with it. Exported so the departure's DOM sprites size themselves to it.
export function cellFor(frame) {
	const cell = Math.max(ENTRY.ridgeCellPx, frame.w / ENTRY.ridgeMaxCells)
	return frame.dpr ? Math.round(cell * frame.dpr) / frame.dpr : cell
}

// The grid a band is cut on. `frame.bleed` is how far (px) the sprite has to run past
// the frame on each side so the cursor's lean can never uncover an edge; the caller
// then sizes the canvas to exactly w × h cells instead of stretching it to the frame.
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

// The tidy pass every sprite takes before its deliberate details are stamped: a cell
// whose four neighbours all agree and disagree with it becomes what they are. That is
// the orphan pixel, the one-cell spike on a silhouette, the lone checker cell a seam
// left behind — the marks that give procedural art away against hand-placed pixels,
// where no pixel is ever alone. Transparent counts as a tone, so silhouettes tidy too.
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

// Each column is lit by the way its face turns, then darkened with depth into the
// mass, and the result is dithered onto the band's ramp — the same trick the planet
// sprite uses, so the ridges gain volume without leaving the grid. `frame` is the
// viewport the band is being cut for: { w, h } in CSS pixels.
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
	// The crest walks a short ramp by facing instead of wearing one colour the
	// whole way: bright where the slope faces the sun, dropping toward the band's
	// own top shades in shade. A uniform crest reads as an outline, not a lit edge.
	const crestShades = [shades[levels - 2], shades[levels - 1], crest]
	const snowCrestShades = snow
		? [snowShades[snowShades.length - 2], snowShades[snowShades.length - 1], snowCrest]
		: null
	// The sun touches what is near it: arrival bands opt in with `sunGlow`, and
	// cells within reach of the disc promote up their ramp with distance falloff —
	// the backlit-ridge shot every dusk photo chases. ENTRY.sun's frame-fraction
	// position, converted into this band's own cell space; the departure bands
	// leave the flag off, having no sun to be near.
	const sun = band.sunGlow ? ENTRY.sun : null
	const sunX = sun ? sun.x * w : 0
	const sunY = sun ? (sun.y * frame.h - (frame.h - h * cell)) / cell : 0

	// the whole profile first, so a column can be compared with its neighbour
	const profile = new Array(w)
	for (let x = 0; x < w; x++) {
		// walked at a fixed rate per cell: the crop shows as much of the range
		// as it has room for, at the size the range is drawn everywhere else
		const u = (x / ENTRY.ridgeRefCells) * band.freq
		const seed = band.seed + visitSeed
		const shape = ENTRY.ridgeBlend * ridged1(u, seed) + (1 - ENTRY.ridgeBlend) * fbm1(u, seed)
		// The massif swell: tall clusters and low passes. Spans the frame rather
		// than the range, so however narrow the crop there is still a tall
		// stretch and a pass in view.
		const massif =
			1 -
			ENTRY.ridgeMassifDepth +
			ENTRY.ridgeMassifDepth * 2 * fbm1((x / w) * ENTRY.ridgeMassifFreq, seed + 71)
		profile[x] = Math.min(ENTRY.ridgeCeiling, band.base + shape * band.amp * massif)
	}

	// Shading reads off a smoothed copy of the range, never the sharp one. `face` is
	// a single value for a whole column, so differencing raw neighbours turns every
	// local wiggle into a full-height stripe of one tone — which is what made these
	// ranges read as a row of buildings rather than as rock. Blurring the terrain the
	// light is measured from, while `profile` still cuts the silhouette, is the same
	// split shaded-relief mapping has always made: sharp outline, broad facets.
	const relief = new Array(w)
	const blur = ENTRY.ridgeReliefBlur
	for (let x = 0; x < w; x++) {
		let sum = 0
		for (let d = -blur; d <= blur; d++) sum += profile[Math.max(0, Math.min(w - 1, x + d))]
		relief[x] = sum / (blur * 2 + 1)
	}

	for (let x = 0; x < w; x++) {
		const ridge = profile[x]
		const yTop = Math.round(h * (1 - ridge))
		// which way this face turns decides how much of the sun it catches,
		// measured across a span so the facets come out broad
		const span = ENTRY.ridgeSlopeSpan
		const lo = relief[Math.max(0, x - span)]
		const hi = relief[Math.min(w - 1, x + span)]
		// Rise over run in cells — which is the slope on screen, the cells
		// being square — so a band shades the same however it was cropped.
		// Minus: a slope rising toward +x faces −x, so with the sun stage left
		// (ridgeLight −1) it is the rising flanks that catch it. The sign was
		// flipped for a long time and read fine — until the sun disc and its
		// glow gave the scene an anchor, and the lie showed.
		const slope = ((hi - lo) / (2 * span)) * h
		const face = 0.5 - slope * band.slopeGain * ENTRY.ridgeLight
		const rf = 1 / ENTRY.ridgeRoughCells
		const vf = 1 / ENTRY.ridgeRoughVaryCells
		// Snow is a cap, not a stratum: how far this column's summit pokes above the
		// (ruffled) snowline sets how many cells of snow hang below its crest — tall
		// massifs carry deep caps, a peak just past the line gets a dusting, and
		// snow never starts mid-face the way an altitude band across the sprite did.
		const snowLine = snow
			? snow.line +
				(fbm1(x / ENTRY.snowRuffleCells, band.seed + visitSeed + 9) - 0.5) * snow.ruffle
			: 2
		const capCells = snow ? (profile[x] - snowLine) * h * snow.depth : 0
		// This column's shift of the strata beds: a gentle undulation, plus a steady
		// dip across the range. The dip is what stops them reading as shelves — a
		// seam that runs level is a terrace, and the eye takes any horizontal line on
		// a mountain for flat ground. Tilted, the same seams read as bedding that the
		// topography cuts across, which is what bedded rock actually looks like.
		const bedShift =
			(fbm1(x / ENTRY.strataWobbleCells, band.seed + visitSeed + 31) - 0.5) *
				ENTRY.strataWobble +
			x * ENTRY.strataDip
		for (let y = yTop; y < h; y++) {
			// the face is a band under the crest; below it the mass goes dark
			const depth = Math.min(1, (y - yTop) / band.faceDepth)
			// Crag texture in 2D — sampled per column only, it stripes. How MUCH of it
			// a place carries varies on a far longer wavelength than the crags
			// themselves: rock is shattered in one place and weathered smooth in the
			// next, and it is that variation in texture density — not more texture
			// everywhere — that stops one crag pattern tiling a whole massif.
			const vary = fbm2(x * vf, y * vf, band.seed + visitSeed + 67)
			const rough =
				(fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) *
				ENTRY.ridgeRough *
				(1 - ENTRY.ridgeRoughVary + 2 * ENTRY.ridgeRoughVary * vary)
			let lit = clamp01((face + rough) * (1 - depth * ENTRY.ridgeDepthFade))
			// Dither is for boundaries, not fill: the S-curve pushes the field toward
			// solid steps, so the checker gathers into narrow bands where two tones
			// actually meet instead of wallpapering whole faces.
			lit += (smoothstep(lit) - lit) * ENTRY.ridgeContrast
			// Skylight, applied after the curve rather than before it: a slope turned
			// away from the sun still sits under an open sky, so its shade end is the
			// cool bottom of the ramp and not black. Folded in earlier the S-curve
			// would simply pull the floor back down to where it started.
			lit = ENTRY.ridgeAmbient + (1 - ENTRY.ridgeAmbient) * lit
			// Inside the cap, the same lit walked on the snow ramp — the cap keeps the
			// facets and the shadow of the rock it sits on — dithered out over
			// `feather` cells at its lower edge.
			const ramp =
				snow &&
				capCells > snow.minCap &&
				(capCells - (y - yTop)) / snow.feather > ditherThreshold(x, y)
					? snowShades
					: shades
			const rampLen = ramp === shades ? levels : ramp.length
			let idx = ditherIndex(lit, rampLen, x, y)
			// Strata: sparse darker seams undulating across the faces, so the rock
			// reads as bedded stone rather than noise. A seam demotes the step — the
			// planet's cloud-shadow trick — and the snow lies over the beds.
			// Only where there is light to lose: a seam drawn into shadow is a seam
			// nobody could see, and it was those that laid brickwork over the dark mass.
			if (ramp === shades && lit > ENTRY.strataMinLit) {
				const bed = (y + bedShift) / ENTRY.strataSpacing
				const which = Math.floor(bed)
				// Each bed gets its own thickness and its own bite, hashed off its
				// index. Seams of one constant width at one constant depth are what
				// read as courses of masonry rather than as rock.
				const r = hash1(which, band.seed + visitSeed + 53)
				// Nor do beds march at a fixed pitch: each seam sits a little off the
				// regular grid, so consecutive seams land at uneven spacings and the
				// eye stops counting them. Wrapped, so a shifted seam stays whole.
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
		// the lit rim along the very top of the ridge — snow-capped where a cap
		// hangs, walked by facing like the mass below it, and warmed by the sun
		// where the crest runs near the disc
		const crestRamp = snow && capCells > snow.minCap ? snowCrestShades : crestShades
		const crestGlow = sun
			? clamp01(1 - Math.hypot(x - sunX, yTop - sunY) / ENTRY.sunGlowCells)
			: 0
		put(x, yTop, crestRamp[ditherIndex(clamp01(face + crestGlow), crestRamp.length, x, yTop)])
	}

	// The habitat (band.habitat): one dome settled into the middle stretch — the
	// journey was TO somewhere, and someone is home. A shaded shell and a doorway
	// whose light pools on the ground. The light is steady on purpose; a blink
	// would read as distress.
	const hab = band.habitat
	if (hab) {
		const shellShades = hab.shades.map(name => PALETTE[name])
		const rim = PALETTE[hab.rim]
		const light = PALETTE[hab.light]
		const spill = PALETTE[hab.spill]
		const half = (hab.w - 1) / 2
		// wherever the middle stretch is lowest — a slope is fine, the footing
		// buries the downhill edge and the dome reads as built into the mountain
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
		// A half-ellipse shell, shaded like everything else in the scene: full on
		// the sun side falling to shadow across the curve, brighter at the crown
		// than at the ground — a dome this size left flat would read as a hole.
		// The top edge walks its own ramp by facing — rim-bright where it faces the
		// sun, fading around the curve to a dark keyline in shadow. A binary
		// rim/keyline switch at the apex cuts the roof into two colours.
		const edgeShades = [shellShades[0], shellShades[2], shellShades[3], rim]
		for (let dx = -half; dx <= half; dx++) {
			const x = hx + dx
			if (x < 0 || x >= w) continue
			const rise = Math.max(1, Math.round(hab.h * Math.sqrt(1 - (dx / (half + 0.5)) ** 2)))
			const face = 0.5 + (dx / half) * 0.5 * ENTRY.ridgeLight
			for (let dy = 0; dy < rise; dy++) {
				// Darken by depth below the shell surface, never by height above the
				// ground: the low edge columns ARE surface, and dimming them for
				// being short painted a false shadow across the dome's sun side.
				const under = (rise - 1 - dy) / hab.h
				const lit = clamp01(face * (1 - under * hab.shellFade))
				put(x, base - dy, shellShades[ditherIndex(lit, shellShades.length, x, base - dy)])
			}
			const edgeY = base - rise + 1
			put(x, edgeY, edgeShades[ditherIndex(face, edgeShades.length, x, edgeY)])
		}
		// the shell's ground shadow, thrown a few cells along the surface away from
		// the sun — a shape without a shadow floats, whatever else it does
		const shadowDir = -Math.sign(ENTRY.ridgeLight)
		for (let i = 1; i <= hab.shadowLen; i++) {
			const x = hx + (half + i) * shadowDir
			if (x < 0 || x >= w) continue
			const y = Math.round(h * (1 - profile[x]))
			if (i > hab.shadowLen - 2 && ditherThreshold(x, y) > 0.5) continue
			put(x, y, shellShades[0])
		}
		// The worn path, running down the face toward the camera: a solid tread
		// with a one-cell dithered fringe, widening as it nears and drifting as it
		// goes — which is what turns the mass below the crest from a wall into
		// ground receding in depth. It fades down its own length the way the rock
		// does, and clips to the terrain so it dips out of sight where the ground
		// falls away instead of floating.
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
		// The entrance: an arch, not a slab — ember walls around a hotter core, the
		// warm gradient being what reads as light from inside rather than paint.
		const glow = PALETTE[hab.glow]
		put(hx - 1, base, light)
		put(hx + 1, base, light)
		put(hx - 1, base - 1, light)
		put(hx + 1, base - 1, light)
		put(hx, base - 2, light)
		put(hx, base, glow)
		put(hx, base - 1, glow)
		// and its pool on the ground below — light that lands on nothing is a sticker
		for (let dx = -2; dx <= 2; dx++) {
			if (base + 1 < h && ditherThreshold(hx + dx, base + 1) < 0.5) {
				put(hx + dx, base + 1, spill)
			}
		}
		if (base + 2 < h && ditherThreshold(hx, base + 2) < 0.5) put(hx, base + 2, spill)
	}

	ctx.putImageData(img, 0, 0)
}

// Hills (band.hills) standing on the horizon row, built the way the plain is: a height
// field of massifs behind the horizon, seen edge-on. The skyline at a column is simply
// whatever stands tallest along the depth, each cell on a face is the first mass a
// ray at that height meets, and it is lit from a real normal by the same sun — so the
// terminator bends round a dome instead of splitting it down one column, foothills
// overlap, and a crater bitten into the range shows its lit far wall through the gap.
// A band with no plain of its own fills solid below the feet, so the layers in front
// never have to meet its edge exactly.
function paintHills(put, w, h, yH, Hh, seed, sun, fillBelow) {
	const M = DEPARTURE_RIDGE.moon
	const shades = Hh.shades.map(name => PALETTE[name])
	const crest = Hh.crest.map(name => PALETTE[name])
	// the massifs: cones with concave flanks (`shape` > 1), scattered across the frame's
	// width and back through `depth` cells of range
	const Pk = Hh.peaks
	const count = Math.round((Pk.count * w) / ENTRY.ridgeRefCells)
	// one per stride with a jitter, so the range runs the whole width instead of
	// bunching where a roll happened to land; `big` are placed by hand
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
	// Each column's field is sampled once along the depth and kept: every row of the
	// column then walks that array to its first hit instead of re-evaluating the field,
	// which is most of what the range used to cost.
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

// The departure's ground. A moon is not a skyline: what we look across is a surface
// receding to its horizon, so a band here is a window onto a height field seen in
// perspective rather than a profile lit by its own slope. Every cell takes a real
// normal from the field's gradient, is lit by one sun, and is tested for the shadow
// the ground throws across it — a short march toward the sun, since on an airless
// body a shadow is a hard edge onto black. Craters, rims, boulders and swells are all
// bumps in the one field, which is what makes them light consistently. A band is a
// plain (band.plain) and/or the hills behind one (band.hills), both standing on the
// band's horizon row; shared tuning is DEPARTURE_RIDGE.moon.
export function drawMoon(el, band, visitSeed, frame) {
	const M = DEPARTURE_RIDGE.moon
	const { w, h, cell } = gridFor(band, frame)
	const { ctx, img, put } = openSprite(el, w, h)
	const seed = band.seed + visitSeed
	// counts are authored per ridgeRefCells of width, so a narrow frame shows a
	// narrower crop of the same ground rather than a denser one
	const per = n => Math.round((n * w) / ENTRY.ridgeRefCells)

	// the plain's far edge, per column: a wander, and the limb's curve — the horizon
	// of a small world bows away toward both edges of the frame
	const yH = new Array(w)
	for (let x = 0; x < w; x++) {
		const limb = band.curve * ((x - w / 2) / (w / 2)) ** 2
		yH[x] = Math.round(
			h * band.horizon + limb + (fbm1(x / M.rollCells, seed + 21) - 0.5) * band.roll
		)
	}
	// the sun as a unit vector, its direction along the ground for the shadow march,
	// and which side of a thing it is on in screen x
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
	// the cut, for the caller to size the canvas by and to hang the destination from:
	// where the hills top out, per column, in rows
	const cut = {
		cols: w,
		rows: h,
		cell,
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
	// Screen → world. `squash` is a crater's vertical radius over its horizontal one,
	// so a row toward the horizon covers 1/squash cells of ground: depth Y is that
	// integrated down the band, 0 at the far edge and growing toward the camera. X
	// widens by `spread` toward the horizon, which is far things being smaller.
	const depthAt = (rows, t) =>
		(rows * (Math.log(sFar + (sNear - sFar) * t) - Math.log(sFar))) / (sNear - sFar)
	const toWorld = (x, y) => {
		const rows = rowsOf(x)
		const t = clamp01((y - yH[x]) / rows)
		return { X: (x - w / 2) * (1 + P.spread * (1 - t)), Y: depthAt(rows, t) }
	}
	const worldW = w * (1 + P.spread)
	const worldD = depthAt(h - 1 - Math.round(h * band.horizon), 1)

	// The crater field. Radius rolls as a power so most land small under a couple of
	// broad basins; age flattens the bowl and wears the rim, which is what stops a
	// field of one age reading as bubble wrap. Authored basins are placed by hand.
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
		// the regolith's grain runs across the frame: ground seen at a low angle shows
		// its detail foreshortened into streaks, not specks
		let hgt =
			(fbm2(X / M.swell.cells, Y / M.swell.cells, seed) - 0.5) * M.swell.amp +
			(fbm2(X / M.rough.cellsX, Y / M.rough.cellsY, seed + 5) - 0.5) * M.rough.amp
		// a low rise along the band's far edge, so the near band has a lit face to
		// stand on where it cuts across the far one
		if (P.rise) hgt += P.rise.amp * clamp01(1 - Y / P.rise.depth) ** 2
		// Long lines across the plain (P.lines): each a sinuous fold — dug below the
		// ground it is a rille, the crack a lava tube leaves when its roof falls in;
		// raised above it, a wrinkle ridge, the mare's crust buckled. They are what
		// stops a plain reading as a field of rings.
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

	// Albedo, separate from height: the large-scale light and dark of the ground —
	// mare against highland, the bright blanket round a fresh crater, and the rays
	// off the biggest basin. A landscape needs a composition you can see squinting.
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

	// Micro-pocks: a dark cell with a lit cell on its sun side, the two-pixel crater
	// every hand-drawn moon is textured with. Denser toward the camera, and only on
	// lit ground, where there are steps to drop and to climb.
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

	// the hand-placed boulders, as sprites over their bumps (see moon.boulderSprites),
	// found back on screen from their place in the world
	const S = M.boulderSprites
	for (const b of P.boulders.big) {
		const sprite = b.r >= S.bigFrom ? S.big : S.small
		let x = Math.round(w / 2 + b.x)
		let rows = rowsOf(x)
		let t = (sFar * Math.exp((b.y * (sNear - sFar)) / rows) - sFar) / (sNear - sFar)
		// the column depends on the spread at this depth, which depends on the column —
		// one refinement lands it within a cell
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
