// Shot 2, EARTH IS DYING, and shot 1's YEAR 3812 with it (its stars cut: the intro opens on the title
// screen, which is this shot's own picture, constants/intro/menu.js): the planet as painted layers
// sliding past each other, the contact scene's way. Positions are shares of the frame (x of its width,
// y of its height, from the top left) at the close; sizes are shares of its short side; `depth` is how far
// a layer moves with the pan, 1 = the globe.

// At the opening every layer sits `TRAVEL` (frame heights, x right, y down) times its depth from its
// closing place, before the arrival's offset: the pan only ever carries the scene left.
const TRAVEL = [0.4, -0.01]
// Where the camera rests for the title screen, the same way: the globe's crown low in the frame, the
// Moon up to its left, the sun out to the right. The arrival from it is straight down onto the globe.
const REST = [0.4, 0.58]

export const EARTH = {
	duration: 16,
	// CSS px per canvas pixel, which is how far a layer can step: one, so the pan glides
	cellPx: 1,
	// CSS px per art pixel: the layers are painted this coarse and slid on the finer canvas
	artPx: 2,
	// the year types once the title has come apart, clears as the globe comes up, then the line
	cardAt: { year: 2.2, clear: 5.2, dying: 6.7 },
	// The arrival: the shot opens where the title screen rests (`rest`), and the camera tilts down onto
	// the Earth over `tilt` seconds, setting off from rest, the scene sliding from `from` (frame heights)
	// by each layer's depth, so the Moon rises slowly out of the frame and the globe comes up whole.
	rest: REST,
	arrive: { tilt: 6.5, from: [REST[0] - TRAVEL[0], REST[1] - TRAVEL[1]] },
	// The pan starts here, under the tilt's last second, so the camera never stops, and carries every
	// layer the rest of `travel` home: the globe, nearest, slides away left and the far sun hardly moves,
	// so the frame turns over to it.
	panAt: 5,
	travel: TRAVEL,
	// share of the closing speed kept at the end, so the shot hands over still drifting
	drift: 0.07,
	// how far the pointer slides the globe, in cells; nearer layers by their depth
	lookCells: 6,
	planet: {
		at: [0.155, 0.56],
		radius: 0.42,
		depth: 1,
		// The Earth of 3812 off its map (constants/intro/earthMap.js): `view` is the place its top limb
		// crests on and the bearing down the frame from it, so Africa and Europe face the camera, north
		// up. The sun lights it from its side of the frame and `front` toward the viewer (the light's z),
		// as it stands this share of the pan before the close, so the dry face shows and the night side
		// burning is a crescent away from it.
		view: { lat: 85, lon: 195, heading: 0 },
		front: 0.45,
		lightAt: 0.7,
	},
	// the Moon (its map in constants/intro/moon.js), lit gibbous from the sun's side: `light` is x right,
	// y down, z toward the viewer
	moon: { at: [0.06, 0.036], radius: 0.07, depth: 0.4, seed: 77, light: [0.75, -0.2, 0.6] },
	// the Sun, swollen and reddening: its age on star()'s scale, 0 white to 1 a red giant
	star: { at: [0.813, 0.42], radius: 0.065, depth: 0.12, age: 0.55 },
	tidyPasses: 2,
}
