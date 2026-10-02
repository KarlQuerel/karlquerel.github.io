// Shot 2, EARTH IS DYING: the planet as painted layers sliding past each other, the contact scene's
// way. Positions are shares of the frame (x of its width, y of its height, from the top left) at the
// close; sizes are shares of its short side; `depth` is how far a layer moves with the pan, 1 = the globe.
export const EARTH = {
	duration: 11,
	// CSS px per art pixel: the layers are painted once, so the grid can be fine
	cellPx: 2,
	cardAt: 1.6,
	// share of the closing speed kept at the end, so the shot hands over still drifting
	drift: 0.07,
	// The pan: at the opening every layer sits this far from its closing place (frame heights, x right,
	// y down) times its depth. The globe moves most, so it sinks off the sun and the sun rises past its limb.
	travel: [0.6, -0.42],
	// how far the pointer slides the globe, in cells; nearer layers by their depth
	lookCells: 6,
	planet: {
		at: [0.34, 1.0],
		radius: 0.5,
		depth: 1,
		// the homepage planet's renderer, on its own world
		seed: 3812,
		spin: 2.1,
		// the key light swung behind the globe toward the sun, so it reads as a thin crescent
		lightYawDeg: 160,
	},
	// city lights on the night side: where a second world's land would be is built up (above `built`),
	// and a share `lit` of its cells on a lattice `fine` across burns
	cities: { night: 0.02, built: 0.56, lit: 0.12, fine: 160 },
	moon: { at: [0.13, 0.22], radius: 0.06, depth: 0.4, seed: 77 },
	star: { at: [0.74, 0.26], radius: 0.045, depth: 0.12 },
	tidyPasses: 2,
}
