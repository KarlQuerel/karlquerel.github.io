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
	// then the ridge we lift off (DEPARTURE_RIDGE bands, 20, 7 and 3, its sky's glints at 6
	// and the galaxy at 2 behind everything), then the station
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
	// The planet's cloud deck thins away as the camera's scale channel climbs — from
	// untouched at `from` to clear skies at `to`. Up close the deck stops reading as
	// weather above the ground and starts reading as a checker layer stacked on the
	// mountains; by the dive and the entry we are under it anyway. `from` must sit
	// past the swell at the tail of the station reads (scale runs to ~2.5 with WORK
	// text still up), or the storm dithers away while it is being read.
	cloudThin: { from: 2.6, to: 3.6 },
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

// The ground we leave from: a moon across the foot of the opening frame, so the page
// opens on a world rather than on empty space — and so the planet is hidden by
// something in the scene rather than by nothing being there. A moon is not a skyline,
// so unlike the arrival's ranges these bands are not profiles lit by their own slope:
// each is a window onto a height field seen in perspective (drawMoon in js/ridge.js),
// with a real normal per cell, one sun, and the hard shadow of a vacuum. Cold on
// purpose — leaving is cold, arriving is warm — but lit: a moon is a bright thing.
export const DEPARTURE_RIDGE = {
	// Three layers, back to front, on one grid (ENTRY.ridgeCellPx): a distant range
	// that is hills and nothing else, the plain running out to the horizon with low
	// hills behind it, and the same ground underfoot with a low rise along its top edge
	// so the parallax has a face to move. A band stands on its `horizon` row:
	//   horizon  — the plain's far edge and the hills' feet, as a share of the band's
	//              height from the top; `roll` is how many cells it wanders
	//   curve    — rows the horizon drops by at the frame's edges (the limb)
	//   hills    — the massifs behind, a height field seen edge-on: `depth` cells of
	//              range behind the horizon, walked in `step` cells; `peaks` the cones
	//              (count per ridgeRefCells of width, radius and height ranges, `power`
	//              rolling heights low, `shape` > 1 for concave flanks, `overhang` how
	//              far past the frame's edges they may stand, zMin the nearest depth,
	//              `big` placed by hand with x as a share of the width);
	//              `texture` the rock on them; `gain` the lit side's reach up the ramp,
	//              `shadowSteps` the march toward the sun; shades dark→lit and the
	//              crest's own walk; `notch` a crater bitten into the range at `at` of
	//              the frame's width, `z` deep, `r` wide, `depth` deep
	//   plain    — the ground itself:
	//     squash   — a crater's vertical radius over its horizontal one at the horizon
	//                and at the band's foot: the foreshortening, and how it changes
	//     spread   — how much wider the world is at the horizon than underfoot
	//     craters  — the field, counted per ridgeRefCells of width; radius rolls
	//                rMin..rMax by u^power so most land small; `big` are placed by hand
	//                in world cells (x from centre, y from the far edge)
	//     boulders — likewise, `big` placed by hand
	//     pocks    — two-pixel micro-craters, counted the same way
	//     rise     — a lift along the far edge, cells high, gone `depth` cells in
	//     lines    — long folds at depth y, wandering ±wander over `cells`, half a
	//                width wide and `height` tall (negative digs: a rille; positive
	//                raises: a wrinkle ridge), tapered over `taper` from `from` to `to`
	//     shades   — the ramp, shadow to sun: the night ramp with one warm step at the
	//                top, the palette's own rule that a face turning into the sun turns
	//                warm — and the one thing tying this ground to the ember star
	bands: [
		{
			// The range, a long way off. Peaks, not domes — the old highland rim of
			// some basin — catching the sun on their facets against the black. Least
			// parallax and least climb: as we lift, it stays up while the ground drops.
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
						{ x: 47, y: 30, r: 3 },
						{ x: 54, y: 33, r: 2.6 },
						{ x: 41, y: 35, r: 2.4 },
					],
				},
				boulders: { count: 8, big: [] },
				pocks: 40,
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
				pocks: 16,
				shades: ['pitch', 'iron', 'steel', 'zinc', 'frost', 'rime', 'bone'],
			},
			climb: 1,
			depth: 20,
		},
	],
	// Shared by every band: the light, and the shapes of things.
	moon: {
		// The sun, as a direction: x stage left is negative (the planet's key, the
		// side ENTRY.ridgeLight names), y toward the camera is positive, z up. About
		// 21° up — low enough that every rim throws a shadow, high enough that the
		// bowls still show their floors.
		sun: [-1, 0.35, 0.42],
		// There is no skylight; `ambient` only lifts the shade end off the ramp's floor
		// so the plain sits where a crater has steps to carve both ways. `shade` is the
		// further drop inside a cast shadow, `gain` the lit side's reach up the ramp.
		ambient: 0.1,
		shade: 0.5,
		gain: 1.15,
		// the shadow march: samples along the ground toward the sun, the first this
		// many cells out and each `grow` times further than the last
		shadow: { steps: 20, first: 0.8, grow: 1.28 },
		// dither only this far (in ramp steps) either side of a boundary; solid elsewhere
		seam: 0.07,
		// the horizon's wander, in cells per fbm cycle
		rollCells: 48,
		// the ground between the craters: broad swells and fine regolith, as cells of
		// height over cells of wavelength
		swell: { amp: 5, cells: 70 },
		rough: { amp: 0.3, cells: 8 },
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
		// One crater, in radii. `depth` and `rimHeight` are [fresh, worn away by age].
		// The floor is flat inside `floor` ([small, basin]), a basin being wider than
		// basinR; past peakR a crater carries a central peak. The ejecta blanket slopes
		// off the rim out to ejectaTo. A fresh crater (age under freshBelow) sits in a
		// brighter blanket, freshGain brighter at the rim and gone by freshTo.
		// Rims narrow and tall, walls steep, floors broad: it is the sharp lip that
		// draws the crater's ring in one cell, and the steep wall that gives the two
		// crescents inside it their width. A shallow bowl under a soft rim is a smudge.
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
		// pocks land from this share of the band's depth down, biased toward the camera
		pockFrom: 0.25,
		pockNearBias: 0.7,
	},
	// The climb, per world unit the flight covers: the horizon drops away and the
	// crests swell as we lift over them. Both come off the flight's own travel, so
	// the ridge, the motes and the name are all one movement. The ground leaves the
	// frame by this motion alone, never by fading — a fade shows stars through rock.
	// Sized so every band is out by the time the travel levels off (~14 units, see
	// HERO_FLYBY): the swell grows a band up from its foot, so it fights the drop by
	// swellPerUnit × heightVh per unit and the rate has to beat that.
	dropVhPerUnit: 5.5,
	swellPerUnit: 0.05,
	// The things at infinity — the galaxy and the glints — cannot drop away, so they
	// alone fade, over this stretch of the pass; the scene is gone at goneTo.
	goneFrom: 0.55,
	goneTo: 0.85,
	// Authored, not rolled — same contract as ENTRY.ridgeSeed: change the number
	// to audition a new opening range.
	ridgeSeed: 18,
	// The destination: one warm star hanging over the notch the range was bitten for —
	// the same ember the arrival world is lit by, on screen from the first frame so the
	// whole journey has somewhere it is pointed. A glint like the others (see sky), but
	// placed by the cut, not the frame: `aboveCells` over the notch's crest, so it clears
	// the skyline on every viewport and under the lean. It is the fixed point the whole
	// flight aims at, so it takes less of the lean than the other glints (`depth`).
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
	// The sky above the ground, on the same grid (js/sky.js). Black — no air — with the
	// off-frame sun's glow low on the left, the galaxy across it, and a few bright stars.
	// `depth` is the cursor lean (px) of the canvas and `glintDepth` that of the bright
	// stars; both run past the ground's, as the faint field's planes already do (see
	// STAR_LAYERS) — the lean here is relief, not distance.
	sky: {
		depth: 12,
		glintDepth: 18,
		// The sun's glow: centre and reach as shares of the frame (y is the horizon),
		// `power` the falloff from the centre, quantised to rings with the dither held
		// to `seam`; the rim wobbles by `wobble` of its radius over wobbleFreq cycles
		// round the centre, so no ring is a perfect ellipse.
		sunGlow: {
			x: -0.05,
			y: 0.82,
			rx: 0.5,
			ry: 0.3,
			power: 1.2,
			seam: 0.14,
			wobble: 0.16,
			wobbleFreq: 5,
			shades: ['ink', 'deep', 'slate'],
		},
		// The galaxy: a band from `from` to `to` (shares of the frame), `width` of the
		// frame's height across. A dark mantle spans the band on `base` of its profile;
		// a bright spine, spineWidth of the half-width wide, carries the cloud. The cloud
		// is noise over cloudCells with wispMix of finer noise over wispCells laid on it,
		// both sampled through a warp of themselves (`warp` cells over warpCells) so they
		// billow, stretched between cloudFloor and cloudCeil, scaled by `density` and
		// quantised onto `haze` (transparent first) with the dither held to `seam`.
		// Where a second noise over laneCells falls below laneBelow, a dust lane cuts
		// laneCut steps out. Stars: a cell's chance is `stars` (faint, one cell, on
		// `faint`) or brightStars (a small cross: a `bright` core with brightArm arms),
		// times the haze squared so they gather where it is thick, times clusterGain
		// inside clusters (a third noise over clusterCells above clusterAbove).
		galaxy: {
			from: [0, 0.04],
			to: [1, 0.38],
			width: 0.16,
			density: 0.9,
			seam: 0.07,
			base: 0.3,
			spineWidth: 0.6,
			cloudCells: 12,
			wispCells: 4.5,
			wispMix: 0.3,
			cloudFloor: 0.28,
			cloudCeil: 0.74,
			warp: 14,
			warpCells: 26,
			laneCells: 19,
			laneBelow: 0.38,
			laneCut: 1,
			haze: ['ink', 'deep', 'brine', 'tide'],
			stars: 0.2,
			brightStars: 0.012,
			clusterCells: 12,
			clusterAbove: 0.56,
			clusterGain: 3,
			faint: ['slate', 'ash'],
			bright: ['stone', 'bone', 'chalk'],
			brightArm: 'ash',
		},
		// Each is a five-cell cross: a core, arms one cell out that breathe between full
		// and `dim`, and tips two cells out that blink on the off-beat — the two-frame
		// twinkle every 8-bit sky has had. A handful, since a sky that twinkles everywhere
		// reads as noise.
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
	// Twelve steps rather than eight: the sky is the largest flat area in the scene,
	// so a short ramp spreads each transition over ~20 cells of half-lit checker and
	// the eye reads the Bayer lattice instead of a gradient. More steps means smaller
	// jumps and narrower seams. `skyContrast` is the other half of the same fix —
	// ridgeContrast's S-curve, applied to the fraction between two ramp steps, so the
	// dither gathers at the boundary and the middle of each band goes solid.
	sky: [
		'void',
		'ink',
		'slate',
		'basalt',
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
	skyContrast: 0.8,

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
		coronaLift: 7,
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
	// Cells either side that the shading terrain is averaged over before the slope is
	// taken. The silhouette keeps the raw profile; only the light is smoothed.
	ridgeReliefBlur: 4,
	ridgeDepthFade: 0.6,
	// Skylight on the shade side. The depth fade alone drives every turned-away face
	// onto ramp index 0, which in both scenes is the same near-black — so shadow had
	// no hue and the ranges read as cut paper. This is the floor it lands on instead.
	// The dusk default; a band under a darker sky overrides it (see DEPARTURE_RIDGE).
	ridgeAmbient: 0.14,
	// crag texture broken across the faces, so a slope is not one flat wash;
	// its scale is in cells, so the crags stay the same size as the grid they
	// are cut on
	ridgeRough: 0.26,
	ridgeRoughCells: 7.5,
	// How much the crag texture's strength itself varies, over `ridgeRoughVaryCells`
	// — several times the crag scale, so it makes patches of shattered and smooth
	// rock rather than modulating each crag on its own.
	ridgeRoughVary: 0.75,
	ridgeRoughVaryCells: 46,
	// How hard the shading is pushed toward solid steps (an S-curve on the lit
	// value before the dither picks one). At 0 the checker wallpapers whole
	// faces; pushed up, it gathers into narrow bands where two tones meet —
	// dither is for boundaries, not fill.
	ridgeContrast: 0.85,
	// Strata: darker seams every `strataSpacing` cells, `strataWidth` of a bed
	// wide, undulating by `strataWobble` cells per `strataWobbleCells` — bedded
	// stone instead of noise.
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
	// How far off the regular pitch a bed's seam may sit, as a share of one spacing —
	// enough that consecutive seams land unevenly and the bedding stops reading as a
	// ruled grid.
	strataJitter: 0.55,
	// How far the sun's warmth reaches into bands flagged `sunGlow` (cells), and
	// how many ramp steps it can promote at the disc itself.
	sunGlowCells: 45,
	sunGlowLevels: 3,
	// The arrival range is authored, not rolled: one fixed seed so every visit
	// gets the composition that was chosen by eye — snowcaps, passes and the
	// habitat's spot included. Change the number to audition a new range.
	ridgeSeed: 18,
	// The snowline's meander, in cells per fbm cycle — shared by every band that
	// carries snow, so both ends of the trip crown their ranges on the same scale.
	snowRuffleCells: 24,
	// Furthest range, behind the other two: tallest silhouette but the least
	// contrast, since aerial perspective washes distance toward the sky. Finer
	// `freq` too — distance compresses the peaks together.
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
		shades: ['basalt', 'rust', 'ochre', 'clay', 'flare', 'amber'],
		crest: 'sand',
		// Alpenglow snowcaps, per peak rather than per altitude: how far a summit
		// pokes above the (ruffled) snowline sets how deep its cap hangs — `depth`
		// scales the overshoot into cells of snow below the crest, dithered out
		// over `feather` cells at the cap's lower edge. Tall massifs carry deep
		// caps; a peak just past the line gets a dusting. The ramp is warm-lit —
		// dusk light on snow, not white paint.
		// minCap culls caps thinner than this many cells: a long flat crest that
		// barely crosses the line otherwise wears a one-cell strip of white down
		// its whole length, which reads as an outline rather than as snow.
		snow: {
			line: 0.53,
			ruffle: 0.12,
			depth: 1.3,
			feather: 5,
			minCap: 1.2,
			shades: ['stone', 'bone', 'chalk', 'cream', 'linen', 'linen'],
			crest: 'linen',
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
		shades: ['void', 'ink', 'basalt', 'rust', 'ochre', 'clay'],
		crest: 'amber',
		// the near caps keep a cool shadow end — snow in shade is brighter than
		// rock in shade, but it is not lit
		snow: {
			line: 0.54,
			ruffle: 0.12,
			depth: 1.5,
			feather: 5,
			minCap: 1.2,
			shades: ['ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
			crest: 'linen',
		},
		// The habitat: one dome low on the nearest range — slope welcome, the
		// footing buries the downhill edge — with one steady ember doorway under
		// "SEND ME A SIGNAL": someone lives here, and can be reached. Width in
		// cells, odd so the doorway centres — and well past the largest flock bird
		// (13px × scale 5 ≈ 12 cells): the nearest built thing reading smaller than
		// a creature in the sky breaks the perspective. `shades` is the shell's
		// ramp, shadow to sun. The path runs from the door down the face toward the
		// camera: `pathSpread` is how many cells it widens by the bottom (the
		// perspective), `pathMeander` how far it wanders, per `pathWanderCells`.
		// `shellFade` is how fast the shell darkens below its surface.
		habitat: {
			w: 17,
			h: 7,
			shellFade: 0.7,
			shades: ['ink', 'basalt', 'rust', 'ochre'],
			rim: 'amber',
			light: 'ember',
			glow: 'glow',
			spill: 'ochre',
			shadowLen: 5,
			pathSpread: 5,
			pathMeander: 5,
			pathWanderCells: 14,
			pathShades: ['ash', 'stone'],
		},
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
