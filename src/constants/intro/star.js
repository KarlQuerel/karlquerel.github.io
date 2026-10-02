// The Sun as every shot draws it (star() in shaders/intro/layers.glsl).
export const STAR = {
	// convection cells across the unit sphere: a young star's are a few cells wide, a giant's a dozen
	cells: 9,
	// how fast a cell's centre wanders (radians a second) and how fast the star turns
	boil: 0.55,
	spin: 0.025,
	// a star's radius in cells past which its corona stops widening and its cells start to split
	reach: 120,
	// share of a ramp step given to dither at each seam
	seam: 0.24,
}
