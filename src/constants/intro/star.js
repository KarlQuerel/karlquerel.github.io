// The Sun as every shot draws it (star() in shaders/intro/layers.glsl). Sizes in canvas pixels; the ramp
// runs rust to white in eleven steps, and a `span` is [limb, brightest granule] on it.
export const STAR = {
	// the ramp a young star and a red giant each span; a shot's age mixes between them
	span: { young: [5.1, 10.3], giant: [0.4, 6.9] },
	// granulation: convection cells across the unit sphere at this count, then finer octaves of it
	// (each `split` times smaller) that come in once a cell is a few pixels wide
	cells: 9,
	split: 2.6,
	// how fast a cell's centre wanders (radians a second) and how fast the star turns
	boil: 0.55,
	spin: 0.025,
	// limb darkening: the base, and how much deeper a giant's goes
	limb: [0.45, 0.3],
	// sunspots: the belt of latitudes they sit in (sin lat, in to out), and how dark they go
	spots: { belt: [0.1, 0.55], penumbra: 0.28, umbra: 0.62 },
	// a star under this radius reads by its heat alone: a white core, its texture fading in by `far`
	far: [40, 120],
	// the corona: its flames reach this far past the limb (in radii, capped at `reach` pixels so a
	// limb seen close stays crisp), the faint rays this far, and the glow dies out `spread` on
	reach: 120,
	flame: 0.75,
	ray: 1.2,
	spread: 7,
	// the heat a shot drives the star with: contrast on its granules, and its light flooding the dark
	contrast: 0.7,
	flood: 2.6,
	// share of a ramp step given to dither at each seam
	seam: 0.24,
}
