// The departure's sky on the ground's grid: black, with the off-frame sun's glow and the galaxy edge-on.

import { DEPARTURE_RIDGE } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { fbm1, fbm2, hash2, ridged2, seamIndex, turbulence } from './pixelNoise.js'
import { cellFor } from './ridge.js'

export function drawSky(el, frame) {
	const { sunGlow: S, galaxy: G } = DEPARTURE_RIDGE.sky
	const cell = cellFor(frame)
	const bleed = frame.bleed ?? 0
	const w = Math.ceil((frame.w + 2 * bleed) / cell)
	const h = Math.ceil((frame.h + 2 * bleed) / cell)
	el.width = w
	el.height = h
	const ctx = el.getContext('2d')
	const img = ctx.createImageData(w, h)
	const px = img.data
	const put = (x, y, [r, g, b]) => {
		const i = (y * w + x) * 4
		px[i] = r
		px[i + 1] = g
		px[i + 2] = b
		px[i + 3] = 255
	}
	const seed = DEPARTURE_RIDGE.ridgeSeed + 5

	// The galaxy: a broad soft arc of unresolved stars, brightest toward the bulge, mottled and dust-laned.
	const haze = G.haze.map(name => PALETTE[name])
	const faint = G.faint.map(name => PALETTE[name])
	const spark = G.spark.map(name => PALETTE[name])
	const bright = G.bright.map(name => PALETTE[name])
	const arm = PALETTE[G.brightArm]
	const ax = G.from[0] * w
	const ay = G.from[1] * h
	const bx = G.to[0] * w - ax
	const by = G.to[1] * h - ay
	const len = Math.hypot(bx, by)
	const half = (G.width * h) / 2
	// the spine bows like the great circle it is and wanders across its run; the bulge is a hump along it
	const centreAt = t =>
		(fbm1(t * G.wanderCells, seed + 51) - 0.5) * G.wander * half -
		G.bow * half * 4 * t * (1 - t)
	const bulgeAt = t => Math.exp(-(((t - G.bulgeAt) / G.bulgeWidth) ** 2))
	const D = G.dust
	// the stars, kept apart from each other: two stars touching read as one blob
	const stars = []
	const taken = new Uint8Array(w * h)
	const free = (x, y, r) => {
		for (let dy = -r; dy <= r; dy++) {
			for (let dx = -r; dx <= r; dx++) {
				if (taken[(y + dy) * w + x + dx]) return false
			}
		}
		return true
	}
	const star = (x, y, r, at) => {
		if (x < r || y < r || x >= w - r || y >= h - r || !free(x, y, r)) return
		taken[y * w + x] = 1
		stars.push({ x, y, ...at })
	}
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const rx = x - ax
			const ry = y - ay
			const u = (rx * bx + ry * by) / len
			const v = (ry * bx - rx * by) / len
			const t = u / len
			const bulge = bulgeAt(t)
			const rel = (v - centreAt(t)) / (half * (1 + G.bulgeWiden * bulge))
			// the light on this cell, and what it would be with no dust in the way; both zero past the band's reach
			let g = 0
			let clear = 0
			if (Math.abs(rel) < G.reach) {
				// the light: a soft core with long wings, gaining toward the bulge and tapering from it
				let f =
					(G.amp * (1 + G.bulge * bulge) * (1 - G.taper * (1 - t))) /
					(1 + rel * rel) ** G.falloff
				// cloud at every scale given: the coarse one clumps and frays the band, the fine one is the grain
				for (let k = 0; k < G.clouds.length; k++) {
					const c = G.clouds[k]
					f *= Math.exp(
						c.depth *
							(turbulence(
								u / c.stretch / c.cells,
								v / c.cells,
								seed + 21 + k,
								c.octaves
							) -
								0.5)
					)
				}
				clear = 1 - Math.exp(-f)
				// dust in front of the light: rifts down the run plus lanes and knots, both hugging the plane
				for (let k = 0; k < G.rifts.length; k++) {
					const r = G.rifts[k]
					const path =
						r.offset + (fbm1(t * r.wanderCells, seed + 71 + k) - 0.5) * r.wander
					const width =
						r.width *
						(1 + (fbm1(t * r.wanderCells + 3.1, seed + 81 + k) - 0.5) * r.swell)
					const open = Math.min(
						clamp01((t - r.span[0]) / r.ease),
						clamp01((r.span[1] - t) / r.ease)
					)
					f *= 1 - r.depth * open * Math.exp(-(((rel - path) / width) ** 2))
				}
				const lanes = ridged2(u / D.stretch / D.cells, v / D.cells, seed + 25, D.octaves)
				f *= Math.exp(-D.depth * lanes ** D.power * Math.exp(-((rel / D.reach) ** 2)))
				// exposed like film, so piles of light brighten ever more slowly and the ramp's top is kept for the bulge
				g = 1 - Math.exp(-f)
				const idx = seamIndex(g, haze.length + 1, x, y, G.seam)
				if (idx > 0) put(x, y, haze[idx - 1])
			}
			// the stars are the band: a faint tier thinning with the light, pale sparks in the thick, and bright crosses
			const cluster = fbm2(x / G.clusterCells, y / G.clusterCells, seed + 31) > G.clusterAbove
			const lit = g + (clear - g) * G.starThrough
			const weight = lit ** G.starPow * (cluster ? G.clusterGain : 1)
			const roll = hash2(x, y, seed + 7)
			if (roll < G.brightStars * weight) star(x, y, 2, { tier: bright, cross: true })
			else if (roll < G.sparks * g ** G.sparkPow) star(x, y, 1, { tier: spark })
			else if (roll < G.stars * weight) star(x, y, 1, { tier: faint, skew: G.faintSkew })
		}
	}
	// The sun's glow onto whatever is still sky: a dithered falloff, faint by design — no air carries it.
	const glow = S.shades.map(name => PALETTE[name])
	const sx = S.x * w
	const sy = S.y * h
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			if (px[(y * w + x) * 4 + 3]) continue
			const dx = (x - sx) / (S.rx * w)
			const dy = (y - sy) / (S.ry * h)
			const rim = 1 + (fbm1(Math.atan2(dy, dx) * S.wobbleFreq, seed + 13) - 0.5) * S.wobble
			const d = Math.hypot(dx, dy) * rim
			if (d >= 1) continue
			const idx = seamIndex((1 - d) ** S.power, glow.length + 1, x, y, S.seam)
			if (idx > 0) put(x, y, glow[idx - 1])
		}
	}
	// the stars go on last — a star is meant to stand alone on whatever is behind it
	for (const star of stars) {
		if (star.cross) {
			for (const [dx, dy] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			]) {
				if (star.x + dx >= 0 && star.x + dx < w && star.y + dy >= 0 && star.y + dy < h) {
					put(star.x + dx, star.y + dy, arm)
				}
			}
		}
		// a tier's shade is a roll skewed toward the dim end: most of a star field is at the edge of seeing
		const shade = hash2(star.x, star.y, seed + 9) ** (star.skew ?? 1)
		put(star.x, star.y, star.tier[Math.floor(shade * star.tier.length)])
	}
	ctx.putImageData(img, 0, 0)
	return { cols: w, rows: h, cell }
}
