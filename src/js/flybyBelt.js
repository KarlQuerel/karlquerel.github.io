// The belt: the field of rock the flight threads on its way in to the destination.
//
// It used to be scattered across the system's own plane, which sounds right and looked
// like nothing: that plane climbs as the corridor drops, so by z=-150 it sits fifteen
// units above the flight and the whole field was out of frame above the camera for the
// entire approach. A belt nobody flies through is set dressing for a shot we never take.
// So it is scattered around the corridor's own centre line instead - still flattened, so
// it reads as a belt rather than a tube, but centred on where the camera actually goes.

import { camAt } from './flybyPath.js'
import {
	BELT_FAMILIES,
	BELT_FLATTEN,
	BELT_RADIUS_MAX,
	BELT_RADIUS_MIN,
	BELT_SEED,
	BELT_Z_NEAR,
	BELT_Z_SPAN,
} from '../constants/flyby.js'

// The corridor, keyed on depth. Path z is monotone, so a coarse table and a lerp invert
// it accurately enough to hang a rock field off.
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

// A smaller `count` takes a prefix of the same field, so a phone gets a thinner belt
// made of the same rocks rather than a different one.
export function buildBelt(count) {
	const arr = new Float32Array(count * 4)
	let seed = BELT_SEED
	const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296

	// Nothing may sit nearer the centre line than the floor, however it got there. The
	// family jitter below scatters members up to sixteen units off their family, which is
	// easily enough to drop one back onto the flight line - so every rock is pushed out
	// radially at the end rather than only the family centres being placed clear.
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

	// Ring the corridor at a radius that never comes near the hull, flattened on y so the
	// field reads as a belt seen close to edge-on. Weighted inward - most of a belt is the
	// near gravel you actually pass, not the far stuff.
	const place = z => {
		const [cx, cy] = corridorAt(z)
		const r = BELT_RADIUS_MIN + rnd() * rnd() * (BELT_RADIUS_MAX - BELT_RADIUS_MIN)
		const th = rnd() * Math.PI * 2
		return [cx + Math.cos(th) * r, cy + Math.sin(th) * r * BELT_FLATTEN, z]
	}

	// Families. Most of a real belt belongs to one - the debris of the same break-up,
	// still travelling together - and scattering every rock independently is what makes a
	// field read as confetti thrown at the screen rather than as something with a history.
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
		// Sizes on a cube law rather than a flat draw. A belt is almost all gravel with
		// the occasional real body in it; a field of same-sized pebbles is the other thing
		// that made this look manufactured.
		const u = rnd()
		const q = clearHull(p)
		arr.set([q[0], q[1], q[2], 0.09 + u * u * u * 0.62], i * 4)
	}
	return arr
}
