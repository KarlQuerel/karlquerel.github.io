// The flat-layer shots' camera: the earth shot's ease, the pan in cells, and the hand-off at a cut.

import { EARTH } from '../../constants/intro/earth.js'
import { smootherstep } from '../math.js'

// Smootherstep with a linear share kept, so the move eases in, eases out, and never quite stops.
export function earthEase(u) {
	const k = EARTH.drift
	if (u >= 1) return 1 + k * 2 * (u - 1)
	return (1 - k) * smootherstep(u) + k * u
}

// canvas pixels per art pixel on this grid: the art keeps its size whatever rung the canvas is on
export const artScale = grid => Math.max(1, Math.round(EARTH.artPx / grid.cellPx))

// an offset in frame heights as the pan in canvas pixels, the pointer's slide (in art pixels) on top
export const skyPan = (grid, io, [x, y]) => [
	x * grid.height + io.look[0] * EARTH.lookCells * artScale(grid),
	y * grid.height + io.look[1] * EARTH.lookCells * artScale(grid),
]

// The hand-off: a shot arrives with its layers still sliding the way the last one's camera went, `cells`
// to the right at depth 1 and settling over `dur`, so the camera never stops between shots.
export function arrive(t, dur, cells) {
	const u = Math.max(0, 1 - t / dur)
	return cells * u * u
}
