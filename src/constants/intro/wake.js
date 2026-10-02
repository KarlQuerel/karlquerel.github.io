// Shots 9 to 11: the wake behind the frosted lid, the wipe, and the crash. Seconds unless noted.
export const WAKE = {
	cardAt: 0.6,
	// the lids open over this long, in three steps
	eyelid: 1,
	// the visor reboots between these
	bootFrom: 0.3,
	bootTo: 2.2,
	alarmsAt: 2.4,
	// from here a drag wipes the glass; the hands go from rest to reach over `reachSpan`
	wipeAt: 4,
	reachSpan: 0.6,
	// the world keeps closing the whole time you are awake: 0 -> 1 over this long
	approachSpan: 40,
	// the brush, as a share of the grid's height, snapped to blocks of `block` cells
	brush: 0.055,
	block: 4,
	// share of the glass that has to be clear before the alert
	clearedAt: 0.22,
	// the alert blinks on a stepped clock, this many steps a second
	alertSteps: 3,
}

// The crash: stepped jolts toward the world, a flash on some of them, the frame tilting.
export const CRASH = {
	// jolts a second, and how far the last one has closed the distance (0..1 of the wake's approach span)
	steps: 5,
	closing: 1,
	// which jolts flash, and how much
	flashEvery: 2,
	glare: 0.85,
	// the tilt reached by the cut, radians, and how far it kicks back on the odd jolts
	tilt: 0.22,
	kickBack: 0.7,
}
