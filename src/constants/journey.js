// Tunables for the scroll-flight landing (HomeJourney.vue): a camera run from dot to entry.

export const JOURNEY = {
	// Empty flight legs between stations (vh) — the travel that sells the approach.
	legVh: 70,
	// The departure leg carries the whole flight out before the first station docks.
	heroLegVh: 103,
	// The longest leg: the low-orbit skim and the held pass where the ground streams past.
	diveLegVh: 175,
	// Baseline longitude turned over the journey; the track's `roll` adds ground rush on top.
	turns: 0.45,
	// The sun's swing around the planet (turns): the terminator advances, so landing is at dusk.
	sunTurns: 0.12,
	// Cursor lean, px per layer, nearest first. Ridge and planet never share a frame.
	parallax: { planet: 22, heading: 10, body: 24 },
	// Departure beats, as fractions of the run to WORK. `void` must sit past HERO_FLYBY.runVh.
	departure: { void: 0.38, dot: 0.48, close: 0.61, orbitIn: 0.7, orbitOut: 0.85 },
	// A few px of globe reads as a smudge, so a bright dot stands in until the disc can carry it.
	spark: { size: 3, shade: 'linen', fadeFrom: 0.009, fadeTo: 0.021 },
	// Where the held stretch of the surface skim ends, as a fraction of the apex -> LIFE dock run.
	skimHoldAt: 0.62,
	// Where the camera finishes turning onto the approach axis (fraction of LIFE -> runway).
	lineUpAt: 0.55,
	// The deck thins as the camera's scale climbs: up close a checker over ground is not weather.
	cloudThin: { from: 2.6, to: 3.6 },
}

// The landing's boot (useBoot): the frame is held until the departure cut and the title are in.
export const LANDING_BOOT = { maxWaitMs: 4000 }

// Departure flyby: the axis runs through the Q's counter, so the pass is one scale about it.
export const HERO_FLYBY = {
	// Scroll the pass takes (viewports). Long enough that the lift and the words are two beats.
	runVh: 0.55,
	// Depth cue (FlightDust): motes held in the world, on the pass's camera so nothing streaks alone.
	titleZ: 16,
	fovDeg: 58,
	// The flight spools up rather than snapping to speed.
	spoolUp: 0.28,
	// The camera eases across as it goes, so the pass reads as a trajectory, not a swell.
	driftVw: 3.5,
	driftVh: -1.6,
	motes: 1500,
	moteBox: 13,
	// Tail length in world units, times each mote's share: speed up close, points of light far off.
	moteTail: 0.36,
	// Motes nearer than this are behind the lens — they project wider than the frame.
	moteNear: 0.35,
	// Cursor lean as a camera pan (world units), per mote: the near sparks sweep hardest.
	moteLean: 0.1,
	moteColor: 'rgb(199, 217, 255)',
	// backing-store downscale, as the warp does it: one mote is one art pixel
	motePixelScale: 2,
	plateMaxDpr: 2,
	// A keyline all the way round, as eight offsets in the glyph's own grid, so it holds at any scale.
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
	// Chrome holds back until the hero has gone by — the opening frame is the name alone.
	chromeFrom: 0.85,
	chromeTo: 1.45,
	// The field wakes with the engines and is gone once the planet is up (fractions of the pass).
	dustIn: 0.05,
	dustFull: 0.4,
	dustOut: 1.6,
	// How near the words get. The pass flies into the Q, whose porthole is only 3 design px (0.375em).
	nearScale: 60,
	fadeFromScale: 37,
	// Where the Q's counter sits in its glyph box (em from box centre/row middle), read off the plate.
	qAxis: { x: -0.064, y: -0.194 },
	// The porthole: that 3x3 em square, re-cut after every pass, since the plate spills inward.
	qPort: 0.36,
}

// The ground we leave from: a moon across the foot of the frame, hiding the planet with scenery.
export const DEPARTURE_RIDGE = {
	// Three layers back to front on one grid (ENTRY.ridgeCellPx): far range, plain, ground underfoot.
	bands: [
		{
			// The range, far off: peaks not domes, catching the sun on their facets against the black.
			heightVh: 32,
			seed: 61,
			horizon: 0.45,
			roll: 0,
			curve: 4,
			// Broad massifs, not peaks; lit brighter than the hills in front — no haze dims distance.
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
					// the tallest massif stands under the destination star, with the notch bitten out of it
					big: [{ at: 0.64, z: 30, r: 46, h: 16 }],
				},
				texture: { amp: 0.4, cells: 9 },
				gain: 1.2,
				shadowSteps: 8,
				seam: 0.1,
				shades: ['pitch', 'iron', 'steel', 'zinc', 'frost', 'rime'],
				crest: ['zinc', 'frost', 'rime', 'bone'],
				// under the destination star (star.leftVw): the gap the flight leaves through
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
			// worn hills: low domes, sparse, never darker than the range behind where the sun lands
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
				// one step under the range behind, with a dark crest: the nearer layer's edge is drawn dark
				shades: ['pitch', 'iron', 'steel', 'zinc'],
				crest: ['pitch', 'soot', 'iron', 'steel'],
			},
			plain: {
				squash: [0.3, 0.5],
				spread: 0.45,
				// how much darker the ground is at this band's foot than at its far edge
				nearShade: 0.1,
				// Few, in a clear order: one hero basin, a companion, a few small — like sizes read as bubble wrap.
				craters: {
					count: 12,
					rMin: 4,
					rMax: 11,
					power: 2.2,
					// the hero basin, its companion, and a chain of secondaries thrown out in a line
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
				// small only: a bowl wider than this band's few rows gets sliced by its top edge
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
		// The sun as a direction: x stage left negative, y toward camera positive, z up.
		sun: [-1, 0.35, 0.42],
		// No skylight; `ambient` only lifts the shade end off the ramp's floor.
		ambient: 0.1,
		shade: 0.5,
		gain: 1.15,
		// Shadow march toward the sun, each step `grow` further. Reach ~14 cells; nothing is over three.
		shadow: { steps: 8, first: 0.7, grow: 1.45, skipBelow: 0.08 },
		// dither only this far (in ramp steps) either side of a boundary; solid elsewhere
		seam: 0.05,
		// tidy passes (js/ridge.js tidySprite): orphan cells become their neighbours
		tidyPasses: 2,
		// the horizon's wander, in cells per fbm cycle
		rollCells: 48,
		// the ground between craters: broad swells and fine regolith, as cells of height over wavelength
		swell: { amp: 5, cells: 70 },
		// the regolith's grain, stretched across the frame more than down it: low angles show streaks
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
		// One crater, in radii. `depth`/`rimHeight` are [fresh, worn]; past peakR it carries a central peak.
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
		// boulders: radius in cells, height as a share of radius, and how far out the bump still counts
		boulder: { rMin: 0.9, rMax: 2.3, height: 1.3, reach: 2.5 },
		// A sprite over the bump: at two or three cells a shaded bump is a blob, not a rock.
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
	// The climb per world unit flown, off the flight's travel so ridge, motes and name move as one.
	dropVhPerUnit: 5.5,
	swellPerUnit: 0.05,
	// Things at infinity cannot drop away, so they alone fade; the scene is gone at goneTo.
	goneFrom: 0.55,
	goneTo: 0.85,
	// Authored, not rolled (as ENTRY.ridgeSeed): change the number to audition a new range.
	ridgeSeed: 18,
	// The destination: one warm star over the notch, in frame from the first paint.
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
	// The sky over the ground (js/sky.js). Black — no air — with the off-frame sun's glow low left.
	sky: {
		depth: 12,
		glintDepth: 18,
		// The sun's glow: centre and reach as frame shares, `power` the falloff, dithered so it cannot band.
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
		// The galaxy (js/sky.js): a band `from`-`to`, `width` of frame height, bowing `bow` half-widths.
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
		// Meteors on the shared spawner (useSkySpawner): one every ten to twenty seconds, on the grid.
		meteor: {
			gapMs: [10000, 22000],
			x: [0.05, 0.7],
			y: [0.02, 0.26],
			msPerCell: 12,
			shades: ['star', 'chalk', 'bone', 'stone', 'ash'],
		},
		// A five-cell cross: core, arms that breathe, tips blinking on the off-beat — the 8-bit twinkle.
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

// Camera keyframes: the planet's centre offset from viewport centre (vw/vh) plus globe scale.
export const CAMERA = {
	// The destination sits in the Q's porthole from the first pixel — the axis runs through that hole.
	rest: { x: 0, y: 0, scale: 0.006, fade: 1, roll: 0, tilt: 0 },
	void: { x: 0, y: 0, scale: 0.045, fade: 1, roll: 0, tilt: 0 },
	dot: { x: 0, y: 0, scale: 0.09, fade: 1, roll: 0, tilt: 0 },
	close: { x: -4, y: 6, scale: 0.42, fade: 1, roll: 0.02, tilt: 0, light: 0.01 },
	// The circle. `roll` and `light` advance together: going around a world turns its face and the sun.
	orbitIn: { x: -14, y: 2, scale: 0.55, fade: 1, roll: 0.06, tilt: -2, light: 0.03 },
	orbitOut: { x: -32, y: -2, scale: 0.62, fade: 1, roll: 0.16, tilt: -3, light: 0.1 },
	work: { x: -52, y: -4, scale: 1.35, fade: 1, roll: 0.22, tilt: -2, light: 0.1 },
	workEnd: { x: -50, y: -10, scale: 1.48, fade: 1, roll: 0.26, tilt: -1, light: 0.1 },
	dive: { x: 6, y: 58, scale: 3.4, fade: 1, roll: 0.62, tilt: 5, light: 0.1 },
	// Held at the deck: x, y and scale barely move while roll gains a quarter turn.
	skim: { x: 10, y: 57, scale: 3.45, fade: 1, roll: 0.86, tilt: 4, light: 0.1 },
	life: { x: 56, y: 2, scale: 1.7, fade: 1, roll: 0.94, tilt: 2, light: 0.1 },
	lifeEnd: { x: 53, y: -2, scale: 1.82, fade: 1, roll: 0.98, tilt: 1, light: 0.1 },
	// turning onto the approach axis: from here in it is a straight run down
	lineUp: { x: 0, y: 26, scale: 1.9, fade: 1, roll: 1.01, tilt: 0, light: 0.1 },
	// The descent: the globe swells until its crest leaves the frame, so the sky can take over.
	approach: { x: 0, y: 62, scale: 2.0, fade: 1, roll: 1.04, tilt: 0, light: 0.1 },
	entry: { x: 0, y: 100, scale: 8, fade: 1, roll: 1.39, tilt: 0, light: 0.1 },
	gone: { x: 0, y: 115, scale: 11, fade: 0, roll: 1.69, tilt: 0, light: 0.1 },
}

// Portrait: vmin is the narrow side, so the same scales render a smaller globe — push in closer.
export const CAMERA_PORTRAIT = {
	// no porthole here: the narrow frame stacks the name, so the world hangs between the rows
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

// The final approach: horizon -> limb blowout -> atmosphere -> surface, in runway fractions.
export const ARRIVAL = {
	// Scroll runway on top of the viewport the pin holds (vh), trimmed with the legs to keep the pace.
	runwayVh: 215,
	// Camera keyframe positions along the runway (see CAMERA.entry / .gone).
	entryAt: 0.29,
	goneAt: 0.36,
	// Surface content arrives one piece at a time, item n staggered after n-1; the last fires by 0.88.
	contactFadeStart: 0.66,
	contactStagger: 0.055,
	// The way-out chip leaves early, gone before the first clouds (ENTRY.cloudStream).
	ctaFadeStart: 0.14,
	ctaFadeEnd: 0.22,
	// The entry's speed lines: the departure's mote field (FlightDust). Runway fractions but `travel`.
	dustFrom: 0.12,
	dustFull: 0.28,
	dustOut: 0.66,
	dustTravel: 30,
	// Re-entry heat on the speed lines: warm as the air bites, cool again under the deck.
	heatFrom: 0.26,
	heatFull: 0.36,
	heatOut: 0.52,
	heatRamp: ['glow', 'ember'],
	// Atmosphere over the approach — full, not a tint: it must own the frame by the time the limb goes.
	hazeStart: 0.18,
	hazeEnd: 0.36,
	hazeMax: 1,
}

// The entry scene (PlanetEntry.vue): cloud deck, sky takeover, ridgelines, in runway fractions.
export const ENTRY = {
	// The sky starts only once the limb has cleared and the deck closed, so it is never a dissolve.
	skyStart: 0.42,
	skyFull: 0.6,
	// the whiteout inside the deck — the cover the sky handoff happens behind
	deck: { start: 0.38, peak: 0.5, end: 0.68, max: 0.92 },
	// Each cloud rushes past in its own slice of the drop, swelling and fanning off centre.
	cloudTravel: 0.15,
	cloudFromVh: 110,
	cloudToVh: -70,
	cloudApproach: 3.8,
	cloudSpread: 1.1,
	// The puff: irregular lobes with a noise-warped boundary. Pure lobes are clip art, pure noise smoke.
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

	// A dense, staggered stream: thick enough that the surface is gone before the sky is up.
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

	// The chimney's smoke, DOM over the near band — the one moving thing on a static cut.
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

	// Mouse parallax on the surface, as the starfield does it: px of travel per layer.
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
	// The sky only STARTS as a ramp of y: level sets of a smooth field would read as stripes.
	skyField: {
		drift: 1.3,
		// Wide and shallow: sampled this way the haze comes out as cirrus streaks, not round blooms.
		driftCells: 130,
		driftRows: 20,
		mottle: 0.5,
		mottleCells: 2.4,
	},
	// How much of the gap between rungs carries the checker; the rock wants a narrow seam, the sky wide.
	skySeam: 0.5,
	// and scattered inside each Bayer level, since a full-width dither is where the lattice shows
	skyJitter: 1,

	// The sun, drawn into the sky's canvas so it shares the grid and the ranges occlude it.
	sun: {
		x: 0.19,
		y: 0.66,
		r: 13,
		coronaR: 4,
		coronaLift: 7,
		disc: 'glow',
		rim: 'sand',
	},

	// First stars, masked off before the horizon glow. Two coprime tile sizes, so no repeat lines up.
	stars: {
		appearStart: 0.52,
		appearEnd: 0.76,
		maxOpacity: 0.9,
		colors: ['star', 'star', 'linen', 'glow', 'chalk'],
		layers: [
			{ tile: 359, count: 14, depth: 4 },
			{ tile: 512, count: 18, depth: 8 },
		],
		// A handful breathe and the rest hold still: twinkling the whole field reads as noise.
		twinkle: { count: 4, periodMs: 2600, spreadVh: 34 },
	},

	// Traffic across the dusk sky, on the shared spawner (useSkySpawner): a random gap, then removal.
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
	// Flying things as authored frames — '#' is a cell. At this size a bird is a silhouette.
	bird: {
		w: 13,
		h: 9,
		// A gull, four frames: high, level, arched, level, so the cycle is one beat and does not snap back.
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
		// One tone on purpose: at this size a second shade reads as noise, not form.
		colour: 'void',
	},
	// A flock crosses rarely and slowly, low enough to be silhouetted against the bright band.
	flock: {
		// Small and frequent: a lone gull or a pair, not a migration. Spawn to spawn; a crossing is 16-27s.
		gapMs: [14000, 30000],
		// Inclusive, and picked as a flat integer rather than by rounding a float.
		count: [1, 2],
		// The band matters more than the size: higher up, a dark silhouette has nothing to sit against.
		y: [50, 66],
		durMs: [16000, 27000],
		travelVw: [112, 128],
		driftVh: [-5, 3],
		// Sprite magnification, whole steps only — a fractional scale lands cells on half pixels.
		scale: [3, 5],
		// Clear air between wingtips, in sprite cells so spacing grows with scale. Rolled per bird.
		gapCells: [10, 32],
		// Vertical scatter, also per bird and in cells, so no two ride at the same height.
		jitterCells: [-6, 6],
		// wingbeat; each bird takes its own phase so the flock never flaps in unison
		flapMs: [420, 700],
		peak: [0.72, 0.92],
	},

	// Procedural ridgelines: grid and world are at fixed scale, so `ridgeCellPx` sets a cell on screen.
	ridgeCellPx: 5.6,
	ridgeRefCells: 256,
	// Past this many cells the grid scales up instead — how pixel art is meant to meet a bigger screen.
	ridgeMaxCells: 400,
	ridgeSettle: 0.16,
	// Redraw threshold: mobile fires resize as the URL bar hides, and re-cutting mid-scroll hitches.
	ridgeReshape: 0.2,
	// Relief shading: a column is lit by its slope in cells times the band's `slopeGain`.
	ridgeBlend: 0.62,
	// A very low frequency swell over the whole range, scaling each stretch's amplitude.
	ridgeMassifFreq: 1.7,
	ridgeMassifDepth: 0.5,
	// headroom so the tallest massif never clips flat against the sprite ceiling
	ridgeCeiling: 0.95,
	ridgeLight: -1,
	ridgeSlopeSpan: 2,
	// Cells either side that shading terrain is averaged over; the silhouette keeps the raw profile.
	ridgeReliefBlur: 4,
	ridgeDepthFade: 0.6,
	// Skylight on the shade side: without it the depth fade drives every turned face to near-black.
	ridgeAmbient: 0.14,
	// crag texture broken across the faces, scaled in cells so crags match the grid they sit on
	ridgeRough: 0.26,
	ridgeRoughCells: 7.5,
	// How much the crag strength itself varies, over several crag scales — patches, not per-crag noise.
	ridgeRoughVary: 0.75,
	ridgeRoughVaryCells: 46,
	// How hard shading is pushed toward solid steps (an S-curve before the dither picks).
	ridgeContrast: 0.85,
	// The dither's width, as a share of the gap between ramp steps; the rest of a band is solid.
	ridgeSeam: 0.16,
	// Orphan-cell passes over each cut range: a lone cell inside another is generated, not drawn.
	tidyPasses: 2,
	// Strata: darker seams every `strataSpacing` cells, `strataWidth` wide, undulating — bedded stone.
	strataSpacing: 7,
	strataWidth: 0.18,
	strataWobble: 6,
	strataWobbleCells: 18,
	// Cells the beds fall per cell across, one tilt for the whole range so seams stay parallel.
	strataDip: 0.35,
	// A bed this much wider bites two steps deep; none is drawn on already-dark rock.
	strataDeepAt: 0.72,
	strataMinLit: 0.32,
	// How far off pitch a seam may sit, so the bedding stops reading as a ruled grid.
	strataJitter: 0.55,
	// How far the sun's warmth reaches into `sunGlow` bands (cells), and the steps it promotes at the disc.
	sunGlowCells: 45,
	sunGlowLevels: 3,
	// The arrival range is authored: one fixed seed, so every visit gets the composition chosen by eye.
	ridgeSeed: 18,
	// The snowline's meander (cells per fbm cycle), shared by every band that carries snow.
	snowRuffleCells: 24,
	// How a cap answers to prominence rather than to altitude alone, shared for the same reason.
	snowProminence: { cells: 16, base: 0.25, ref: 0.05 },
	// Furthest range: tallest silhouette, least contrast — aerial perspective washes it toward the sky.
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
		// highest up the ramp and hardest compressed: distance is a shorter walk of adjacent steps
		shades: ['ochre', 'brick', 'clay', 'flare', 'amber'],
		crest: 'amber',
		// `lift` is how far toward the palest step the foot goes, `depth` below the crest, eased by `power`.
		haze: { lift: 0.55, depth: 0.55, power: 1.4 },
		// The tallest silhouette in frame. Aerial perspective by compressing the ramp, not rotating hue.
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
			// Aerial perspective on snow lifts the shadow end, not dims the lit: a pale patch, little contrast.
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
		// dark -> lit ramp; the far band sits nearer the sky's tone throughout.
		shades: ['shale', 'garnet', 'ochre', 'clay', 'flare', 'amber'],
		crest: 'sand',
		haze: { lift: 0.38, depth: 0.5, power: 1.5 },
		// Alpenglow caps per peak: how far a summit pokes over the snowline sets how deep its cap hangs.
		snow: {
			line: 0.48,
			ruffle: 0.12,
			depth: 1.3,
			aspect: 3,
			gully: 0.5,
			gullyCells: 8,
			edge: 2,
			// A long flat ridge just over the line wore a one-cell strip of white; this cull prevents that.
			minCap: 3,
			minRun: 5,
			// one rung of the same ladder: floor off the near band's ash, ceiling under its linen
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
		// the full ramp, shadow end included: the nearest range has contrast to spare
		shades: ['void', 'ink', 'shale', 'garnet', 'ochre', 'clay'],
		crest: 'amber',
		// the near caps keep a cool shadow end — snow in shade is brighter than rock, but not lit
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
		// The habitat: one dome low on the nearest range, an ember doorway under SEND ME A SIGNAL.
		habitat: {
			w: 21,
			h: 9,
			// The shell's light on a real hemisphere normal: `sun` off a cosine, `sky` off how far it turns up.
			sun: 0.78,
			sky: 0.34,
			ambient: 0.06,
			sunUp: 0.45,
			sunFront: 0.55,
			panels: 5,
			panelSeam: 0.075,
			// how far a seam dips the light, and how near the crown they run — meridians blot at the apex
			panelDip: 0.17,
			panelTop: 0.8,
			// how far the shell's lowest visible cell goes down: the skirt that stops it hovering
			footDip: 0.26,
			rimLift: 0.3,
			// how much of its own light the shell keeps whatever the ground is doing
			bed: 0.55,
			// cells of shell below the ground line, and the least that must stand above it to draw a column
			sink: 2,
			minRise: 2,
			shades: ['ink', 'basalt', 'rust', 'ochre'],
			rim: 'amber',
			light: 'ember',
			glow: 'glow',
			// The doorway's pool: `spillR` reach, squashed by `spillSquash`, `spillDrop` below the sill.
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

// The journey's line (JourneyRoute.vue): a dashed gold trace from the departure pad to the entry.
export const ROUTE = {
	// Where the line begins: this share of a viewport above WORK, running in on one 45.
	startAboveVh: 0.3,
	// Corners are flown: the line arcs `turnPx` before the vertex; crispEdges quantises it to steps.
	turnPx: 36,
	// clearance kept around station headings
	headMarginPx: 18,
	// how far left of the LIFE column's edge its stretch of the line runs
	gutterPx: 36,
	// LIFE zigzags: a flank beside each chapter, crossing in the gap on a hexagonal jog.
	crossPadPx: 40,
	// the least horizontal run a jog may keep between chamfers; one that cannot afford it is skipped
	crossMinRunPx: 120,
	// the chamfer's 45s, one off each flank — hexagon vertices, short enough for the chapter gaps
	crossChamferPx: 56,
	// where in the viewport the tip diamond rides
	tipFrac: 0.55,
	// How far into the arrival runway the line runs, and the share kept above the arrival.
	endRunFrac: 0.17,
	endLeadVh: 0.15,
	// The chart leaves as the orbit begins — fade window in arrival-runway fractions.
	orbitOutAt: 0.02,
	orbitOutSpan: 0.14,
	// The dive aims at the world, not the frame, so the two stay together if the camera is retuned.
	diveAimBand: 0.3,
	// How many straight steps a corner arc is walked in; the browser draws the real curve.
	curveSteps: 12,
	nodePx: 7,
	// The tip is a dart, not a diamond, so its heading reads. Local space, nose along +x.
	tipNosePx: 6,
	tipShoulderPx: 1.5,
	tipHalfPx: 3.5,
	tipTailPx: 4,
}
