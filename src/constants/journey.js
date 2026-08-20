// Tunables for the scroll-flight landing page (HomeJourney.vue): one planet,
// camera-choreographed from a distant dot to an atmosphere entry. Scroll owns
// every beat, so all motion here is scrubbed, never on a clock.

export const JOURNEY = {
	// Empty flight legs between stations (vh) — the travel that sells the approach.
	legVh: 85,
	// The WORK → LIFE leg is longer: it carries the low-orbit surface skim.
	diveLegVh: 150,
	// Progress at which the hero's scroll hint has fully faded.
	hintFadeEnd: 0.04,
	// Baseline longitude turned across the whole journey; the camera track's
	// `roll` channel adds ground rush on top during the skim and the entry.
	turns: 0.45,
	// How far the sun swings around the planet over the trip (turns) — the
	// terminator advances as you orbit, and the landing arrives at dusk.
	sunTurns: 0.22,
}

// Camera keyframes: where the planet sits at each beat, as its centre's offset
// from the viewport centre (vw / vh) plus the scale of the base 84vmin globe.
// The track eases between them — dock before a station enters, hold while it
// reads, swing across the screen during the empty legs. `fade` dims the globe
// while a station is read: the flat card washes edge harshly against a bright
// limb, and the world receding behind the page reads as depth anyway.
// Extra channels beyond position/scale/fade:
//   roll  — cumulative extra longitude (turns) on top of JOURNEY.turns; ramping
//           it through the skim and the entry makes the ground rush past
//   tilt  — camera bank (deg): the world leans into the turns
// `swing` arcs the approach; `workEnd`/`lifeEnd` keep the holds drifting slowly
// so the trajectory never fully stops; `dive` is the low-orbit surface skim.
export const CAMERA = {
	rest: { x: 0, y: 20, scale: 0.14, fade: 1, roll: 0, tilt: 0 },
	swing: { x: -26, y: 6, scale: 0.6, fade: 1, roll: 0.05, tilt: -4 },
	work: { x: -52, y: -4, scale: 1.35, fade: 0.85, roll: 0.1, tilt: -2 },
	workEnd: { x: -50, y: -10, scale: 1.48, fade: 0.85, roll: 0.14, tilt: -1 },
	dive: { x: 6, y: 58, scale: 3.4, fade: 1, roll: 0.5, tilt: 5 },
	life: { x: 56, y: 2, scale: 1.7, fade: 0.62, roll: 0.6, tilt: 2 },
	lifeEnd: { x: 53, y: -2, scale: 1.82, fade: 0.62, roll: 0.64, tilt: 1 },
	// the descent: horizon at pin start, then the limb swells past the frame and
	// the globe hands off to the entry scene (PlanetEntry) under the sky takeover
	approach: { x: 0, y: 62, scale: 2.0, fade: 1, roll: 0.7, tilt: 0 },
	entry: { x: 0, y: 95, scale: 4.8, fade: 1, roll: 0.9, tilt: 0 },
	gone: { x: 0, y: 110, scale: 5.6, fade: 0, roll: 1, tilt: 0 },
}

// Portrait screens: vmin is the narrow side, so the same scales render a far
// smaller globe — push in closer to keep the limb and horizon in frame.
export const CAMERA_PORTRAIT = {
	rest: { x: 0, y: 18, scale: 0.16, fade: 1, roll: 0, tilt: 0 },
	swing: { x: -28, y: 6, scale: 0.7, fade: 1, roll: 0.05, tilt: -4 },
	work: { x: -55, y: -6, scale: 1.6, fade: 0.75, roll: 0.1, tilt: -2 },
	workEnd: { x: -53, y: -11, scale: 1.72, fade: 0.75, roll: 0.14, tilt: -1 },
	dive: { x: 4, y: 46, scale: 4.4, fade: 1, roll: 0.5, tilt: 5 },
	life: { x: 55, y: 0, scale: 2.0, fade: 0.55, roll: 0.6, tilt: 2 },
	lifeEnd: { x: 52, y: -3, scale: 2.12, fade: 0.55, roll: 0.64, tilt: 1 },
	approach: { x: 0, y: 42, scale: 2.6, fade: 1, roll: 0.7, tilt: 0 },
	entry: { x: 0, y: 70, scale: 6, fade: 1, roll: 0.9, tilt: 0 },
	gone: { x: 0, y: 80, scale: 7, fade: 0, roll: 1, tilt: 0 },
}

// The final approach: horizon → limb blowout → atmosphere → surface. All
// fractions are of the approach runway.
export const ARRIVAL = {
	// Scroll runway on top of the one viewport the pin holds for (vh).
	runwayVh: 300,
	// Camera keyframe positions along the runway (see CAMERA.entry / .gone).
	entryAt: 0.45,
	goneAt: 0.58,
	// Contact heading + portals fade in across this window — on the surface.
	contactFadeStart: 0.66,
	contactFadeEnd: 0.88,
	// Orbital haze over the early approach; the entry sky takes over from it.
	hazeStart: 0.05,
	hazeEnd: 0.4,
	hazeMax: 0.7,
}

// The entry scene (PlanetEntry.vue): sky takeover, cloud deck, ridgelines.
// Fractions are of the approach runway; colours echo the planet's palette.
export const ENTRY = {
	// dusk swallows the stars across this window, then holds
	skyStart: 0.34,
	skyFull: 0.56,
	// each cloud rushes up past the camera inside its own slice of the drop
	cloudTravel: 0.2,
	cloudFromVh: 110,
	cloudToVh: -70,
	clouds: [
		{ left: 6, scale: 1.3, start: 0.34 },
		{ left: 52, scale: 1.9, start: 0.4 },
		{ left: 24, scale: 2.6, start: 0.47 },
		{ left: 66, scale: 1.5, start: 0.54 },
	],
	// procedural ridgelines: sprite width in cells, height as a width fraction,
	// and how much of the runway each band spends settling into place
	ridgeRes: 256,
	ridgeAspect: 0.36,
	ridgeSettle: 0.16,
	far: {
		revealAt: 0.56,
		liftVh: 10,
		heightVh: 34,
		freq: 7,
		base: 0.32,
		amp: 0.5,
		seed: 11,
		body: 'rgb(88, 56, 50)',
		crest: 'rgb(158, 104, 88)',
	},
	near: {
		revealAt: 0.62,
		liftVh: 16,
		heightVh: 22,
		freq: 4,
		base: 0.3,
		amp: 0.55,
		seed: 29,
		body: 'rgb(38, 24, 24)',
		crest: 'rgb(96, 58, 50)',
	},
}
