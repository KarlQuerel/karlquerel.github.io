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
	// no earth entry: the year shot rests on the earth shot's opening pan, the Earth still below the
	// frame, and the cut does not show; no sun entry either: it is the earth shot's camera carrying on
	// the sun's surface burns through into the fields
	fields: { kind: 'burn', dur: 1.4 },
	chamber: { kind: 'black', dur: 1.6 },
	shipyard: { kind: 'mosaic', dur: 1.3 },
	// POV begins: the first thing the envoy does is open their eyes
	corridor: { kind: 'blink', dur: 1.3 },
	cryo: { kind: 'dissolve', dur: 1.1 },
	board: { kind: 'black', dur: 0.9 },
	wake: { kind: 'black', dur: 1.2 },
	crash: { kind: 'flash', dur: 0.6 },
	title: { kind: 'black', dur: 0.8 },
	// act I: eyes open again, in the wreck
	wreck: { kind: 'blink', dur: 1.3 },
	// act II: the drop goes to black, the title, then eyes open on the ground
	worldTitle: { kind: 'black', dur: 0.8 },
	surface: { kind: 'blink', dur: 1.3 },
	// every ending fades to its card
	'end-green': { kind: 'black', dur: 1.4 },
	'end-green-alive': { kind: 'black', dur: 1.4 },
	'end-silence': { kind: 'black', dur: 1.4 },
	'end-lie': { kind: 'black', dur: 1.4 },
	'end-dead': { kind: 'black', dur: 1.4 },
}

// a skip takes the same transition, only this fast at most
export const INTRO_SKIP_DUR = 0.4

// the incoming shot's overlays wait until the transition is this far through
export const INTRO_OVERLAY_AT = 0.5
