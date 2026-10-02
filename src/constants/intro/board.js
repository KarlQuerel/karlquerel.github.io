// Shot 8, the crossing: a star chart of the ten routes out of Sol, and the board of lights over it.
// Nine ships are lost, one at a time, evenly between `outFrom` and `outTo` seconds; the day counter runs from `daysFrom` to
// `daysTo`, and the log keeps the last `logLines` ships lost.
export const BOARD = {
	duration: 11,
	cols: 10,
	// the first loss lands once the fleet has fanned out, not while it is still bunched at Sol
	outFrom: 2.4,
	outTo: 9.4,
	daysFrom: 0.4,
	daysTo: 9.6,
	logLines: 3,
	// the order the lights go out in is rolled from this seed, once
	seed: 31,
	// the chart fades up over this long
	reveal: 1.2,
	// how far along its route the farthest ship is when the counter stops: nobody has arrived yet
	progMax: 0.86,
	// a lost ship's marker flares for this many steps over this many seconds, then its route dies red;
	// shorter than the gap between losses, so every loss is its own beat
	flashSteps: 6,
	flashFor: 0.8,
	// a ship's label comes up once it is this far along its route, clear of the crowd at Sol
	labelFrom: 0.1,
	// where a lost ship stopped, quantised to `stopLevels` steps and packed `stopsPerWord` to a float:
	// 4 x 6 bits stays inside a float's exact 24
	stopLevels: 63,
	stopsPerWord: 4,
	// The chart in its own space: Sol at the origin, destinations `near`..`far` out inside a fan of
	// ±`spread` radians. Landscape lays it left to right, portrait bottom to top, leaving the top of a
	// phone to the board.
	chart: {
		spread: 0.8,
		near: 0.36,
		far: 1,
		// low-discrepancy steps: ship i sits at fract(i * angleStep), fract(i * reachStep)
		angleStep: 0.6180339887498949,
		reachStep: 0.7548776662466927,
		landscape: { solInset: 0.13, rightPad: 0.12, spanY: 0.56 },
		portrait: { solY: -0.37, sidePad: 0.07, spanY: 0.5 },
	},
	// The chart camera: tight on Sol, back out to the whole fan as the fleet leaves, then in on
	// HERMES-8's marker, carried through the keys on one smooth curve. `at` is shot seconds, `zoom`
	// scales the chart, `sol` / `ship` weight where the camera looks between Sol and your marker, and
	// `screen` is where that point sits in the frame, as shares of the half-width and half-height.
	camera: {
		at: [0, 4.6, 11],
		zoom: [2.3, 1, 1.55],
		ship: [0, 0.35, 1],
		screen: [
			[-0.42, 0],
			[-0.2, 0],
			[0.1, -0.08],
		],
		portraitScreen: [
			[0, -0.45],
			[0, -0.2],
			[0, -0.12],
		],
	},
	// distance rings, in chart units, and what each one is labelled in light-years
	rings: [0.25, 0.5, 0.75, 1],
	ringLy: [30, 60, 90, 120],
	// the chart's own marks: the root star and the unit its rings are read in
	solLabel: 'SOL',
	ringUnit: 'LY',
}
