// Tunables for the decorative parallax starfield in SpaceBackground.vue.

// Star palette, duplicated as hex from the SCSS palette in _variables.scss.
// Weighted toward white for a calm sky.
export const STAR_COLORS = [
	'#ffffff',
	'#ffffff',
	'#ffffff',
	'#ffffff',
	'#ffbd2e', // $yellow
	'#d3d3d3', // $light-gray
]

// Parallax depth planes, far -> near. Each is one repeating, GPU-drifted <div> layer, inset by
// one tile so it can translate a full tile and loop seamlessly. Three planes rather than four:
// each is a full-screen layer the compositor redraws every frame, and that was the homepage lag.
export const STAR_LAYERS = [
	{
		count: 18,
		size: 1,
		alpha: [0.2, 0.45],
		tile: [400, 520],
		duration: 515,
		depth: 4,
		dir: [-1, -1],
	},
	{
		count: 13,
		size: 2,
		alpha: [0.5, 0.78],
		tile: [400, 380],
		duration: 310,
		depth: 16,
		dir: [1, -1],
	},
	{
		count: 11,
		size: 2.5,
		alpha: [0.68, 0.95],
		tile: [340, 440],
		duration: 215,
		depth: 26,
		dir: [-1, -1],
	},
]

// Per-dot size multiplier so dots vary instead of reading as one stamped disc.
export const STAR_SIZE_JITTER = [0.75, 1.25]

// Vertical scroll parallax: px of layer shift per px scrolled, per depth unit — scrolling streams
// the near planes past faster, so the camera reads as travelling.
export const SCROLL_PARALLAX = 0.004

// Device pixels of travel per drift step. Stepped (not linear) drift lets the compositor skip the
// frames between hops — linear drift recomposited the full screen every vsync, the main scroll-lag
// cost on phones.
export const DRIFT_STEP_DEVICE_PX = 1

// Sparse comet streaks. Tints echo the starfield, weighted toward plain white.
// Each entry is a [min, max] range fed straight to rand(), except `tints`.
export const SHOOTING_STAR = {
	tints: ['#ffffff', '#ffffff', '#ffffff', '#00ccff', '#ffbd2e'],
	gapMs: [2800, 8000],
	// The first comet of a visit fires on this shorter fuse, so a first impression
	// always catches the sky moving before the scroll starts.
	firstMs: [900, 1600],
	y: [0, 75],
	x: [-10, 65],
	angle: [-35, 80],
	len: [46, 86],
	travel: [90, 125],
	dur: [1.4, 2.4],
	peak: [0.6, 0.95],
}
