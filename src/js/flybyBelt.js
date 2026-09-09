// The belt: the field of rock the flight threads on its way in to the destination.

import { camAt } from './flybyPath.js'
import { add, cross, mul, norm } from './vec3.js'
import {
	BELT_FAMILIES,
	BELT_FLATTEN,
	BELT_RADIUS_MAX,
	BELT_RADIUS_MIN,
	BELT_SEED,
	BELT_Z_NEAR,
	BELT_Z_SPAN,
	RING_NORMAL,
} from '../constants/flyby.js'

// The corridor, keyed on depth. Path z is monotone, so a coarse table and a lerp invert it.
const SAMPLES = 240
const TRACK = Array.from({ length: SAMPLES + 1 }, (_, i) => camAt(i / SAMPLES))

function corridorAt(z) {
	// TRACK runs front to back, so z decreases along it
	let i = 0
	while (i < SAMPLES - 1 && TRACK[i + 1][2] > z) i++
	const a = TRACK[i]
	const b = TRACK[i + 1]
	const t = Math.min(1, Math.max(0, (a[2] - z) / (a[2] - b[2] || 1)))
	return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// A smaller `count` takes a prefix of the same field, so a phone gets a thinner belt, not another one.
export function buildBelt(count) {
	const arr = new Float32Array(count * 4)
	let seed = BELT_SEED
	const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296

	// Nothing may sit nearer the centre line than the floor, however it got there.
	const clearHull = p => {
		const [cx, cy] = corridorAt(p[2])
		const dx = p[0] - cx
		const dy = p[1] - cy
		const d = Math.hypot(dx, dy)
		if (d >= BELT_RADIUS_MIN) return p
		if (d < 1e-3) return [cx + BELT_RADIUS_MIN, cy, p[2]]
		const k = BELT_RADIUS_MIN / d
		return [cx + dx * k, cy + dy * k, p[2]]
	}

	// Ring the corridor clear of the hull, flattened along the system plane's normal so it crosses at its tilt.
	const inPlane = norm(cross(RING_NORMAL, [0, 0, 1]))
	const place = z => {
		const [cx, cy] = corridorAt(z)
		const r = BELT_RADIUS_MIN + rnd() * rnd() * (BELT_RADIUS_MAX - BELT_RADIUS_MIN)
		const th = rnd() * Math.PI * 2
		const off = add(
			mul(inPlane, Math.cos(th) * r),
			mul(RING_NORMAL, Math.sin(th) * r * BELT_FLATTEN)
		)
		return [cx + off[0], cy + off[1], z + off[2]]
	}

	// Families: most of a real belt is one break-up travelling together, and independent scatter reads as confetti.
	const fam = []
	for (let k = 0; k < BELT_FAMILIES; k++) fam.push(place(-(BELT_Z_NEAR + rnd() * BELT_Z_SPAN)))

	for (let i = 0; i < count; i++) {
		let p
		if (rnd() < 0.72) {
			const f = fam[(rnd() * BELT_FAMILIES) | 0]
			const w = 5 + rnd() * 16
			p = [
				f[0] + (rnd() * 2 - 1) * w,
				f[1] + (rnd() * 2 - 1) * w * 0.5,
				f[2] + (rnd() * 2 - 1) * w * 1.6,
			]
		} else {
			p = place(-(BELT_Z_NEAR + rnd() * BELT_Z_SPAN))
		}
		// Sizes on a cube law: a belt is almost all gravel with the occasional real body in it.
		const u = rnd()
		const q = clearHull(p)
		arr.set([q[0], q[1], q[2], 0.09 + u * u * u * 0.62], i * 4)
	}
	return arr
}
