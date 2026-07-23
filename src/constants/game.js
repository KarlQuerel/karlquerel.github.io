// Timeline of the /game crash intro, in seconds since mount: warp in, cruise,
// drop out onto the planet, impact, cut to black. Tune the feel here.
export const CRASH_INTRO = {
	warpRamp: 1.4, // 0 → full lightspeed
	warpHold: 4.0, // cruise ends — the drop-out begins
	arrival: 6.2, // planet fully revealed, warp gone
	impact: 7.4, // white flash peak, shake starts
	blackout: 8.6, // fully black → hand over to the first scene
	shakeLead: 0.3, // shake starts this long before impact
	captions: [
		{ at: 0.4, text: 'EMERGENCY DROP FROM HYPERSPACE' },
		{ at: 4.2, text: 'GRAVITY WELL CAPTURE - KEPLER-442B' },
		{ at: 6.4, text: 'BRACE FOR IMPACT' },
	],
	skip: 'SKIP >>',
}
