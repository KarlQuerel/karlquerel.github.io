// The arrival's sky (PlanetEntry.vue): the dusk gradient cut on the ranges' grid, with the sun and its
// corona painted into it, for wherever the sun stands (js/sun.js).

import { ENTRY } from '../constants/journey.js'
import { PALETTE } from '../constants/palette.js'
import { clamp01 } from './math.js'
import { ditherThreshold, fallThreshold, fbm2, seamIndex } from './pixelNoise.js'
import { cellFor } from './ridge.js'

// The sky's grid: whole cells covering the frame, shown at exactly this many and never stretched to fit.
export function skyGrid(box) {
	const cell = cellFor(box)
	return {
		cell,
		w: Math.max(8, Math.ceil(box.w / cell)),
		h: Math.max(8, Math.ceil(box.h / cell)),
	}
}

// The skyline the sky sees, per sky column in sky rows: the highest rock across the ranges. A band
// stands `bleed` px past the frame on the left and under it, so its columns and rows sit shifted.
export function skylineOf(ranges, box) {
	const { cell, w } = skyGrid(box)
	const line = new Float32Array(w).fill(Infinity)
	for (const sprite of ranges) {
		if (!sprite) continue
		const top = (box.h + sprite.bleed) / cell - sprite.h
		for (let x = 0; x < w; x++) {
			const c = Math.round(x + sprite.bleed / cell)
			if (c >= 0 && c < sprite.w) line[x] = Math.min(line[x], top + sprite.tops[c])
		}
	}
	return line
}

// The sky's grain: the haze and mottle, the only part of it no sun can touch. Generating it is nearly
// all the cost, so it is cut once and kept, with each cell's own threshold for the night walk; the sky
// proper is placed back off it whenever the sun has moved enough to change where the light comes from.
// `skyline` is what cuts the rays once the disc is behind the ranges (skylineOf).
export function drawArrivalSky(el, box, sun, skyline) {
	const { cell, w, h } = skyGrid(box)
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
		cell,
		ramp,
		top,
		grain,
		thr,
		skyline,
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
		// the cells the last disc covered, or null once `base` has changed under the whole frame
		painted: null,
	}
	rebuildSky(sky, sun)
	paintSun(sky, sun)
	return sky
}

// One spoke of the sun's fan, by how far round the disc a cell sits (`nx, ny` the unit vector out of
// it). `cos(count·angle)` comes off the Chebyshev recurrence rather than an atan2 per cell — the same
// number for a fraction of the cost over a frame — and cosine being even is why the halves of the frame
// need no sign between them.
//
// Two of those run, on the same vector turned by different amounts. The first is the fan itself. The
// second is slower (`varyAt` spokes to the fan's `count`) and only ever takes strength away, so some
// spokes stand while their neighbours fade: an even fan is what reads as a cartoon sun. Turning the two
// at different rates is what makes the fan move like air rather than a wheel — the spokes keep pointing
// out of the disc, as light does, while which of them carry changes.
function spokeAt(nx, ny, R, spin, sway) {
	let spoke = chebyshev(nx * spin[0] + ny * spin[1], R.count)
	if (spoke <= 0) return 0
	const cur = spoke
	for (let k = 1; k < R.sharp; k++) spoke *= cur
	const slow = chebyshev(nx * sway[0] + ny * sway[1], R.varyAt)
	return spoke * (1 - R.vary + R.vary * (slow * 0.5 + 0.5))
}

// The skyline's bars across the fan, for a disc behind the ranges: along each ray out of it, the beam
// shows from where it first clears the rock to where it next meets some, and never past that — a
// peak shades everything behind it. Marched once per angle over the upper half-turn, so a cell is a
// lookup and not a march. Null without a skyline to cut by.
function barsOf({ w, skyline }, sx, sy, reach) {
	if (!skyline) return null
	const K = ENTRY.sun.rays.bars
	const from = new Float32Array(K)
	const to = new Float32Array(K).fill(Infinity)
	for (let k = 0; k < K; k++) {
		const a = (Math.PI * k) / (K - 1)
		const [dx, dy] = [Math.cos(a), -Math.sin(a)]
		let out = -1
		for (let r = 0; r <= reach; r++) {
			const px = Math.round(sx + dx * r)
			const rock = px >= 0 && px < w && sy + dy * r >= skyline[px]
			if (out < 0) {
				if (!rock) out = r
			} else if (rock) {
				to[k] = r
				break
			}
		}
		from[k] = out < 0 ? Infinity : out
	}
	return (rx, ry) => {
		// under the disc is behind the ranges anyway
		if (ry > 0) return 0
		const k = Math.round((Math.atan2(-ry, rx) / Math.PI) * (K - 1))
		const r = Math.sqrt(rx * rx + ry * ry)
		return r >= from[k] && r < to[k] ? 1 : 0
	}
}

// cos(n·angle) from cos(angle), by the recurrence — no trig in the per-cell path
function chebyshev(c, n) {
	let prev = 1
	let cur = c
	for (let k = 2; k <= n; k++) {
		const next = 2 * c * cur - prev
		prev = cur
		cur = next
	}
	return cur
}

// The sky proper for where the sun stands. Brightness is part altitude and part nearness to the disc:
// the authored gradient held the light at the horizon, which was right only while the sun lived there.
// This is the dear pass, so it runs only when the sun has moved; night walks the rungs it leaves.
function placeSky(sky, sun) {
	const { w, h, ramp, grain, step } = sky
	const top = ramp.length - 1
	const S = ENTRY.skyLight
	const R = ENTRY.sun.rays
	const [sx, sy] = [sun.x * w, sun.y * h]
	// The corona's reach, inside which the grain is smoothed away toward the disc (`coronaCalm`): the
	// halo is painted as whole rungs over this sky, so rings broken on the grain came out as blotches.
	const { r: discR, coronaR, coronaCalm } = ENTRY.sun
	const halo = discR * coronaR
	// The fan grows as the disc falls — a low sun has the air to scatter through — but keeps `floor`
	// of itself at the top of the arc, where the visitor arrives.
	const gain = R.floor + (1 - R.floor) * Math.sqrt(sun.low)
	// and once the disc is behind the ranges it reaches further, lifts more and is cut by the skyline:
	// the crepuscular rays of a sunset, eased in with the disc's going so the cut never snaps on
	const { horizon } = ENTRY.sun.circuit
	const set = (1 - sun.beam) * (1 - clamp01((sun.y - horizon) / R.setFade))
	const fanLift = (R.amp * gain) / top
	const beamLift = R.setAmp / top
	const reach = (R.reach + (R.setReach - R.reach) * set) * h
	const bars = set > 0 ? barsOf(sky, sx, sy, reach) : null
	const fade = R.keepTop * h
	// Two clocks, so the fan never repeats: the spokes swing with the disc across the frame, and which
	// of them carry drifts on the disc's fall, which runs on its own curve. One clock and the whole fan
	// turned as a wheel.
	const spinT = (sun.x - 0.5) * R.turn
	const swayT = (sun.y - 0.54) * R.sway
	const spin = [Math.cos(spinT), Math.sin(spinT)]
	const sway = [Math.cos(swayT), Math.sin(swayT)]
	for (let y = 0; y < h; y++) {
		// gamma keeps a band of light against the horizon; the rest of it gathers round the sun
		const alt = Math.pow(y / (h - 1), ENTRY.skyGamma)
		// what a ray keeps this high up the frame, where the stars hang
		const held = clamp01(y / fade)
		for (let x = 0; x < w; x++) {
			const i = y * w + x
			const dx = (x - sx) * S.wide
			const dy = Math.max(0, sy - y)
			const off = Math.sqrt(dx * dx + dy * dy) / (S.spread * h)
			const near = Math.pow(clamp01(1 - off), ENTRY.skyGamma)
			const calm =
				coronaCalm * clamp01(1 - (Math.hypot(x - sx, y - sy) - discR) / (halo - discR))
			let lit = alt * (1 - S.pull) + near * S.pull + grain[i] * (1 - calm)
			const [rx, ry] = [x - sx, y - sy]
			const d2 = rx * rx + ry * ry
			if (held > 0 && d2 > 0 && d2 < reach * reach) {
				const d = Math.sqrt(d2)
				const spoke = spokeAt(rx / d, ry / d, R, spin, sway)
				const fall = 1 - d / reach
				// The beams: broad light out through the notches, `setBase` of it even and the rest the
				// spokes' unevenness. The fan keeps its spokes, and loses them where the beams do, eased in
				// with `set` so the cut never snaps on.
				const open = bars ? bars(rx, ry) : 1
				lit +=
					held *
					fall *
					(spoke * fanLift * (1 - set * (1 - open)) +
						set * open * beamLift * (R.setBase + (1 - R.setBase) * spoke))
			}
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
	sky.painted = null
}

export function rebuildSky(sky, sun) {
	placeSky(sky, sun)
	darkenSky(sky, sun.night)
}

// Only the sun moves, and only inside its corona's reach, so the kept sky is copied back and just that
// disc is painted again — the cost no longer follows the size of the frame. `cx` keeps its fraction:
// the edge cells answer to it, so the sun crosses the grid instead of hopping it.
export function paintSun(sky, now) {
	const { el, w, h, ramp, top, base, dark, img } = sky
	const S = ENTRY.sun
	// The disc and its rim cool down their ramps as the sun comes down the sky, from the lower limb up,
	// the way air reddens a low sun from the horizon: a band `blend` radii tall between the tone they
	// wear and the next climbs through the disc as it sinks. As tall as the disc it is a shading; a
	// narrow seam read as a stripe across the sun.
	// One seam serves both, so both walk the same shares of the drop: the count comes from the longer
	// ramp and a shorter one holds its last tone. Counted off the disc alone, a disc of one tone left
	// the rim on its first shade all day and the sun never reddened at all.
	const heat = now.low * (Math.max(S.disc.length, S.rim.length) - 1)
	const warm = Math.floor(heat)
	const tone = (names, i) => PALETTE[names[Math.min(names.length - 1, i)]]
	const [discLo, discHi] = [tone(S.disc, warm), tone(S.disc, warm + 1)]
	const [rimLo, rimHi] = [tone(S.rim, warm), tone(S.rim, warm + 1)]
	// both from the sun as it stands, never from the constant: the disc has to sway with its sky
	const [cx, cy] = [now.x * w, now.y * h]
	// the band starts wholly under the disc and ends wholly over it, so neither tone ever snaps
	const band = S.blend * S.r
	const seamY = cy + S.r + band / 2 - (heat - warm) * (2 * S.r + band)
	// refraction squashes the disc and its rim toward the skyline; the glare round them stays round
	const squash = 1 - S.flatten * now.low
	const reach = S.r * S.coronaR
	const px = img.data
	const disc = {
		x0: Math.max(0, Math.ceil(cx - reach)),
		y0: Math.max(0, Math.ceil(cy - reach)),
		x1: Math.min(w - 1, Math.floor(cx + reach)),
		y1: Math.min(h - 1, Math.floor(cy + reach)),
	}
	const last = sky.painted
	if (last) restore(sky, last)
	else px.set(base)
	for (let y = disc.y0; y <= disc.y1; y++) {
		for (let x = disc.x0; x <= disc.x1; x++) {
			const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
			if (d > reach) continue
			const i = y * w + x
			let col
			// on an ordered dither, so the disc's gradient reads as shading and not as a dot screen
			const cooler = (y - seamY) / band + 0.5 > ditherThreshold(x, y)
			const dd = Math.sqrt((x - cx) ** 2 + ((y - cy) / squash) ** 2)
			if (dd <= S.r) col = cooler ? discHi : discLo
			else if (dd <= S.r + 1.5) col = cooler ? rimHi : rimLo
			else {
				// the corona climbs the sky's own ramp rather than adding light, so every pixel is a palette entry
				const g =
					clamp01(1 - (d - S.r) / (reach - S.r)) *
					now.light *
					(1 - S.coronaFade * now.low)
				// Dithered across the whole gap between rungs (`coronaSeam`), so the glare is one gradient and
				// not rings. A flat ring was where a global fade flipped a Bayer level all at once, which is
				// why this once took the cell's own threshold; a gradient has no flat to flip.
				const v = g * g * (S.coronaLift - 1)
				const f = v % 1
				const up =
					Math.abs(f - 0.5) <= S.coronaSeam
						? (f - 0.5 + S.coronaSeam) / (2 * S.coronaSeam) >
							ditherThreshold(x, y, S.coronaJitter)
						: f >= 0.5
				const step = dark[i] + Math.floor(v) + (up ? 1 : 0)
				col = ramp[step > top ? top : step]
			}
			px[i * 4] = col[0]
			px[i * 4 + 1] = col[1]
			px[i * 4 + 2] = col[2]
		}
	}
	sky.atX = cx
	sky.atY = cy
	sky.painted = disc
	const ctx = el.getContext('2d')
	if (!last) {
		ctx.putImageData(img, 0, 0)
		return
	}
	// only the old disc and the new one changed on the canvas
	const x0 = Math.min(last.x0, disc.x0)
	const y0 = Math.min(last.y0, disc.y0)
	ctx.putImageData(
		img,
		0,
		0,
		x0,
		y0,
		Math.max(last.x1, disc.x1) - x0 + 1,
		Math.max(last.y1, disc.y1) - y0 + 1
	)
}

// Copies the kept sky back over one rect of the frame, row by row.
function restore({ w, base, img }, { x0, y0, x1, y1 }) {
	for (let y = y0; y <= y1; y++) {
		img.data.set(base.subarray((y * w + x0) * 4, (y * w + x1 + 1) * 4), (y * w + x0) * 4)
	}
}
