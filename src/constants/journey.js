// Tunables for the scroll-flight landing page (HomeJourney.vue): one planet,
// camera-choreographed from a distant dot to an atmosphere entry. Scroll owns
// every beat, so all motion here is scrubbed, never on a clock.

export const JOURNEY = {
	// Empty flight legs between stations (vh) — the travel that sells the approach.
	legVh: 85,
	// The departure leg is the longest: it carries the whole flight out — the pass
	// through the name, the void beyond it, the planet coming up dead ahead and the
	// camera coming around it — before the first station docks.
	heroLegVh: 165,
	// The WORK → LIFE leg is longer: it carries the low-orbit surface skim.
	diveLegVh: 150,
	// Baseline longitude turned across the whole journey; the camera track's
	// `roll` channel adds ground rush on top during the skim and the entry.
	turns: 0.45,
	// How far the sun swings around the planet over the trip (turns) — the
	// terminator advances as you orbit, and the landing arrives at dusk. The
	// camera's `light` channel spends part of this during the orbit, where the
	// sweep is the point; the two together still land the arrival at 0.22.
	sunTurns: 0.12,
	// Where the departure's beats land, as fractions of the run from the top of the
	// page to the WORK dock. `void` has to sit past the end of the pass
	// (HERO_FLYBY.runVh, which is in viewports) so the planet stays out of the frame
	// until the words have gone — that is the whole point of the beat.
	departure: { void: 0.3, dot: 0.38, close: 0.48, orbitIn: 0.58, orbitOut: 0.88 },
	// Where the camera finishes turning onto the approach axis, as a fraction of the
	// leg from the foot of LIFE to the pinned runway. Early on purpose: the descent
	// has to start from a frame that is already lined up, or the last thing before the
	// dive reads as the planet sliding into place rather than as us going in.
	lineUpAt: 0.55,
}

// The departure flyby: the camera's axis runs through the gap between the two
// words of the name, and the first stretch of scroll takes it through. The lockup
// is a plane square-on to the view, so the whole pass is one scale about the point
// the camera aims at — the corridor — every offset from that point growing by the
// same factor. Nothing else is needed: the role line and the cue hang below the
// corridor, so the same scale carries them out of the bottom of frame.
export const HERO_FLYBY = {
	// Scroll the pass takes, in viewports. Long enough that lifting over the ridge and
	// the words going by are two beats rather than one flick.
	runVh: 0.55,
	// The depth cue (FlightDust): motes standing still in the world while the camera
	// runs through them. Nothing here streaks on its own clock — the field shares the
	// pass's camera, so the parallax between the motes and the words is honest, which
	// is the whole difference between reading as travel and reading as a zoom.
	// `titleZ` is how far ahead the name stands, in world units; the pass is the camera
	// closing that gap at a constant rate, so travel = titleZ * (1 - 1/scale).
	titleZ: 16,
	fovDeg: 58,
	// The flight spools up rather than snapping to speed: this much of the pass is
	// spent getting there. The opening frame is meant to read as a still, and the
	// acceleration is what admits the page was never flat.
	spoolUp: 0.28,
	// The camera is not on rails down the middle — it eases across as it goes, so the
	// pass reads as a trajectory rather than as everything swelling out of one fixed
	// point. Small enough that the corridor, which widens as we close on it, stays the
	// hole we go through.
	driftVw: 3.5,
	driftVh: -1.6,
	motes: 1500,
	moteBox: 13,
	// Tail length in world units, times each mote's own share. Long enough to read as
	// speed at the near plane, short enough that the far field stays points of light.
	moteTail: 0.36,
	// Motes closer than this are behind the lens. Anything nearer projects wider than
	// the frame anyway, and its tail swings through half the screen.
	moteNear: 0.35,
	moteColor: 'rgb(199, 217, 255)',
	// backing-store downscale, as the warp does it: one mote is one art pixel
	motePixelScale: 2,
	// The field wakes with the engines rather than on load, and is gone by the time the
	// planet is up: past that we are in orbit, not running anywhere. Fractions of the
	// pass, so it can outlast it.
	// The title sprite (HeroTitle). Scaling live text re-rasterises every glyph on
	// every scrolled frame — measured at 43ms p95 against 19ms with it hidden — so the
	// name and the role are painted once and magnified. One texel per device pixel at
	// rest keeps it crisp where it starts; the cap stops a 3x screen from cutting a
	// texture three times the size it needs. The two blurred passes stand in for the
	// text-shadows the live type carried, and `plateDepth` is its share of the cursor's
	// lean — more than either ridge band, since the plane is the nearest thing there is.
	plateMaxDpr: 2,
	plateShadow: 'rgba(0, 0, 0, 0.85)',
	plateShadowBlur: 12,
	plateGlow: 'rgba(255, 189, 46, 0.34)',
	plateGlowBlur: 26,
	plateDepth: 26,
	// The chrome holds back until the hero has gone by — the opening frame is meant to
	// be the name and nothing else — then rides the rest of the flight.
	chromeFrom: 0.85,
	chromeTo: 1.45,
	dustIn: 0.05,
	dustFull: 0.4,
	dustOut: 1.6,
	// How near the words get by the end. They never clear the frame edges — their
	// inner edges are only half a corridor off the axis — so the pass has to end
	// in a dissolve, and it has to happen while they are big and rushing rather
	// than while they still read as a title.
	nearScale: 6,
	fadeFromScale: 2.6,
}

// The ground we leave from: one near ridge across the foot of the opening frame, so
// the page opens on a world rather than on empty space — and so the planet is hidden
// by something in the scene rather than by nothing being there. Cut from the same
// grid and the same shading as the arrival's range (see ENTRY and js/ridge.js), which
// is what makes the two ends of the trip the same world-building, but cold instead of
// warm: this is a night-side silhouette under starlight, not a dusk landscape.
export const DEPARTURE_RIDGE = {
	// Two bands, far behind near. The relief is the parallax between them: the far one
	// climbs slower under the camera and answers the cursor less, which is what gives
	// the opening frame depth rather than one flat cut-out.
	bands: [
		{
			// taller than the near band: further off, so its crests stand above them
			heightVh: 46,
			freq: 9,
			base: 0.2,
			amp: 0.4,
			seed: 47,
			slopeGain: 0.7,
			faceDepth: 20,
			// share of the climb and of the cursor's travel (px), far → less of both
			climb: 0.5,
			depth: 7,
			shades: [
				[7, 8, 13],
				[11, 13, 20],
				[15, 18, 26],
				[20, 23, 33],
				[25, 29, 40],
				[31, 36, 49],
			],
			crest: [54, 63, 84],
		},
		{
			// dark enough to stay a silhouette: at night a range this close is a shape
			// with a rim, not a lit landscape — the arrival is where the ground has colour
			heightVh: 28,
			freq: 7,
			base: 0.24,
			amp: 0.52,
			seed: 83,
			slopeGain: 0.9,
			faceDepth: 26,
			climb: 1,
			depth: 20,
			shades: [
				[6, 7, 11],
				[11, 13, 19],
				[17, 20, 28],
				[23, 27, 37],
				[30, 35, 47],
				[38, 44, 59],
			],
			crest: [66, 76, 100],
		},
	],
	// The climb, per world unit the flight covers: the horizon drops away and the
	// crests swell as we lift over them. Both come off the flight's own travel, so
	// the ridge, the motes and the name are all one movement. Kept slow — a range
	// this size is far off, and a foreground rock's drop rate would take the whole
	// opening beat away on the first flick of the wheel.
	dropVhPerUnit: 3,
	swellPerUnit: 0.05,
	// gone by this much of the pass — from here on the frame is open space
	goneFrom: 0.55,
	goneTo: 0.85,
	// Air stacked over the range, behind the silhouettes so the ridges mask their own
	// half of it: the ground meets the sky with atmosphere rather than a hard cut.
	airVh: 42,
	airFrom: 0.28,
	airTo: 0.92,
	air: 'rgba(96, 116, 160, 0.34)',
}

// Camera keyframes: where the planet sits at each beat, as its centre's offset
// from the viewport centre (vw / vh) plus the scale of the base 84vmin globe.
// The track eases between them — fly out empty, come around the planet, then dock
// before a station enters and hold while it reads. `fade` is the globe's
// opacity — solid the whole way, dropping to 0 only at `gone`, where the entry
// scene takes the sky over. The stations carry their own panels, so the world
// behind them never needs dimming.
// Extra channels beyond position/scale/fade:
//   roll   — cumulative extra longitude (turns) on top of JOURNEY.turns; ramping
//            it through the skim and the entry makes the ground rush past
//   tilt   — camera bank (deg): the world leans into the turns
//   light  — extra sun yaw (turns) on top of JOURNEY.sunTurns: swinging it while
//            the globe holds its distance is what reads as circling the thing
//   reveal — 0 keeps the planet out of the frame entirely (it is not even drawn);
//            crossing to 1 is it coming into being, growing out of a point
// A keyframe can leave any channel out and it holds at that channel's default.
// `orbitIn`/`orbitOut` are the circle: the globe keeps its distance and crosses
// the frame while its surface streams past and the terminator sweeps. `workEnd`/
// `lifeEnd` keep the holds drifting slowly so the trajectory never fully stops;
// `dive` is the low-orbit surface skim.
export const CAMERA = {
	// The departure is empty space: nothing in the frame but the name we are flying
	// at. The planet comes afterwards, up out of the gap the flight went through.
	rest: { x: 0, y: 0, scale: 0.05, fade: 1, roll: 0, tilt: 0, reveal: 0 },
	void: { x: 0, y: 0, scale: 0.06, fade: 1, roll: 0, tilt: 0, reveal: 0 },
	dot: { x: 0, y: 0, scale: 0.09, fade: 1, roll: 0, tilt: 0, reveal: 1 },
	close: { x: -4, y: 6, scale: 0.42, fade: 1, roll: 0.02, tilt: 0, light: 0.01 },
	// The circle. Going around a world turns the face it shows you and swings the sun
	// by the same angle, so `roll` and `light` advance together here — that pair,
	// under a globe holding its distance, is the orbit. The lateral run stays one-way
	// all the way to the dock: a body you are going around does not change direction
	// in the frame, and an out-and-back reads as a wobble rather than a circle.
	orbitIn: { x: -14, y: 2, scale: 0.55, fade: 1, roll: 0.06, tilt: -2, light: 0.03 },
	orbitOut: { x: -32, y: -2, scale: 0.62, fade: 1, roll: 0.16, tilt: -3, light: 0.1 },
	work: { x: -52, y: -4, scale: 1.35, fade: 1, roll: 0.22, tilt: -2, light: 0.1 },
	workEnd: { x: -50, y: -10, scale: 1.48, fade: 1, roll: 0.26, tilt: -1, light: 0.1 },
	dive: { x: 6, y: 58, scale: 3.4, fade: 1, roll: 0.62, tilt: 5, light: 0.1 },
	life: { x: 56, y: 2, scale: 1.7, fade: 1, roll: 0.72, tilt: 2, light: 0.1 },
	lifeEnd: { x: 53, y: -2, scale: 1.82, fade: 1, roll: 0.76, tilt: 1, light: 0.1 },
	// turning onto the approach axis: from here in it is a straight run down
	lineUp: { x: 0, y: 26, scale: 1.9, fade: 1, roll: 0.79, tilt: 0, light: 0.1 },
	// the descent: horizon at pin start, then the globe swells hard enough that
	// its crest leaves the top of the frame — from there the screen is nothing but
	// surface, which is what lets the sky take over without reading as a dissolve
	approach: { x: 0, y: 62, scale: 2.0, fade: 1, roll: 0.82, tilt: 0, light: 0.1 },
	entry: { x: 0, y: 100, scale: 8, fade: 1, roll: 1.17, tilt: 0, light: 0.1 },
	gone: { x: 0, y: 115, scale: 11, fade: 0, roll: 1.47, tilt: 0, light: 0.1 },
}

// Portrait screens: vmin is the narrow side, so the same scales render a far
// smaller globe — push in closer to keep the limb and horizon in frame.
export const CAMERA_PORTRAIT = {
	rest: { x: 0, y: 0, scale: 0.07, fade: 1, roll: 0, tilt: 0, reveal: 0 },
	void: { x: 0, y: 0, scale: 0.08, fade: 1, roll: 0, tilt: 0, reveal: 0 },
	dot: { x: 0, y: 0, scale: 0.12, fade: 1, roll: 0, tilt: 0, reveal: 1 },
	close: { x: -4, y: 6, scale: 0.6, fade: 1, roll: 0.02, tilt: 0, light: 0.01 },
	orbitIn: { x: -14, y: 2, scale: 0.7, fade: 1, roll: 0.06, tilt: -2, light: 0.03 },
	orbitOut: { x: -32, y: -2, scale: 0.78, fade: 1, roll: 0.16, tilt: -3, light: 0.1 },
	work: { x: -55, y: -6, scale: 1.6, fade: 1, roll: 0.22, tilt: -2, light: 0.1 },
	workEnd: { x: -53, y: -11, scale: 1.72, fade: 1, roll: 0.26, tilt: -1, light: 0.1 },
	dive: { x: 4, y: 46, scale: 4.4, fade: 1, roll: 0.62, tilt: 5, light: 0.1 },
	life: { x: 55, y: 0, scale: 2.0, fade: 1, roll: 0.72, tilt: 2, light: 0.1 },
	lifeEnd: { x: 52, y: -3, scale: 2.12, fade: 1, roll: 0.76, tilt: 1, light: 0.1 },
	lineUp: { x: 0, y: 18, scale: 2.3, fade: 1, roll: 0.79, tilt: 0, light: 0.1 },
	approach: { x: 0, y: 42, scale: 2.6, fade: 1, roll: 0.82, tilt: 0, light: 0.1 },
	entry: { x: 0, y: 58, scale: 19, fade: 1, roll: 1.17, tilt: 0, light: 0.1 },
	gone: { x: 0, y: 66, scale: 25, fade: 0, roll: 1.47, tilt: 0, light: 0.1 },
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
	// The puff sprite. A union of irregular lobes gives a shape that still reads
	// as a cloud; the noise warp on the boundary is what keeps it from reading as
	// clip art. Pure lobes come out as scalloped clip art, pure noise comes out
	// as an amoeba — it needs both.
	//   lobe*     spread, radii and how far each lobe rides above the base
	//   warp      noise pushed into the boundary, with `warpFreq` its scale
	//   baseAt    flat cumulus underside, `baseRuffle` keeps it off dead straight
	//   feather   band either side of the edge that gets dithered
	//   shadeDepth  how far light reaches below a crown, so lobes self-shadow
	cloud: {
		variants: 3,
		spriteW: 72,
		spriteH: 40,
		lobes: 5,
		lobeRx: [0.11, 0.21],
		lobeRy: [0.16, 0.34],
		lobeRise: [0.04, 0.26],
		lobeJitter: 0.18,
		warp: 0.34,
		warpFreq: 6,
		baseAt: 0.8,
		baseRuffle: 0.05,
		feather: 0.1,
		minNeighbours: 3,
		shadeDepth: 9,
		sideLight: 0.5,
		shades: [
			[150, 128, 128],
			[176, 154, 152],
			[200, 180, 176],
			[220, 202, 197],
			[236, 222, 216],
		],
	},

	// A dense, staggered stream: the deck has to be thick enough through the
	// takeover that the surface is gone before the sky is up.
	clouds: [
		{ left: 18, scale: 0.5, start: 0.22 },
		{ left: 74, scale: 0.42, start: 0.24 },
		{ left: 44, scale: 0.6, start: 0.26 },
		{ left: 8, scale: 0.72, start: 0.28 },
		{ left: 62, scale: 0.66, start: 0.3 },
		{ left: 32, scale: 0.85, start: 0.32 },
		{ left: 88, scale: 0.78, start: 0.34 },
		{ left: 52, scale: 1.5, start: 0.36 },
		{ left: 14, scale: 1.4, start: 0.38 },
		{ left: 70, scale: 1.7, start: 0.4 },
		{ left: 38, scale: 1.6, start: 0.42 },
		{ left: 84, scale: 1.35, start: 0.44 },
		{ left: 24, scale: 1.7, start: 0.46 },
		{ left: 58, scale: 1.55, start: 0.48 },
		{ left: 6, scale: 1.0, start: 0.5 },
		{ left: 78, scale: 1.25, start: 0.52 },
		{ left: 42, scale: 1.15, start: 0.55 },
		{ left: 66, scale: 0.95, start: 0.58 },
	],

	// Mouse parallax on the surface, same mechanism as the starfield backdrop:
	// pixels of travel per layer, against the cursor. Depths are on the same
	// scale as STAR_LAYERS so the two backdrops feel like one system. The sky
	// and the deck wash stay put — they are the medium, not objects in it.
	parallax: { stars: 4, cloud: 16, distant: 5, far: 11, near: 22 },

	// First stars of the evening, out over the dark top of the sky once we have
	// landed. A repeating tile (like the site starfield) so it scales to any
	// viewport, masked off before the horizon glow — you cannot see stars against
	// a bright horizon.
	stars: {
		tile: 150,
		count: 30,
		appearStart: 0.52,
		appearEnd: 0.76,
		maxOpacity: 0.9,
		colors: ['#ffffff', '#ffffff', '#f4e6dc', '#ffd9a8', '#d3d3d3'],
	},

	// Procedural ridgelines. The grid and the world are both at a fixed scale, so
	// a band is a window onto the range rather than the whole range squeezed into
	// the frame: `ridgeCellPx` is how big one cell lands on screen, and the noise
	// is walked at `ridgeRefCells` cells per `freq` cycle. A narrow viewport gets
	// fewer cells, so it shows a narrower crop — same chunk size, same slopes,
	// fewer peaks. Squeezing instead is what turned the phone range into a comb of
	// fine spikes: three times the peaks at a third of the cell size.
	ridgeCellPx: 5.6,
	ridgeRefCells: 256,
	// A cut costs a cell, so a very wide frame would pay for it on load. Past this
	// many cells the grid scales up instead — the whole sprite zooms, world and
	// all, which is how pixel art is supposed to meet a bigger screen.
	ridgeMaxCells: 400,
	ridgeSettle: 0.16,
	// Redraw threshold: mobile browsers fire resize as the URL bar hides, and
	// re-cutting three sprites mid-scroll for a few percent of height is not
	// worth the hitch. Width changes (rotation, a resized window) always redraw.
	ridgeReshape: 0.2,
	// Relief shading. Each column is lit by which way its face turns — its slope
	// in cells, which is its slope on screen, times the band's `slopeGain` (so 0.5
	// means a 45° face swings the light half a step). It is measured across
	// `ridgeSlopeSpan` cells so facets come out broad rather than one-column
	// stripes. The light then dies off over `faceDepth` cells below the crest, so
	// the lit face hugs the ridge and the mass beneath it sinks into shadow.
	// `ridgeLight` is the sun's side: -1 puts it stage left, matching the planet's
	// key.
	// Profile shape: ridged noise alone spikes off a flat plain, so it is blended
	// with the rolling octaves — crests stay sharp, but they rise out of shoulders.
	ridgeBlend: 0.62,
	// A very low frequency swell over the whole range, scaling each stretch's
	// amplitude. Without it every peak tops out at much the same height and the
	// range marches; with it there are tall massifs and low passes between them.
	ridgeMassifFreq: 1.7,
	ridgeMassifDepth: 0.5,
	// headroom so the tallest massif never clips flat against the sprite ceiling
	ridgeCeiling: 0.95,
	ridgeLight: -1,
	ridgeSlopeSpan: 2,
	ridgeDepthFade: 0.6,
	// crag texture broken across the faces, so a slope is not one flat wash;
	// its scale is in cells, so the crags stay the same size as the grid they
	// are cut on
	ridgeRough: 0.26,
	ridgeRoughCells: 7.5,
	// Furthest range, behind the other two: tallest silhouette but the least
	// contrast, since aerial perspective washes distance toward the sky. Finer
	// `freq` too — distance compresses the peaks together.
	distant: {
		revealAt: 0.52,
		liftVh: 6,
		heightVh: 58,
		freq: 10,
		base: 0.22,
		amp: 0.42,
		seed: 47,
		slopeGain: 0.3,
		faceDepth: 16,
		shades: [
			[96, 66, 60],
			[105, 73, 65],
			[114, 79, 70],
			[123, 86, 76],
			[132, 93, 81],
			[142, 100, 87],
		],
		crest: [156, 112, 95],
	},
	far: {
		revealAt: 0.56,
		liftVh: 10,
		heightVh: 50,
		freq: 9,
		base: 0.3,
		amp: 0.44,
		seed: 11,
		slopeGain: 0.5,
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
		heightVh: 33,
		freq: 5.5,
		base: 0.28,
		amp: 0.46,
		seed: 29,
		slopeGain: 0.98,
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
