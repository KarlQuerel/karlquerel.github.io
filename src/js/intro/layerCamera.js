// The flat-layer shots' camera: the earth shot's ease, the pan in cells, and the hand-off at a cut.

import { EARTH } from '../../constants/intro/earth.js'

// Smootherstep with a linear share kept, so the move eases in, eases out, and never quite stops.
export function earthEase(u) {
	const k = EARTH.drift
	if (u >= 1) return 1 + k * 2 * (u - 1)
	const s = u * u * u * (u * (u * 6 - 15) + 10)
	return (1 - k) * s + k * u
}

// an offset in frame heights as the pan in cells, the pointer's slide on top
export const skyPan = (grid, io, [x, y]) => [
	x * grid.height + io.look[0] * EARTH.lookCells,
	y * grid.height + io.look[1] * EARTH.lookCells,
]

// The hand-off: a shot arrives with its layers still sliding the way the last one's camera went, `cells`
// to the right at depth 1 and settling over `dur`, so the camera never stops between shots.
export function arrive(t, dur, cells) {
	const u = Math.max(0, 1 - t / dur)
	return cells * u * u
}
