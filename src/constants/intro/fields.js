// Shot 4, BURNING EVERYTHING: the dead farm as flat layers under a swollen sun, the camera trucking
// sideways. Positions are shares of the frame (x of its width, y of its height, from the top
// left); sizes are shares of its height. The ground is painted in perspective and each of its rows moves
// by its own depth, so the sideways truck reads as real parallax with every move a whole cell.
export const FIELDS = {
	duration: 10,
	cardAt: 0.8,
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
	sky: {
		sunAt: [0.6, 0.47],
		sunR: 0.22,
		depth: 0.04,
		plumes: [0.08, 0.3, 0.78, 0.95],
		// cloud bars across the sun's lower half: height below its centre and x offset (sun radii),
		// half-length (sun radii), thickness (cells)
		bars: [
			[0.08, -0.15, 0.9, 2],
			[0.3, 0.2, 1.15, 3],
			[0.52, -0.05, 0.8, 2],
		],
	},
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
