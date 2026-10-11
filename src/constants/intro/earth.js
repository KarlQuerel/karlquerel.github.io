// Shot 2, EARTH IS DYING: the planet as painted layers sliding past each other, the contact scene's
// way. Positions are shares of the frame (x of its width, y of its height, from the top left) at the
// close; sizes are shares of its short side; `depth` is how far a layer moves with the pan, 1 = the globe.
export const EARTH = {
	duration: 16,
	// CSS px per canvas pixel, which is how far a layer can step: one, so the pan glides
	cellPx: 1,
	// CSS px per art pixel: the layers are painted this coarse and slid on the finer canvas
	artPx: 2,
	cardAt: 6.7,
	// The arrival: the camera tilts down from the year shot's stars onto the Earth over `tilt` seconds,
	// the scene sliding up `from` frame heights, every layer by its depth, so the Moon comes up first
	// and slowly and the globe sweeps up last; the sun stays hidden until the globe has it covered,
	// its glow coming up over the last `glow` seconds of the tilt.
	arrive: { tilt: 6.5, from: 2.7, glow: 2.5 },
	// The pan starts here, under the tilt's last second, so the camera never stops: at the opening
	// every layer sits `travel` (frame heights, x right, y down) times its depth from its closing
	// place. The globe moves most, so it sinks off the sun and the sun rises past its limb.
	panAt: 5,
	travel: [0.6, -0.42],
	// share of the closing speed kept at the end, so the shot hands over still drifting
	drift: 0.07,
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
		// then turned to face the sun as it stands this share of the pan before the close: where it
		// breaks the limb, not where it ends up
		lightAt: 0.7,
	},
	// city lights on the night side: where a second world's land would be is built up (above `built`,
	// densest `spread` above it), thickest on the coast (thinning over `inland` of elevation), and a
	// share `lit` of its cells on a lattice `fine` across burns
	cities: { night: 0.02, built: 0.54, spread: 0.1, lit: 0.1, inland: 0.1, fine: 160 },
	// the Moon (its map in constants/intro/moon.js), lit gibbous from the sun's side: `light` is x right,
	// y down, z toward the viewer
	moon: { at: [0.13, 0.22], radius: 0.07, depth: 0.4, seed: 77, light: [0.75, -0.2, 0.6] },
	// the Sun, already past its prime: its age on star()'s scale, 0 white to 1 a red giant
	star: { at: [0.74, 0.26], radius: 0.045, depth: 0.12, age: 0.3 },
	// half-width of the dither at each seam of the globe's light, in ramp steps: 0.5 dithers all the way
	seam: 0.4,
	// The surface's finer life. `coast`/`wisp` are how far fine octaves at `scale` push the ground and the
	// cloud cover; `cloudEdge` is how far past `cloud` a deck takes to go solid. The light: `gain` spreads
	// it over the ramp, `hillshade` tips it by the slope toward the sun (measured over `slopeCells`), a
	// deck's shadow falls `shadowOffset` down-sun and drops `shadowDrop`, the sea glints by `glint`.
	detail: {
		scale: 9,
		octaves: 3,
		coast: 0.2,
		wisp: 0.35,
		cloudEdge: 0.06,
		gain: 1.15,
		hillshade: 0.3,
		slopeCells: 1.5,
		shadowOffset: 0.03,
		shadowDrop: 0.2,
		glint: 0.5,
		glintPower: 24,
	},
	// clouds where a second world's elevation passes this
	cloud: 0.6,
	// The air past the limb, in cells: `depth` toward the sun, `night` away from it, `wrap` how far the
	// glow reaches round toward the night side; inner band out, each seam dithered over `seam` of a
	// band; painted at `alpha`, so the shader can tell it from the ground. `twilight` is how deep past
	// the terminator the red ground fades out, `limb` where the lit edge catches `limbLift` more.
	air: {
		depth: 9,
		night: 1,
		wrap: 0.35,
		ramp: ['sand', 'haze', 'rust'],
		seam: 0.3,
		alpha: 200,
		twilight: 0.12,
		limb: 0.92,
		limbLift: 0.18,
	},
	tidyPasses: 2,
}
