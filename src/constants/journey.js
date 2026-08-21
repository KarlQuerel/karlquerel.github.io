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
// reads, swing across the screen during the empty legs. `fade` is the globe's
// opacity — solid the whole way, dropping to 0 only at `gone`, where the entry
// scene takes the sky over. The stations carry their own panels, so the world
// behind them never needs dimming.
// Extra channels beyond position/scale/fade:
//   roll  — cumulative extra longitude (turns) on top of JOURNEY.turns; ramping
//           it through the skim and the entry makes the ground rush past
//   tilt  — camera bank (deg): the world leans into the turns
// `swing` arcs the approach; `workEnd`/`lifeEnd` keep the holds drifting slowly
// so the trajectory never fully stops; `dive` is the low-orbit surface skim.
export const CAMERA = {
	rest: { x: 0, y: 20, scale: 0.14, fade: 1, roll: 0, tilt: 0 },
	swing: { x: -26, y: 6, scale: 0.6, fade: 1, roll: 0.05, tilt: -4 },
	work: { x: -52, y: -4, scale: 1.35, fade: 1, roll: 0.1, tilt: -2 },
	workEnd: { x: -50, y: -10, scale: 1.48, fade: 1, roll: 0.14, tilt: -1 },
	dive: { x: 6, y: 58, scale: 3.4, fade: 1, roll: 0.5, tilt: 5 },
	life: { x: 56, y: 2, scale: 1.7, fade: 1, roll: 0.6, tilt: 2 },
	lifeEnd: { x: 53, y: -2, scale: 1.82, fade: 1, roll: 0.64, tilt: 1 },
	// the descent: horizon at pin start, then the globe swells hard enough that
	// its crest leaves the top of the frame — from there the screen is nothing but
	// surface, which is what lets the sky take over without reading as a dissolve
	approach: { x: 0, y: 62, scale: 2.0, fade: 1, roll: 0.7, tilt: 0 },
	entry: { x: 0, y: 100, scale: 8, fade: 1, roll: 1.05, tilt: 0 },
	gone: { x: 0, y: 115, scale: 11, fade: 0, roll: 1.35, tilt: 0 },
}

// Portrait screens: vmin is the narrow side, so the same scales render a far
// smaller globe — push in closer to keep the limb and horizon in frame.
export const CAMERA_PORTRAIT = {
	rest: { x: 0, y: 18, scale: 0.16, fade: 1, roll: 0, tilt: 0 },
	swing: { x: -28, y: 6, scale: 0.7, fade: 1, roll: 0.05, tilt: -4 },
	work: { x: -55, y: -6, scale: 1.6, fade: 1, roll: 0.1, tilt: -2 },
	workEnd: { x: -53, y: -11, scale: 1.72, fade: 1, roll: 0.14, tilt: -1 },
	dive: { x: 4, y: 46, scale: 4.4, fade: 1, roll: 0.5, tilt: 5 },
	life: { x: 55, y: 0, scale: 2.0, fade: 1, roll: 0.6, tilt: 2 },
	lifeEnd: { x: 52, y: -3, scale: 2.12, fade: 1, roll: 0.64, tilt: 1 },
	approach: { x: 0, y: 42, scale: 2.6, fade: 1, roll: 0.7, tilt: 0 },
	entry: { x: 0, y: 58, scale: 19, fade: 1, roll: 1.05, tilt: 0 },
	gone: { x: 0, y: 66, scale: 25, fade: 0, roll: 1.35, tilt: 0 },
}

// The final approach: horizon → limb blowout → atmosphere → surface. All
// fractions are of the approach runway.
export const ARRIVAL = {
	// Scroll runway on top of the one viewport the pin holds for (vh).
	runwayVh: 300,
	// Camera keyframe positions along the runway (see CAMERA.entry / .gone).
	entryAt: 0.45,
	goneAt: 0.52,
	// Contact heading + portals fade in across this window — on the surface.
	contactFadeStart: 0.66,
	contactFadeEnd: 0.88,
	// Orbital haze over the early approach; the entry sky takes over from it.
	hazeStart: 0.05,
	hazeEnd: 0.4,
	hazeMax: 0.7,
}

// The entry scene (PlanetEntry.vue): cloud deck, sky takeover, ridgelines.
// Fractions are of the approach runway; colours echo the planet's palette.
export const ENTRY = {
	// The sky only starts once the limb has cleared the frame (see CAMERA.entry)
	// and the deck has closed over, so it never reads as a dissolve.
	skyStart: 0.32,
	skyFull: 0.52,
	// the whiteout while the camera is inside the deck — this is the cover the
	// sky handoff happens behind
	deck: { start: 0.28, peak: 0.42, end: 0.6, max: 0.92 },
	// each cloud rushes up past the camera inside its own slice of the drop,
	// swelling (`cloudApproach`) and fanning off centre (`cloudSpread`) as it
	// closes, so the deck has depth rather than sliding past as a flat layer
	cloudTravel: 0.2,
	cloudFromVh: 110,
	cloudToVh: -70,
	cloudApproach: 3.8,
	cloudSpread: 1.1,
	// The puff sprite itself: a cumulus in profile, drawn once per visit in a
	// few variants and reused across the deck. Lit crown, shaded underside,
	// dithered between tones — `sideLight` leans it toward the sun.
	cloud: {
		variants: 3,
		spriteW: 68,
		spriteH: 36,
		// overlapping round lobes, which is what gives cumulus their bulbous top;
		// a single arch just produces a pyramid
		lobes: 5,
		lobeRadius: [0.16, 0.3],
		lobeHeight: [0.5, 1],
		baseJitter: 2,
		sideLight: 0.55,
		shades: [
			[150, 128, 128],
			[176, 154, 152],
			[200, 180, 176],
			[220, 202, 197],
			[236, 222, 216],
		],
	},
	// A dense, staggered stream: the deck has to be thick enough through the
	// takeover that the surface is gone before the sky is up. `flip` mirrors the
	// puff so one sprite does not read as a repeat.
	clouds: [
		{ left: 18, scale: 0.5, start: 0.22 },
		{ left: 74, scale: 0.42, start: 0.24, flip: true },
		{ left: 44, scale: 0.6, start: 0.26 },
		{ left: 8, scale: 0.72, start: 0.28, flip: true },
		{ left: 62, scale: 0.66, start: 0.3 },
		{ left: 32, scale: 0.85, start: 0.32, flip: true },
		{ left: 88, scale: 0.78, start: 0.34 },
		{ left: 52, scale: 1.5, start: 0.36, flip: true },
		{ left: 14, scale: 1.4, start: 0.38 },
		{ left: 70, scale: 1.7, start: 0.4, flip: true },
		{ left: 38, scale: 1.6, start: 0.42 },
		{ left: 84, scale: 1.35, start: 0.44, flip: true },
		{ left: 24, scale: 1.7, start: 0.46 },
		{ left: 58, scale: 1.55, start: 0.48, flip: true },
		{ left: 6, scale: 1.0, start: 0.5 },
		{ left: 78, scale: 1.25, start: 0.52, flip: true },
		{ left: 42, scale: 1.15, start: 0.55 },
		{ left: 66, scale: 0.95, start: 0.58, flip: true },
	],
	// Procedural ridgelines: sprite width in cells, height as a width fraction,
	// and how much of the runway each band spends settling into place.
	ridgeRes: 256,
	ridgeAspect: 0.36,
	ridgeSettle: 0.16,
	// Relief shading. Each column is lit by which way its face turns (`slopeGain`
	// per band), measured across `ridgeSlopeSpan` cells so facets come out broad
	// rather than one-column stripes. The light then dies off over `faceDepth`
	// cells below the crest, so the lit face hugs the ridge and the mass beneath
	// it sinks into shadow. `ridgeLight` is the sun's side: -1 puts it stage
	// left, matching the planet's key.
	// Profile shape: ridged noise alone spikes off a flat plain, so it is blended
	// with the rolling octaves — crests stay sharp, but they rise out of shoulders.
	ridgeBlend: 0.62,
	ridgeLight: -1,
	ridgeSlopeSpan: 2,
	ridgeDepthFade: 0.6,
	// crag texture broken across the faces, so a slope is not one flat wash
	ridgeRough: 0.26,
	ridgeRoughFreq: 34,
	far: {
		revealAt: 0.56,
		liftVh: 10,
		heightVh: 34,
		freq: 9,
		base: 0.3,
		amp: 0.56,
		seed: 11,
		slopeGain: 40,
		faceDepth: 22,
		// dark → lit ramp. Aerial perspective: the far band sits closer to the
		// sky's tone throughout, which is what pushes it into the distance.
		shades: [
			[62, 40, 38],
			[78, 50, 46],
			[95, 62, 55],
			[113, 75, 65],
			[133, 90, 77],
			[154, 106, 90],
		],
		crest: [178, 126, 104],
	},
	near: {
		revealAt: 0.62,
		liftVh: 16,
		heightVh: 22,
		freq: 5.5,
		base: 0.28,
		amp: 0.62,
		seed: 29,
		slopeGain: 52,
		faceDepth: 28,
		shades: [
			[20, 13, 14],
			[29, 18, 18],
			[39, 25, 24],
			[51, 32, 30],
			[65, 41, 37],
			[82, 51, 45],
		],
		crest: [104, 64, 55],
	},
}
