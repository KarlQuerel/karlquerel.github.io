// Shaded relief for the journey's ridgelines — the ground we leave from at the
// departure and the range we land in at the arrival. Kept out of the components so
// both ends of the trip are cut from one grid with one shading model, and so the
// drawing code reads as drawing code.
//
// A band is a window onto a range at a fixed scale rather than a whole range
// squeezed into the frame: `ridgeCellPx` is how big one cell lands on screen and
// the noise is walked at `ridgeRefCells` cells per `freq` cycle, so a narrow
// viewport simply gets fewer cells — same chunk size, same slopes, fewer peaks.

import { ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01, smoothstep } from './math.js'
import { ditherIndex, ditherThreshold, fbm1, fbm2, ridged1 } from './pixelNoise.js'

// Each column is lit by the way its face turns, then darkened with depth into the
// mass, and the result is dithered onto the band's ramp — the same trick the planet
// sprite uses, so the ridges gain volume without leaving the grid. `frame` is the
// viewport the band is being cut for: { w, h } in CSS pixels.
export function drawRidge(el, band, visitSeed, frame) {
	// One cell is the same size on every viewport, so the grid the range is
	// quantised onto never changes — a narrow frame just gets fewer cells.
	const cell = Math.max(ENTRY.ridgeCellPx, frame.w / ENTRY.ridgeMaxCells)
	const w = Math.max(8, Math.round(frame.w / cell))
	const h = Math.max(2, Math.round(((band.heightVh / 100) * frame.h) / cell))
	el.width = w
	el.height = h
	const ctx = el.getContext('2d')
	const img = ctx.createImageData(w, h)
	const px = img.data
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

	const put = (x, y, [r, g, b]) => {
		const i = (y * w + x) * 4
		px[i] = r
		px[i + 1] = g
		px[i + 2] = b
		px[i + 3] = 255
	}

	for (let x = 0; x < w; x++) {
		const ridge = profile[x]
		const yTop = Math.round(h * (1 - ridge))
		// which way this face turns decides how much of the sun it catches,
		// measured across a span so the facets come out broad
		const span = ENTRY.ridgeSlopeSpan
		const lo = profile[Math.max(0, x - span)]
		const hi = profile[Math.min(w - 1, x + span)]
		// Rise over run in cells — which is the slope on screen, the cells
		// being square — so a band shades the same however it was cropped.
		// Minus: a slope rising toward +x faces −x, so with the sun stage left
		// (ridgeLight −1) it is the rising flanks that catch it. The sign was
		// flipped for a long time and read fine — until the sun disc and its
		// glow gave the scene an anchor, and the lie showed.
		const slope = ((hi - lo) / (2 * span)) * h
		const face = 0.5 - slope * band.slopeGain * ENTRY.ridgeLight
		const rf = 1 / ENTRY.ridgeRoughCells
		// Snow is a cap, not a stratum: how far this column's summit pokes above the
		// (ruffled) snowline sets how many cells of snow hang below its crest — tall
		// massifs carry deep caps, a peak just past the line gets a dusting, and
		// snow never starts mid-face the way an altitude band across the sprite did.
		const snowLine = snow
			? snow.line +
				(fbm1(x / ENTRY.snowRuffleCells, band.seed + visitSeed + 9) - 0.5) * snow.ruffle
			: 2
		const capCells = snow ? (profile[x] - snowLine) * h * snow.depth : 0
		// this column's shift of the strata beds, so the seams undulate
		const bedShift =
			(fbm1(x / ENTRY.strataWobbleCells, band.seed + visitSeed + 31) - 0.5) *
			ENTRY.strataWobble
		for (let y = yTop; y < h; y++) {
			// the face is a band under the crest; below it the mass goes dark
			const depth = Math.min(1, (y - yTop) / band.faceDepth)
			// crag texture in 2D — sampled per column only, it stripes
			const rough = (fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) * ENTRY.ridgeRough
			let lit = clamp01((face + rough) * (1 - depth * ENTRY.ridgeDepthFade))
			// Dither is for boundaries, not fill: the S-curve pushes the field toward
			// solid steps, so the checker gathers into narrow bands where two tones
			// actually meet instead of wallpapering whole faces.
			lit += (smoothstep(lit) - lit) * ENTRY.ridgeContrast
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
			if (ramp === shades) {
				const bed = (y + bedShift) / ENTRY.strataSpacing
				if (bed - Math.floor(bed) < ENTRY.strataWidth) idx = Math.max(0, idx - 1)
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
