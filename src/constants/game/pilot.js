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
	panel: { at: [1.6, 1.3, 13.5], half: [0.42, 0.3], weld: [0.07, 0.11, -0.11] },
}

// The Earth through the observation bay's glass: the holding screen's Earth of 3812 (js/intro/earthMap.js)
// painted as a whole disc at the art grid's own scale, its `view` centre and `light` as the holding screen
// takes them, its light spread by `gain` (lower than the holding screen's, so the day side keeps its rust);
// hung along `aim` (out through the glass, up, along the corridor), `radius` rad from middle to limb: close,
// the planet filling the glass's foot, its limb cresting low with the stars above, day on one hand and the
// fires of the night side on the other
export const PILOT_WINDOW = {
	view: { lat: -15, lon: 25, heading: 0 },
	light: [0.9, -0.1, 0.3],
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
}

// Each bay's furniture in its own frame (rx out from the opening, y up from the deck, z along from the bay's
// middle), by bay: boxes (`half` sizes), rods (`from` to `to`, radius `r`), discs (radius `r`, `h` tall),
// rings (radius `r`, `w` wide), spheres; `mat` a PILOT_MATS key or a shader of its own (vitals, screen,
// world). `suits`: empty suits hung by their necks at `neck`, facing the corridor; `helmets` set down;
// `holo` a crew member's recording turning over the comms plate, `scale` of life size.
export const PILOT_BAYS = [
	// suit-up: the rail and three spare suits on it
	{
		parts: [
			{ rod: { from: [1.36, 2.02, -1.5], to: [1.36, 2.02, 1.5], r: 0.025 }, mat: 'fitting' },
		],
		suits: {
			at: [
				[1.36, -0.45],
				[1.36, -0.93],
				[1.36, -1.41],
			],
			neck: 1.58,
			rail: 2.02,
		},
	},
	// medical: the bed, its monitor on a pole, a helmet left on the mattress
	{
		parts: [
			{ box: { at: [1.15, 0.62, 0.6], half: [0.32, 0.07, 0.6] }, mat: 'mattress' },
			{ box: { at: [1.15, 0.29, 0.6], half: [0.27, 0.26, 0.5] }, mat: 'fitting' },
			{ rod: { from: [1.4, 0, 1.22], to: [1.4, 1.08, 1.22], r: 0.02 }, mat: 'fitting' },
			{
				box: { at: [1.4, 1.26, 1.22], half: [0.035, 0.16, 0.23] },
				mat: 'fitting',
				face: 'vitals',
			},
		],
		helmets: [[1.02, 0.69, 1.0]],
	},
	// mess: the table on its post, two benches, a cup
	{
		parts: [
			{ box: { at: [0.85, 0.74, 0], half: [0.3, 0.025, 0.6] }, mat: 'furniture' },
			{ rod: { from: [0.85, 0, 0], to: [0.85, 0.72, 0], r: 0.05 }, mat: 'fitting' },
			{ box: { at: [0.38, 0.43, 0], half: [0.11, 0.025, 0.62] }, mat: 'furniture' },
			{ box: { at: [1.3, 0.43, 0], half: [0.11, 0.025, 0.62] }, mat: 'furniture' },
			{ rod: { from: [1.0, 0.765, 0.38], to: [1.0, 0.85, 0.38], r: 0.03 }, mat: 'brushed' },
		],
	},
	// comms: the console and its screen, a stool, the candidate world above the console, the projector
	// plate and a crew member's recording turning over it
	{
		parts: [
			{ box: { at: [1.32, 0.38, -0.1], half: [0.18, 0.38, 0.9] }, mat: 'furniture' },
			{
				box: { at: [1.43, 1.12, -0.1], half: [0.04, 0.3, 0.85] },
				mat: 'fitting',
				face: 'screen',
			},
			{ sphere: { at: [1.1, 1.4, -0.1], r: 0.2 }, mat: 'world' },
			{ rod: { from: [0.8, 0, -0.3], to: [0.8, 0.46, -0.3], r: 0.03 }, mat: 'fitting' },
			{ box: { at: [0.8, 0.48, -0.3], half: [0.14, 0.02, 0.14] }, mat: 'fitting' },
			{ disc: { at: [0.6, 0.02, 0.65], r: 0.22, h: 0.04 }, mat: 'fitting' },
			{ ring: { at: [0.6, 0.045, 0.65], r: 0.2, w: 0.01 }, mat: 'lamp' },
		],
		holo: { at: [0.6, 0.05, 0.65], scale: 0.6, turn: 0.1, stepsPerS: 4 },
	},
	// the window on the Earth: the guardrail along the glass
	{
		parts: [
			{ rod: { from: [1.38, 1.02, -1.4], to: [1.38, 1.02, 1.4], r: 0.028 }, mat: 'brushed' },
		],
	},
]

// The repair job in the panel's frame (x out from the wall, y up, z along): the cavity, four cable runs
// sagging `sag`, the relay and its light, the panel itself leaning on the deck's chamfer (`lean` rad),
// the drone hovering `bob` up and down on a stepped clock, its arm out to the weld tip
export const PILOT_REPAIR = {
	cavity: { at: [0.005, 0, 0], half: [0.012, 0.42, 0.3] },
	cables: { count: 4, x: 0.03, from: -0.3, every: 0.18, half: 0.28, sag: 0.03, r: 0.012 },
	relay: { at: [0.03, 0.12, 0.12], half: [0.025, 0.05, 0.07] },
	relayLight: { at: [0.055, 0.14, 0.14], half: [0.004, 0.006, 0.006] },
	panel: { at: [0.16, -0.85, 0.9], half: [0.012, 0.42, 0.3], lean: 0.37 },
	drone: { at: [0.45, 0.05, 0], half: [0.1, 0.06, 0.09], bob: 0.012, stepsPerS: 6, phase: 0.42 },
	band: { at: [0, -0.045, 0], half: [0.102, 0.012, 0.092] },
	status: { at: [-0.06, 0.065, -0.05], half: [0.012, 0.006, 0.012] },
	arm: { from: [-0.1, -0.03, -0.02], r: 0.02 },
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
// turnRight clip; `greet` idles at a spot and plays `react` (if it has one) when the player comes within
// `reach`; `guard` stands its post facing `heading`.
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
		patrol: { x: 0.75, from: 12, to: 27, speed: 1.32, restS: 3 },
	},
	{
		...ASTRA,
		helmet: HELMET,
		clips: { rest: 'Idle', react: 'Talk' },
		fidgets: ['Idle2'],
		// at the comms console
		greet: { x: -2.35, z: 22.1, reach: 3.5 },
	},
	{
		...ELY,
		helmet: HELMET,
		clips: { rest: 'Idle', react: 'Talk' },
		fidgets: ['Idle2'],
		// by the mess table
		greet: { x: 1.8, z: 16.1, reach: 3.5 },
	},
]

// The player's own body, worn by the camera and seen looking down: Ely on the crew's clips, without
// the skin the `drop` bones carry (the head), its neck held `back` m behind the eye, so that looking down
// shows the boots under the eye, not the chest, and the legs never step out ahead; walking above
// `walking` pace, easing into a run over `blendS` s, and no clip slowed below `slowest` m/s. `gaits`:
// each clip and how fast its boots pass the deck (m/s at Ely's height), so each plays at the body's
// speed over its own and the feet never skate.
export const PILOT_BODY = {
	...ELY,
	clipsFrom: LOCOMOTION,
	drop: /Head|Eye/,
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
