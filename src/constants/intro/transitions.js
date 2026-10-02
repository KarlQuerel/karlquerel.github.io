// How each shot is entered, keyed by the incoming shot: the kind picks a branch of
// shaders/intro/transition.frag.glsl, dur is seconds. A shot not listed cuts.
export const TRANSITION_KINDS = {
	dissolve: 0,
	black: 1,
	burn: 2,
	mosaic: 3,
	blink: 4,
	flash: 5,
	wipe: 6,
	clock: 7,
}

export const INTRO_TRANSITIONS = {
	// the stars match across the cut, so only the planet's eclipse ring dissolves in over them
	earth: { kind: 'dissolve', dur: 2.4 },
	// the old serials' wipes: a hard edge across to the sun, a clock hand round to the fields
	sun: { kind: 'wipe', dur: 1.1 },
	fields: { kind: 'clock', dur: 1.4 },
	chamber: { kind: 'black', dur: 1.6 },
	shipyard: { kind: 'mosaic', dur: 1.3 },
	// POV begins: the first thing the envoy does is open their eyes
	corridor: { kind: 'blink', dur: 1.3 },
	cryo: { kind: 'dissolve', dur: 1.1 },
	board: { kind: 'black', dur: 0.9 },
	wake: { kind: 'black', dur: 1.2 },
	crash: { kind: 'flash', dur: 0.6 },
	title: { kind: 'black', dur: 0.8 },
}

// a skip takes the same transition, only this fast at most
export const INTRO_SKIP_DUR = 0.4

// the incoming shot's overlays wait until the transition is this far through
export const INTRO_OVERLAY_AT = 0.5
