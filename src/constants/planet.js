// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends (PixelPlanet.vue).
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	resolution: 192,
	resolutionMobile: 128,
	// Disc radius as a fraction of the sprite — the margin leaves room for the
	// atmosphere halo to bleed past the limb.
	discRadius: 0.36,
	// Surface redraw rate. Kept an even divisor of a 60Hz refresh so frames pace evenly (no judder);
	// higher = smoother spin but shader cost scales linearly with it. spinSeconds = one full turn.
	fps: 30,
	// phone viewports redraw slower — imperceptible at this pixel scale, cheaper on battery
	fpsMobile: 20,
	spinSeconds: 64,
	// Redraw rate while the spin is scroll-driven (PixelPlanet `spin` prop).
	orbitFps: 60,
	// The cloud deck's thinning is the one input to a redraw that is not an angle, so
	// it needs its own floor: below this much change the deck lands on the same steps
	// and the sweep is spent redrawing the picture already on the canvas.
	cloudThinStep: 0.02,
	orbitFpsMobile: 30,
	// Axial tilt of the spin (degrees), so continents drift across on a diagonal
	// rather than straight sideways.
	tiltDeg: 18,
	// Light direction in view space (upper-left, toward the viewer).
	light: [-0.55, -0.5, 0.7],
	// How much the surface's own relief modulates the light it catches. Ordered dither over a field as
	// slow as a sphere's Lambert term lays down wide, regular bands of checker — at station
	// magnification one 4x4 cell is ~30 screen px, so the pattern reads as noise rather than as
	// shading.
	relief: 0.55,
	// The surface, band by band, low elevation to high — each one a ramp through PALETTE from its
	// night side to full sun.
	ramps: {
		abyss: ['void', 'ink', 'slate', 'deep', 'brine', 'tide'],
		ocean: ['void', 'ink', 'slate', 'brine', 'tide', 'shoal'],
		shallow: ['void', 'ink', 'slate', 'tide', 'shoal', 'foam'],
		coast: ['void', 'ink', 'basalt', 'rust', 'ochre', 'amber'],
		land: ['ink', 'basalt', 'rust', 'ochre', 'clay', 'amber'],
		highland: ['ink', 'ash', 'stone', 'bone', 'chalk', 'cream'],
		peak: ['ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
	},
	// Band order and where each one ends, as an offset from `seaLevel` — so the waterline is the
	// shallow → coast edge at exactly 0.
	bands: [
		['abyss', -0.14],
		['ocean', -0.06],
		['shallow', 0],
		['coast', 0.04],
		['land', 0.14],
		['highland', 0.26],
		['peak', Infinity],
	],
	// The cloud shell rides the same sun on its own ramp, so a deck is lit by the light the ground
	// under it is lit by.
	cloudRamp: ['ink', 'ash', 'stone', 'bone', 'chalk', 'linen'],
	// Impact basins: a few circular dents pressed into the elevation field, so the continents carry
	// history instead of pure noise — where a floor drops below sea level it floods and reads as a
	// round sea.
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
	// Half-width of the dither zone around each band edge. A coastline is dithered between the two
	// bands rather than cross-faded: a blended colour is one the palette does not contain, and the
	// palette being exact is the point.
	bandBlend: 0.02,
	// Cloud shell: a second, cheaper noise field drifting ahead of the ground.
	clouds: {
		scale: 2.4,
		cover: 0.46,
		blend: 0.03,
		spinFactor: 1.25,
		octaves: 2,
		// Coverage is a dithered choice between the surface ramp and the cloud ramp, not an alpha blend —
		// so short of 1 it thins the deck by letting ground show through in a dither rather than by
		// washing the two colours together.
		opacity: 0.72,
		// The deck's shadow: ground pixels sample the field a second time this far toward the sun (sphere-
		// radius units), and a hit demotes the ramp step by `shadowDrop`.
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
		// The rainbands that break the wall out of a solid disc: `arms` spiral arms,
		// wound tighter by `armTwist` (radians of phase across the cap), never cut
		// below `bandMin` of the full boost so the wall stays closed around the eye.
		arms: 2,
		bandMin: 0.25,
		armTwist: 3.2,
		// How fast the wall goes solid as its density climbs — at fixed deck opacity the interior is one
		// uniform checker (wallpaper); solid, the interior is textured by the shading instead.
		solidify: 2.5,
		texGain: 2,
		// Cloud-space longitude the centre is seeded around (± lonJitter), in the same angle convention as
		// the cloud spin (spin × spinFactor).
		faceLon: 3.7,
		lonJitter: 0.3,
		// The wall is promoted up the cloud ramp toward its white top — this many
		// dither levels at the storm's centre, scaled by daylight — so the spiral
		// stays legible even over pale highland that shares the deck's colours.
		whitenLevels: 3,
	},
	// Atmosphere halo colour, taken from the shared palette like everything else.
	atmosphere: 'haze',
	// How far past the limb the atmosphere reaches, as a fraction of the radius.
	haloWidth: 0.22,
	// The atmosphere itself, inner layer out. Alpha is per layer and stepped rather than a falloff: a
	// smooth glow reads as a light source wrapped round a ball, where discrete layers read as air that
	// has a *thickness* — and a thickness is the one cue in the whole frame that states the planet's
	// radius.
	shell: [
		['sand', 132],
		['haze', 106],
		['haze', 76],
		['rust', 50],
		['rust', 26],
	],
	// The shell is lit like the ground is, so it comes out as a bright crescent on the sun side.
	shellNight: 0.12,
	// How far the shell's lit arc overshoots the terminator, as a shift of its zero crossing past the
	// day/night line.
	shellTwilight: 0.25,
	// The lit-limb glow, as how many steps up its own ramp the limb is promoted.
	rimLevels: 3,
	// Sun glint on open water: specular strength where the key light mirrors off the seas (masked by
	// cloud cover).
	oceanGloss: 0.6,
}

// Palette override for the launch beat's dying Earth (PixelPlanet `palette` prop): the same ramps
// walked through different colours — steel seas and sickly olive land under a pale fading
// atmosphere.
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
