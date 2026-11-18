// The Earth from orbit, the title screen's picture (js/intro/earth.js): the planet as painted layers sliding past
// each other, the contact scene's way. Positions are shares of the frame (x of its width, y of its height, from
// the top left) where the camera rests; sizes are shares of its short side; `depth` is how far a layer moves with
// the pan, 1 = the globe.

export const EARTH = {
	// CSS px per canvas pixel, which is how far a layer can step: one, so the pan glides
	cellPx: 1,
	// CSS px per art pixel: the layers are painted this coarse and slid on the finer canvas
	artPx: 2,
	// where the camera rests, in frame heights (x right, y down): the globe's crown low in the frame, the Moon
	// up to its left, the sun out to the right
	rest: [0.4, 0.58],
	// how far the pointer slides the globe, in cells; nearer layers by their depth
	lookCells: 6,
	// the light on the globe stands as the sun did with `planet.lightAt` of this pan (frame heights, x right, y
	// down) still to go, so the dry face shows: the old opening sweep's, kept for the light alone
	travel: [0.4, -0.01],
	planet: {
		at: [0.155, 0.56],
		radius: 0.42,
		depth: 1,
		// The Earth of 3812 off its map (constants/intro/earthMap.js): `view` is the place its top limb
		// crests on and the bearing down the frame from it, so Africa and Europe face the camera, north
		// up. The sun lights it from its side of the frame and `front` toward the viewer (the light's z),
		// as it stands `lightAt` of `travel` away, so the dry face shows and the night side burning is a
		// crescent away from it.
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
