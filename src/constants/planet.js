// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends
// (PixelPlanet.vue). The planet is drawn procedurally on a small canvas and
// upscaled with image-rendering: pixelated, so every value here is in low-res
// "sprite" space. Colours are [r, g, b] 0-255.
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	// Higher = finer, more HD detail, but the surface is a per-pixel noise shader
	// so cost scales with resolution² — this is the main lever on mobile render load.
	resolution: 120,
	// Disc radius as a fraction of the sprite — the margin leaves room for the
	// atmosphere halo to bleed past the limb.
	discRadius: 0.36,
	// Surface redraw rate. Kept an even divisor of a 60Hz refresh so frames pace
	// evenly (no judder); higher = smoother spin but shader cost scales linearly
	// with it. spinSeconds = one full turn.
	fps: 30,
	// phone viewports redraw slower — imperceptible at this pixel scale, cheaper on battery
	fpsMobile: 20,
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
	// Half-width of the blend zone around each colour band edge — a thin
	// anti-aliased coastline, not a gradient. Keep it small relative to the band
	// gaps (0.08 / 0.12) or the surface goes low-contrast and mushy. Pixels within
	// it fade between shades so rotating coastlines don't snap/blink. 0 = hard
	// edges (crisp but aliased); larger = softer bands.
	bandBlend: 0.012,
	// Atmosphere rim colour — a thin, dusty red-grey haze.
	atmosphere: [172, 120, 104],
	// Atmosphere halo: how far past the limb it reaches (fraction of radius) and
	// its peak opacity (0-255). Lower = tighter, dimmer glow.
	haloWidth: 0.2,
	haloAlpha: 70,
	// Strength of the lit-limb rim glow (0 = none).
	rimStrength: 0.35,
}

// Band override for the launch beat's dying Earth (PixelPlanet `palette` prop):
// steel seas, sickly olive land, ashen peaks under a pale fading atmosphere.
export const EARTH_PALETTE = {
	ocean: [22, 42, 74],
	oceanShallow: [44, 84, 118],
	land: [88, 104, 66],
	highland: [148, 148, 136],
	atmosphere: [150, 176, 200],
}
