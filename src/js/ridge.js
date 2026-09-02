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
import { ditherIndex, ditherThreshold, fbm1, fbm2, hash1, ridged1 } from './pixelNoise.js'

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
	// How much sky the shade side catches. A property of the scene's sky, not of the
	// shading model: the arrival sits under a lit dusk dome, the departure under a
	// black one, so the night bands name their own far lower value.
	const ambient = band.ambient ?? ENTRY.ridgeAmbient
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
			lit = ambient + (1 - ambient) * lit
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
		const keyline = PALETTE[hab.keyline]
		const half = (hab.w - 1) / 2
		// where this column's surface sits, which is what everything below clips to
		const groundAt = x => Math.round(h * (1 - profile[Math.max(0, Math.min(w - 1, x))]))
		// A low shoulder that faces the sun, rather than the lowest ground going. The
		// absolute minimum of the stretch is the floor of a valley — the darkest place
		// in the frame — and a structure lit at full strength there disagrees with
		// every rock around it. Facing is read off the same smoothed relief the rock
		// is shaded from, so the dome and its hillside agree about where the sun is.
		let hx = Math.round(w * 0.5)
		let bestScore = -Infinity
		for (let x = Math.round(w * 0.25); x < w * 0.75; x++) {
			const span = ENTRY.ridgeSlopeSpan
			const slope =
				((relief[Math.min(w - 1, x + span)] - relief[Math.max(0, x - span)]) / (2 * span)) *
				h
			const facing = clamp01(0.5 - slope * ENTRY.ridgeLight)
			const score = 1 - profile[x] + facing * hab.sunWeight
			if (score > bestScore) {
				bestScore = score
				hx = x
			}
		}
		// footed on the lowest ground it spans — a level floor, which the hillside
		// then cuts across (see the clip below) rather than the dome riding the slope
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
			const ground = groundAt(x)
			const rise = Math.max(1, Math.round(hab.h * Math.sqrt(1 - (dx / (half + 0.5)) ** 2)))
			const face = 0.5 + (dx / half) * 0.5 * ENTRY.ridgeLight
			const edgeY = base - rise + 1
			// the hillside has risen over this whole column: the dome is behind it
			if (edgeY > ground) continue
			for (let dy = 0; dy < rise; dy++) {
				const y = base - dy
				// Below this column's own surface is inside the hill, not on it. The
				// floor is one level row for the whole dome, so on the uphill side it
				// runs under the ground — and painting shell there put a lit wedge in
				// the middle of a shadowed rock face.
				if (y > ground) continue
				// Darken by depth below the shell surface, never by height above the
				// ground: the low edge columns ARE surface, and dimming them for
				// being short painted a false shadow across the dome's sun side.
				const under = (rise - 1 - dy) / hab.h
				const lit = clamp01(face * (1 - under * hab.shellFade))
				put(x, y, shellShades[ditherIndex(lit, shellShades.length, x, y)])
			}
			put(x, edgeY, edgeShades[ditherIndex(face, edgeShades.length, x, edgeY)])
			// A dark keyline over the lit rim, so the shell reads against whatever is
			// behind it. The shell ramp and the near band's share four of their steps;
			// on busy ground a sprite needs the break to hold its own shape.
			if (edgeY - 1 >= 0) put(x, edgeY - 1, keyline)
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
		// The entrance stands on the ground of its own column: where the hill has
		// risen under the dome, the shell's floor is buried and a door on it would be.
		const doorY = Math.min(base, groundAt(hx))
		const trailShades = hab.pathShades.map(name => PALETTE[name])
		for (let y = doorY + 1; y < h; y++) {
			const t = (y - doorY) / Math.max(1, h - 1 - doorY)
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
		put(hx - 1, doorY, light)
		put(hx + 1, doorY, light)
		put(hx - 1, doorY - 1, light)
		put(hx + 1, doorY - 1, light)
		put(hx, doorY - 2, light)
		put(hx, doorY, glow)
		put(hx, doorY - 1, glow)
		// Lit windows. One doorway cannot carry "someone lives here" by itself, and a
		// window reads at any size — it is light where light could only be made.
		for (const [wx, wy] of hab.windows) {
			const x = hx + wx
			const y = base - wy
			if (x < 0 || x >= w || y < 0 || y > groundAt(x)) continue
			put(x, y, light)
		}
		// and its pool on the ground below — light that lands on nothing is a sticker
		for (let dx = -2; dx <= 2; dx++) {
			if (doorY + 1 < h && ditherThreshold(hx + dx, doorY + 1) < 0.5) {
				put(hx + dx, doorY + 1, spill)
			}
		}
		if (doorY + 2 < h && ditherThreshold(hx, doorY + 2) < 0.5) put(hx, doorY + 2, spill)
	}

	ctx.putImageData(img, 0, 0)
}
