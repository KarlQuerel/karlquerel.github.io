// Hard-edged drawing into an RGBA layer by palette name: no antialiasing, so every pixel is a palette
// colour or empty. The flat-layer shots paint their silhouettes with these.

import { PALETTE } from '../../constants/palette.js'

export const createLayer = (w, h) => ({ w, h, data: new Uint8ClampedArray(w * h * 4) })

export function put(L, x, y, name) {
	x = Math.round(x)
	y = Math.round(y)
	if (x < 0 || y < 0 || x >= L.w || y >= L.h) return
	const [r, g, b] = PALETTE[name]
	L.data.set([r, g, b, 255], (y * L.w + x) * 4)
}

export const filled = (L, x, y) =>
	x >= 0 && y >= 0 && x < L.w && y < L.h && L.data[(y * L.w + x) * 4 + 3] > 0

export function rect(L, x0, y0, x1, y1, name) {
	for (let y = Math.round(y0); y < Math.round(y1); y++)
		for (let x = Math.round(x0); x < Math.round(x1); x++) put(L, x, y, name)
}

// a line with a square brush `width` cells wide
export function line(L, x0, y0, x1, y1, width, name) {
	const steps = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))))
	const r = Math.max(0, width - 1) / 2
	for (let s = 0; s <= steps; s++) {
		const x = x0 + ((x1 - x0) * s) / steps
		const y = y0 + ((y1 - y0) * s) / steps
		for (let dy = -r; dy <= r; dy++)
			for (let dx = -r; dx <= r; dx++) put(L, x + dx, y + dy, name)
	}
}

export function tri(L, [ax, ay], [bx, by], [cx, cy], name) {
	const side = (px, py, x0, y0, x1, y1) => (x1 - x0) * (py - y0) - (y1 - y0) * (px - x0)
	const area = side(cx, cy, ax, ay, bx, by)
	for (let y = Math.floor(Math.min(ay, by, cy)); y <= Math.ceil(Math.max(ay, by, cy)); y++)
		for (let x = Math.floor(Math.min(ax, bx, cx)); x <= Math.ceil(Math.max(ax, bx, cx)); x++) {
			const px = x + 0.5
			const py = y + 0.5
			const a = side(px, py, bx, by, cx, cy) * area
			const b = side(px, py, cx, cy, ax, ay) * area
			const c = side(px, py, ax, ay, bx, by) * area
			if (a >= 0 && b >= 0 && c >= 0) put(L, x, y, name)
		}
}

export function disc(L, cx, cy, r, name) {
	for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
		for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++)
			if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r) put(L, x, y, name)
}

// Backlight: every filled cell whose neighbour toward the light is empty takes the rim colour.
// `toward(x, y)` names that neighbour as a cell offset.
export function rimLight(L, toward, name) {
	const rims = []
	for (let y = 0; y < L.h; y++)
		for (let x = 0; x < L.w; x++) {
			if (!filled(L, x, y)) continue
			const [dx, dy] = toward(x, y)
			if (!filled(L, x + dx, y) || !filled(L, x, y + dy)) rims.push([x, y])
		}
	for (const [x, y] of rims) put(L, x, y, name)
}
