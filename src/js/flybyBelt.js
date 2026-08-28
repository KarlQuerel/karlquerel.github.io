// The belt, in the system's own plane and in the stretch where the flight has dropped
// below that plane and is closing on the destination - which is exactly where the sky
// was emptiest.

import { BELT_FAMILIES, BELT_SEED, BODIES, RING_NORMAL } from '../constants/flyby.js'

// A smaller `count` takes a prefix of the same field, so a phone gets a thinner belt
// made of the same rocks rather than a different one.
export function buildBelt(count) {
	const arr = new Float32Array(count * 4)
	let seed = BELT_SEED
	const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296

	const EN = RING_NORMAL
	const E0 = BODIES[0].c
	// a floor on the lateral offset keeps the belt off the flight line without the
	// generator needing to know where the flight line is
	const lateral = () => 5.4 + (rnd() < 0.5 ? -1 : 1) * (6 + rnd() * rnd() * 44)
	const onPlane = (x, z) => E0[1] - (EN[0] * (x - E0[0]) + EN[2] * (z - E0[2])) / EN[1]

	const fam = []
	for (let k = 0; k < BELT_FAMILIES; k++) {
		const z = -(125 + rnd() * 160)
		const x = lateral()
		fam.push([x, onPlane(x, z) + (rnd() * 2 - 1) * 8, z])
	}

	for (let i = 0; i < count; i++) {
		let x, y, z
		if (rnd() < 0.72) {
			const f = fam[(rnd() * BELT_FAMILIES) | 0]
			const w = 5 + rnd() * 16
			x = f[0] + (rnd() * 2 - 1) * w
			y = f[1] + (rnd() * 2 - 1) * w * 0.5
			z = f[2] + (rnd() * 2 - 1) * w * 1.6
		} else {
			z = -(125 + rnd() * 160)
			x = lateral()
			y = onPlane(x, z) + (rnd() * 2 - 1) * 9
		}
		// Sizes on a cube law rather than a flat draw. A belt is almost all gravel with
		// the occasional real body in it; a field of same-sized pebbles is the other thing
		// that made this look manufactured.
		const u = rnd()
		arr.set([x, y, z, 0.09 + u * u * u * 0.62], i * 4)
	}
	return arr
}
