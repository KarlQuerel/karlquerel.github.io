// Shot 4, BURNING EVERYTHING: the dead farm as flat layers under a giant sun, the
// land rising into frame under it, then the camera trucking sideways. Positions are shares of the frame (x of its width, y of its height, from the top
// left); sizes are shares of its height. The ground is painted in perspective and each of its rows moves
// by its own depth, so the sideways truck reads as real parallax with every move a whole cell.
export const FIELDS = {
	duration: 12,
	cardAt: 3,
	// The land rises into frame under the sun, the camera tilting down off it: it opens `drop` frame
	// heights low and comes up over `rise` seconds. The trees rise `nearRise` times faster.
	drop: 0.75,
	rise: [0.5, 3.6],
	nearRise: 1.25,
	cellPx: 2,
	horizon: 0.6,
	// where the channel and the furrows run to
	vanish: 0.52,
	// The truck, eased in and out: the camera slides this far, in frame heights at depth 1, so the near
	// ground and the tree move most; right to left, the way every shot before it flows. Sideways only: a rise would tear the rows of the ground apart.
	truck: 0.16,
	// the hand-off: the layers arrive this far right (frame heights at depth 1), settling over the cut
	carry: 0.06,
	lookCells: 6,
	// The ground, seen from `eye` metres up through a lens of `focal` (cotangent of the half height);
	// a row's depth is its share of the way down from the horizon, times `near`. Past `haze` of the way
	// down the plates are finer than a cell, so the far ground is one band of glare instead.
	ground: {
		near: 1.4,
		eye: 1.6,
		focal: 1.25,
		plate: 0.9,
		row: 0.9,
		chanX: -1.6,
		chanW: 0.55,
		haze: 0.12,
	},
	// The sky: dusk from `top` to `low` on the ramp, and the giant sun over it: its centre, its radius as
	// a share of the height, capped at `fitWidth` of the width so a portrait frame holds it.
	sky: {
		depth: 0.04,
		sun: { at: [0.5, 0.45], radius: 0.42, fitWidth: 0.5 },
		top: 0.08,
		low: 0.72,
	},
	// Smoke off the burning fields, at the farm's depth: where each column stands (share of the
	// width), its lean (cells across per cell up), width at its foot and growth (cells per cell up),
	// and how fast it climbs (cells a second).
	smoke: {
		columns: [
			{ x: 0.08, lean: 0.5, foot: 5, grow: 0.2 },
			{ x: 0.24, lean: 0.35, foot: 3, grow: 0.12 },
			{ x: 0.84, lean: 0.55, foot: 6, grow: 0.22 },
		],
		climb: 7,
	},
	// Fire fronts burning across the stubble: distance (m), the world x they span (m), and how tall
	// their flames stand (m). The far ones are a line of flicker, the near one a wall.
	fires: [
		{ z: 5.5, from: -14, to: -2.5, h: 1.3 },
		{ z: 11, from: 0.5, to: 16, h: 1.4 },
		{ z: 24, from: -30, to: -4, h: 1.5 },
		{ z: 46, from: 6, to: 60, h: 1.6 },
	],
	// how far toward the camera a front has already burnt the ground black (m)
	char: 3.5,
	// The farm on the horizon: barely moves, it is that far off.
	farm: {
		depth: 0.08,
		windmill: { x: 0.57, h: 0.21, blade: 0.075 },
		house: { x: 0.7, w: 0.17, h: 0.1 },
		silos: [
			{ x: 0.86, w: 0.05, h: 0.3 },
			{ x: 0.915, w: 0.045, h: 0.25 },
		],
		pylons: [
			{ x: 0.06, h: 0.34 },
			{ x: 0.24, h: 0.2 },
			{ x: 0.36, h: 0.12 },
		],
		city: { from: 0.38, to: 0.5, h: 0.025 },
	},
	harvester: { at: [0.13, 0.76], h: 0.13, depth: 0.7 },
	tree: { at: [0.27, 1.02], h: 0.62, depth: 1.35 },
	// fence posts down the far side of the channel: world x, first and last distance, and how many
	fence: { x: 2.2, z: [3, 40], count: 16, h: 1.1 },
	// embers rise and ash falls, in cells a second
	embers: { count: 46, rise: [18, 46], ash: 14 },
	tidyPasses: 1,
}
