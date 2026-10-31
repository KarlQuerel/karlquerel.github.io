// The surface's ground height, the JS twin of terrain() in shaders/intro/surface.frag.glsl: the
// walk stands on it. Both read the same numbers (constants/game/surface.js).

import { SURFACE } from '../../constants/game/surface.js'

export function terrainHeight(x, z) {
	const T = SURFACE.terrain
	let h = 0
	for (const [amp, fx, fz, px, pz] of T.waves)
		h += amp * Math.sin(x * fx + px) * Math.cos(z * fz + pz)
	const r = (z - T.ridge.z) / T.ridge.width
	h += T.ridge.height * Math.exp(-r * r) * (0.8 + 0.2 * Math.sin(x * 0.15))
	const lx = (x - T.lake.x) / T.lake.radius
	const lz = (z - T.lake.z) / T.lake.radius
	h -= T.lake.depth * Math.exp(-2 * (lx * lx + lz * lz))
	const m = (Math.hypot(x, z) - T.mountains.at) / T.mountains.width
	h += T.mountains.height * Math.exp(-m * m) * (0.6 + 0.4 * Math.sin(Math.atan2(z, x) * 7))
	return h
}
