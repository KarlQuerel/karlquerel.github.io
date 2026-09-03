// The departure's sky, drawn once on the ground's grid. Black — there is no air — with
// two things on it: the glow of the sun just off frame to the left, low on that
// horizon, which is the one thing in the scene that shows where every lit flank gets
// its light; and the galaxy, billows of haze with dust lanes carved through them and
// stars gathered where the haze is thick. Both are drawn the way the ground is: solid
// steps with the dither held to the seams, since a checker laid across a soft gradient
// reads as wallpaper and not as cloud. The bright stars are DOM glints
// (DepartureRidge.vue), so they can breathe on a stepped clock without a redraw.

import { DEPARTURE_RIDGE } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { fbm1, fbm2, hash2, seamIndex } from './pixelNoise.js'
import { cellFor, tidySprite } from './ridge.js'

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

	// The galaxy: a band across the frame — a wide dark mantle with a narrow bright spine
	// down its middle, the way the real one reads from a dark place. The haze is noise
	// sampled through a warp of itself, which is what turns a gradient into billows,
	// with finer wisps laid over the big ones; quantised to solid steps on a ramp that
	// walks from violet up into rose, and dust lanes that cut whole steps out.
	const haze = G.haze.map(name => PALETTE[name])
	const faint = G.faint.map(name => PALETTE[name])
	const bright = G.bright.map(name => PALETTE[name])
	const arm = PALETTE[G.brightArm]
	const ax = G.from[0] * w
	const ay = G.from[1] * h
	const bx = G.to[0] * w - ax
	const by = G.to[1] * h - ay
	const half = (G.width * h) / 2
	// the band's middle and its half-width, both wandering along its length, and the
	// furthest either can reach — past that a cell is out before any noise is sampled
	const centreAt = t => (fbm1(t * G.wanderCells, seed + 51) - 0.5) * G.wander * half
	const halfAt = t => half * (1 + (fbm1(t * G.wanderCells + 9.4, seed + 53) - 0.5) * G.swell)
	const reach = half * (1 + (G.swell + G.wander) / 2)
	const stars = []
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const t = clamp01(((x - ax) * bx + (y - ay) * by) / (bx * bx + by * by))
			const rx = x - ax - t * bx
			const ry = y - ay - t * by
			// signed, so a side of the band can be the near one and the middle can wander
			const off = Math.hypot(rx, ry) * (ry * bx - rx * by < 0 ? -1 : 1)
			if (Math.abs(off) >= reach) continue
			const d = Math.abs(off - centreAt(t)) / halfAt(t)
			if (d >= 1) continue
			const wx = (fbm2(x / G.warpCells, y / G.warpCells, seed + 21) - 0.5) * G.warp
			const wy = (fbm2(x / G.warpCells + 7.3, y / G.warpCells, seed + 23) - 0.5) * G.warp
			const billow = fbm2((x + wx) / G.cloudCells, (y + wy) / G.cloudCells, seed)
			const wisp = fbm2((x + wx) / G.wispCells, (y + wy) / G.wispCells, seed + 41)
			const cloud = clamp01(
				((1 - G.wispMix) * billow + G.wispMix * wisp - G.cloudFloor) /
					(G.cloudCeil - G.cloudFloor)
			)
			// the mantle spans the band, the spine gathers its light — and the cloud
			// carries both: a profile with a floor of its own ends on an iso-contour,
			// the one ruled line a galaxy never has
			const mantle = 1 - d * d
			const spine = Math.max(0, 1 - (d / G.spineWidth) ** 2)
			const g = G.density * mantle * (G.base + (1 - G.base) * spine) * cloud
			let idx = seamIndex(clamp01(g), haze.length + 1, x, y, G.seam)
			if (fbm2(x / G.laneCells, y / G.laneCells, seed + 3) < G.laneBelow) {
				idx = Math.max(0, idx - G.laneCut)
			}
			if (idx > 0) put(x, y, haze[idx - 1])
			// stars gather where the haze is thick, and thicker still in clusters: a dense
			// faint tier of single cells, and a sparse bright tier drawn as small crosses
			const cluster = fbm2(x / G.clusterCells, y / G.clusterCells, seed + 31) > G.clusterAbove
			const weight = g * g * (cluster ? G.clusterGain : 1)
			const roll = hash2(x, y, seed + 7)
			if (roll < G.brightStars * weight) stars.push({ x, y, big: true })
			else if (roll < G.stars * weight) stars.push({ x, y, big: false })
		}
	}
	// tidy the clouds, then the glow and the stars go on — a star is meant to stand alone
	tidySprite(img, w, h, DEPARTURE_RIDGE.moon.tidyPasses)
	// The sun's glow, last onto whatever is still sky and after the tidy: it is the one
	// soft thing in the frame, a dithered falloff about a centre on the horizon off
	// frame left, and a tidy would gather its dither into flat blocks. Faint by design —
	// no air carries it.
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
	for (const star of stars) {
		const shade = hash2(star.x, star.y, seed + 9)
		if (!star.big) {
			put(star.x, star.y, faint[Math.floor(shade * faint.length)])
			continue
		}
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
		put(star.x, star.y, bright[Math.floor(shade * bright.length)])
	}
	ctx.putImageData(img, 0, 0)
	return { cols: w, rows: h, cell }
}
