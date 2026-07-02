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

// Parallax depth planes, far → near. Each is one repeating, GPU-drifted <div>
// layer, inset by one tile so it can translate a full tile and loop seamlessly.
// Tiles are larger than the viewport and densely filled so the repeat isn't
// noticeable on screen.
//   count     stars placed in the tile
//   size      base dot diameter (px) — nearer reads bigger; jittered per dot
//   alpha     [min, max] opacity range
//   tile      [w, h] (px) of the repeating pattern; its aspect sets drift angle
//   duration  seconds for one full drift loop — nearer reads faster
//   depth     pixels the layer shifts under mouse parallax — nearer moves more
//   dir       [x, y] drift direction signs, alternated for a livelier sky
export const STAR_LAYERS = [
	{
		count: 40,
		size: 1,
		alpha: [0.2, 0.45],
		tile: [680, 860],
		duration: 860,
		depth: 4,
		dir: [-1, -1],
	},
	{
		count: 32,
		size: 1.5,
		alpha: [0.35, 0.6],
		tile: [620, 820],
		duration: 720,
		depth: 9,
		dir: [1, -1],
	},
	{
		count: 26,
		size: 2,
		alpha: [0.5, 0.78],
		tile: [680, 620],
		duration: 520,
		depth: 16,
		dir: [-1, -1],
	},
	{
		count: 20,
		size: 2.5,
		alpha: [0.68, 0.95],
		tile: [560, 720],
		duration: 350,
		depth: 26,
		dir: [1, -1],
	},
]

// Per-dot size multiplier so dots vary instead of reading as one stamped disc.
export const STAR_SIZE_JITTER = [0.75, 1.25]

// Sparse comet streaks. Tints echo the starfield, weighted toward plain white.
// Each entry is a [min, max] range fed straight to rand(), except `tints`.
export const SHOOTING_STAR = {
	tints: ['#ffffff', '#ffffff', '#ffffff', '#00ccff', '#ffbd2e'],
	gapMs: [2800, 8000],
	y: [0, 75],
	x: [-10, 65],
	angle: [-35, 80],
	len: [46, 86],
	travel: [90, 125],
	dur: [1.4, 2.4],
	peak: [0.6, 0.95],
}
