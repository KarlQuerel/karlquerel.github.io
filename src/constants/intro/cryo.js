// Shot 7, YOU WERE CHOSEN: into the tube. Every window is [from, to] in shot seconds.
export const CRYO = {
	duration: 9,
	cardAt: 0.8,
	// the hands come up reaching, then close on the rails
	reach: [0, 1.2],
	grip: [1.2, 2.4],
	// the canopy slides down over the lens, the glass frosts from the edges in, the eyes shut
	lid: [2.6, 5],
	frost: [4.5, 7.5],
	eyelid: [7.6, 8.6],
	// the technician crosses the catwalk beyond the crown's glass, in this many strides
	walk: [0, 8],
	strides: 5.2,
}
