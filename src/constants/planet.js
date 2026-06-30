// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends
// (PixelPlanet.vue). The planet is drawn procedurally on a small canvas and
// upscaled with image-rendering: pixelated, so every value here is in low-res
// "sprite" space. Colours are [r, g, b] 0-255.
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	resolution: 120,
	// Disc radius as a fraction of the sprite — the margin leaves room for the
	// atmosphere halo to bleed past the limb.
	discRadius: 0.36,
	// Stepped rotation: redraw the surface at this many frames per second for a
	// retro, non-smooth spin, taking this many seconds per full turn.
	fps: 24,
	spinSeconds: 64,
	// Axial tilt of the spin (degrees), so the ice caps sit off-vertical.
	tiltDeg: 18,
	// Light direction in view space (upper-left, toward the viewer).
	light: [-0.55, -0.5, 0.7],
	// Floor brightness so the night side reads dark but not pure black.
	ambient: 0.16,
	// Surface bands, sampled by fractal noise: deep sea → shallows → land →
	// highland, with white ice toward the poles.
	ocean: [14, 38, 92],
	oceanShallow: [24, 96, 156],
	land: [52, 138, 92],
	highland: [126, 152, 78],
	ice: [236, 246, 255],
	// Noise frequency over the sphere — higher = smaller, busier continents.
	noiseScale: 1.9,
	// Noise value below which a cell is ocean (≈ land/sea ratio).
	seaLevel: 0.49,
	// Latitude (0 equator → 1 pole) past which ice caps form.
	iceLat: 0.8,
	// Atmosphere rim colour (cyan, echoing $light-blue).
	atmosphere: [0, 204, 255],
}
