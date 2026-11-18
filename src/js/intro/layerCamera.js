// The flat-layer camera: the art's size on the canvas and the pan in cells.

import { EARTH } from '../../constants/intro/earth.js'

// canvas pixels per art pixel on this grid: the art keeps its size whatever rung the canvas is on
export const artScale = grid => Math.max(1, Math.round(EARTH.artPx / grid.cellPx))

// an offset in frame heights as the pan in canvas pixels, the pointer's slide (in art pixels) on top
export const skyPan = (grid, io, [x, y]) => [
	x * grid.height + io.look[0] * EARTH.lookCells * artScale(grid),
	y * grid.height + io.look[1] * EARTH.lookCells * artScale(grid),
]
