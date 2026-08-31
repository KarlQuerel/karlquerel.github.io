// Tunables for the scroll-flight landing page (HomeJourney.vue): one planet,
// camera-choreographed from a distant dot to an atmosphere entry. Scroll owns
// every beat, so all motion here is scrubbed, never on a clock.

export const JOURNEY = {
	// Empty flight legs between stations (vh) — the travel that sells the approach.
	// All trimmed ~20% from their first cut (85/165/240): the flight read as travel,
	// but stretches with no words on screen outstayed the read.
	legVh: 70,
	// The departure leg is the longest: it carries the whole flight out — the pass
	// through the name, the void beyond it, the planet coming up dead ahead and the
	// camera coming around it — before the first station docks.
	heroLegVh: 103,
	// The longest leg: it carries the low-orbit surface skim and the held pass where the
	// ground streams past. Kept long — at 150 the drop and the hold had about one
	// viewport between them, which is not enough for two beats to read as two.
	diveLegVh: 175,
	// Baseline longitude turned across the whole journey; the camera track's
	// `roll` channel adds ground rush on top during the skim and the entry.
	turns: 0.45,
	// How far the sun swings around the planet over the trip (turns) — the
	// terminator advances as you orbit, and the landing arrives at dusk. The
	// camera's `light` channel spends part of this during the orbit, where the
	// sweep is the point; the two together still land the arrival at 0.22.
	sunTurns: 0.12,
	// The cursor's lean, in px of travel per layer. The whole ladder, nearest first:
	// the title plate (HERO_FLYBY.plateDepth 26) is the plane we fly through, then the
	// body copy — the reading matter rides just in front of the planet — then the
	// planet — the nearest thing in frame at a station, where it fills half of it —
	// then the ridge we lift off (DEPARTURE_RIDGE bands, 20 and 7), then the station
	// headings, which sit behind the planet and move less again. The ridge and the
	// planet are never in frame together, so their two claims on being near never meet.
	parallax: { planet: 22, heading: 10, body: 24 },
	// Where the departure's beats land, as fractions of the run from the top of the
	// page to the WORK dock. `void` has to sit past the end of the pass
	// (HERO_FLYBY.runVh, which is in viewports) so the planet stays out of the frame
	// until the words have gone — that is the whole point of the beat.
	departure: { void: 0.38, dot: 0.48, close: 0.61, orbitIn: 0.7, orbitOut: 0.85 },
	// Where the held stretch of the surface skim ends, as a fraction of the run from
	// the dive's apex to the LIFE dock. The apex alone was an in-and-out: the camera
	// dropped toward the deck and pulled straight back up, so the whole beat was the
	// planet swelling and shrinking. Holding position for a stretch while `roll` keeps
	// ripping is what converts it into speed — a surface streaming past a horizon that
	// barely moves is how the eye works out that the thing is enormous.
	skimHoldAt: 0.62,
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
	// The cursor's lean as a camera pan, in world units — projected per mote, so the
	// far field barely stirs and near sparks sweep hardest. Sized to land the visible
	// mid-field between the headings (10) and the planet (22) on the depth ladder.
	moteLean: 0.1,
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
	// A keyline the whole way round, painted by hand as eight offsets: the same
	// treatment the station headings carry (see the pixel-keyline mixin), in units of
	// the glyph's own grid so it holds at any magnification. Over a lit limb or a
	// cloud deck this is what keeps white and yellow words legible; the blurred
	// passes behind it are the glow the live type used to carry.
	plateKeyline: '#000000',
	plateKeylineEm: 0.08,
	plateShadow: 'rgba(0, 0, 0, 0.85)',
	plateShadowBlur: 12,
	// the role line's warm bloom — the name takes the dark pass and the keyline only
	plateGlow: 'rgba(255, 189, 46, 0.34)',
	plateGlowBlur: 26,
	// Past this scale the plate repaints bare - ink and keyline, no blurred passes.
	// The blurs exist to hold the words off a lit limb at rest; magnified thirty
	// times they are frame-sized grey washes smeared over the gate transit.
	bareFromScale: 5,
	plateDepth: 26,
	// The chrome holds back until the hero has gone by — the opening frame is meant to
	// be the name and nothing else — then rides the rest of the flight.
	chromeFrom: 0.85,
	chromeTo: 1.45,
	dustIn: 0.05,
	dustFull: 0.4,
	dustOut: 1.6,
	// How near the words get by the end. The pass flies into the Q: its counter has
	// to swallow the frame, and the arithmetic is unforgiving - after the keyline the
	// hole is ~3.7 design px tall (0.46em), so clearing a ~900px viewport needs scale
	// past 30 BEFORE the ink starts to go. 34-with-fade-from-18 dissolved the letter
	// while the hole was still inside the frame, which read as flying at the Q and
	// never through it. The dissolve now starts once the hole is taller than the
	// frame and finishes as its side strokes leave.
	nearScale: 60,
	fadeFromScale: 34,
	// Where the Q's counter sits inside its glyph box, in em of the glyph size,
	// relative to the box centre and the row middle. These are the /lab flyby's
	// measured Q_COUNTER values (read off the face at 16 device px per design px,
	// pen-origin x 0.4128 minus the half-em), not eyeballed: at nearScale an em of
	// error at rest is a frame of error at the end.
	qAxis: { x: -0.087, y: -0.108 },
}

// The ground we leave from: one near ridge across the foot of the opening frame, so
// the page opens on a world rather than on empty space — and so the planet is hidden
// by something in the scene rather than by nothing being there. Cut from the same
// grid and the same shading as the arrival's range (see ENTRY and js/ridge.js), which
// is what makes the two ends of the trip the same world-building, but cold instead of
// warm: this is a night-side silhouette under starlight, not a dusk landscape.
export const DEPARTURE_RIDGE = {
	// Two bands that read as two distances rather than two rims. The far one carries
	// the mountains: tall, and cut fine enough that a narrow frame still crops several
	// peaks out of it — but no finer. At freq 15 against a slopeGain of 0.55 the peaks
	// came out as a comb of narrow towers with flat, evenly striped faces, which the
	// eye read as a city skyline rather than a range. The arrival's own distant band
	// (freq 10) is the reference, and the steeper gain is what turns those flat faces
	// back into lit slopes. The near one is the ground we are standing on — low, near-black and
	// barely rimmed, because a flat band is only wrong when it is tall enough that the
	// eye expects a mountain. That was the mobile fault: two similar rims, both lit
	// hard enough to read as drawn contour lines rather than as lit edges.
	//
	// Crests sit close to the band's own top shade (the arrival's are 1.1x to 1.27x);
	// a bigger jump than that stops being a lit edge and becomes an outline.
	bands: [
		{
			heightVh: 44,
			freq: 10,
			base: 0.18,
			amp: 0.44,
			seed: 47,
			slopeGain: 0.82,
			faceDepth: 26,
			// share of the climb and of the cursor's travel (px), far → less of both
			climb: 0.5,
			depth: 7,
			// PALETTE's night ramp, with steps repeated to compress the contrast —
			// aerial perspective on a range this far off, and the same trick the
			// arrival's distant band uses.
			shades: ['void', 'pitch', 'iron', 'iron', 'zinc', 'zinc'],
			crest: 'frost',
		},
		{
			// the ground: dark enough to be a shape and not a landscape, and low enough
			// that its long stretches read as level ground rather than as a wall
			heightVh: 15,
			freq: 5,
			base: 0.3,
			amp: 0.4,
			seed: 83,
			slopeGain: 0.8,
			faceDepth: 14,
			climb: 1,
			depth: 20,
			// darker still: the ground underfoot is a shape, not a landscape
			shades: ['void', 'void', 'pitch', 'pitch', 'iron', 'iron'],
			crest: 'zinc',
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
	air: { colour: 'frost', alpha: 0.34 },
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
	// Held at the deck: x, y and scale barely move while roll gains a quarter turn.
	// Nothing about the frame changes except the ground going past.
	skim: { x: 10, y: 57, scale: 3.45, fade: 1, roll: 0.86, tilt: 4, light: 0.1 },
	life: { x: 56, y: 2, scale: 1.7, fade: 1, roll: 0.94, tilt: 2, light: 0.1 },
	lifeEnd: { x: 53, y: -2, scale: 1.82, fade: 1, roll: 0.98, tilt: 1, light: 0.1 },
	// turning onto the approach axis: from here in it is a straight run down
	lineUp: { x: 0, y: 26, scale: 1.9, fade: 1, roll: 1.01, tilt: 0, light: 0.1 },
	// the descent: horizon at pin start, then the globe swells hard enough that
	// its crest leaves the top of the frame — from there the screen is nothing but
	// surface, which is what lets the sky take over without reading as a dissolve
	approach: { x: 0, y: 62, scale: 2.0, fade: 1, roll: 1.04, tilt: 0, light: 0.1 },
	entry: { x: 0, y: 100, scale: 8, fade: 1, roll: 1.39, tilt: 0, light: 0.1 },
	gone: { x: 0, y: 115, scale: 11, fade: 0, roll: 1.69, tilt: 0, light: 0.1 },
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
	skim: { x: 8, y: 45, scale: 4.45, fade: 1, roll: 0.86, tilt: 4, light: 0.1 },
	life: { x: 55, y: 0, scale: 2.0, fade: 1, roll: 0.94, tilt: 2, light: 0.1 },
	lifeEnd: { x: 52, y: -3, scale: 2.12, fade: 1, roll: 0.98, tilt: 1, light: 0.1 },
	lineUp: { x: 0, y: 18, scale: 2.3, fade: 1, roll: 1.01, tilt: 0, light: 0.1 },
	approach: { x: 0, y: 42, scale: 2.6, fade: 1, roll: 1.04, tilt: 0, light: 0.1 },
	entry: { x: 0, y: 58, scale: 19, fade: 1, roll: 1.39, tilt: 0, light: 0.1 },
	gone: { x: 0, y: 66, scale: 25, fade: 0, roll: 1.69, tilt: 0, light: 0.1 },
}

// The final approach: horizon → limb blowout → atmosphere → surface. All
// fractions are of the approach runway.
export const ARRIVAL = {
	// Scroll runway on top of the one viewport the pin holds for (vh). 300 first;
	// trimmed with the legs so the descent plays at the same quickened pace.
	runwayVh: 215,
	// Camera keyframe positions along the runway (see CAMERA.entry / .gone).
	entryAt: 0.29,
	goneAt: 0.36,
	// The surface content arrives one piece at a time: heading, then each portal, then
	// the report chip. Item n crosses its threshold `contactStagger` after n-1, so the
	// last of the five is triggered by 0.88 — with the tail of the runway left over,
	// since landing on the last pixel of it is a miss. Only the trigger is here: the
	// pop each tile then plays is time-based, in JourneyArrival's own stylesheet.
	contactFadeStart: 0.66,
	contactStagger: 0.055,
	// The flight's own way-out chip leaves far earlier, on its own window: gone before
	// the first clouds are in frame (see ENTRY.cloudStream), so nothing from the trip is
	// still pinned over the atmosphere while we are descending through it. The portals
	// below surface later, on the window above.
	ctaFadeStart: 0.14,
	ctaFadeEnd: 0.22,
	// The entry's speed lines: the same mote field the departure flies through
	// (FlightDust), so arriving is told in the language leaving was told in. Fractions
	// of the runway, except `travel` — that is world units across the whole entry, and
	// since a mote's streak length *is* its speed it has to climb hard to read as a
	// descent rather than as drift. Out before the deck clears: past that we are under
	// the cloud base and slowing, and streaks would read as still falling.
	dustFrom: 0.12,
	dustFull: 0.28,
	dustOut: 0.66,
	dustTravel: 30,
	// Re-entry heat on those speed lines: they flush warm as the air bites and are
	// cool again under the deck. The ramp is palette steps walked by heat — bands,
	// never a blend — ending on ember, the site's own accent.
	heatFrom: 0.26,
	heatFull: 0.36,
	heatOut: 0.52,
	heatRamp: ['glow', 'ember'],
	// Atmosphere over the approach; the entry sky takes over from it. Full, not a
	// tint: it has to own the whole frame by the time the limb is gone (0.36) or the
	// stretch before the whiteout shows naked space from inside the planet. Starting
	// with the camera keyframes rather than at the runway's top keeps the surface
	// crossing crisp - the veil only climbs once we are actually going down.
	hazeStart: 0.18,
	hazeEnd: 0.36,
	hazeMax: 1,
}

// The entry scene (PlanetEntry.vue): cloud deck, sky takeover, ridgelines.
// Fractions are of the approach runway; colours echo the planet's palette.
export const ENTRY = {
	// The sky only starts once the limb has cleared the frame (see CAMERA.entry)
	// and the deck has closed over, so it never reads as a dissolve.
	skyStart: 0.42,
	skyFull: 0.6,
	// the whiteout while the camera is inside the deck — this is the cover the
	// sky handoff happens behind
	deck: { start: 0.38, peak: 0.5, end: 0.68, max: 0.92 },
	// Each cloud rushes up past the camera inside its own slice of the drop, swelling
	// (`cloudApproach`) and fanning off centre (`cloudSpread`) as it closes, so the deck
	// has depth rather than sliding past as a flat layer.
	//
	// The stream now begins at the whiteout's peak rather than ahead of it, so the flash
	// *reveals* the clouds as it clears instead of the clouds arriving first and the
	// flash landing on top of them. That inverts the physical order — you would meet the
	// deck before you were inside it — but it reads far better as a beat: hit the
	// atmosphere, flash, come out in cloud. Travel is shorter to match, so the stream
	// still clears before the portals surface.
	cloudTravel: 0.15,
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
		shades: ['stone', 'bone', 'chalk', 'cream', 'linen'],
	},

	// A dense, staggered stream: the deck has to be thick enough through the takeover
	// that the surface is gone before the sky is up. The puffs used to be a written-out
	// table, so every landing had identical weather; they are rolled per visit now (see
	// seedClouds in PlanetEntry) and these are the ranges the roll draws from. Scale
	// climbs through the stream - far puffs lead, near ones close it out - and the
	// stagger keeps the density the fixed table guaranteed.
	cloudStream: {
		count: 18,
		startAt: 0.5,
		stagger: 0.011,
		startJitter: 0.007,
		leftMin: 6,
		leftMax: 88,
		scaleFrom: 0.45,
		scaleTo: 1.6,
		scaleJitter: 0.4,
	},

	// Mouse parallax on the surface, same mechanism as the starfield backdrop:
	// pixels of travel per layer, against the cursor. Depths are on the same
	// scale as STAR_LAYERS so the two backdrops feel like one system. The sky
	// and the deck wash stay put — they are the medium, not objects in it.
	parallax: { stars: 4, cloud: 16, distant: 5, far: 11, near: 22 },

	// The dusk sky itself, dark top to bright horizon, dithered onto the same grid the
	// ranges are cut on. It was a CSS gradient — the last smooth surface in the scene
	// once the planet, the ranges, the decks and the hull were all stepped, and it
	// showed: a soft wash sitting directly on top of hard-dithered rock. `gamma` bends
	// the ramp so the bright band hugs the horizon rather than spreading up the frame.
	sky: ['void', 'ink', 'basalt', 'rust', 'ochre', 'clay', 'haze', 'sand'],
	skyGamma: 1.45,

	// The sun, drawn into the sky's own canvas so it shares the grid and the palette
	// and the ranges (separate canvases, in front) occlude it. It goes stage left
	// because that is where the light already comes from — ridgeLight is -1 and every
	// crest in the scene is lit from the left, so until now the picture had lighting
	// with no light source in it.
	//
	// `x`/`y` are fractions of the frame; `y` sits it on the distant range's crest line
	// so the range cuts across it. `r` is in grid cells. The corona brightens by
	// climbing the sky ramp rather than by adding light, exactly as the planet's limb
	// does — an additive glow would land between palette entries.
	sun: {
		x: 0.19,
		y: 0.66,
		r: 13,
		coronaR: 4,
		coronaLift: 5,
		disc: 'glow',
		rim: 'sand',
	},

	// First stars of the evening, out over the dark top of the sky, masked off before
	// the horizon glow — you cannot see stars against a bright horizon.
	//
	// Two layers at coprime tile sizes. One 150px tile was repeating about 58 times
	// across a desktop frame, on a grid tight enough that the eye read wallpaper rather
	// than randomness; 359 is prime and 512 is a power of two, so the combined pattern
	// only truly repeats at their least common multiple — some 183,000px, which is past
	// any viewport there will ever be. Density is matched to the site starfield
	// (constants/starfield.js) instead of the 15x it used to be, and the two layers
	// take different rungs on the parallax ladder so they part under the cursor.
	stars: {
		appearStart: 0.52,
		appearEnd: 0.76,
		maxOpacity: 0.9,
		colors: ['star', 'star', 'linen', 'glow', 'chalk'],
		layers: [
			{ tile: 359, count: 14, depth: 4 },
			{ tile: 512, count: 18, depth: 8 },
		],
		// A handful breathe and the rest hold still: twinkling the whole field reads as
		// noise. Motion on its own clock, so it is stepped by house rule.
		twinkle: { count: 4, periodMs: 2600, spreadVh: 34 },
	},

	// Traffic across the dusk sky — meteors and flocks, both on the shared spawner
	// (composables/useSkySpawner): a random gap, then the element removes itself.
	//
	// The sky itself holds still, which is the whole reason these read as travelling.
	// Drifting the star field instead would say the camera is still moving, and the
	// arrival has just spent three hundred viewports establishing that it is not.
	//
	// Rarer than the site starfield's comets, which fire every 3-8s because out there
	// you are crossing a whole sky. Three a minute over a landscape reads as a meteor
	// shower rather than as an evening.
	meteor: {
		gapMs: [9000, 22000],
		// the band of sky it crosses, and where it enters across the frame
		y: [3, 28],
		x: [-8, 55],
		angle: [14, 48],
		len: [34, 62],
		travelVw: [70, 105],
		durMs: [900, 1700],
		peak: [0.55, 0.9],
		tints: ['star', 'linen', 'glow'],
	},
	// Flying things, as authored frames rather than noise — '#' is a cell, anything else
	// is empty. At this size a bird is purely a silhouette against a lit sky, so one
	// colour is all it needs and the shape carries the whole read. Deliberately generic:
	// no Earth detail, so it says "something flies here" rather than "seagull".
	//
	// Every frame is left-right symmetric, which means a flock can cross in either
	// direction without ever needing to mirror the sprite.
	bird: {
		w: 13,
		h: 9,
		// A gull, four frames: wings high, swept level, arched down, level again — so the
		// cycle reads as one beat rather than snapping back. Drawn at 13x9 rather than
		// the 7x5 chevron it replaces, which is what buys the shape any character at all:
		// a tapered body with its mass forward, and wings swept back and thickened at the
		// shoulder. A wingspan about three times the body is what makes a silhouette read
		// as a bird and not as a blob.
		frames: [
			[
				'..##.....##..',
				'...##...##...',
				'....##.##....',
				'.....###.....',
				'....######...',
				'......###....',
				'.............',
				'.............',
				'.............',
			],
			[
				'.............',
				'.............',
				'.##.......##.',
				'..###...###..',
				'....######...',
				'......###....',
				'.............',
				'.............',
				'.............',
			],
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'....######...',
				'..###...###..',
				'.##.......##.',
				'.............',
				'.............',
			],
			[
				'.............',
				'.............',
				'.##.......##.',
				'..###...###..',
				'....######...',
				'......###....',
				'.............',
				'.............',
				'.............',
			],
		],
		// One tone on purpose. At this size a second shade reads as noise rather than as
		// form — the silhouette is the whole drawing, so the shape has to carry it.
		colour: 'void',
	},
	// A flock crosses rarely and slowly, low enough to be silhouetted against the bright
	// band of sky and sometimes across the sun. It doubles as a scale cue: birds are a
	// size everyone knows, so a range behind them gets its own size for free.
	flock: {
		// Rare and small: a pair or a trio going somewhere, not a migration. A flock
		// every minute or so is enough to make the sky feel inhabited; any more and
		// it stops being something you notice and becomes wallpaper with wings.
		gapMs: [36000, 84000],
		// Inclusive, and picked as a flat integer rather than by rounding a float — that
		// rounding put half of all flocks at exactly two birds. One bird on its own is
		// worth having in the mix: a lone gull reads as different weather to a trio.
		count: [1, 3],
		// The band matters more than the size did. At 34-64% most of a flock was crossing
		// the dark top of the sky, where a dark silhouette has nothing to be a silhouette
		// against — they were rendering perfectly and reading as nothing. Down here they
		// cross the lit half, and skim close enough to the crests to lend the ranges a
		// size while they do it.
		y: [50, 66],
		durMs: [16000, 27000],
		travelVw: [112, 128],
		driftVh: [-5, 3],
		// Sprite magnification. Whole steps only — a fractional scale lands the sprite's
		// cells on half pixels and the whole point of it is that they do not. One scale
		// per flock, so the group reads as being at one distance.
		scale: [3, 5],
		// The gap to the next bird along, rolled fresh for every one of them. This used
		// to be a single roll multiplied by the bird's index, which kept every gap in a
		// flock in step with the others — the spacing varied between flocks but was even
		// within one, and an even formation reads as a machine rather than as birds.
		gapPx: [16, 66],
		// Vertical scatter, also per bird, so no two ride at the same height.
		jitterPx: [-24, 24],
		// wingbeat; each bird takes its own phase so the flock never flaps in unison
		flapMs: [420, 700],
		peak: [0.72, 0.92],
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
		// highest up the ramp and hardest compressed: distance washes a range toward
		// the sky, which in a limited palette is fewer steps, not paler paint
		shades: ['ochre', 'ochre', 'clay', 'clay', 'clay', 'amber'],
		crest: 'amber',
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
		shades: ['basalt', 'rust', 'ochre', 'clay', 'amber', 'amber'],
		crest: 'sand',
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
		// the full ramp, shadow end included: the nearest range is the one with
		// contrast to spare, and its dark end is where the cool of the sky shows
		shades: ['void', 'ink', 'basalt', 'rust', 'ochre', 'clay'],
		crest: 'amber',
	},
}

// ---------------------------------------------------------------- route
// The journey's own line (JourneyRoute.vue): a dashed gold trace drawn in the page,
// from the departure pad under the hero down to the entry point where the arrival's
// approach lights take over. It runs straight through the WORK timeline at its rail
// centre - the route IS that spine, AboutWork draws none of its own - and skirts the
// station headings, which sit at negative z on landscape and must never have the
// line over their letters. Geometry is measured off the real layout at mount.
export const ROUTE = {
	// Where the line begins: this share of a viewport above the WORK station, running
	// in on one 45 sized to the room above the heading. It used to be born at the
	// hero gate; starting beside the content reads calmer and keeps the hero clean.
	startAboveVh: 0.3,
	// Corners are flown, not cornered: the line enters each turn this far before the
	// vertex and arcs through it. crispEdges quantises the arc into pixel steps, so
	// a turn reads as an 8-bit curve rather than a vector swoosh.
	turnPx: 36,
	// clearance kept around station headings
	headMarginPx: 18,
	// how far left of the LIFE column's edge its stretch of the line runs
	gutterPx: 36,
	// LIFE zigzags: the line runs a flank beside each chapter - left of the cards,
	// then right of them, back and forth - crossing the frame in the fixed gap
	// between chapters on a hexagonal jog: a short 45 chamfer off each flank and a
	// straight run between them. WORK stays straight on purpose: the career is the
	// direct line, life swings side to side.
	// pad = clearance kept off the cards above and below.
	crossPadPx: 40,
	// the least horizontal run a jog may keep between its chamfers - a crossing
	// that cannot afford it is skipped, the line staying on its flank
	crossMinRunPx: 120,
	// the chamfer's 45s, one off each flank around the straight run - hexagon
	// vertices rather than swept elbows, short enough to fit the chapter gaps
	crossChamferPx: 56,
	// where in the viewport the tip diamond rides
	tipFrac: 0.55,
	// How far into the arrival runway the line runs, and the viewport share kept
	// between the last jog and the arrival's top. Solved against the orbit fade
	// below: the tip touches the entry diamond just as the chart dissolves.
	endRunFrac: 0.17,
	endLeadVh: 0.15,
	// The chart leaves as the orbit begins - once the planet owns the frame the
	// route has done its job. Fade window, in arrival-runway fractions.
	orbitOutAt: 0.02,
	orbitOutSpan: 0.14,
	// The dive aims at the world rather than at the frame: by the arrival the planet
	// has swung back into the middle of the shot, so steering the last leg onto its
	// centre keeps the two together if the camera is ever retuned. Clamped this far
	// in from either edge, so a camera change can never throw the dive off screen.
	diveAimBand: 0.3,
	// How many straight steps a corner arc is walked in, at most - a small arc takes
	// proportionally fewer. The browser draws the real curve; this is only what the
	// reveal masks and the tip ride, and walking the arc rather than chording it is
	// what lets the dart's heading turn through a corner instead of sitting on one
	// averaged angle and then snapping to the next leg.
	curveSteps: 12,
	nodePx: 7,
	// The tip is a dart, not a diamond, so its heading reads. Local space, nose along
	// +x; the transform turns it onto the path tangent. A square has four-fold
	// symmetry - rotating one to the heading shows nothing at all.
	tipNosePx: 6,
	tipShoulderPx: 1.5,
	tipHalfPx: 3.5,
	tipTailPx: 4,
}
