// Shot 3, THE SUN HAS BEEN GROWING RELENTLESSLY. It opens on the earth shot's own sun, where that shot
// left it, and the camera closes on it; then the star is shown in three painted states, each held, the
// swell between them carried by a flare. Times in seconds, sizes as shares of the frame's height.
export const SUN = {
	duration: 10,
	cardAt: 0.8,
	cellPx: 2,
	// where the disc settles, as a share of the frame (x of its width, y of its height, from the top left)
	at: [0.5, 0.45],
	// the disc holds on the earth shot's sun through the cut, then the camera closes on it: the approach
	// from there to `at` runs from `hold` to `approach`, growing to the first state as it comes
	hold: 1.2,
	approach: 3.0,
	// the last of the approach given to handing the plain disc over to the painted one
	reveal: 0.45,
	// the states: when each is fully in, its radius, and its age (0 young and white, 1 a red giant)
	states: [
		{ at: 3.0, radius: 0.15, age: 0 },
		{ at: 5.7, radius: 0.27, age: 0.5 },
		{ at: 8.3, radius: 0.42, age: 1 },
	],
	// how long a swell from one state to the next takes, ending at the next state's `at`
	swell: 0.6,
	// a portrait frame caps the disc at this share of its width, so the giant fills it, not spills it
	fitWidth: 0.5,
	// Mercury crosses the young disc between these seconds
	transit: [3.1, 5.6],
	// the coronal mass ejection leaves the giant's limb over this span
	ejection: [8.5, 9.9],
	// the sky keeps sliding left the way the earth shot's camera went: frame heights at depth 1
	drift: -0.15,
	// the hand-off: the sky arrives this far right (frame heights at depth 1) and settles over the cut
	carry: 0.12,
	tidyPasses: 1,
}
