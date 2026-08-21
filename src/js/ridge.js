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
import { clamp01 } from './math.js'
import { ditherIndex, fbm1, fbm2, ridged1 } from './pixelNoise.js'

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
	const levels = band.shades.length

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
		// rise over run in cells — which is the slope on screen, the cells
		// being square — so a band shades the same however it was cropped
		const slope = ((hi - lo) / (2 * span)) * h
		const face = 0.5 + slope * band.slopeGain * ENTRY.ridgeLight
		const rf = 1 / ENTRY.ridgeRoughCells
		for (let y = yTop; y < h; y++) {
			// the face is a band under the crest; below it the mass goes dark
			const depth = Math.min(1, (y - yTop) / band.faceDepth)
			// crag texture in 2D — sampled per column only, it stripes
			const rough = (fbm2(x * rf, y * rf, band.seed + visitSeed + 5) - 0.5) * ENTRY.ridgeRough
			const lit = clamp01((face + rough) * (1 - depth * ENTRY.ridgeDepthFade))
			put(x, y, band.shades[ditherIndex(lit, levels, x, y)])
		}
		// the lit rim along the very top of the ridge
		put(x, yTop, band.crest)
	}

	ctx.putImageData(img, 0, 0)
}
