// The game after the intro: its three meters (0 to 100), what each verb spends, and the truth about
// the world, decided fresh each run. Seconds and world units.
export const PLAY = {
	// how the envoy wakes: full air, a torn hull, a transmitter at half power
	start: { o2: 100, hull: 34, signal: 60 },
	// the odds the world is green; if it is not, one of these tests gives it away
	greenOdds: 0.6,
	tests: ['air', 'water', 'ground'],
	// sprinting: the air it burns per second
	sprintO2: 1.4,
	// the wrist readout comes up and goes down over this long
	wristS: 0.25,
	// the visor fogs over this long into a run and clears over this long after it
	fog: { inS: 2.5, outS: 4 },
	// the helmet lamp's battery: seconds of full light, and the glow it keeps once drained
	lamp: { fullS: 240, floor: 0.25, flickerBelow: 0.4 },
	// where a run's checkpoint lives in localStorage: the act reached and the meters on reaching it
	saveKey: 'hermes-8',
}

// Act I, the wreck: where each beat waits along the corridor (z) and across it (x), how near the
// player must stand, and what the choices do to the meters.
export const WRECK_ACT = {
	spots: {
		pod: { reach: 2.6 },
		log: { x: 1.0, z: 23, reach: 2.4 },
		tx: { x: 0.55, z: 33.6, reach: 2.4 },
		descend: { x: -1.0, z: 33.6, reach: 2.6 },
	},
	// venting the pod seals the aft section: what the hull gains
	vent: { hull: 20 },
	// the wake line comes this long after the shot opens
	wakeAt: 1.2,
	// the descent: the shake before the cut, then black
	descent: { shakeS: 2.4, blackS: 1.2 },
}
