// Tunables for the pixel-art planet you arrive at when the lightspeed jump ends
// (PixelPlanet.vue). The planet is drawn procedurally on a small canvas and
// upscaled with image-rendering: pixelated, so every value here is in low-res
// "sprite" space. Colours are [r, g, b] 0-255.
export const PLANET = {
	// Logical sprite resolution; each cell becomes one chunky on-screen pixel.
	// Higher = finer, more HD detail, but the surface is a per-pixel noise shader
	// so cost scales with resolution² — these are the main levers on render load.
	// The landing scales the globe up to ~2.7x, so desktop carries more detail.
	resolution: 192,
	resolutionMobile: 128,
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
	// Redraw rate while the spin is scroll-driven (PixelPlanet `spin` prop). Higher
	// than the idle rate on purpose: the layers around the planet move at full frame
	// rate under scroll, so a coarse surface redraw reads as lag rather than as pixel
	// art. If this costs too much on a phone, drop `resolution` — cost is resolution².
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
	// How much the surface's own relief modulates the light it catches. Ordered
	// dither over a field as slow as a sphere's Lambert term lays down wide, regular
	// bands of checker — at station magnification one 4x4 cell is ~30 screen px, so
	// the pattern reads as noise rather than as shading. Terrain is what breaks it
	// up: highlands catch more, basins less, so the step boundaries scatter along the
	// coastlines instead of ringing the globe. It is also the relief shading the
	// ridges have always had and the globe never did. Multiplied, not added, so the
	// night side stays night.
	relief: 0.55,
	// The surface, band by band, low elevation to high — each one a ramp through
	// PALETTE from its night side to full sun. The light picks the step, so a band is a
	// walk rather than a colour, and every ramp is the same length.
	//
	// The dark ends are deliberately shared: on the night side you cannot tell water
	// from rock, and the ramps agreeing about that is what keeps the terminator reading
	// as one silhouette instead of seven bands all fading out separately. They diverge
	// as the light comes up, and each one warms as it climbs — which is the whole
	// difference between this and multiplying one colour by a brightness.
	//
	// A rocky red-grey world: the rock ramps carry it, and the pale ramps are highland
	// stone rather than ice. Nothing overrides them by latitude — what the elevation
	// says the ground is, the ground is, pole to equator.
	ramps: {
		abyss: ['void', 'ink', 'slate', 'deep', 'brine', 'tide'],
		ocean: ['void', 'ink', 'slate', 'brine', 'tide', 'shoal'],
		shallow: ['void', 'ink', 'slate', 'tide', 'shoal', 'foam'],
		coast: ['void', 'ink', 'basalt', 'rust', 'ochre', 'amber'],
		land: ['ink', 'basalt', 'rust', 'ochre', 'clay', 'amber'],
		highland: ['ink', 'ash', 'stone', 'bone', 'chalk', 'cream'],
		peak: ['ash', 'stone', 'bone', 'chalk', 'cream', 'linen'],
	},
	// Band order and where each one ends, as an offset from `seaLevel` — so the
	// waterline is the shallow → coast edge at exactly 0. `land` keeps the widest run:
	// it is the colour the world is meant to read as.
	bands: [
		['abyss', -0.14],
		['ocean', -0.06],
		['shallow', 0],
		['coast', 0.04],
		['land', 0.14],
		['highland', 0.26],
		['peak', Infinity],
	],
	// The cloud shell rides the same sun on its own ramp, so a deck is lit by the light
	// the ground under it is lit by. Tops at linen rather than cream so a fully lit
	// deck — the storm wall above all — reads whiter than the sunlit highlands.
	cloudRamp: ['ink', 'ash', 'stone', 'bone', 'chalk', 'linen'],
	// Impact basins: a few circular dents pressed into the elevation field, so the
	// continents carry history instead of pure noise — where a floor drops below
	// sea level it floods and reads as a round sea. Radii in radians of arc;
	// `latMax` keeps them off the poles, where the projection would only smear
	// a circle into a band.
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
	// Half-width of the dither zone around each band edge. A coastline is dithered
	// between the two bands rather than cross-faded: a blended colour is one the
	// palette does not contain, and the palette being exact is the point. Wider than
	// the old blend, because a dithered edge needs a couple of cells to read as one;
	// keep it small against the band gaps (0.04 / 0.10) or the surface goes mushy.
	bandBlend: 0.02,
	// Cloud shell: a second, cheaper noise field drifting ahead of the ground.
	// `cover` is the density threshold (2-octave fbm tops out near 0.75); `blend`
	// keeps the edges pixel-crisp; `spinFactor` > 1 lets weather cross coastlines.
	clouds: {
		scale: 2.4,
		cover: 0.46,
		blend: 0.03,
		spinFactor: 1.25,
		octaves: 2,
		// Coverage is a dithered choice between the surface ramp and the cloud ramp,
		// not an alpha blend — so short of 1 it thins the deck by letting ground show
		// through in a dither rather than by washing the two colours together. Lower
		// than the old alpha on purpose: at 0.85 a dithered deck is near solid, and a
		// cloud that lets no ground through reads as a blob rather than as weather.
		opacity: 0.72,
		// The deck's shadow: ground pixels sample the field a second time this far
		// toward the sun (sphere-radius units), and a hit demotes the ramp step by
		// `shadowDrop`. A displaced shadow is the cue that the deck floats above the
		// surface instead of being painted on it.
		shadowOffset: 0.1,
		shadowDrop: 1,
	},
	// One cyclone per visit, seeded like the terrain and fixed in cloud space so it
	// rides the shell. Inside `radius` (radians of arc) the cloud samples rotate
	// around the storm's axis — `swirl` radians at the centre, dying quadratically
	// toward the rim — which bends the fbm streaks into a spiral without inventing
	// a colour. `boost` densifies the wall, `eyeDrop` clears the eye, and the centre
	// stays at cyclone latitudes (|y| in latMin..latMax, off the equator and poles).
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
		// How fast the wall goes solid as its density climbs — at fixed deck opacity
		// the interior is one uniform checker (wallpaper); solid, the interior is
		// textured by the shading instead. `texGain` scales the warped noise into
		// that shading: higher = harder striations inside the wall.
		solidify: 2.5,
		texGain: 2,
		// Cloud-space longitude the centre is seeded around (± lonJitter), in the same
		// angle convention as the cloud spin (spin × spinFactor). Tuned empirically
		// (sweep faceLon live in dev and read the lit blob's screen position off the
		// canvas): 3.7 lands the storm on the lit, on-screen face through the WORK
		// read and the approach beat. During LIFE the sun has swung the lit face past
		// the right screen edge — the visible sliver is terminator — so only the
		// storm's lit fringe can show there; no longitude beats that. Re-measure if
		// JOURNEY.turns or the camera roll channel changes.
		faceLon: 3.7,
		lonJitter: 0.3,
		// The wall is promoted up the cloud ramp toward its white top — this many
		// dither levels at the storm's centre, scaled by daylight — so the spiral
		// stays legible even over pale highland that shares the deck's colours.
		whitenLevels: 3,
	},
	// Atmosphere halo colour, taken from the shared palette like everything else.
	atmosphere: 'haze',
	// How far past the limb the atmosphere reaches, as a fraction of the radius. Wider
	// than a glow needs to be, because the shell below has to have room to read as
	// separate layers rather than as one soft edge.
	haloWidth: 0.22,
	// The atmosphere itself, inner layer out. Alpha is per layer and stepped rather
	// than a falloff: a smooth glow reads as a light source wrapped round a ball, where
	// discrete layers read as air that has a *thickness* — and a thickness is the one
	// cue in the whole frame that states the planet's radius. Warm and dense against
	// the surface, thin and nearly black at the edge of space.
	//
	// Deliberately NOT dithered, unlike every other stepped thing here. The shell is
	// the one surface the camera magnifies to 25x, and at that size a 4x4 dither cell
	// is a 100px chequer — texture up close, a coarse chequered ring once zoomed. More
	// layers instead: the steps land close enough together to read as a falloff, and
	// they stay clean arcs at any magnification.
	shell: [
		['sand', 132],
		['haze', 106],
		['haze', 76],
		['rust', 50],
		['rust', 26],
	],
	// The shell is lit like the ground is, so it comes out as a bright crescent on the
	// sun side. This is what is left of it on the night limb — enough to keep an edge
	// against space, not enough to look like the dark side is glowing.
	shellNight: 0.12,
	// How far the shell's lit arc overshoots the terminator, as a shift of its zero
	// crossing past the day/night line. Forward scatter hangs dusk past the
	// terminator on a real limb; without it the arc dies exactly where the ground does.
	shellTwilight: 0.25,
	// The lit-limb glow, as how many steps up its own ramp the limb is promoted. It
	// brightens by climbing the ramp rather than by adding light on top: an additive
	// term lands between palette entries, and since the ramps warm as they climb, a
	// promotion at the limb comes out as the warm rim it should be.
	rimLevels: 3,
	// Sun glint on open water: specular strength where the key light mirrors off
	// the seas (masked by cloud cover). The wet shine that sells a real planet.
	// Open water under a mirrored sun goes to the top of its ramp where this beats the
	// pixel's dither slot, so the glint is a scatter of full-brightness cells.
	oceanGloss: 0.6,
}

// Palette override for the launch beat's dying Earth (PixelPlanet `palette` prop):
// the same ramps walked through different colours — steel seas and sickly olive land
// under a pale fading atmosphere. The pale ramp is left shared, so its ashen highlands
// are the ones the arrival world already has.
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
