// A gull built in the air and drawn from wherever the viewer stands (EntrySkyLife.vue): all wing, as
// a gull is from below, each an inner panel beating about the shoulder and an outer panel flexing at
// the wrist, joined by a short core of body. Turned to the viewer's yaw, tipped to their elevation
// and projected flat onto the sprite's cells, so a gull turns as it crosses the sky, shows its near
// wing over its far one, and shortens as it comes at you or goes away. One tone: a silhouette at
// dusk. Arithmetic on `spec` (ENTRY.bird) all the way to the sheet, so a harness can draw it too.

import { paletteRgb } from '../constants/palette.js'

const RAD = Math.PI / 180

// The model's shapes for one beat `phase` (0 wings high, 0.5 low), or the glide when null. The hand
// lags under the inner wing on the way up and sweeps back with it; in the glide it droops a little.
function gullShapes(spec, phase) {
	const { wing, flap, glide } = spec
	const still = phase === null
	const lift = (still ? glide.lift : flap.lift * Math.cos(2 * Math.PI * phase)) * RAD
	const flex = still
		? glide.droop * RAD
		: flap.flex * Math.max(0, -Math.sin(2 * Math.PI * phase)) * RAD
	const sweep = still ? 0 : (flap.sweepBack * flex) / (flap.flex * RAD)
	const polys = []
	const lines = []
	for (const side of [-1, 1]) {
		const S = [wing.shoulder[0], wing.shoulder[1], side * wing.shoulder[2]]
		const out = (x, r, angle) => [
			S[0] + x,
			S[1] + r * Math.sin(angle),
			S[2] + side * r * Math.cos(angle),
		]
		const shoulderTE = [S[0] - wing.chord, S[1], S[2]]
		const wristLE = out(-0.2, wing.inner, lift)
		const wristTE = out(-wing.chord * 0.75, wing.inner - 0.2, lift)
		const hand = lift - flex
		const tip = [
			wristLE[0] - wing.tipBack - sweep,
			wristLE[1] + wing.outer * Math.sin(hand),
			wristLE[2] + side * wing.outer * Math.cos(hand),
		]
		polys.push([S, wristLE, wristTE, shoulderTE], [wristLE, tip, wristTE])
		// the edges drawn as lines too: a panel thinner than a cell would otherwise fall through
		lines.push([S, wristLE], [wristLE, tip], [shoulderTE, wristTE], [wristTE, tip])
	}
	return { polys, lines }
}

// The viewer's turn of the model: yaw `theta` from the bird's forward to the viewer, then its
// elevation `alpha` under the bird. Rows are screen right, screen up, toward the viewer.
function viewer(thetaDeg, alphaDeg) {
	const f = (thetaDeg - 90) * RAD
	const p = -alphaDeg * RAD
	const [cf, sf, cp, sp] = [Math.cos(f), Math.sin(f), Math.cos(p), Math.sin(p)]
	return [
		[cf, 0, sf],
		[sp * sf, cp, -sp * cf],
		[-cp * sf, sp, cp * cf],
	]
}

const apply = (R, [x, y, z]) => R.map(row => row[0] * x + row[1] * y + row[2] * z)

// One sprite: the cells a gull covers seen from `theta` and `alpha`, mid-beat or gliding.
export function gullCells(spec, thetaDeg, alphaDeg, phase) {
	const { w, h, body } = spec
	const cells = new Uint8Array(w * h)
	const R = viewer(thetaDeg, alphaDeg)
	const cx = w / 2
	const cy = h / 2
	const put = (col, row) => {
		if (col >= 0 && row >= 0 && col < w && row < h) cells[row * w + col] = 1
	}
	const flat = v => {
		const [u, up] = apply(R, v)
		return [cx + u, cy - up]
	}
	// the core: an ellipsoid's shadow is the ellipse of its turned covariance
	const D = [body.len ** 2, body.girth ** 2, body.girth ** 2]
	const muu = D[0] * R[0][0] ** 2 + D[1] * R[0][1] ** 2 + D[2] * R[0][2] ** 2
	const mvv = D[0] * R[1][0] ** 2 + D[1] * R[1][1] ** 2 + D[2] * R[1][2] ** 2
	const muv = D[0] * R[0][0] * R[1][0] + D[1] * R[0][1] * R[1][1] + D[2] * R[0][2] * R[1][2]
	const det = muu * mvv - muv * muv
	for (let row = 0; row < h; row++) {
		for (let col = 0; col < w; col++) {
			const du = col + 0.5 - cx
			const dv = -(row + 0.5 - cy)
			if ((mvv * du * du - 2 * muv * du * dv + muu * dv * dv) / det <= 1) put(col, row)
		}
	}
	const { polys, lines } = gullShapes(spec, phase)
	for (const poly of polys) {
		const pts = poly.map(flat)
		const cols = pts.map(p => p[0])
		const rows = pts.map(p => p[1])
		for (let row = Math.floor(Math.min(...rows)); row <= Math.ceil(Math.max(...rows)); row++) {
			for (
				let col = Math.floor(Math.min(...cols));
				col <= Math.ceil(Math.max(...cols));
				col++
			) {
				// even-odd: the cell's centre inside the panel's outline
				const px = col + 0.5
				const py = row + 0.5
				let inside = false
				for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
					const [xi, yi] = pts[i]
					const [xj, yj] = pts[j]
					if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)
						inside = !inside
				}
				if (inside) put(col, row)
			}
		}
	}
	for (const [a, b] of lines) {
		const [ax, ay] = flat(a)
		const [bx, by] = flat(b)
		const steps = Math.ceil(Math.hypot(bx - ax, by - ay) * 2) || 1
		for (let s = 0; s <= steps; s++) {
			const t = s / steps
			put(Math.floor(ax + (bx - ax) * t), Math.floor(ay + (by - ay) * t))
		}
	}
	return cells
}

// the yaws a sheet holds, from the viewer nearly ahead to nearly behind; the other side is a mirror
export const yawBins = spec =>
	Array.from(
		{ length: Math.round((spec.yaw.to - spec.yaw.from) / spec.yaw.step) + 1 },
		(_, i) => spec.yaw.from + i * spec.yaw.step
	)

// which sprite of the sheet: the nearest yaw's beat `phase` (an index), or its glide when null
export function gullFrame(spec, thetaDeg, phase) {
	const bins = yawBins(spec)
	const at = Math.round((Math.abs(thetaDeg) - spec.yaw.from) / spec.yaw.step)
	const bin = Math.max(0, Math.min(bins.length - 1, at))
	return bin * (spec.flap.phases + 1) + (phase === null ? spec.flap.phases : phase)
}

// One sheet, every yaw's beat and glide side by side, in `colour`, seen `alphaDeg` from under it.
export function drawGullSheet(spec, colour, alphaDeg) {
	const { w, h } = spec
	const bins = yawBins(spec)
	const per = spec.flap.phases + 1
	const el = document.createElement('canvas')
	el.width = w * bins.length * per
	el.height = h
	const ctx = el.getContext('2d')
	ctx.fillStyle = paletteRgb(colour)
	bins.forEach((theta, b) => {
		for (let p = 0; p < per; p++) {
			const cells = gullCells(
				spec,
				theta,
				alphaDeg,
				p < spec.flap.phases ? p / spec.flap.phases : null
			)
			const left = (b * per + p) * w
			for (let i = 0; i < cells.length; i++) {
				if (cells[i]) ctx.fillRect(left + (i % w), Math.floor(i / w), 1, 1)
			}
		}
	})
	return el.toDataURL()
}
