// Tunables for the lightspeed-jump warp shown at the end of the hero crawl
// (HyperspaceWarp.vue).
export const HYPERSPACE = {
	// More stars = denser tunnel, but heavier to draw.
	starCount: 360,
	// Backing-store downscale: the canvas renders at 1 / pixelScale resolution and
	// is upscaled with image-rendering: pixelated, for chunky on-aesthetic streaks.
	pixelScale: 2,
	// Forward speed as a fraction of the canvas width per frame, at full warp.
	// Scales linearly with intensity, so the jump accelerates as you scroll.
	speed: 0.013,
	// Per-frame translucent-black wash that leaves the comet tails, interpolated
	// [idle → full] by intensity — longer, glowier tails deeper into the jump.
	trail: [0.5, 0.18],
	// Streak stroke width in backing-store px, from far (thin) to near (thick).
	width: [0.6, 2.6],
	// Bluish-white hyperspace palette, weighted toward plain white.
	colors: ['#ffffff', '#ffffff', '#ffffff', '#cfefff', '#00ccff'],
}
