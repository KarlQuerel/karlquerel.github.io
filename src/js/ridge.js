// Shaded relief for the journey's ridgelines: the ground we leave from and the range we land in.

import { DEPARTURE_RIDGE, ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01, smoothstep } from './math.js'
import { paintHabitat } from './habitat.js'
import {
	ditherIndex,
	ditherThreshold,
	fallThreshold,
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
export function openSprite(el, w, h) {
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
// `keep` spares cells that must not follow their neighbours.
export function tidySprite(img, w, h, passes, keep) {
	const cells = new Uint32Array(img.data.buffer)
	for (let pass = 0; pass < passes; pass++) {
		for (let y = 1; y < h - 1; y++) {
			for (let x = 1; x < w - 1; x++) {
				const i = y * w + x
				const around = cells[i - 1]
				if (
					around !== cells[i] &&
					!keep?.(i) &&
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

// What a cut cell is, so a relight knows which ramp it walks — or that it is the habitat's own colour.
const ROCK = 0
const SNOW = 1
const FIXED = 2
// the habitat's trail: its own ramp, walked into the night with the rock
const PATH = 3

// A column's facing under a light (`Lx` across, `Ly` up, a unit vector): the slope's turn toward the
// sun's side, and under a high sun the gentle ground over the steep, weighted by `ridgeUp` and taken
// against the range's own mean steepness — relief moves, the range's tone does not, or a hazy far
// range with no steep ground lifted whole at noon. The second term is nothing at the skyline, so a sun
// on the horizon lights the range exactly as it was authored.
function faceOf(slope, Lx, Ly, steep = 0) {
	const up = ENTRY.ridgeUp * Math.max(0, Ly) * 2 * (steep - Math.min(1, Math.abs(slope)))
	return 0.5 - slope * Lx + up
}

// The range's height per column, a share of the band: ridged noise over a massif swell.
function rangeProfile(band, visitSeed, w) {
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
	return profile
}

// A box blur of the profile, `reach` columns either side, clamped at the ends.
function boxBlur(profile, reach, out = new Array(profile.length)) {
	const w = profile.length
	for (let x = 0; x < w; x++) {
		let sum = 0
		for (let d = -reach; d <= reach; d++) sum += profile[Math.max(0, Math.min(w - 1, x + d))]
		out[x] = sum / (reach * 2 + 1)
	}
	return out
}

// Snow is a cap, not a stratum: how far a summit pokes over the ruffled snowline sets its depth.
function snowCaps(snow, band, visitSeed, profile, h, faceAt) {
	const w = profile.length
	const caps = new Float32Array(w)
	if (!snow) return caps
	// How far each column stands above its own neighbourhood — a summit, not merely high ground.
	const P = ENTRY.snowProminence
	const wide = boxBlur(profile, P.cells, new Float32Array(w))
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
	return caps
}

// The summits, off the smoothed relief so a crag is not one: the only things that throw a shadow.
// A slope rising toward the sun is no occluder until it peaks, or every face under it went dark.
function summitsOf(relief, reach) {
	const w = relief.length
	const summit = new Uint8Array(w)
	for (let x = 0; x < w; x++) {
		let top = true
		for (let d = -reach; d <= reach && top; d++) {
			const n = x + d
			if (d !== 0 && n >= 0 && n < w && relief[n] >= relief[x]) top = false
		}
		summit[x] = top ? 1 : 0
	}
	return summit
}

// The range cut: profile, relief, snow, strata and the habitat — everything that owes nothing to the
// sun. Each face cell keeps what its light needs that the sun cannot change; lightRidge does the rest.
export function cutRidge(el, band, visitSeed, frame) {
	const { w, h, cell } = gridFor(band, frame)
	const { ctx, img, put: fix } = openSprite(el, w, h)
	// Per cell: what it is, its own threshold for the night walk, its crag, the haze lifting it and the
	// bite of the stratum it sits in. Per column: the crest row and the gained slope.
	const kind = new Uint8Array(w * h)
	const thr = new Float32Array(w * h)
	const rough = new Float32Array(w * h)
	const haze = new Float32Array(w * h)
	const bite = new Uint8Array(w * h)
	// a trail cell's rung on the path's ramp, and how much of the doorway's light reaches each cell
	const tone = new Uint8Array(w * h)
	const glow = new Float32Array(w * h)
	const tops = new Uint16Array(w)
	const slope = new Float32Array(w)
	// what the habitat lays down stands in its own light, so it is painted here and never relit
	const put = (x, y, col) => {
		fix(x, y, col)
		if (x >= 0 && y >= 0 && x < w && y < h) kind[y * w + x] = FIXED
	}
	// optional snowcaps: a second ramp above the band's snowline (see band.snow)
	const snow = band.snow

	const profile = rangeProfile(band, visitSeed, w)
	// Shading reads off a smoothed copy: `face` is one value per column, so raw neighbours stripe.
	const relief = boxBlur(profile, ENTRY.ridgeReliefBlur)

	// The gained slope of a column, off the smoothed relief: the rise per cell across `ridgeSlopeSpan`,
	// times the band's `slopeGain`. The snowline and the habitat are geometry, so they read their
	// facing under the authored light and never move with the sun.
	const slopeAt = x => {
		const span = ENTRY.ridgeSlopeSpan
		const lo = relief[Math.max(0, x - span)]
		const hi = relief[Math.min(w - 1, x + span)]
		return ((hi - lo) / (2 * span)) * h * band.slopeGain
	}
	const faceAt = x => faceOf(slopeAt(x), ENTRY.ridgeLight, 0)
	const caps = snowCaps(snow, band, visitSeed, profile, h, faceAt)

	for (let x = 0; x < w; x++) {
		const yTop = Math.round(h * (1 - profile[x]))
		const rf = 1 / ENTRY.ridgeRoughCells
		const vf = 1 / ENTRY.ridgeRoughVaryCells
		const capCells = caps[x]
		// This column's shift of the strata beds: a gentle undulation, plus a steady dip across the range.
		const bedShift =
			(fbm1(x / ENTRY.strataWobbleCells, band.seed + visitSeed + 31) - 0.5) *
				ENTRY.strataWobble +
			x * ENTRY.strataDip
		for (let y = yTop; y < h; y++) {
			const i = y * w + x
			// Crag texture in 2D. How MUCH a place carries varies on a far longer wavelength than the crags.
			const vary = fbm2(x * vf, y * vf, band.seed + visitSeed + 67)
			rough[i] =
				(fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) *
				ENTRY.ridgeRough *
				(1 - ENTRY.ridgeRoughVary + 2 * ENTRY.ridgeRoughVary * vary)
			// Aerial haze pools in the valleys: a foot lifts toward the palest step of its ramp, the sky's own tone.
			if (band.haze) {
				const H = band.haze
				haze[i] = H.lift * clamp01((y - yTop) / (H.depth * h)) ** H.power
			}
			// Inside the cap, the same light is walked on the snow ramp, keeping the rock's facets and shadow.
			const edge = capCells - (y - yTop)
			kind[i] =
				snow &&
				capCells > snow.minCap &&
				edge > 0 &&
				(edge >= snow.edge || edge / snow.edge > ditherThreshold(x, y))
					? SNOW
					: ROCK
			// Strata: sparse darker seams undulating across the faces, so rock reads as bedded stone.
			const bed = (y + bedShift) / ENTRY.strataSpacing
			const which = Math.floor(bed)
			// Each bed gets its own thickness and its own bite, hashed off its index.
			const r = hash1(which, band.seed + visitSeed + 53)
			// Each seam sits a little off the regular grid, so the eye stops counting them.
			const jitter = (hash1(which, band.seed + visitSeed + 89) - 0.5) * ENTRY.strataJitter
			const off = (((bed - which - jitter) % 1) + 1) % 1
			if (off < ENTRY.strataWidth * (0.4 + 1.6 * r)) bite[i] = r > ENTRY.strataDeepAt ? 2 : 1
			thr[i] = fallThreshold(x, y)
		}
		// the crest is lit at paint time; the cut says where it runs, how it slopes and if a cap hangs on it
		tops[x] = yTop
		slope[x] = slopeAt(x)
		kind[yTop * w + x] = snow && capCells > snow.minCap ? SNOW : ROCK
	}
	// how steep the range is on the whole, the pivot a high sun turns its relief about
	let steep = 0
	for (let x = 0; x < w; x++) steep += Math.min(1, Math.abs(slope[x]))
	steep /= w

	const habitat = band.habitat
		? paintHabitat(put, band.habitat, {
				w,
				h,
				profile,
				// ground the doorway's light can fall on: the range, or what the habitat laid down
				solid: (x, y) => y >= tops[x] || kind[y * w + x] === FIXED,
				tread: (x, y, rung) => {
					kind[y * w + x] = PATH
					tone[y * w + x] = rung
				},
				light: (x, y, f) => (glow[y * w + x] = f),
				faceAt,
				seed: band.seed + visitSeed,
			})
		: { vent: null, lamp: [] }

	return {
		ctx,
		w,
		h,
		cell,
		band,
		kind,
		thr,
		rough,
		haze,
		bite,
		tone,
		glow,
		tops,
		slope,
		steep,
		summit: summitsOf(relief, ENTRY.ridgeReliefBlur),
		// the shadow lines across the range, kept so a relight allocates nothing: the ray each column
		// stands under, the upstream ray still running under it, and the owning summit's terminator
		line: new Float32Array(w),
		under: new Float32Array(w),
		term: new Float32Array(w),
		...habitat,
		// the frame the band was cut for and how far it runs past it, to place the sun on the band's grid
		frameW: frame.w,
		frameH: frame.h,
		bleed: frame.bleed ?? 0,
		// the habitat's own pixels, and the sheet the range is painted onto over them
		fixed: img,
		img: ctx.createImageData(w, h),
	}
}

// The range in the light it stands in now: each cell's facing under the sun as it stands, the shadow
// the peak on the sun's side throws across it, the sun's warmth near the disc, the night walk down its
// ramp, then the tidy pass. The cut paid for the noise; this is arithmetic over kept cells, so the
// ranges follow the sun across the sky.
export function lightRidge(sprite, sky) {
	const { ctx, w, h, cell, band, kind, thr, rough, haze, bite, tone, glow, tops } = sprite
	const { line, under, term, frameW, frameH, bleed, fixed, img, lamp } = sprite
	const { shades, snowShades, rockFoot, snowFoot, at, rockCrest, snowyCrest } = nightRamps(
		band,
		sky.ground
	)
	// The crest walks a short ramp by facing rather than wearing one colour the whole way.
	const CREST_STEPS = 3
	// The disc stands IN the frame, so it is a place and not a direction: a peak to its left is lit from
	// the right and one to its right from the left. Taken on the band's own grid — `atCol` across,
	// `atUp` its height over the band's foot, which runs off the top of the sprite and is meant to.
	// The band starts `bleed` px left of the frame and ends `bleed` under it.
	const atCol = (sky.x * frameW + bleed) / cell
	const atUp = ((1 - sky.y) * frameH + bleed) / cell
	const SH = ENTRY.ridgeShadow
	// The direct sun still on the rock, carrying both the shade it casts and the warmth it lays near
	// the disc. Both go out as the range swallows the disc: it was throwing hard shade on rock with no
	// sun left to be shaded from, and blooming a glow whose centre had sunk inside the mountain.
	const cast = sky.light * sky.beam
	const { faceCol, leanCol } = facings(sprite, atCol, atUp)
	castShadows(sprite, leanCol, atCol, atUp)
	// The sun touches what is near it: `sunGlow` bands promote up their ramp with distance falloff. Once
	// it is below the skyline the light comes from behind the rock, not out of it, so the centre holds
	// at the top of the band and the whole glow goes out with `light` rather than sinking into the face.
	const sun = band.sunGlow
	const sunX = sun ? atCol : 0
	const sunY = sun ? Math.max(0, h - atUp) : 0
	const faceDepth = band.faceDepth
	// the lean reaches only as far as the face does: under it the mass is dark anyway, and a cell a
	// whole band down read the facing of a column twenty cells away, which striped it
	// blended between the two columns it falls between: rounded, a cap under a disc overhead swapped
	// halves each time the lean crossed a half cell
	const faceAt = (x, d) => {
		const at = Math.max(0, Math.min(w - 1, x + leanCol[x] * Math.min(d, faceDepth)))
		const lo = Math.floor(at)
		const hi = Math.min(w - 1, lo + 1)
		return faceCol[lo] + (faceCol[hi] - faceCol[lo]) * (at - lo)
	}
	// outside the glow's reach it promotes nothing, so the distance is only taken inside its box
	const G = ENTRY.sunGlowCells
	// the habitat's trail: its ramp, and the darker steps under it that the night walks it into
	const trail = band.habitat?.path
	const pathShades = trail?.shades.map(name => PALETTE[name])
	const pathFoot = trail?.foot.map(name => PALETTE[name])
	// The doorway's light, once the lamp is on: a warm ramp of its own, faint while the sky still holds
	// the sun and full only once the rock is at its night floor. The cell's crag, its stratum and the
	// path's tread all move it a step, so the surface still reads under the light instead of a wash.
	const DL = band.habitat?.doorLight
	const lampOn = DL && sky.ground >= band.habitat.lampAt
	const dark = lampOn
		? clamp01((sky.ground - band.habitat.lampAt) / (ENTRY.sun.night - band.habitat.lampAt))
		: 0
	const lampGain = lampOn ? DL.gain * (DL.dusk + (1 - DL.dusk) * dark) : 0
	const warm = DL?.shades.map(name => PALETTE[name])
	// the warm tone a lit cell takes, or null where the light is too faint to beat the night
	const lampAt = (i, x, y, texture) => {
		if (!lampGain || !glow[i]) return null
		const v = clamp01(glow[i] * lampGain * (1 + rough[i] * DL.grain)) * warm.length
		// a threshold of its own, not Bayer: the gain sweeps the whole pool at dusk
		const r = Math.floor(v) + (v % 1 > ditherThreshold(y, x, 1) ? 1 : 0) - 1 + texture
		return r < 0 ? null : warm[Math.min(warm.length - 1, r)]
	}
	// read once, not once a cell: this loop runs every step of the sun
	const { ridgeDepthFade, ridgeContrast, ridgeAmbient, ridgeSeam, strataMinLit, snowAmbient } =
		ENTRY
	const px = img.data
	px.set(fixed.data)
	const write = (x, y, col) => {
		const i = (y * w + x) * 4
		px[i] = col[0]
		px[i + 1] = col[1]
		px[i + 2] = col[2]
		px[i + 3] = 255
	}
	for (let x = 0; x < w; x++) {
		const yTop = tops[x]
		const face = faceCol[x]
		const glowCol = sun && Math.abs(x - sunX) < G
		// The shadow line stands `over` cells above this crest; a cell `d` down is in the shade below it,
		// save inside the wedge over the upstream ray (`ran`) and under the terminator (`cut`). In or
		// out is the ordered dither's call, over a seam `soft` cells wide broken on the cell's own crag.
		const over = line[x] - (h - yTop)
		const ran = under[x] - (h - yTop)
		const cut = term[x] - (h - yTop)
		// most columns the wedge cannot reach: the terminator is under the upstream ray, or under the
		// foot, by more than a crag could bend it (|rough| < 1)
		const wedged = term[x] + 2 * SH.crumb > under[x] && term[x] + SH.crumb > 0
		const wedgeAt = (d, crumb) =>
			Math.min(clamp01((-ran - d + crumb) / SH.soft), clamp01((cut + d + crumb) / SH.soft))
		for (let y = yTop; y < h; y++) {
			const i = y * w + x
			if (kind[i] === FIXED) continue
			if (kind[i] === PATH) {
				// the tread's paler crown takes the light a step brighter
				write(x, y, lampAt(i, x, y, tone[i]) ?? at(pathShades, pathFoot, tone[i], thr[i]))
				continue
			}
			const snowy = kind[i] === SNOW
			const d = y - yTop
			// the face is a band under the crest; below it the mass goes dark
			const depth = Math.min(1, d / faceDepth)
			let lit = clamp01((faceAt(x, d) + rough[i]) * (1 - depth * ridgeDepthFade))
			// Dither is for boundaries, not fill: the S-curve gathers the checker where two tones meet.
			lit += (smoothstep(lit) - lit) * ridgeContrast
			// The shade takes `SH.depth` of the sun off a cell and leaves the sky's light on it, so the
			// crags and strata inside a shadow still read — taken off the ramp index instead, every
			// cell already low on its ramp landed on the bottom step and the flank went flat.
			// How DEEP is `cast`, carried whole and not through the dither: a dithered strength flips
			// a Bayer level at a time, so a sixteenth of the range left the shade in one frame each
			// time the light crossed a rung.
			const crumb = rough[i] * SH.crumb
			let seam = clamp01((over + d + crumb) / SH.soft)
			if (wedged) seam = Math.min(seam, 1 - wedgeAt(d, crumb))
			if (seam > ditherThreshold(x, y)) lit *= 1 - SH.depth * cast
			// Skylight after the curve, not before: a slope turned from the sun still sits under an open sky.
			// Snow holds far more of it than rock does, so its shading compresses into the top of its own
			// ramp: `ash` and `stone` are where the night walk takes a cap, not where an afternoon does.
			// Shaded on the rock's floor it came out the tone of the flank and the peak lost half its snow.
			const amb = snowy ? snowAmbient : ridgeAmbient
			lit = amb + (1 - amb) * lit
			lit += (1 - lit) * haze[i]
			const ramp = snowy ? snowShades : shades
			// the disc's warmth near it, in ramp steps
			const glow =
				glowCol && Math.abs(y - sunY) < G
					? clamp01(1 - Math.sqrt((x - sunX) ** 2 + (y - sunY) ** 2) / G) *
						cast *
						(ENTRY.sunGlowLevels - 1)
					: 0
			// `seam` holds the checker to a narrow window either side of a step and leaves the rest solid.
			// Snow takes the glow before it is rounded: rounded apart, the two steps crossed a frame apart
			// and a cap cell went up, down and up again.
			let idx = seamIndex(
				snowy ? clamp01(lit + glow / (ramp.length - 1)) : lit,
				ramp.length,
				x,
				y,
				ridgeSeam
			)
			if (kind[i] === ROCK && lit > strataMinLit) idx = Math.max(0, idx - bite[i])
			// on the cell's own threshold: a Bayer lattice slid across the rock with the disc
			if (!snowy && glow)
				idx = Math.min(
					ramp.length - 1,
					idx + Math.floor(glow) + (glow % 1 > thr[i] ? 1 : 0)
				)
			write(
				x,
				y,
				lampAt(i, x, y, kind[i] === ROCK ? -bite[i] : 0) ??
					at(ramp, snowy ? snowFoot : rockFoot, idx, thr[i])
			)
		}
		// The lit rim along the top: snow-capped where a cap hangs, warmed where the crest runs near the
		// disc, and down in the shade with its face — a bright rim over a shadowed face read as a glitch.
		const top = kind[yTop * w + x]
		if (top === FIXED) continue
		const crestRamp = top === SNOW ? snowyCrest : rockCrest
		const crestGlow = sun
			? clamp01(1 - Math.sqrt((x - sunX) ** 2 + (yTop - sunY) ** 2) / G) * cast
			: 0
		// A rim is one row, so its shade is a whole step or none; `cast` decides on the cell's own
		// jittered threshold, so the rim comes out of the shade cell by cell and never a lattice at a time.
		const iTop = yTop * w + x
		const crumbTop = rough[iTop] * SH.crumb
		let crestSeam = clamp01((over + crumbTop) / SH.soft)
		if (wedged) crestSeam = Math.min(crestSeam, 1 - wedgeAt(0, crumbTop))
		const crestShade = crestSeam > ditherThreshold(x, yTop) && cast > thr[iTop] ? 1 : 0
		write(
			x,
			yTop,
			crestRamp(
				ditherIndex(clamp01(face + crestGlow), CREST_STEPS, x, yTop) - crestShade,
				thr[iTop]
			)
		)
	}
	// No pixel stands alone: a lone cell inside another is the tell of a generated sprite.
	// Snow is spared: a cap is relit every step, and a cell tidied to its neighbours flashed for a frame
	// each time one of them crossed a seam.
	tidySprite(img, w, h, ENTRY.tidyPasses, i => kind[i] === SNOW)
	// The habitat's lamp is a switch: thrown once the rock's own dusk is `lampAt` steps along, the disc
	// going behind the peaks, thrown back there at dawn — the doorway and the light it throws at once.
	// Laid after the tidy, which would clot the light's dither into blobs.
	if (lamp.length && sky.ground >= band.habitat.lampAt) {
		for (const c of lamp) write(c.x, c.y, c.col)
	}
	ctx.putImageData(img, 0, 0)
}

// The band's ramps walked `ground` rungs into the night, each cell stepping on its own threshold.
// A `foot` hangs darker steps under a ramp that stops short; rock and snow each keep their own.
function nightRamps(band, ground) {
	const shades = band.shades.map(name => PALETTE[name])
	const snow = band.snow
	const snowShades = snow ? snow.shades.map(name => PALETTE[name]) : null
	const footOf = names => (names ?? []).map(name => PALETTE[name])
	const rockFoot = footOf(band.foot)
	const snowFoot = footOf(snow?.foot)
	const whole = Math.floor(ground)
	const part = ground - whole
	const at = (ramp, foot, i, t) => {
		const j = i + foot.length - whole - (part > t ? 1 : 0)
		return j < foot.length
			? (foot[Math.max(0, j)] ?? ramp[0])
			: ramp[Math.min(ramp.length - 1, j - foot.length)]
	}
	// a crest is the top of its band's own ramp, so night walks it down at the rock's rate
	const crestOf = (ramp, foot, tip) => {
		const full = [...foot, ...ramp, tip]
		const base = foot.length + ramp.length - 2
		return (i, t) => full[Math.max(0, base + i - whole - (part > t ? 1 : 0))] ?? full[0]
	}
	return {
		shades,
		snowShades,
		rockFoot,
		snowFoot,
		at,
		rockCrest: crestOf(shades, rockFoot, PALETTE[band.crest]),
		snowyCrest: snow ? crestOf(snowShades, snowFoot, PALETTE[snow.crest]) : null,
	}
}

// Each column's facing under the disc, and how far its terminator leans down toward the shade.
function facings({ w, h, tops, slope, steep }, atCol, atUp) {
	const faceCol = new Float32Array(w)
	const leanCol = new Float32Array(w)
	for (let x = 0; x < w; x++) {
		const ax = atCol - x
		const ay = atUp - (h - tops[x])
		const len = Math.sqrt(ax * ax + ay * ay) || 1
		faceCol[x] = faceOf(slope[x], ax / len, ay / len, steep)
		leanCol[x] = (ENTRY.ridgeLean * ax) / len
	}
	return { faceCol, leanCol }
}

// Every summit throws a line away from the disc; `under` and `term` bound the lit wedge below it.
function castShadows({ w, h, tops, summit, line, under, term }, leanCol, atCol, atUp) {
	const SH = ENTRY.ridgeShadow
	const split = Math.max(0, Math.min(w, Math.round(atCol)))
	const march = (from, stop, step) => {
		let ray = -Infinity
		let drop = SH.least
		let ran = -Infinity
		let ranDrop = SH.least
		let peak = 0
		let crest = -Infinity
		let lean = 0
		for (let x = from; x !== stop; x += step) {
			ray -= drop
			ran -= ranDrop
			line[x] = ray
			under[x] = ran
			term[x] = lean ? crest - Math.abs(x - peak) / lean : -Infinity
			const up = h - tops[x]
			if (summit[x] && up > ray) {
				ran = ray
				ranDrop = drop
				ray = up
				drop = Math.max(SH.least, (atUp - up) / Math.max(1, Math.abs(x - atCol)))
				peak = x
				crest = up
				lean = Math.abs(leanCol[x])
			}
		}
	}
	march(split, w, 1)
	march(split - 1, -1, -1)
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
	const world = { w: w * (1 + P.spread), d: depthAt(h - 1 - Math.round(h * band.horizon), 1) }
	const craters = craterField(P, seed, world, per)
	const height = moonHeight(P, seed, craters, boulderField(P, seed, world, per))
	const albedo = moonAlbedo(seed, craters)

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

// The crater field: radius rolls as a power, and age flattens the bowl, so one age cannot read as bubble wrap.
function craterField(P, seed, world, per) {
	const C = DEPARTURE_RIDGE.moon.crater
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
		const x = (hash1(i * 7 + 1, seed + 1) - 0.5) * world.w
		const y = hash1(i * 7 + 2, seed + 1) * world.d
		craters.push(shape({ x, y, r }, hash1(i * 7 + 3, seed + 1)))
	}
	for (const c of P.craters.big) craters.push(shape(c, C.freshAge))
	return craters
}

function boulderField(P, seed, world, per) {
	const B = DEPARTURE_RIDGE.moon.boulder
	const boulders = P.boulders.big.map(b => ({ ...b, height: b.r * B.height }))
	for (let i = 0; i < per(P.boulders.count); i++) {
		const r = B.rMin + (B.rMax - B.rMin) * hash1(i * 5 + 2, seed + 9)
		const x = (hash1(i * 5, seed + 9) - 0.5) * world.w
		const y = hash1(i * 5 + 1, seed + 9) * world.d
		boulders.push({ x, y, r, height: r * B.height })
	}
	return boulders
}

// The plain's height field: swells and regolith texture, then every crater and boulder.
function moonHeight(P, seed, craters, boulders) {
	const M = DEPARTURE_RIDGE.moon
	const C = M.crater
	return (X, Y) => {
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
}

// Albedo, separate from height: mare against highland, fresh-crater blankets, and the big basin's rays.
function moonAlbedo(seed, craters) {
	const M = DEPARTURE_RIDGE.moon
	const C = M.crater
	const big = craters.reduce((a, c) => (c.r > a.r ? c : a), craters[0])
	return (X, Y) => {
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
}
