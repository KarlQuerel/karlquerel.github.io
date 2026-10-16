// The arrival's procedural sprites (PlanetEntry.vue): cloud puffs, star tiles, the bird sheet and the
// chimney's smoke.

import { ENTRY } from '../constants/journey.js'
import { PALETTE, paletteRgb } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { ditherIndex, fbm1, fbm2, hash1, hash2 } from './pixelNoise.js'

function sheet(w, h) {
	const el = document.createElement('canvas')
	el.width = w
	el.height = h
	return { el, ctx: el.getContext('2d') }
}

// One sheet, frames side by side, walked by background-position. A silhouette needs no shading.
export function drawBirdSheet() {
	const b = ENTRY.bird
	const { el, ctx } = sheet(b.w * b.frames.length, b.h)
	ctx.fillStyle = paletteRgb(b.colour)
	b.frames.forEach((rows, f) => {
		rows.forEach((row, y) => {
			for (let x = 0; x < row.length; x++) {
				if (row[x] === '#') ctx.fillRect(f * b.w + x, y, 1, 1)
			}
		})
	})
	return el.toDataURL()
}

// Lanes advance by the golden ratio from a seeded phase: no two consecutive puffs share a lane.
export function seedClouds(seed) {
	const c = ENTRY.cloudStream
	const phase = hash1(1, seed + 7)
	return Array.from({ length: c.count }, (_, i) => ({
		left: c.leftMin + ((phase + i * c.laneStep) % 1) * (c.leftMax - c.leftMin),
		scale:
			(c.scaleFrom + (c.scaleTo - c.scaleFrom) * (i / (c.count - 1))) *
			(1 + (hash1(i, seed + 19) - 0.5) * c.scaleJitter),
		start: c.startAt + i * c.stagger + (hash1(i, seed + 31) - 0.5) * c.startJitter,
	}))
}

// Placed off the visit seed, kept inside the band of sky the star mask actually shows.
export function seedTwinklers(seed) {
	const { count, periodMs, spreadVh } = ENTRY.stars.twinkle
	const hues = ENTRY.stars.colors
	return Array.from({ length: count }, (_, i) => {
		const pick = Math.min(hues.length - 1, Math.floor(hash1(i, seed + 37) * hues.length))
		return {
			left: hash1(i, seed + 11) * 100,
			top: hash1(i, seed + 23) * spreadVh,
			colour: paletteRgb(hues[pick]),
			delay: hash1(i, seed + 53) * periodMs,
		}
	})
}

// A cumulus as lobes with a noise-warped boundary: lobes alone scallop, noise alone drifts.
export function drawCloud(seed) {
	const cfg = ENTRY.cloud
	const { spriteW: w, spriteH: h } = cfg
	const { el, ctx } = sheet(w, h)
	const img = ctx.createImageData(w, h)
	const cleaned = despeckle(cloudMask(seed, w, h), w, h, cfg.minNeighbours)
	shadeCloud(img.data, cleaned, w, h)
	ctx.putImageData(img, 0, 0)
	return el.toDataURL()
}

// 1 inside the puff, dithered across its feathered edge.
function cloudMask(seed, w, h) {
	const cfg = ENTRY.cloud
	const span = ([lo, hi], r) => lo + (hi - lo) * r
	const { lobeSpan, lobeLift, lobeGrow } = cfg
	// lobes sit along the base, biggest toward the middle
	const lobes = Array.from({ length: cfg.lobes }, (_, k) => {
		const centre = 1 - Math.abs((k + 0.5) / cfg.lobes - 0.5) * 2
		return {
			cx:
				lobeSpan.from +
				lobeSpan.run * ((k + 0.5) / cfg.lobes) +
				(hash1(k, seed) - 0.5) * cfg.lobeJitter,
			cy: cfg.baseAt - span(cfg.lobeRise, hash1(k, seed + 11)) * (lobeLift + centre),
			rx: span(cfg.lobeRx, hash1(k, seed + 23)) * (lobeGrow + lobeGrow * centre),
			ry: span(cfg.lobeRy, hash1(k, seed + 37)) * (lobeGrow + lobeGrow * centre),
		}
	})
	const mask = new Uint8Array(w * h)
	for (let y = 0; y < h; y++) {
		const t = y / (h - 1)
		for (let x = 0; x < w; x++) {
			const u = x / (w - 1)
			let d = -1
			for (const l of lobes) {
				const dx = (u - l.cx) / l.rx
				const dy = (t - l.cy) / l.ry
				d = Math.max(d, 1 - Math.hypot(dx, dy))
			}
			d += (fbm2(u * cfg.warpFreq, t * cfg.warpFreq, seed) - 0.5) * cfg.warp
			// flat cumulus underside, ruffled just enough to not be a ruler line
			const base =
				cfg.baseAt + (fbm1(u * cfg.baseRuffleFreq, seed + 61) - 0.5) * cfg.baseRuffle
			if (t > base) d -= (t - base) * cfg.baseCut
			const i = y * w + x
			if (d > 0) mask[i] = 1
			else if (d > -cfg.feather) mask[i] = ditherIndex(1 + d / cfg.feather, 2, x, y)
		}
	}
	return mask
}

// The dithered edge strands lone pixels that read as dirt.
function despeckle(mask, w, h, minNeighbours) {
	const solidAt = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : mask[y * w + x])
	const cleaned = Uint8Array.from(mask)
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			if (!mask[y * w + x]) continue
			let n = 0
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) if (dx || dy) n += solidAt(x + dx, y + dy)
			}
			if (n < minNeighbours) cleaned[y * w + x] = 0
		}
	}
	return cleaned
}

// Light dies under each lobe separately: depth is counted below this column's own crown.
function shadeCloud(px, cleaned, w, h) {
	const cfg = ENTRY.cloud
	const shades = cfg.shades.map(name => PALETTE[name])
	for (let x = 0; x < w; x++) {
		const u = x / (w - 1)
		let depth = -1
		for (let y = 0; y < h; y++) {
			if (!cleaned[y * w + x]) {
				depth = -1
				continue
			}
			depth = depth < 0 ? 0 : depth + 1
			const crown = clamp01(1 - depth / cfg.shadeDepth)
			const side = 0.5 + (0.5 - u) * cfg.sideLight * -ENTRY.ridgeLight
			const lit = clamp01(crown * cfg.crownShare + side * cfg.sideShare)
			const [r, g, b] = shades[ditherIndex(lit, shades.length, x, y)]
			const i = (y * w + x) * 4
			px[i] = r
			px[i + 1] = g
			px[i + 2] = b
			px[i + 3] = 255
		}
	}
}

// One tile of first-evening stars on the ranges' grid, `cell` px a cell; two tiles at coprime sizes
// are what stop the field reading as wallpaper. The brightest are a cross, a cell each way.
export function drawStarTile(seed, layer, cell) {
	const { cells, count } = layer
	const { alpha, crossAbove } = ENTRY.stars
	const colors = ENTRY.stars.colors.map(paletteRgb)
	const { el, ctx } = sheet(cells * cell, cells * cell)
	const put = (x, y) =>
		ctx.fillRect(((x + cells) % cells) * cell, ((y + cells) % cells) * cell, cell, cell)
	for (let i = 0; i < count; i++) {
		const x = Math.floor(hash1(i, seed) * cells)
		const y = Math.floor(hash1(i, seed + 101) * cells)
		const pick = hash1(i, seed + 202)
		const bright = hash1(i, seed + 303)
		ctx.globalAlpha = alpha.from + bright * alpha.run
		ctx.fillStyle = colors[Math.floor(pick * colors.length)]
		put(x, y)
		if (bright > crossAbove) {
			put(x - 1, y)
			put(x + 1, y)
			put(x, y - 1)
			put(x, y + 1)
		}
	}
	return el.toDataURL()
}

// A smoke puff's life as a sheet of frames, one per cell of width from `cellsFrom` to `cellsTo`, each
// a rounded blob standing on the floor of a `cellsTo` box: the side toward the sun and the top lit,
// the far side and the underside in shade, and the grown frames thinned cell by cell on a hash — in
// Bayer order the thinning came out as a ladder, not as smoke coming apart.
// `side` is -1 for a sun on the left, 1 on the right; `shades` runs lit, body, shade.
export function drawPuff(shades, side) {
	const { cellsFrom: from, cellsTo: to, thin } = ENTRY.smoke
	const frames = to - from + 1
	const { el, ctx } = sheet(frames * to, to)
	const [lit, body, shade] = shades.map(name => paletteRgb(name))
	// a cell at `r` of the blob's radius or further out is a corner; inside `ragged`, some are cut by noise
	const ROUND = 0.85
	const RAGGED = 0.55
	for (let f = 0; f < frames; f++) {
		const s = from + f
		const r = s / 2
		const left = f * to + Math.floor((to - s) / 2)
		const top = to - s
		const keep = 1 - thin * (f / (frames - 1)) ** 2
		for (let y = 0; y < s; y++) {
			for (let x = 0; x < s; x++) {
				const dx = (x + 0.5 - r) / r
				const dy = (y + 0.5 - r) / r
				const d2 = dx * dx + dy * dy
				if (d2 > ROUND || (d2 > RAGGED && hash2(x, y, f + 7) > 0.75)) continue
				if (hash2(x, y, f + 31) >= keep) continue
				const toward = side * dx - dy
				ctx.fillStyle = toward > 0.5 ? lit : toward < -0.5 ? shade : body
				ctx.fillRect(left + x, top + y, 1, 1)
			}
		}
	}
	return el.toDataURL()
}
