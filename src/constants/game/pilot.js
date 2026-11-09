// The three.js corridor pilot (dev only): the corridor rebuilt as meshes, crewed by rigged characters,
// drawn on the art grid and snapped to the corridor shot's palette. World units are metres, y up, the
// deck at y = 0, the walk running down +z to the door.

import { CORRIDOR } from '../intro/corridor.js'

export const PILOT = {
	// a finer cell than the shader corridor's (CORRIDOR.cellPx 5.6): the crew read better at it;
	// its palette, so the two can be compared side by side, and brass, so a dimmed suit light stays
	// yellow
	cellPx: 3,
	seam: CORRIDOR.seam,
	palette: [...CORRIDOR.palette, 'brass'],
	walk: CORRIDOR.walk,
	// eye height over the deck (the crew model's own eyes), where the eye sits from the neck it tips
	// about (ahead, up), how far the head can tip down and up (rad), and the head's bob: its rise at a
	// full walk, once a step of `stepM` m (the walk clip's own step, so the head keeps time with the legs)
	eye: 1.64,
	neck: [0.09, 0.12],
	tilt: { down: 1.05, up: 0.9 },
	bob: { height: 0.02, stepM: 0.79 },
	fovDeg: 70,
	near: 0.05,
	far: 60,
	// the edge pass: how far behind a neighbour must sit (share of the cell's depth) to outline it,
	// how far two faces must turn apart to glint, and the shade each takes
	edges: { step: 0.08, turn: 0.35, ink: 0.42, glint: 1.5, far: 16 },
}

// The corridor as the intro's shader draws it (shaders/intro/corridor.frag.glsl), rebuilt in meshes. Metres
// in three's frame: the deck at y = 0, x mirrored from the shader's so each side stays on the same hand.
// The octagon's half-width, height and corner cut; `eye` the shader's eye level over the deck, its y = 0,
// the frame the surface shaders work in; ribs every `every` m on the odd metres, `inset` proud and `depth`
// thick; five bays from `first` every `every` m, alternating sides from three's +x (the left hand), `half`
// long and `depth` deep; the sealed hatch at `back`, the door wall at `door`; the light lines' width.
export const PILOT_SET = {
	halfWidth: 1.6,
	height: 2.6,
	chamfer: 0.5,
	eye: 1.6,
	back: -3.5,
	door: 35,
	ribs: { every: 2, inset: 0.08, depth: 0.14 },
	bays: { first: 5, every: 6, count: 5, half: 1.5, depth: 1.5 },
	lineWidth: 0.045,
	// the door wall: `count` locker cells leftward from x `edge`, `pitch` apart, each `inset` in from its
	// pitch, from `bottom` to `top`, sunk `deep`; the doorway's x span and top, sunk `deep`, its light `glow`
	// m up and `ahead` m out from it
	lockers: { edge: 1.46, pitch: 0.5, count: 3, inset: 0.04, bottom: 0.05, top: 2, deep: 0.45 },
	doorway: { x: [-0.95, -0.15], top: 2.1, deep: 0.12, glow: 1.1, ahead: 0.1 },
	// the repair job's open wall panel: its centre, its half height and half length, and the weld tip in
	// its own frame (out from the wall, up, along)
	panel: { at: [1.6, 1.3, 20], half: [0.42, 0.3], weld: [0.07, 0.11, -0.11] },
	// the glass span in bay `bay`'s place: from rib `from` to rib `to` every face of the octagon but the
	// deck and ceiling is glass between the ribs, framed `frame` m along each corner; its lines of light
	// drop to the deck's edge, `lineInset` in from the lower cut, at `lineGain` of their light; walkable
	// to `reach` off the middle
	span: { bay: 2, from: 13, to: 19, frame: 0.035, lineInset: 0.08, lineGain: 0.7, reach: 1.2 },
	// the observation blister in bay `bay`'s place: `depth` m deep, glass on its back, sides and ceiling
	// in panes about `pitch` m framed `frame` m, and a strip of glass `floor` m wide along its outer edge
	blister: { bay: 4, depth: 2.4, pitch: 0.75, frame: 0.035, floor: 0.55 },
	// ports in the left-hand lower cut between the ribs, the Earth at your feet: from `along[0]` to
	// `along[1]` m down the cut from the wall, `inset` m in from each rib
	ports: { along: [0.08, 0.4], inset: 0.25 },
}

// The light from outside, through any glass: the Earth's (`earth` of its colour, from its middle on what
// faces it, glowing `spill` m past the span's ends) and the sun's, along `sun` (three's frame, toward it:
// out over the left hand, high and ahead, well clear of the Earth), in hard patches where its rays come in
// between the ribs
export const PILOT_OUTSIDE = { earth: 2.2, spill: 1.2, sun: [0.4, 0.55, 0.73], sunGain: 2.6 }

// The sun's shadows: the crew's and the player's depth seen from the sun, on three's `layer` (a mesh only
// there casts and is never seen), `size` texels square; a point is looked up `lift` m off its surface and
// `bias` (of the depth range) nearer the sun, so nothing shades itself where it faces the light. And under
// lamps: the deck darkens `dark` at a character's feet, fading out `radius` m round, for up to `feet` of them
export const PILOT_SHADOW = {
	layer: 1,
	size: 2048,
	lift: 0.03,
	bias: 0.002,
	underfoot: { radius: 0.5, dark: 0.7, feet: 8 },
}

// The sun itself through the glass, along PILOT_OUTSIDE.sun: the intro's star (js/intro/sky.js) swollen
// to `radius` rad, at the fields shot's `age`, its corona at `corona`; its glare drowns the stars and thins
// the corona out to `glare` of its radius
export const PILOT_SUN = { radius: 0.5, age: 1, corona: 1, glare: 3 }

// What hangs outside the hull (the spacewalker): drawn on three's `layer` by its own pass, from the player's
// eye out to `near` and `far` m, for the glass to show where it covers it; lit by the sun at `sun` of the
// corridor's sunlight, the Earth's rust from below at `earth`, a cold `ambient` from the void, the escort
// drone's eye falling off as 1 / (1 + `lampFall` d²) and none of it within `lampClear` m (the drone round
// it), and a `rim` on every edge turned to the sun
export const PILOT_SPACE = {
	layer: 2,
	near: 0.5,
	far: 200,
	light: { sun: 1.1, earth: 0.3, ambient: 0.15, rim: 0.35, lampFall: 1.5, lampClear: 0.25 },
}

// The Earth through the observation bay's glass: the holding screen's Earth of 3812 (js/intro/earthMap.js)
// painted as a whole disc at the art grid's own scale, its `view` centre as the holding screen takes it, lit
// from the sun (PILOT_OUTSIDE.sun), its light spread by `gain` (lower than the holding screen's, so the day
// side keeps its rust); hung along `aim` (out through the glass, up, along the corridor), `radius` rad from
// middle to limb: close, the planet filling the glass's foot, its limb cresting low with the stars above,
// day toward the sun and the fires of the night side on the other hand
export const PILOT_WINDOW = {
	view: { lat: -15, lon: 25, heading: 0 },
	gain: 1.2,
	aim: [0.7, -0.72, 0],
	radius: 0.7,
}

// How the player gets about the bays: their body this far from walls and things, and anything standing no
// lower than `overhead` is above their head, walked under
export const PILOT_ROOM = { body: 0.3, overhead: 1.5 }

// a cell the pixel pass leaves exactly as drawn, flagged in its alpha: art already in the palette's colours
export const PILOT_EXACT_ALPHA = 0.5

// What stands in the bays and at the repair panel, in the shader's colours: each material a palette colour
// times a factor (or a mix of two, then the factor), `gloss` for the lights' highlights on hard shells,
// `emit` its own light, `rim` 0 for the lit and dark bits the bays' rim light leaves alone.
export const PILOT_MATS = {
	fitting: { base: ['graphite', 0.7] },
	mattress: { base: ['silver', 0.5] },
	furniture: { base: ['graphite', 0.9] },
	brushed: { base: ['brushed', 0.7] },
	white: { base: ['silver', 'star', 0.55, 1], gloss: 0.7 },
	seam: { base: ['graphite', 0.5] },
	light: { base: ['pitch', 1], emit: ['rime', 'star', 0.75, 1.4], rim: 0 },
	lamp: { base: ['pitch', 1], emit: ['rime', 'star', 0.5, 1.4], rim: 0 },
	cavity: { base: ['pitch', 0.5], rim: 0 },
	spark: { base: ['pitch', 1], emit: ['ember', 'glow', 0.6, 1.8], rim: 0 },
	keys: { base: ['pitch', 1], emit: ['frost', 'rime', 0.5, 0.9], rim: 0 },
	holoRing: { base: ['pitch', 1], emit: ['rime', 'star', 0.5, 1.4], rim: 0 },
	earth: { base: ['pitch', 1], emit: ['brick', 'amber', 0.6, 1.3], rim: 0 },
	vial: { base: ['pitch', 1], emit: ['rime', 'star', 0.6, 1.1], rim: 0 },
	// the drones: their livery, halo, eye, iris and beacon
	halo: { base: ['pitch', 1], emit: ['rime', 'star', 0.6, 1.4], rim: 0 },
	livery: { base: ['clay', 'amber', 0.5, 1], gloss: 0.5 },
	eye: { base: ['pitch', 1], emit: ['rime', 'star', 0.4, 1.3], rim: 0 },
	pupil: { base: ['pitch', 1], emit: ['star', 1.6], rim: 0 },
	iris: { base: ['pitch', 1] },
	beacon: { base: ['pitch', 1], emit: ['ember', 'glow', 0.3, 1.6], rim: 0 },
	// a thruster's puff of cold gas, lit white by the sun
	puff: { base: ['pitch', 1], emit: ['rime', 'silver', 0.6, 1.1], rim: 0 },
}

// Each bay's furniture in its own frame (rx out from the opening, y up from the deck, z along from the bay's
// middle), by bay: boxes (`half` sizes), rods (`from` to `to`, radius `r`), discs (radius `r`, `h` tall),
// rings (radius `r`, `w` wide), spheres, octagons (the corridor's own shape, radius `r` at its top and
// foot, `h` tall), prisms (a `profile` of [rx, y] corners run along the bay from z[0] to z[1]) and panes
// (floating glass, `half` its width and height, turned `yaw` rad toward +z, a light bar under it); `mat`
// a PILOT_MATS key or a shader of its own (world; a pane's `face`, vitals). `vault`: the drawer wall's
// pulled drawer (PILOT_VAULT); `seedling` a plant in light turning over a plate, its leaves `spiral` rad
// apart, leaning `lean` up, shrinking by `taper` toward the top; `cradle` the medical bed's canopy, arch
// and scan (corridorRooms.js); `holo` a crew member's recording turning over
// a projector plate, `scale` of life size, in a beam `height` m tall from `foot` to `top` wide, a band of
// it now and then (`odds` of each of `perS` beats) slid `shift` aside, its plate's ring flickering as it
// speaks; `route` dots of light arcing `lift` m high from
// the Earth at `from` to the world at `to` (its radius `r` short of it), a ship stepping along them.
export const PILOT_BAYS = [
	// the seed vault: its back wall all drawers lit from inside (PILOT_VAULT), one pulled out with its vials,
	// and a seedling turning in light over a projector plate
	{
		parts: [
			{ disc: { at: [0.6, 0.02, 0.15], r: 0.22, h: 0.04 }, mat: 'fitting' },
			{ ring: { at: [0.6, 0.045, 0.15], r: 0.2, w: 0.012 }, mat: 'lamp' },
		],
		vault: true,
		seedling: {
			at: [0.6, 0.05, 0.15],
			height: 1.15,
			stem: 0.022,
			bend: 0.08,
			leaves: 5,
			leaf: [0.2, 0.018, 0.08],
			spiral: 2.4,
			lean: 0.45,
			taper: 0.5,
			seed: 0.085,
			turn: 0.12,
			stepsPerS: 3,
		},
	},
	// medical: a scan cradle grown out of the back wall under its mattress, the glass canopy slid back over
	// the head end, an arch of light stepping along it, the sleeper's scan lying in light over it, and the
	// vitals on a floating pane
	{
		parts: [
			{
				prism: {
					profile: [
						[1.5, 0.64],
						[0.6, 0.64],
						[0.6, 0.58],
						[0.85, 0.33],
						[1.5, 0.33],
					],
					z: [-1.05, 1.05],
				},
				mat: 'white',
			},
			{ box: { at: [1.04, 0.665, 0], half: [0.4, 0.025, 1.0] }, mat: 'mattress' },
			{ box: { at: [0.596, 0.605, 0], half: [0.006, 0.008, 1.02] }, mat: 'light' },
			{ pane: { at: [1.3, 1.42, -0.55], half: [0.26, 0.16], yaw: 0, face: 'vitals' } },
		],
		cradle: {
			// the canopy's axis (rx, y), radius, the stretch it covers and its end frames' thickness
			canopy: { at: [1.04, 0.69], r: 0.46, z: [-1.0, -0.3], frame: 0.014 },
			// the arch stepping to and fro along the bed in `steps` stops
			arch: { r: 0.5, tube: 0.016, z: [-0.85, 0.85], steps: 12, stepsPerS: 3 },
			// the scan: feet at `at`, lying head toward -z, `scale` of life size
			scan: { at: [1.04, 0.95, 0.82], scale: 1 },
		},
	},
	// the glass span (PILOT_SET.span) in the mess's place: nothing stands in it
	{ parts: [] },
	// ops: a desk grown out of the back wall under three floating glass panes, the mission table with the
	// candidate world over it and the route there from the Earth, the projector plate and a crew
	// member's recording turning over it
	{
		parts: [
			{
				prism: {
					profile: [
						[1.5, 0.81],
						[1.0, 0.81],
						[1.0, 0.76],
						[1.25, 0.51],
						[1.5, 0.51],
					],
					z: [-1.15, 1.15],
				},
				mat: 'furniture',
			},
			{ box: { at: [0.996, 0.785, 0], half: [0.006, 0.008, 1.12] }, mat: 'light' },
			{ box: { at: [1.17, 0.814, 0.05], half: [0.07, 0.004, 0.34] }, mat: 'keys' },
			{ pane: { at: [1.3, 1.28, -0.74], half: [0.3, 0.2], yaw: 0.4 } },
			{ pane: { at: [1.34, 1.36, 0], half: [0.34, 0.23], yaw: 0 } },
			{ pane: { at: [1.3, 1.28, 0.74], half: [0.3, 0.2], yaw: -0.4 } },
			{ octagon: { at: [0.6, 0.35, -0.8], r: [0.07, 0.15], h: 0.7 }, mat: 'furniture' },
			{ octagon: { at: [0.6, 0.72, -0.8], r: [0.34, 0.3], h: 0.05 }, mat: 'fitting' },
			{ ring: { at: [0.6, 0.748, -0.8], r: 0.29, w: 0.012 }, mat: 'lamp' },
			{ sphere: { at: [0.6, 1.2, -0.8], r: 0.24 }, mat: 'world' },
			{ disc: { at: [0.62, 0.02, 0.72], r: 0.22, h: 0.04 }, mat: 'fitting' },
			{ ring: { at: [0.62, 0.045, 0.72], r: 0.2, w: 0.012 }, mat: 'holoRing' },
		],
		holo: {
			at: [0.62, 0.05, 0.72],
			scale: 0.6,
			turn: 0.1,
			stepsPerS: 4,
			beam: { height: 1.12, foot: 0.19, top: 0.15 },
			glitch: { perS: 12, odds: 0.07, band: 0.07, shift: 0.12 },
			flickerPerS: 6,
		},
		route: {
			from: [0.86, 0.98, -0.5],
			to: [0.6, 1.2, -0.8],
			r: 0.24,
			lift: 0.22,
			dots: 9,
			dot: 0.011,
			earth: 0.035,
			ship: 0.016,
			stepsPerS: 3,
		},
	},
	// the blister on the Earth (PILOT_SET.blister): the guardrail wall to wall, short of the floor's glass
	{
		parts: [
			{ rod: { from: [1.8, 1.02, -1.5], to: [1.8, 1.02, 1.5], r: 0.028 }, mat: 'brushed' },
		],
	},
]

// The seed vault's back wall: drawers `cell` m (along, up) with `seam` between, from `rows` y to y and `along`
// either side of the bay's middle, `lit` of them glowing; the one pulled out (`col`, `row` from the corner
// low on the hatch side) stands `out` m from the wall holding `vials` (along, across) vials `vial` (radius,
// height)
export const PILOT_VAULT = {
	cell: [0.2, 0.13],
	seam: 0.022,
	rows: [0.3, 2.0],
	along: 1.3,
	lit: 0.6,
	pulled: { col: 4, row: 5, out: 0.36, vials: [3, 2], vial: [0.016, 0.075] },
}

// The departures board on the right-hand wall by the start: the ten ships, two columns of five, each HERMES,
// its number and its light (sealed steady, ours blinking, the rest dark), from `z` to `z`, its top `top` m
// up, in glyph cells `cell` m square
export const PILOT_BOARD = { z: [-0.6, 0.9], top: 2.06, cell: 0.018, ours: 8, sealed: 7 }

// a floating pane's light bar: how thick, and how far under the glass
export const PILOT_PANE = { bar: 0.012, gap: 0.03 }

// A station drone in its own frame (metres; its eye along +z, up +y): a white `body` (an ellipsoid, radii
// x, y, z) under an orange livery `cap` reaching `cap` rad down from its top, split at the waist by a dark
// `band`; a glowing `halo` ring `r` round orbiting it, tipped `tilt` rad and precessing `step` rad
// `stepsPerS` times a second; the `eye` on its nose, a lens `r` round in an `iris` and a `collar`, its
// `pupil` pulsing between `pulse` sizes `pulsePerS` times a second; a glowing `vent` at its tail; two thruster
// `pods` (capsules `r` round and `length` long at ±`x`, `y`, a glowing nozzle `nozzle` round aft); two
// antenna `fins` (half sizes `half`) at ±`at`, splayed `splay` rad, a `beacon` blinking `blinkPerS` on the
// left one's tip.
export const PILOT_DRONE = {
	body: [0.12, 0.1, 0.145],
	cap: 0.75,
	band: { tube: 0.011 },
	halo: { r: 0.2, tube: 0.0075, tilt: 0.38, step: 0.35, stepsPerS: 3 },
	eye: { r: 0.06, iris: 0.045, pupil: 0.022, pulse: [0.8, 1.15], pulsePerS: 3, depth: 0.012 },
	collar: { tube: 0.011 },
	vent: { r: 0.045, depth: 0.01 },
	pods: { x: 0.155, y: -0.02, r: 0.028, length: 0.09, nozzle: 0.022 },
	fins: { at: [0.05, 0.1, -0.07], half: [0.004, 0.04, 0.032], splay: 0.4 },
	beacon: { r: 0.009, blinkPerS: 1.4 },
}

// The repair job in the panel's frame (x out from the wall, y up, z along): the cavity, four cable runs
// sagging `sag`, the relay and its light; the panel itself held up off the wall beside the hole, turned
// `tilt` rad toward the corridor; the drone (PILOT_DRONE) facing the work, turned `yaw` rad toward the hatch
// so the walk up to it meets its eye, hovering `bob` up and down on a
// stepped clock; its two arms `r` round from their `shoulders` (in the drone's frame), each bent at an elbow
// `lift` above the straight line, one ending in a `torch` at the weld tip, one in two `fingers` `spread`
// apart on the panel's near edge; and the sparks the weld throws,
// `perBurst` at each flash of it, out at `speed` and up to `up` m/s, falling, bouncing off the deck and
// the lower cut at `bounce` and going out in `steps` over their `life`
export const PILOT_REPAIR = {
	cavity: { at: [0.005, 0, 0], half: [0.012, 0.42, 0.3] },
	cables: { count: 4, x: 0.03, from: -0.3, every: 0.18, half: 0.28, sag: 0.03, r: 0.012 },
	relay: { at: [0.03, 0.12, 0.12], half: [0.025, 0.05, 0.07] },
	relayLight: { at: [0.055, 0.14, 0.14], half: [0.004, 0.006, 0.006] },
	panel: { at: [0.36, -0.04, 0.78], half: [0.012, 0.4, 0.28], tilt: 0.5 },
	drone: { at: [0.46, 0.17, 0.12], yaw: 0.6, bob: 0.012, stepsPerS: 6, phase: 0.42 },
	arms: {
		r: 0.013,
		lift: 0.07,
		shoulders: [
			[0.07, -0.085, 0.04],
			[-0.07, -0.085, 0.04],
		],
		torch: { r: 0.012, length: 0.04 },
		fingers: { half: [0.004, 0.004, 0.022], spread: 0.014 },
	},
	sparks: {
		count: 40,
		perBurst: 4,
		speed: [0.3, 1.2],
		up: 0.8,
		life: [0.45, 1.1],
		size: 0.016,
		gravity: 9.8,
		bounce: 0.35,
		steps: 3,
	},
}

// The three suits in the lockers, one per role, hung `scale` of life size at `neck`, `back` m into the
// door wall, each helmet on a shelf (its middle `y` up, its half sizes) above it
export const PILOT_LOCKER_SUITS = {
	scale: 1 / 1.2,
	neck: 1.25,
	back: 0.32,
	shelf: { y: 1.575, half: [0.18, 0.0125, 0.17] },
}

// The crew: a model, how tall it stands (times `scale`, which lengthens its stride too), which way its
// front faces at rest (rad about y), its clips by role and the `fidgets` it plays now and then standing
// about, how fast its walk clip covers the deck (m/s at `height`, so the feet keep their grip), and what
// it does.
// `patrol` walks between two z marks at `x`, resting at each and turning about with its turnLeft or
// turnRight clip; `greet` idles at a spot facing the player, or its `watch` heading till they come near,
// and plays `react` (if it has one) when they come within `reach`; `guard` stands its post facing
// `heading`.
// the crew's suit lights, driven so they land on the guards' brass yellow near and far
const SUIT_LIGHTS = { color: 'star', intensity: 1.3 }
// a suit light's emissive mips: how bright (of full) a texel must be to count as light, a fainter wash
// staying dark; and how many of the first levels keep any lit texel before the rest need two, so the
// lights hold up close and fade out far off
export const PILOT_GLOW = { floor: 0.35, keep: 1 }
// The crew's clips, Mixamo mocap baked onto Ely's skeleton for any Mixamo rig to borrow (`clipsFrom`)
const LOCOMOTION = '/assets/game/models/Locomotion.glb'
// Mixamo's Astra, on her own clips (Idle, Idle2, Talk)
const ASTRA = {
	url: '/assets/game/models/Astra.glb',
	height: 1.7,
	facing: 0,
	glow: { ...SUIT_LIGHTS, materials: /^Ch48_body/ },
}
// Mixamo's Ely by K. Atienza, on his own clips (as Astra's); his suit's lights turned from orange to the
// guards' yellow at conversion, and half of them (every one on the legs and hips) put out
const ELY = {
	url: '/assets/game/models/Ely.glb',
	height: 1.79,
	facing: 0,
	glow: { ...SUIT_LIGHTS, materials: /^Ely$/ },
}

// The crew never show a face: the head's skin (eyes too) goes and the helmet, its origin at its rim's
// centre and its face down +z, takes its place sized to that head: `fit` times its width, the rim `seat`
// of its height under the chin, centred `ahead` of its depth forward (back, below 0); tipped back
// `tipBack` rad against the idle's bowed head.
// "Sci-Fi Helmet" by Udon-San, CC BY 4.0 (sketchfab.com/3d-models/sci-fi-helmet-785f5cfd848940b1a4a0b8ddeefc9ef1):
// merged and rescaled, its visor's triangle removed.
const HELMET = {
	url: '/assets/game/models/HelmetUdon.glb',
	bone: 'mixamorig1Head',
	drop: /Head|Eye/,
	fit: 1.15,
	seat: 0.2,
	ahead: -0.05,
	tipBack: 0.12,
	glow: { ...SUIT_LIGHTS, materials: /^helmet$/ },
	// the undersuit's fabric from the base of the neck (`from`) up `reach` of the head's height over the
	// chin; `base` then `top` its half-width and half-depth as shares of the head's, widening as `flare`
	// (an exponent: under 1, early) to fill the helmet's slanted back; `rings` by `sides`
	seal: {
		from: 'mixamorig1Neck',
		color: 'steel',
		reach: 0.25,
		base: [0.36, 0.3],
		top: [0.46, 0.5],
		flare: 0.5,
		rings: 6,
		sides: 20,
	},
}

// Mixamo's Vanguard by T. Choonyung, its suit greyed to gunmetal (0.8 of its brightness) and its
// utility belt cut away at conversion; the visor and the lamps on its brow, chest and back lit yellow
const VANGUARD = {
	url: '/assets/game/models/Vanguard.glb',
	height: 1.86,
	facing: 0,
	clipsFrom: LOCOMOTION,
	clips: { rest: 'Guard' },
	fidgets: ['NeckStretch', 'LookAbout'],
	glow: { materials: /Visor|Lamp/, color: 'ember', intensity: 0.5 },
}

// What the props borrow from the crew: the helmet set down (`width` across), the empty suits hung up (each
// model posed by its `pose` clip), and the crew member recorded over the comms plate, playing `clip`
export const PILOT_PROP_MODELS = {
	helmet: { url: HELMET.url, glow: HELMET.glow, width: 0.32 },
	suits: [
		{ ...ELY, pose: 'Idle' },
		{ ...ASTRA, pose: 'Idle' },
	],
	recording: { ...ASTRA, helmet: HELMET, clip: 'Talk' },
}

export const PILOT_CREW = [
	// a pair of guards either side of the sealed hatch behind the start, 1.82 and 1.88 m tall
	{
		...VANGUARD,
		scale: 1.01,
		clips: { rest: 'Look' },
		fidgets: ['NeckStretch'],
		guard: { x: 1.1, z: -3, heading: 0 },
	},
	{ ...VANGUARD, scale: 0.98, guard: { x: -1.1, z: -3, heading: 0 } },
	// the patrols walk at their walk's own pace, borrowed with their turns about: Mixamo's "Male Walk
	// Forward" 01 and 02, whose boots stay planted on either rig (their own walks skid)
	{
		...ASTRA,
		helmet: HELMET,
		clipsFrom: LOCOMOTION,
		borrow: ['WalkForward01', 'TurnLeft', 'TurnRight'],
		clips: {
			walk: 'WalkForward01',
			rest: 'Idle',
			turnLeft: 'TurnLeft',
			turnRight: 'TurnRight',
		},
		walkSpeed: 1.14,
		patrol: { x: -0.75, from: 6, to: 21, speed: 1.14, restS: 3 },
	},
	{
		...ELY,
		helmet: HELMET,
		clipsFrom: LOCOMOTION,
		borrow: ['WalkForward02', 'TurnLeft', 'TurnRight'],
		clips: {
			walk: 'WalkForward02',
			rest: 'Idle',
			turnLeft: 'TurnLeft',
			turnRight: 'TurnRight',
		},
		walkSpeed: 1.32,
		patrol: { x: 0.75, from: 20, to: 30, speed: 1.32, restS: 3 },
	},
	{
		...ASTRA,
		helmet: HELMET,
		clips: { rest: 'Idle', react: 'Talk' },
		fidgets: ['Idle2'],
		// at the ops desk, between the mission table and the projector plate
		greet: { x: -2.45, z: 23.1, reach: 3.5 },
	},
	{
		...ELY,
		helmet: HELMET,
		clips: { rest: 'Idle', react: 'Talk' },
		fidgets: ['Idle2'],
		// at the glass span's left-hand panes, watching the Earth till the player comes by
		greet: { x: 1.0, z: 16.1, reach: 3.5, watch: Math.PI / 2 },
	},
]

// The spacewalker: Astra in her helmet on the space layer, making her round of the station's outside. Her
// path loops through `path` (three's frame): out past the right-hand span, over the roof, above the blister's
// glass roof and round its far side, back down the left past the span low against the Earth, and under the
// deck by the floor ports. She tops out at `speed` m/s, easing in and out of each of her `stops` (a `path`
// index), where she rests `restS` s looking in at the hull, or at the player once they are within `reach`,
// playing her `react`. Each clip role (`rest`, `react`, and `travel` if given) is hers to swap. Weightless,
// her clips run at `pace`, she bobs `bob` m over `periodS` s, leans `lean` rad into her travel and turns at
// `turnRate` rad/s; her head points `upright` of the way from the world's up to straight out from the hull,
// whose axis runs the corridor's length at height `axis`.
// She flies on a thruster `pack` on her back (half sizes `half`, `back` m behind her `bone`, its
// `nozzles` at its lower corners, in its own frame), which puffs cold gas against her acceleration once it
// passes `kick` m/s²: a burst of `perBurst` puffs every `everyS` s, each flying `speed` m/s, swelling from
// `size` to `grow` times that and going out in `steps` over `lifeS`; holding station, a puff every
// `holdS` s. Her `escort`, a drone (PILOT_DRONE) `scale` times its size, keeps station `offset` m from her
// (her left, up, ahead), closing on that spot over `followS` s, its eye on her chest (`chest` m up from
// her feet) and lighting her `lamp`.
export const PILOT_SPACEWALKER = {
	...ASTRA,
	helmet: HELMET,
	clips: { rest: 'Idle', react: 'Talk' },
	fidgets: ['Idle2'],
	path: [
		[-4.2, 1.3, 12.8],
		[-3.3, 1.6, 15.8],
		[-3.1, 2.4, 19.8],
		[-1.9, 3.8, 22.2],
		[0, 4.4, 24],
		[2, 3.9, 25.9],
		[2.7, 3.4, 27.6],
		[2.8, 3.1, 29.2],
		[4.8, 2, 31.4],
		[5, 1, 28.4],
		[3.7, 0.5, 25],
		[3.1, 0.3, 17.6],
		[2.9, 0.2, 12.8],
		[1.9, -1.3, 10.2],
		[0, -1.9, 9.4],
		[-2.6, -1.3, 10],
	],
	stops: [
		{ at: 1, restS: 10 },
		{ at: 7, restS: 8 },
		{ at: 11, restS: 10 },
	],
	speed: 0.6,
	reach: 3.5,
	pace: 0.6,
	bob: 0.1,
	periodS: 9,
	lean: 0.35,
	turnRate: 0.8,
	upright: 0.35,
	axis: 1.3,
	pack: {
		bone: 'mixamorig1Spine2',
		back: 0.16,
		half: [0.15, 0.2, 0.06],
		nozzles: [
			[0.11, -0.2, -0.03],
			[-0.11, -0.2, -0.03],
		],
	},
	puffs: {
		count: 48,
		kick: 0.02,
		perBurst: 3,
		everyS: 0.35,
		holdS: 3.5,
		speed: 0.9,
		size: 0.035,
		grow: 2.5,
		steps: 3,
		lifeS: 0.7,
	},
	escort: { scale: 1.4, offset: [0.75, 0.55, 0.35], followS: 0.9, chest: 1.2, lamp: 1.6 },
}

// The player's own body, worn by the camera and seen looking down: Ely on the crew's clips, its head swapped
// for the crew's `helmet`, which only its shadow shows, its neck held `back` m behind the eye, so that
// looking down shows the boots under the eye, not the chest, and the legs never step out ahead; walking
// above `walking` pace, easing into a run over `blendS` s, and no clip slowed below `slowest` m/s. `gaits`:
// each clip and how fast its boots pass the deck (m/s at Ely's height), so each plays at the body's
// speed over its own and the feet never skate.
export const PILOT_BODY = {
	...ELY,
	clipsFrom: LOCOMOTION,
	helmet: HELMET,
	back: 0.18,
	walking: 0.15,
	blendS: 0.2,
	slowest: 0.3,
	gaits: {
		walk: { clip: 'WalkForward03', speed: 1.44 },
		run: { clip: 'Run', speed: 2.78 },
		back: { clip: 'Back', speed: 0.84 },
		left: { clip: 'StrafeLeft', speed: 1.63 },
		right: { clip: 'StrafeRight', speed: 1.63 },
		runLeft: { clip: 'RunLeft', speed: 2.02 },
		runRight: { clip: 'RunRight', speed: 2.02 },
	},
}

// A patrol speeds up and brakes at `accel` m/s², stopping right on its mark, and plays its walk above
// `walking` m/s, its rest clip below.
export const PILOT_PATROL = { accel: 1.6, walking: 0.2 }

// seconds standing about between one fidget and the next, picked afresh each time
export const PILOT_IDLE = { everyS: [9, 20] }

// seconds to blend one animation into the next
export const PILOT_FADE_S = 0.35
// how fast a crew member turns to face where it is going, rad/s
export const PILOT_TURN_RATE = 4

export const PILOT_BOOT = { context: 0.1, models: 0.75, frame: 0.15 }
