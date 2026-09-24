// The arrival's procedural sprites (PlanetEntry.vue): cloud puffs, star tiles and the bird sheet.

import { ENTRY } from '../constants/journey.js'
import { PALETTE, paletteRgb } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { ditherIndex, fbm1, fbm2, hash1 } from './pixelNoise.js'

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

// One tile of first-evening stars; two at coprime sizes are what stop the field reading as wallpaper.
export function drawStarTile(seed, layer) {
	const { tile, count } = layer
	const { alpha, doubleAbove } = ENTRY.stars
	const colors = ENTRY.stars.colors.map(paletteRgb)
	const { el, ctx } = sheet(tile, tile)
	for (let i = 0; i < count; i++) {
		const x = Math.floor(hash1(i, seed) * tile)
		const y = Math.floor(hash1(i, seed + 101) * tile)
		const pick = hash1(i, seed + 202)
		const bright = hash1(i, seed + 303)
		ctx.globalAlpha = alpha.from + bright * alpha.run
		ctx.fillStyle = colors[Math.floor(pick * colors.length)]
		const size = bright > doubleAbove ? 2 : 1
		ctx.fillRect(x, y, size, size)
	}
	return el.toDataURL()
}
