// Tunables for the decorative parallax starfield in SpaceBackground.vue. Kept
// here so the component holds only render logic and every magic number lives in
// one place.

// Palette the generated stars draw from. Mirrors the SCSS palette in
// src/styles/_variables.scss (duplicated as hex because the field is built in
// JS). Kept to white/yellow/grey, weighted toward white, for a calm and
// realistic sky.
export const STAR_COLORS = [
	'#ffffff',
	'#ffffff',
	'#ffffff',
	'#ffffff',
	'#ffbd2e', // $yellow
	'#d3d3d3', // $light-gray
]

// Parallax depth planes, far → near. Each becomes one repeating <div> layer
// that drifts via a GPU-composited transform, so tiles are kept modest to bound
// each layer's compositor texture (the element is inset by one tile on each side
// so it can translate a full tile and loop seamlessly).
//   count     stars placed in the tile
//   size      dot diameter (px) — nearer reads bigger
//   alpha     [min, max] opacity range
//   tile      [w, h] (px) of the repeating pattern; its aspect sets drift angle
//   duration  seconds for one full drift loop — nearer reads faster
//   depth     pixels the layer shifts under mouse parallax — nearer moves more
//   dir       [x, y] drift direction signs, alternated for a livelier sky
export const STAR_LAYERS = [
	{
		count: 16,
		size: 1,
		alpha: [0.2, 0.45],
		tile: [460, 600],
		duration: 580,
		depth: 4,
		dir: [-1, -1],
	},
	{
		count: 12,
		size: 1.5,
		alpha: [0.35, 0.6],
		tile: [380, 540],
		duration: 440,
		depth: 9,
		dir: [1, -1],
	},
	{
		count: 9,
		size: 2,
		alpha: [0.5, 0.78],
		tile: [420, 360],
		duration: 320,
		depth: 16,
		dir: [-1, -1],
	},
	{
		count: 7,
		size: 2.5,
		alpha: [0.68, 0.95],
		tile: [320, 440],
		duration: 200,
		depth: 26,
		dir: [1, -1],
	},
]

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
