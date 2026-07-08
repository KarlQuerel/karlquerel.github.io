// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends
// (PixelPlanet.vue). The planet is drawn procedurally on a small canvas and
// upscaled with image-rendering: pixelated, so every value here is in low-res
// "sprite" space. Colours are [r, g, b] 0-255.
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	// Kept modest on purpose: the surface is a per-pixel noise shader, so cost
	// scales with resolution² — this is the main lever on mobile render load.
	resolution: 90,
	// Disc radius as a fraction of the sprite — the margin leaves room for the
	// atmosphere halo to bleed past the limb.
	discRadius: 0.36,
	// Stepped rotation: redraw the surface at this many frames per second for a
	// retro, non-smooth spin, taking this many seconds per full turn. The spin is
	// slow, so a low redraw rate stays smooth-looking while halving shader work.
	fps: 15,
	spinSeconds: 64,
	// Axial tilt of the spin (degrees), so continents drift across on a diagonal
	// rather than straight sideways.
	tiltDeg: 18,
	// Light direction in view space (upper-left, toward the viewer).
	light: [-0.55, -0.5, 0.7],
	// Floor brightness so the night side reads dark but not pure black.
	ambient: 0.16,
	// Alien surface bands, sampled by fractal noise: deep sea → shallows → land →
	// highland. A rocky red-grey world — no ice caps, the poles are sea and
	// coastline like everywhere else.
	ocean: [46, 34, 40],
	oceanShallow: [98, 66, 62],
	land: [156, 74, 52],
	highland: [176, 150, 142],
	// Noise frequency over the sphere — higher = smaller, busier continents.
	noiseScale: 1.35,
	// Noise value below which a cell is ocean (≈ land/sea ratio). Lower = more land.
	seaLevel: 0.46,
	// Atmosphere rim colour — a thin, dusty red-grey haze.
	atmosphere: [172, 120, 104],
	// Atmosphere halo: how far past the limb it reaches (fraction of radius) and
	// its peak opacity (0-255). Lower = tighter, dimmer glow.
	haloWidth: 0.2,
	haloAlpha: 70,
	// Strength of the lit-limb rim glow (0 = none).
	rimStrength: 0.35,
}
