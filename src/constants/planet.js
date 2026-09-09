// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends (PixelPlanet.vue).
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	resolution: 192,
	resolutionMobile: 128,
	// Disc radius as a fraction of the sprite; the margin leaves room for the halo to bleed past.
	discRadius: 0.36,
	// Surface redraw rate, an even divisor of 60Hz so frames pace evenly. spinSeconds = one turn.
	fps: 30,
	// phone viewports redraw slower — imperceptible at this pixel scale, cheaper on battery
	fpsMobile: 20,
	spinSeconds: 64,
	// Redraw rate while the spin is scroll-driven (PixelPlanet `spin` prop).
	orbitFps: 60,
	// The deck's thinning is the one non-angle input to a redraw, so it needs its own floor.
	cloudThinStep: 0.02,
	orbitFpsMobile: 30,
	// Axial tilt of the spin (degrees), so continents drift across on a diagonal.
	tiltDeg: 18,
	// Light direction in view space (upper-left, toward the viewer).
	light: [-0.55, -0.5, 0.7],
	// How much relief modulates the light. Dither over a field this slow lays down bands of checker.
	relief: 0.55,
	// The surface band by band, low to high — each a ramp through PALETTE from night to full sun.
	ramps: {
		abyss: ['void', 'ink', 'slate', 'deep', 'brine', 'tide'],
		ocean: ['void', 'ink', 'slate', 'brine', 'tide', 'shoal'],
		shallow: ['void', 'ink', 'slate', 'tide', 'shoal', 'foam'],
		coast: ['void', 'ink', 'basalt', 'rust', 'ochre', 'amber'],
		land: ['ink', 'basalt', 'rust', 'ochre', 'clay', 'amber'],
		highland: ['ink', 'ash', 'stone', 'bone', 'chalk', 'cream'],
		peak: ['ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
	},
	// Band order and where each ends, offset from `seaLevel`, so the waterline sits at exactly 0.
	bands: [
		['abyss', -0.14],
		['ocean', -0.06],
		['shallow', 0],
		['coast', 0.04],
		['land', 0.14],
		['highland', 0.26],
		['peak', Infinity],
	],
	// The cloud shell rides the same sun on its own ramp, so a deck is lit like the ground under it.
	cloudRamp: ['ink', 'ash', 'stone', 'bone', 'chalk', 'linen'],
	// Impact basins: circular dents in the elevation field; a floor below sea level floods.
	basins: {
		count: 3,
		radMin: 0.22,
		radMax: 0.42,
		depth: 0.13,
		latMax: 0.7,
	},
	// Noise frequency over the sphere — higher = smaller, busier continents.
	noiseScale: 1.35,
	// Noise value below which a cell is ocean (≈ land/sea ratio). Lower = more land.
	seaLevel: 0.46,
	// Half-width of the dither zone at each band edge: a blend would be a colour the palette lacks.
	bandBlend: 0.02,
	// Cloud shell: a second, cheaper noise field drifting ahead of the ground.
	clouds: {
		scale: 2.4,
		cover: 0.46,
		blend: 0.03,
		spinFactor: 1.25,
		octaves: 2,
		// Coverage is a dithered choice between the two ramps, not an alpha blend.
		opacity: 0.72,
		// The deck's shadow: ground samples the field again toward the sun; a hit drops `shadowDrop`.
		shadowOffset: 0.1,
		shadowDrop: 1,
	},
	// One cyclone per visit, seeded like the terrain and fixed in cloud space so it rides the shell.
	storm: {
		radius: 0.58,
		swirl: 3.1,
		boost: 0.5,
		eyeDrop: 1.2,
		latMin: 0.3,
		latMax: 0.65,
		// Rainbands that break the wall out of a solid disc, never cut below `bandMin` of full boost.
		arms: 2,
		bandMin: 0.25,
		armTwist: 3.2,
		// How fast the wall goes solid as density climbs — at fixed opacity the interior is wallpaper.
		solidify: 2.5,
		texGain: 2,
		// Cloud-space longitude the centre is seeded around (± lonJitter), in the cloud spin's convention.
		faceLon: 3.7,
		lonJitter: 0.3,
		// The wall is promoted up the cloud ramp, so the spiral stays legible over pale highland.
		whitenLevels: 3,
	},
	// Atmosphere halo colour, taken from the shared palette like everything else.
	atmosphere: 'haze',
	// How far past the limb the atmosphere reaches, as a fraction of the radius.
	haloWidth: 0.22,
	// The atmosphere, inner layer out. Stepped alpha, not a falloff: thickness is what states radius.
	shell: [
		['sand', 132],
		['haze', 106],
		['haze', 76],
		['rust', 50],
		['rust', 26],
	],
	// The shell is lit like the ground is, so it comes out as a bright crescent on the sun side.
	shellNight: 0.12,
	// How far the shell's lit arc overshoots the terminator, as a shift of its zero crossing.
	shellTwilight: 0.25,
	// The lit-limb glow, as how many steps up its own ramp the limb is promoted.
	rimLevels: 3,
	// Sun glint on open water, masked by cloud cover.
	oceanGloss: 0.6,
}

// Palette override for the launch beat's dying Earth: the same ramps in different colours.
export const EARTH_PALETTE = {
	deep: [10, 22, 46],
	brine: [18, 38, 68],
	tide: [30, 58, 96],
	shoal: [44, 84, 118],
	foam: [86, 126, 152],
	basalt: [28, 38, 34],
	rust: [44, 58, 44],
	ochre: [64, 80, 54],
	clay: [88, 104, 66],
	amber: [120, 132, 88],
	sand: [160, 166, 120],
	haze: [150, 176, 200],
}
