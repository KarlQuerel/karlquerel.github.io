// Tunables for the scroll-flight landing page (HomeJourney.vue): one planet, camera-choreographed
// from a distant dot to an atmosphere entry.

export const JOURNEY = {
	// Empty flight legs between stations (vh) — the travel that sells the approach.
	legVh: 70,
	// The departure leg is the longest: it carries the whole flight out — the pass
	// through the name, the void beyond it, the planet coming up dead ahead and the
	// camera coming around it — before the first station docks.
	heroLegVh: 103,
	// The longest leg: it carries the low-orbit surface skim and the held pass where the ground
	// streams past.
	diveLegVh: 175,
	// Baseline longitude turned across the whole journey; the camera track's
	// `roll` channel adds ground rush on top during the skim and the entry.
	turns: 0.45,
	// How far the sun swings around the planet over the trip (turns) — the terminator advances as you
	// orbit, and the landing arrives at dusk.
	sunTurns: 0.12,
	// The cursor's lean, in px of travel per layer, nearest first. The ridge and the planet
	// are never in frame together, so their two claims on being near never meet.
	parallax: { planet: 22, heading: 10, body: 24 },
	// Where the departure's beats land, as fractions of the run to the WORK dock. `void`
	// must sit past the end of the pass (HERO_FLYBY.runVh, which is in viewports).
	departure: { void: 0.38, dot: 0.48, close: 0.61, orbitIn: 0.7, orbitOut: 0.85 },
	// The far world before it is a world: a few px of globe reads as a smudge, so a bright
	// dot the size of STAR_LAYERS' near plane stands in until the disc can carry it.
	spark: { size: 3, shade: 'linen', fadeFrom: 0.009, fadeTo: 0.021 },
	// Where the held stretch of the surface skim ends, as a fraction of the apex -> LIFE dock run.
	skimHoldAt: 0.62,
	// Where the camera finishes turning onto the approach axis, as a fraction of the leg from the foot
	// of LIFE to the pinned runway.
	lineUpAt: 0.55,
	// The cloud deck thins as the camera's scale channel climbs, untouched at `from` to clear
	// at `to`: up close the deck reads as a checker laid over the ground, not as weather.
	cloudThin: { from: 2.6, to: 3.6 },
}

// The landing's boot (App.vue, composables/useBoot.js): the frame is held until the departure has
// cut its ground and the title's face is in.
export const LANDING_BOOT = { maxWaitMs: 4000 }

// The departure flyby: the camera's axis runs through the counter of the Q. The lockup is
// a plane square-on to the view, so the whole pass is one scale about that point.
export const HERO_FLYBY = {
	// Scroll the pass takes, in viewports. Long enough that lifting over the ridge and
	// the words going by are two beats rather than one flick.
	runVh: 0.55,
	// The depth cue (FlightDust): motes standing still in the world while the camera runs
	// through them, sharing the pass's camera so nothing streaks on its own clock.
	titleZ: 16,
	fovDeg: 58,
	// The flight spools up rather than snapping to speed: this much of the pass is spent getting
	// there.
	spoolUp: 0.28,
	// The camera is not on rails down the middle — it eases across as it goes, so the pass reads as a
	// trajectory rather than as everything swelling out of one fixed point.
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
	// The cursor's lean as a camera pan, in world units — projected per mote, so the far field barely
	// stirs and near sparks sweep hardest.
	moteLean: 0.1,
	moteColor: 'rgb(199, 217, 255)',
	// backing-store downscale, as the warp does it: one mote is one art pixel
	motePixelScale: 2,
	// The field wakes with the engines and is gone once the planet is up. Fractions of the
	// pass, so it can outlast it.
	plateMaxDpr: 2,
	// A keyline the whole way round, painted as eight offsets in units of the glyph's own
	// grid, so it holds at any magnification.
	plateKeyline: '#000000',
	plateKeylineEm: 0.08,
	plateShadow: 'rgba(0, 0, 0, 0.85)',
	plateShadowBlur: 12,
	// the role line's warm bloom — the name takes the dark pass and the keyline only
	plateGlow: 'rgba(255, 189, 46, 0.34)',
	plateGlowBlur: 26,
	// Past this scale the plate repaints bare - ink and keyline, no blurred passes.
	bareFromScale: 5,
	plateDepth: 26,
	// The chrome holds back until the hero has gone by — the opening frame is meant to
	// be the name and nothing else — then rides the rest of the flight.
	chromeFrom: 0.85,
	chromeTo: 1.45,
	dustIn: 0.05,
	dustFull: 0.4,
	dustOut: 1.6,
	// How near the words get by the end. The pass flies into the Q, so its counter has to
	// swallow the frame - and the porthole is only 3 design px (0.375em).
	nearScale: 60,
	fadeFromScale: 37,
	// Where the Q's counter sits in its glyph box, in em relative to the box centre and the
	// row middle - read off the painted plate at one texel per design pixel, not eyeballed.
	qAxis: { x: -0.064, y: -0.194 },
	// The porthole: that same 3x3 square in em, cut back out of the plate after every pass
	// is laid down, because everything the plate paints spills inward.
	qPort: 0.36,
}

// The ground we leave from: a moon across the foot of the opening frame, so the planet is
// hidden by something in the scene rather than by nothing being there.
export const DEPARTURE_RIDGE = {
	// Three layers back to front on one grid (ENTRY.ridgeCellPx): a distant range that is
	// hills and nothing else, the plain out to the horizon, and the ground underfoot.
	bands: [
		{
			// The range, a long way off. Peaks, not domes — the old highland rim of some basin — catching the
			// sun on their facets against the black.
			heightVh: 32,
			seed: 61,
			horizon: 0.45,
			roll: 0,
			curve: 4,
			// Broad massifs, not peaks: nothing on an airless world stays sharp. Lit
			// brighter than the hills in front — there is no haze to dim distance, and
			// a sunlit face on the horizon is the brightest thing a moon shows.
			hills: {
				depth: 70,
				step: 1,
				peaks: {
					count: 16,
					overhang: 0.15,
					zMin: 8,
					rMin: 22,
					rMax: 48,
					hMin: 4,
					hMax: 13,
					power: 1.2,
					shape: 1.25,
					// the tallest massif stands under the destination star, and the
					// notch is bitten out of it (x as a share of the frame's width)
					big: [{ at: 0.64, z: 30, r: 46, h: 16 }],
				},
				texture: { amp: 0.4, cells: 9 },
				gain: 1.2,
				shadowSteps: 8,
				seam: 0.1,
				shades: ['pitch', 'iron', 'steel', 'zinc', 'frost', 'rime'],
				crest: ['zinc', 'frost', 'rime', 'bone'],
				// under the destination star (star.leftVw): the gap the flight leaves
				// through
				notch: { at: 0.64, z: 26, r: 26, depth: 12 },
			},
			climb: 0.6,
			depth: 3,
		},
		{
			heightVh: 32,
			seed: 47,
			horizon: 0.45,
			roll: 2,
			curve: 4,
			// rounded, worn hills: low domes, sparse, lit as the range behind them is —
			// nearer, so never darker than it where the sun lands
			hills: {
				depth: 40,
				step: 1,
				peaks: {
					count: 13,
					overhang: 0.1,
					zMin: 3,
					rMin: 18,
					rMax: 44,
					hMin: 2,
					hMax: 6,
					power: 1.3,
					shape: 1.3,
					big: [],
				},
				texture: { amp: 0.4, cells: 7 },
				gain: 1.05,
				shadowSteps: 6,
				seam: 0.1,
				// one step under the range behind, and a dark crest: the edge that tells
				// a nearer layer from a farther one is drawn dark, not bright
				shades: ['pitch', 'iron', 'steel', 'zinc'],
				crest: ['pitch', 'soot', 'iron', 'steel'],
			},
			plain: {
				squash: [0.3, 0.5],
				spread: 0.45,
				// how much darker the ground is at this band's foot than at its far edge
				nearShade: 0.1,
				// Few, and in a clear order: one hero basin, one medium companion, a
				// handful of small ones. A field of like-sized rings is bubble wrap.
				craters: {
					count: 12,
					rMin: 4,
					rMax: 11,
					power: 2.2,
					// the hero basin, its companion, and a chain of secondaries thrown
					// out of the basin — the debris a big impact leaves in a line
					big: [
						{ x: 30, y: 22, r: 11 },
						{ x: -96, y: 12, r: 6 },
						{ x: -40, y: 30, r: 6.5 },
						{ x: 47, y: 30, r: 3 },
						{ x: 54, y: 33, r: 2.6 },
						{ x: 41, y: 35, r: 2.4 },
					],
				},
				boulders: { count: 8, big: [] },
				pocks: 28,
				lines: [
					// the rille, left of centre
					{
						y: 16,
						wander: 8,
						cells: 40,
						halfWidth: 2.4,
						height: -2,
						from: -150,
						to: 0,
						taper: 30,
					},
					// its raised twin, a wrinkle ridge running off to the right
					{
						y: 13,
						wander: 6,
						cells: 50,
						halfWidth: 3,
						height: 1.8,
						from: 50,
						to: 200,
						taper: 30,
					},
				],
				shades: ['pitch', 'iron', 'steel', 'zinc', 'frost', 'rime', 'bone'],
			},
			// share of the climb and of the cursor's travel (px), far → less of both
			climb: 0.8,
			depth: 7,
		},
		{
			heightVh: 9,
			seed: 83,
			horizon: 0.3,
			roll: 4,
			curve: 0,
			plain: {
				squash: [0.5, 0.65],
				spread: 0.15,
				nearShade: 0.16,
				rise: { amp: 1.5, depth: 8 },
				// small only: a bowl wider than this band's few rows of ground gets
				// sliced by its top edge and reads as a stack of plates
				craters: { count: 4, rMin: 3, rMax: 5, power: 2, big: [] },
				boulders: {
					count: 4,
					big: [
						{ x: -24, y: 10, r: 2.6 },
						{ x: 88, y: 6, r: 2.2 },
					],
				},
				pocks: 10,
				shades: ['pitch', 'iron', 'steel', 'zinc', 'frost', 'rime', 'bone'],
			},
			climb: 1,
			depth: 20,
		},
	],
	// Shared by every band: the light, and the shapes of things.
	moon: {
		// The sun, as a direction: x stage left is negative (the planet's key, the side ENTRY.ridgeLight
		// names), y toward the camera is positive, z up.
		sun: [-1, 0.35, 0.42],
		// There is no skylight; `ambient` only lifts the shade end off the ramp's floor so the plain sits
		// where a crater has steps to carve both ways.
		ambient: 0.1,
		shade: 0.5,
		gain: 1.15,
		// The shadow march: samples along the ground toward the sun, each `grow` times further
		// than the last. Reach is ~14 cells, the tallest thing on the plain being three cells.
		shadow: { steps: 8, first: 0.7, grow: 1.45, skipBelow: 0.08 },
		// dither only this far (in ramp steps) either side of a boundary; solid elsewhere
		seam: 0.05,
		// passes of the tidy (js/ridge.js tidySprite): orphan cells become their
		// neighbours, so no pixel stands alone unless it was put there on purpose
		tidyPasses: 2,
		// the horizon's wander, in cells per fbm cycle
		rollCells: 48,
		// the ground between the craters: broad swells and fine regolith, as cells of
		// height over cells of wavelength
		swell: { amp: 5, cells: 70 },
		// the regolith's grain, stretched across the frame (cells) more than down it:
		// ground at a low angle shows streaks, not specks
		rough: { amp: 0.3, cellsX: 11, cellsY: 3.5 },
		// albedo, not height: mare against highland, ±amp over `cells`
		mare: { amp: 0.08, cells: 55 },
		// ejecta rays off the biggest crater, from `from` to `reach` radii out
		rays: {
			from: 1.1,
			reach: 3.6,
			gain: 0.34,
			count: 7,
			sharpness: 8,
			wobble: 4,
			wobbleFreq: 3,
		},
		// One crater, in radii. `depth` and `rimHeight` are [fresh, worn]; the floor is flat
		// inside `floor` ([small, basin]); past peakR a crater carries a central peak.
		crater: {
			depth: [0.3, 0.12],
			rimHeight: [0.2, 0.1],
			rimWidth: 0.18,
			ejectaTo: 1.8,
			ejectaGain: 0.05,
			floor: [0.45, 0.55],
			basinR: 9,
			peakR: 10,
			peak: 0.55,
			peakAt: 0.18,
			freshAge: 0.15,
			freshBelow: 0.45,
			freshGain: 0.1,
			freshTo: 1.7,
		},
		// boulders: radius range in cells, height as a share of radius, and how many
		// radii out the bump is still evaluated
		boulder: { rMin: 0.9, rMax: 2.3, height: 1.3, reach: 2.5 },
		// The hand-placed boulders wear a sprite over their bump: at two or three cells a shaded bump is a
		// blob, and what reads as a rock is a lit shoulder on the sun side, a dark flank, and a hard
		// shadow on the ground beside it.
		boulderSprites: {
			bigFrom: 3,
			big: [
				[-1, 4, 3, -1, -1],
				[4, 3, 2, 1, -1],
				[3, 2, 1, 0, 0],
			],
			small: [
				[4, 3, -1, -1],
				[3, 2, 1, 0],
			],
		},
		// pocks land from this share of the band's depth down, biased toward the camera
		pockFrom: 0.25,
		pockNearBias: 0.7,
	},
	// The climb, per world unit flown: the horizon drops away and the crests swell. Both come
	// off the flight's own travel, so the ridge, the motes and the name are one movement.
	dropVhPerUnit: 5.5,
	swellPerUnit: 0.05,
	// The things at infinity — the galaxy and the glints — cannot drop away, so they
	// alone fade, over this stretch of the pass; the scene is gone at goneTo.
	goneFrom: 0.55,
	goneTo: 0.85,
	// Authored, not rolled — same contract as ENTRY.ridgeSeed: change the number
	// to audition a new opening range.
	ridgeSeed: 18,
	// The destination: one warm star over the notch the range was bitten for, on screen from
	// the first frame so the journey has somewhere it is pointed.
	star: {
		aboveCells: 6,
		depth: 6,
		core: 'glow',
		arm: 'ember',
		tip: 'haze',
		periodMs: 3200,
		dim: 0.35,
		delayMs: 0,
	},
	// The sky above the ground, on the same grid (js/sky.js). Black - no air - with the
	// off-frame sun's glow low left. `depth` is the canvas's cursor lean, in px.
	sky: {
		depth: 12,
		glintDepth: 18,
		// The sun's glow: centre and reach as shares of the frame (y is the horizon), `power` the
		// falloff, dithered the whole way (`seam` wide) - a ringed gradient would band.
		sunGlow: {
			x: -0.05,
			y: 0.82,
			rx: 0.5,
			ry: 0.3,
			power: 1.2,
			seam: 0.45,
			wobble: 0.16,
			wobbleFreq: 5,
			shades: ['ink', 'deep', 'slate'],
		},
		// The galaxy (js/sky.js): a band from `from` to `to` (shares of the frame), `width` of the
		// frame's height across, bowing `bow` half-widths toward the top at its middle.
		galaxy: {
			from: [0, 0.08],
			to: [1, 0.38],
			width: 0.18,
			bow: 0.15,
			wander: 0.8,
			wanderCells: 2.5,
			reach: 2.2,
			amp: 1,
			taper: 0.45,
			falloff: 2.4,
			bulge: 1,
			bulgeWiden: 0.15,
			bulgeAt: 0.7,
			bulgeWidth: 0.3,
			clouds: [
				{
					cells: 36,
					octaves: 2,
					stretch: 2.5,
					depth: 1.4,
				},
				{
					cells: 6,
					octaves: 3,
					stretch: 4,
					depth: 0.8,
				},
			],
			// the Great Rift down most of the run, and the fork that leaves it halfway
			rifts: [
				{
					span: [0.12, 0.95],
					ease: 0.15,
					offset: -0.25,
					wander: 0.6,
					wanderCells: 4,
					width: 0.4,
					swell: 0.7,
					depth: 0.6,
				},
				{
					span: [0.35, 0.8],
					ease: 0.12,
					offset: 0.45,
					wander: 0.5,
					wanderCells: 5,
					width: 0.2,
					swell: 0.6,
					depth: 0.5,
				},
			],
			dust: {
				cells: 10,
				octaves: 3,
				stretch: 3,
				depth: 1.5,
				power: 1.6,
				reach: 1.3,
			},
			seam: 0.45,
			// a whisper a step or two above the sky, dithered the whole way like the sun's glow
			haze: ['ink', 'deep'],
			stars: 0.12,
			starPow: 1.6,
			starThrough: 0.15,
			sparks: 0.02,
			sparkPow: 3,
			brightStars: 0.004,
			clusterCells: 12,
			clusterAbove: 0.56,
			clusterGain: 1.6,
			faint: ['zinc', 'ash', 'frost'],
			faintSkew: 2,
			spark: ['stone', 'bone'],
			bright: ['chalk', 'cream', 'star'],
			brightArm: 'ash',
		},
		// Meteors on the shared spawner (useSkySpawner): rare, one every ten to twenty seconds -
		// a landscape, not a shower - and on the grid.
		meteor: {
			gapMs: [10000, 22000],
			x: [0.05, 0.7],
			y: [0.02, 0.26],
			msPerCell: 12,
			shades: ['star', 'chalk', 'bone', 'stone', 'ash'],
		},
		// Each is a five-cell cross: a core, arms one cell out that breathe between full and `dim`, and
		// tips two cells out that blink on the off-beat — the two-frame twinkle every 8-bit sky has had.
		glints: [
			{
				x: 0.21,
				y: 0.17,
				core: 'star',
				arm: 'chalk',
				tip: 'bone',
				periodMs: 2600,
				dim: 0.3,
				delayMs: 0,
			},
			{
				x: 0.86,
				y: 0.27,
				core: 'star',
				arm: 'bone',
				tip: 'stone',
				periodMs: 3100,
				dim: 0.35,
				delayMs: 900,
			},
			{
				x: 0.55,
				y: 0.09,
				core: 'linen',
				arm: 'chalk',
				tip: 'bone',
				periodMs: 2200,
				dim: 0.3,
				delayMs: 1600,
			},
			{
				x: 0.08,
				y: 0.36,
				core: 'chalk',
				arm: 'bone',
				tip: 'stone',
				periodMs: 3600,
				dim: 0.3,
				delayMs: 500,
			},
		],
	},
}

// Camera keyframes: the planet's centre as an offset from the viewport centre (vw/vh),
// plus the scale of the base 84vmin globe. The track eases between them.
export const CAMERA = {
	// The destination is in frame from the first pixel, sat in the Q's porthole: the camera's
	// axis runs through that hole, so the far world is exactly what you see through it.
	rest: { x: 0, y: 0, scale: 0.006, fade: 1, roll: 0, tilt: 0 },
	void: { x: 0, y: 0, scale: 0.045, fade: 1, roll: 0, tilt: 0 },
	dot: { x: 0, y: 0, scale: 0.09, fade: 1, roll: 0, tilt: 0 },
	close: { x: -4, y: 6, scale: 0.42, fade: 1, roll: 0.02, tilt: 0, light: 0.01 },
	// The circle. `roll` and `light` advance together, since going around a world turns the
	// face it shows you and swings the sun by the same angle.
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
	// no porthole here: the narrow frame stacks the name into two rows, so the world
	// hangs in the band between them (see HERO_FLYBY.qAxis / HeroTitle's `stacked`)
	rest: { x: 0, y: 0, scale: 0.014, fade: 1, roll: 0, tilt: 0 },
	void: { x: 0, y: 0, scale: 0.1, fade: 1, roll: 0, tilt: 0 },
	dot: { x: 0, y: 0, scale: 0.14, fade: 1, roll: 0, tilt: 0 },
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
	// The surface content arrives one piece at a time. Item n crosses its threshold
	// `contactStagger` after n-1, so the last of the five is triggered by 0.88.
	contactFadeStart: 0.66,
	contactStagger: 0.055,
	// The flight's own way-out chip leaves far earlier, on its own window: gone before the first
	// clouds are in frame (see ENTRY.cloudStream), so nothing from the trip is still pinned over the
	// atmosphere while we are descending through it.
	ctaFadeStart: 0.14,
	ctaFadeEnd: 0.22,
	// The entry's speed lines: the same mote field the departure flies through (FlightDust).
	// Fractions of the runway, except `travel`, which is world units.
	dustFrom: 0.12,
	dustFull: 0.28,
	dustOut: 0.66,
	dustTravel: 30,
	// Re-entry heat on those speed lines: they flush warm as the air bites and are cool again under
	// the deck.
	heatFrom: 0.26,
	heatFull: 0.36,
	heatOut: 0.52,
	heatRamp: ['glow', 'ember'],
	// Atmosphere over the approach. Full, not a tint: it has to own the whole frame by the
	// time the limb is gone (0.36), or the stretch before the whiteout shows naked space.
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
	// Each cloud rushes past inside its own slice of the drop, swelling (`cloudApproach`) and
	// fanning off centre (`cloudSpread`) as it closes, so the deck has depth.
	cloudTravel: 0.15,
	cloudFromVh: 110,
	cloudToVh: -70,
	cloudApproach: 3.8,
	cloudSpread: 1.1,
	// The puff sprite: a union of irregular lobes with a noise warp on the boundary. Pure
	// lobes come out as clip art, pure noise as smoke.
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

	// A dense, staggered stream: the deck has to be thick enough through the takeover that
	// the surface is gone before the sky is up.
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

	// The chimney's smoke, drawn as DOM over the near band (the rock is a static cut; this is
	// the one thing on it that moves). A whole cell per step, on its own clock.
	smoke: {
		puffs: 10,
		periodMs: 7000,
		puffCells: 2,
		riseCells: 24,
		driftCells: 8,
		// each puff's own share of the wind rolls between this and 2 minus it
		driftMin: 0.45,
		grow: 3,
		shade: 'cream',
		peak: 0.55,
	},

	// Mouse parallax on the surface, same mechanism as the starfield backdrop: pixels of travel per
	// layer, against the cursor.
	parallax: { stars: 4, cloud: 16, distant: 5, far: 11, near: 22 },

	// The dusk sky, dark top to bright horizon, dithered onto the same grid the ranges are cut on.
	sky: [
		'void',
		'ink',
		'slate',
		'basalt',
		'shale',
		'rust',
		'ochre',
		'brick',
		'clay',
		'flare',
		'haze',
		'dune',
		'sand',
	],
	skyGamma: 1.45,
	// The sky only STARTS as a ramp of y: left at that, every level set of a smooth field is
	// one continuous curve across the frame, so a stack of them reads as stripes.
	skyField: {
		drift: 1.3,
		// Wide and shallow, not square: sampled this way the haze comes out in long horizontal streaks —
		// cirrus catching the last of the sun — instead of round blooms.
		driftCells: 130,
		driftRows: 20,
		mottle: 0.5,
		mottleCells: 2.4,
	},
	// How much of the gap between two rungs carries the checker; 0.5 is all of it. The rock
	// wants a narrow seam - a face has an edge - and the sky wants the opposite.
	skySeam: 0.5,
	// and scattered inside each Bayer level, because a full-width dither over an area
	// this size is exactly where the lattice shows (see ditherThreshold)
	skyJitter: 1,

	// The sun, drawn into the sky's own canvas so it shares the grid and the palette and the
	// ranges in front occlude it. Stage left, where the light already comes from.
	sun: {
		x: 0.19,
		y: 0.66,
		r: 13,
		coronaR: 4,
		coronaLift: 7,
		disc: 'glow',
		rim: 'sand',
	},

	// First stars of the evening, masked off before the horizon glow - you cannot see stars
	// against a bright horizon. Two layers at coprime tile sizes, so neither repeat lines up.
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

	// Traffic across the dusk sky, both on the shared spawner (useSkySpawner): a random gap,
	// then the element removes itself.
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
	// Flying things as authored frames - '#' is a cell, anything else is empty. At this size a
	// bird is a silhouette, so one colour is all it needs.
	bird: {
		w: 13,
		h: 9,
		// A gull, four frames: wings high, swept level, arched down, level again, so the cycle
		// reads as one beat rather than snapping back.
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
	// A flock crosses rarely and slowly, low enough to be silhouetted against the bright band of sky
	// and sometimes across the sun.
	flock: {
		// Small and frequent: a lone gull or a pair going somewhere, not a migration. Spawn to
		// spawn; a crossing takes 16-27s.
		gapMs: [14000, 30000],
		// Inclusive, and picked as a flat integer rather than by rounding a float.
		count: [1, 2],
		// The band matters more than the size. At 34-64% most of a flock crossed the dark top of
		// the sky, where a dark silhouette has nothing to be a silhouette against.
		y: [50, 66],
		durMs: [16000, 27000],
		travelVw: [112, 128],
		driftVh: [-5, 3],
		// Sprite magnification. Whole steps only — a fractional scale lands the sprite's cells on half
		// pixels and the whole point of it is that they do not.
		scale: [3, 5],
		// Clear air from one bird's wingtip to the next, in sprite cells rather than px, so the
		// spacing grows with the flock's scale. Rolled fresh for every bird.
		gapCells: [10, 32],
		// Vertical scatter, also per bird and in cells, so no two ride at the same height.
		jitterCells: [-6, 6],
		// wingbeat; each bird takes its own phase so the flock never flaps in unison
		flapMs: [420, 700],
		peak: [0.72, 0.92],
	},

	// Procedural ridgelines. The grid and the world are both at a fixed scale, so a band is a
	// window onto the range: `ridgeCellPx` is how big one cell lands on screen.
	ridgeCellPx: 5.6,
	ridgeRefCells: 256,
	// A cut costs a cell, so a very wide frame would pay for it on load. Past this
	// many cells the grid scales up instead — the whole sprite zooms, world and
	// all, which is how pixel art is supposed to meet a bigger screen.
	ridgeMaxCells: 400,
	ridgeSettle: 0.16,
	// Redraw threshold: mobile browsers fire resize as the URL bar hides, and re-cutting three sprites
	// mid-scroll for a few percent of height is not worth the hitch.
	ridgeReshape: 0.2,
	// Relief shading: each column is lit by its slope in cells times the band's `slopeGain`,
	// so 0.5 means a 45 degree face swings the light half a step.
	ridgeBlend: 0.62,
	// A very low frequency swell over the whole range, scaling each stretch's amplitude.
	ridgeMassifFreq: 1.7,
	ridgeMassifDepth: 0.5,
	// headroom so the tallest massif never clips flat against the sprite ceiling
	ridgeCeiling: 0.95,
	ridgeLight: -1,
	ridgeSlopeSpan: 2,
	// Cells either side that the shading terrain is averaged over before the slope is
	// taken. The silhouette keeps the raw profile; only the light is smoothed.
	ridgeReliefBlur: 4,
	ridgeDepthFade: 0.6,
	// Skylight on the shade side. The depth fade alone drives every turned-away face onto ramp index
	// 0, which in both scenes is the same near-black — so shadow had no hue and the ranges read as cut
	// paper.
	ridgeAmbient: 0.14,
	// crag texture broken across the faces, so a slope is not one flat wash; its scale is in cells, so
	// the crags stay the same size as the grid they are cut on
	ridgeRough: 0.26,
	ridgeRoughCells: 7.5,
	// How much the crag texture's strength itself varies, over `ridgeRoughVaryCells`
	// — several times the crag scale, so it makes patches of shattered and smooth
	// rock rather than modulating each crag on its own.
	ridgeRoughVary: 0.75,
	ridgeRoughVaryCells: 46,
	// How hard the shading is pushed toward solid steps (an S-curve on the lit
	// value before the dither picks one).
	ridgeContrast: 0.85,
	// The dither's own width, as a share of the gap between two ramp steps: the checker lives inside
	// this window and the rest of every band is solid (see seamIndex).
	ridgeSeam: 0.16,
	// Orphan-cell passes over each cut range, as the departure's ground gets — a lone cell of one
	// shade inside another is what a generated sprite has and a drawn one does not.
	tidyPasses: 2,
	// Strata: darker seams every `strataSpacing` cells, `strataWidth` of a bed wide, undulating by
	// `strataWobble` cells per `strataWobbleCells` — bedded stone instead of noise.
	strataSpacing: 7,
	strataWidth: 0.18,
	strataWobble: 6,
	strataWobbleCells: 18,
	// Cells the beds fall per cell across, the whole range sharing one tilt — one
	// tectonic history, so the seams stay parallel from massif to massif.
	strataDip: 0.35,
	// A bed wider than `strataWidth` by this share of the roll bites two steps deep
	// instead of one, and no seam is drawn where the rock is already this dark.
	strataDeepAt: 0.72,
	strataMinLit: 0.32,
	// How far off the regular pitch a bed's seam may sit, as a share of one spacing — enough that
	// consecutive seams land unevenly and the bedding stops reading as a ruled grid.
	strataJitter: 0.55,
	// How far the sun's warmth reaches into bands flagged `sunGlow` (cells), and
	// how many ramp steps it can promote at the disc itself.
	sunGlowCells: 45,
	sunGlowLevels: 3,
	// The arrival range is authored, not rolled: one fixed seed so every visit gets the composition
	// that was chosen by eye — snowcaps, passes and the habitat's spot included.
	ridgeSeed: 18,
	// The snowline's meander, in cells per fbm cycle — shared by every band that
	// carries snow, so both ends of the trip crown their ranges on the same scale.
	snowRuffleCells: 24,
	// How a cap answers to prominence rather than to altitude alone, shared for the same reason.
	snowProminence: { cells: 16, base: 0.25, ref: 0.05 },
	// Furthest range, behind the other two: tallest silhouette but the least contrast, since aerial
	// perspective washes distance toward the sky.
	distant: {
		sunGlow: true,
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
		// the sky, which in a limited palette is a shorter walk of adjacent steps —
		// not paler paint, and not the same step written three times
		shades: ['ochre', 'brick', 'clay', 'flare', 'amber'],
		crest: 'amber',
		// `lift` is how far toward its palest step the foot goes, reached `depth` below the crest
		// and eased by `power`. No hue rotation in this band's ramp on purpose.
		haze: { lift: 0.55, depth: 0.55, power: 1.4 },
		// The tallest silhouette in the frame, so the high country is here. Aerial perspective is
		// kept by compressing the ramp rather than by rotating the hue.
		snow: {
			line: 0.5,
			ruffle: 0.12,
			depth: 0.9,
			aspect: 2,
			gully: 0.45,
			gullyCells: 9,
			edge: 2,
			minCap: 3.5,
			minRun: 5,
			// Aerial perspective on snow is the shadow end lifting toward the sky, not the lit end dimming: at
			// this range a cap is a pale patch with almost no contrast in it.
			shades: ['chalk', 'cream'],
			crest: 'cream',
		},
	},
	far: {
		sunGlow: true,
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
		shades: ['shale', 'garnet', 'ochre', 'clay', 'flare', 'amber'],
		crest: 'sand',
		haze: { lift: 0.38, depth: 0.5, power: 1.5 },
		// Alpenglow snowcaps, per peak rather than per altitude: how far a summit pokes above the
		// ruffled snowline sets how deep its cap hangs, `depth` scaling it into cells.
		snow: {
			line: 0.48,
			ruffle: 0.12,
			depth: 1.3,
			aspect: 3,
			gully: 0.5,
			gullyCells: 8,
			edge: 2,
			// 1.2 was tuned against a line nothing reached, so nothing tested it. With the line down where the
			// crest actually is, a long flat ridge just over it wore a one-cell strip of white down its whole
			// length — the outline this cull exists to prevent.
			minCap: 3,
			minRun: 5,
			// one rung of the same ladder: floor off the near band's ash, ceiling
			// under its linen, so the contrast inside a cap collapses with distance
			shades: ['bone', 'chalk', 'cream'],
			crest: 'cream',
		},
	},
	near: {
		sunGlow: true,
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
		shades: ['void', 'ink', 'shale', 'garnet', 'ochre', 'clay'],
		crest: 'amber',
		// the near caps keep a cool shadow end — snow in shade is brighter than
		// rock in shade, but it is not lit
		snow: {
			line: 0.54,
			ruffle: 0.12,
			depth: 1.5,
			aspect: 3,
			gully: 0.5,
			gullyCells: 7,
			edge: 2,
			minCap: 3,
			minRun: 4,
			shades: ['ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
			crest: 'linen',
		},
		// The habitat: one dome low on the nearest range, with one steady ember doorway under
		// SEND ME A SIGNAL - someone lives here, and can be reached. Width in cells.
		habitat: {
			w: 21,
			h: 9,
			// The shell's light, gathered on a real hemisphere normal: `sun` off a cosine, `sky` off
			// how far the facet is turned up, `ambient` the floor neither reaches.
			sun: 0.78,
			sky: 0.34,
			ambient: 0.06,
			sunUp: 0.45,
			sunFront: 0.55,
			panels: 5,
			panelSeam: 0.075,
			// how far a seam dips the light, and how near the crown they run before
			// fading — every meridian meets at the apex and a hard join blots there
			panelDip: 0.17,
			panelTop: 0.8,
			// how far the shell's lowest visible cell goes down — its skirt, and the
			// dark line at the floor that stops it hovering
			footDip: 0.26,
			rimLift: 0.3,
			// how much of its own light the shell keeps whatever the ground is doing
			bed: 0.55,
			// cells of shell below the ground line — the part that is dug in — and the least that has to stand
			// above it for a column to be drawn at all.
			sink: 2,
			minRise: 2,
			shades: ['ink', 'basalt', 'rust', 'ochre'],
			rim: 'amber',
			light: 'ember',
			glow: 'glow',
			// The doorway's pool: `spillR` cells of reach, squashed by `spillSquash` so it runs along
			// the ground, `spillDrop` cells below the sill so it falls in front of the door.
			spillShades: ['basalt', 'rust', 'ochre', 'amber'],
			spillR: 9,
			spillSquash: 1.45,
			spillDrop: 2,
			spillPower: 1.6,
			shadowLen: 5,
			// The chimney: a short stack off the crown, on the sun side so its lip catches the last light.
			vent: { at: -4, h: 2 },
			pathSpread: 5,
			pathMeander: 5,
			pathWanderCells: 14,
			pathShades: ['ash', 'stone'],
		},
	},
}

// ---- route
// The journey's own line (JourneyRoute.vue): a dashed gold trace drawn in the page, from
// the departure pad under the hero down to the entry point.
export const ROUTE = {
	// Where the line begins: this share of a viewport above the WORK station, running in on one 45
	// sized to the room above the heading.
	startAboveVh: 0.3,
	// Corners are flown, not cornered: the line enters each turn this far before the
	// vertex and arcs through it. crispEdges quantises the arc into pixel steps, so
	// a turn reads as an 8-bit curve rather than a vector swoosh.
	turnPx: 36,
	// clearance kept around station headings
	headMarginPx: 18,
	// how far left of the LIFE column's edge its stretch of the line runs
	gutterPx: 36,
	// LIFE zigzags: the line runs a flank beside each chapter, left of the cards then right,
	// crossing the frame in the fixed gap between chapters on a hexagonal jog.
	crossPadPx: 40,
	// the least horizontal run a jog may keep between its chamfers - a crossing
	// that cannot afford it is skipped, the line staying on its flank
	crossMinRunPx: 120,
	// the chamfer's 45s, one off each flank around the straight run - hexagon
	// vertices rather than swept elbows, short enough to fit the chapter gaps
	crossChamferPx: 56,
	// where in the viewport the tip diamond rides
	tipFrac: 0.55,
	// How far into the arrival runway the line runs, and the viewport share kept between the last jog
	// and the arrival's top.
	endRunFrac: 0.17,
	endLeadVh: 0.15,
	// The chart leaves as the orbit begins - once the planet owns the frame the
	// route has done its job. Fade window, in arrival-runway fractions.
	orbitOutAt: 0.02,
	orbitOutSpan: 0.14,
	// The dive aims at the world rather than at the frame: by the arrival the planet has swung back
	// into the middle of the shot, so steering the last leg onto its centre keeps the two together if
	// the camera is ever retuned.
	diveAimBand: 0.3,
	// How many straight steps a corner arc is walked in, at most. The browser draws the real
	// curve; this is only what the reveal masks and the tip ride.
	curveSteps: 12,
	nodePx: 7,
	// The tip is a dart, not a diamond, so its heading reads. Local space, nose along +x; the
	// transform turns it onto the path tangent.
	tipNosePx: 6,
	tipShoulderPx: 1.5,
	tipHalfPx: 3.5,
	tipTailPx: 4,
}
