// The arrival's sky (PlanetEntry.vue): the dusk gradient cut on the ranges' grid, with the sun and its
// corona painted into it, for wherever the sun stands (js/sun.js).

import { ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { ditherIndex, fallThreshold, fbm2, seamIndex } from './pixelNoise.js'
import { cellFor } from './ridge.js'

// The sky's grain: the haze and mottle, the only part of it no sun can touch. Generating it is nearly
// all the cost, so it is cut once and kept, with each cell's own threshold for the night walk; the sky
// proper is placed back off it whenever the sun has moved enough to change where the light comes from.
export function drawSky(el, box, sun) {
	const cell = cellFor(box)
	const w = Math.max(8, Math.round(box.w / cell))
	const h = Math.max(8, Math.round(box.h / cell))
	el.width = w
	el.height = h
	const ramp = ENTRY.sky.map(name => PALETTE[name])
	const top = ramp.length - 1
	// one rung of the ramp, the unit the sky's two fields are sized in
	const F = ENTRY.skyField
	const rung1 = 1 / top
	const grain = new Float32Array(w * h)
	const thr = new Float32Array(w * h)
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++) {
			// Haze at altitude plus grain, both in ramp steps, so the bands stop being level sets.
			grain[y * w + x] =
				(fbm2(x / F.driftCells, y / F.driftRows, ENTRY.ridgeSeed) - 0.5) * F.drift * rung1 +
				(fbm2(x / F.mottleCells, y / F.mottleCells, ENTRY.ridgeSeed + 3) - 0.5) *
					F.mottle *
					rung1
			thr[y * w + x] = fallThreshold(x, y)
		}
	const sky = {
		el,
		w,
		h,
		ramp,
		top,
		grain,
		thr,
		// the rung each cell reaches in daylight, and the one it stands on once night has walked it down
		step: new Uint8Array(w * h),
		dark: new Uint8Array(w * h),
		base: new Uint8ClampedArray(w * h * 4),
		img: el.getContext('2d').createImageData(w, h),
		// where the disc was last painted and the sky last placed for (cells), and the night it was darkened to
		atX: 0,
		atY: 0,
		litX: 0,
		litY: 0,
		night: -1,
	}
	rebuildSky(sky, sun)
	paintSun(sky, sun)
	return sky
}

// The sky proper for where the sun stands. Brightness is part altitude and part nearness to the disc:
// the authored gradient held the light at the horizon, which was right only while the sun lived there.
// This is the dear pass, so it runs only when the sun has moved; night walks the rungs it leaves.
export function placeSky(sky, sun) {
	const { w, h, ramp, grain, step } = sky
	const top = ramp.length - 1
	const S = ENTRY.skyLight
	const [sx, sy] = [sun.x * w, sun.y * h]
	for (let y = 0; y < h; y++) {
		// gamma keeps a band of light against the horizon; the rest of it gathers round the sun
		const alt = Math.pow(y / (h - 1), ENTRY.skyGamma)
		for (let x = 0; x < w; x++) {
			const i = y * w + x
			const dx = (x - sx) * S.wide
			const dy = Math.max(0, sy - y)
			const off = Math.sqrt(dx * dx + dy * dy) / (S.spread * h)
			const near = Math.pow(clamp01(1 - off), ENTRY.skyGamma)
			const lit = alt * (1 - S.pull) + near * S.pull + grain[i]
			step[i] = Math.min(
				top,
				seamIndex(lit, ramp.length, x, y, ENTRY.skySeam, ENTRY.skyJitter)
			)
		}
	}
	sky.litX = sx
	sky.litY = sy
}

// Night over the placed sky: every cell walks `night` rungs down, the part rung on its own threshold,
// so this is a compare and a table read per cell and can run nearly every frame. `dark` keeps the rung
// each cell landed on, because the corona climbs from it — read an undarkened rung and the halo stays
// daylit.
export function darkenSky(sky, night) {
	const { w, h, ramp, step, thr, base, dark } = sky
	const whole = Math.floor(night)
	const frac = night - whole
	for (let i = 0; i < w * h; i++) {
		dark[i] = Math.max(0, step[i] - whole - (frac > thr[i] ? 1 : 0))
		// written a byte at a time: spreading the colour into a fresh array here costs one allocation
		// per cell, which at a large frame is most of the pass
		const col = ramp[dark[i]]
		const at = i * 4
		base[at] = col[0]
		base[at + 1] = col[1]
		base[at + 2] = col[2]
		base[at + 3] = 255
	}
	sky.night = night
}

export function rebuildSky(sky, sun) {
	placeSky(sky, sun)
	darkenSky(sky, sun.night)
}

// Only the sun moves, and only inside its corona's reach, so the kept sky is copied back and just that
// disc is painted again — the cost no longer follows the size of the frame. `cx` keeps its fraction:
// the edge cells answer to it, so the sun crosses the grid instead of hopping it.
export function paintSun(sky, now) {
	const { el, w, h, ramp, top, thr, base, dark, img } = sky
	const S = ENTRY.sun
	// The disc and its rim cool down their ramps as the sun comes down the sky, from the lower limb up,
	// the way air reddens a low sun from the horizon: a band `blend` radii tall between the tone they
	// wear and the next climbs through the disc as it sinks. As tall as the disc it is a shading; a
	// narrow seam read as a stripe across the sun.
	const heat = now.low * (S.disc.length - 1)
	const warm = Math.floor(heat)
	const up = Math.min(S.disc.length - 1, warm + 1)
	const [discLo, discHi] = [PALETTE[S.disc[warm]], PALETTE[S.disc[up]]]
	const [rimLo, rimHi] = [PALETTE[S.rim[warm]], PALETTE[S.rim[up]]]
	// both from the sun as it stands, never from the constant: the disc has to sway with its sky
	const [cx, cy] = [now.x * w, now.y * h]
	// the band starts wholly under the disc and ends wholly over it, so neither tone ever snaps
	const band = S.blend * S.r
	const seamY = cy + S.r + band / 2 - (heat - warm) * (2 * S.r + band)
	const reach = S.r * S.coronaR
	const px = img.data
	px.set(base)
	for (let y = Math.max(0, Math.ceil(cy - reach)); y <= Math.min(h - 1, cy + reach); y++) {
		for (let x = Math.max(0, Math.ceil(cx - reach)); x <= Math.min(w - 1, cx + reach); x++) {
			const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
			if (d > reach) continue
			const i = y * w + x
			let col
			const cooler = (y - seamY) / band + 0.5 > thr[i]
			if (d <= S.r) col = cooler ? discHi : discLo
			else if (d <= S.r + 1.5) col = cooler ? rimHi : rimLo
			else {
				// the corona climbs the sky's own ramp rather than adding light, so every pixel is a palette entry
				const g =
					clamp01(1 - (d - S.r) / (reach - S.r)) *
					now.light *
					(1 - S.coronaFade * now.low)
				const step = dark[i] + ditherIndex(g * g, S.coronaLift, x, y)
				col = ramp[step > top ? top : step]
			}
			px[i * 4] = col[0]
			px[i * 4 + 1] = col[1]
			px[i * 4 + 2] = col[2]
		}
	}
	sky.atX = cx
	sky.atY = cy
	el.getContext('2d').putImageData(img, 0, 0)
}
