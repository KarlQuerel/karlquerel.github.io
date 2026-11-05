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
	// about (ahead, up), how far the head can tip down and up (rad), and the head's bob per
	// stride at a full walk
	eye: 1.64,
	neck: [0.09, 0.12],
	tilt: { down: 1.05, up: 0.9 },
	bob: { height: 0.035, strideS: 0.55 },
	fovDeg: 70,
	near: 0.05,
	far: 60,
	// the hull's cross-section: half-width, height, the cut across each corner; its ends along z
	hull: { halfWidth: 1.6, height: 2.6, chamfer: 0.55, back: -3.5, door: 35 },
	// a rib ring every `every` m, standing `inset` proud of the hull, `depth` thick
	ribs: { every: 2, inset: 0.08, depth: 0.14 },
	// a lamp over the walk every `every` m: colour, candela, reach
	lamps: { every: 6, color: 'rime', intensity: 9, distance: 10 },
	// the light strips along the upper chamfers, and the door's warm glow
	strip: { color: 'frost', width: 0.05 },
	door: { color: 'ember', intensity: 14, distance: 14, width: 0.8, height: 2.1, x: 0.55 },
	// lockers along the left wall short of the door
	lockers: { count: 4, from: 31, width: 0.55, depth: 0.45, height: 2, color: 'gun' },
	hullColor: 'graphite',
	ribColor: 'gun',
	deckColor: 'steel',
	ambient: { sky: 'rime', ground: 'pitch', intensity: 1.6 },
	fog: { color: 'void', near: 8, far: 30 },
	// the edge pass: how far behind a neighbour must sit (share of the cell's depth) to outline it,
	// how far two faces must turn apart to glint, and the shade each takes
	edges: { step: 0.08, turn: 0.35, ink: 0.42, glint: 1.5, far: 16 },
}

// The crew: a model, how tall it stands (times `scale`, which lengthens its stride too), which way its
// front faces at rest (rad about y), its clips by role, how fast its walk clip covers the deck (m/s at
// `height`, so the feet keep their grip), and what it does.
// `patrol` walks between two z marks at `x`, resting between legs; `greet` idles at a spot and plays
// `react` (if it has one) when the player comes within `reach`; `guard` stands its post facing `heading`.
// the crew's suit lights, driven so they land on the guards' brass yellow near and far
const SUIT_LIGHTS = { color: 'star', intensity: 1.3 }
// a suit light's emissive mips: how bright (of full) a texel must be to count as light, a fainter wash
// staying dark; and how many of the first levels keep any lit texel before the rest need two, so the
// lights hold up close and fade out far off
export const PILOT_GLOW = { floor: 0.35, keep: 1 }
const ASTRA = {
	url: '/assets/game/models/Astra.glb',
	height: 1.7,
	facing: 0,
	walkSpeed: 1.45,
	glow: { ...SUIT_LIGHTS, materials: /^Ch48_body/ },
}
// The men's clips, Mixamo mocap baked onto Ely's skeleton for any Mixamo rig to borrow (`clipsFrom`)
const LOCOMOTION = '/assets/game/models/Locomotion.glb'
// Mixamo's Ely by K. Atienza, on the men's clips; his suit's lights turned from orange to the guards'
// yellow at conversion, and half of them (every one on the legs and hips) put out
const ELY = {
	url: '/assets/game/models/Ely.glb',
	clipsFrom: LOCOMOTION,
	height: 1.79,
	facing: 0,
	walkSpeed: 1.52,
	glow: { ...SUIT_LIGHTS, materials: /^Ely$/ },
}

// The crew never show a face: the head's skin (eyes too) goes and the helmet, its origin at its rim's
// centre and its face down +z, takes its place sized to that head: `fit` times its width, the rim `seat`
// of its height under the chin, centred `ahead` of its depth forward; tipped back `tipBack` rad against
// the idle's bowed head.
// "Sci-Fi Helmet" by Udon-San, CC BY 4.0 (sketchfab.com/3d-models/sci-fi-helmet-785f5cfd848940b1a4a0b8ddeefc9ef1):
// merged and rescaled, its visor's triangle removed.
const HELMET = {
	url: '/assets/game/models/HelmetUdon.glb',
	bone: 'mixamorig1Head',
	drop: /Head|Eye/,
	fit: 1.15,
	seat: 0.2,
	ahead: 0.1,
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
	glow: { materials: /Visor|Lamp/, color: 'ember', intensity: 0.5 },
}

export const PILOT_CREW = [
	// guards at the start: a pair either side of the sealed back wall, a pair facing across the walk;
	// 1.82 to 1.90 m, so no two stand alike
	{ ...VANGUARD, scale: 1.01, clips: { rest: 'Look' }, guard: { x: 1.1, z: -3, heading: 0 } },
	{ ...VANGUARD, scale: 0.98, guard: { x: -1.1, z: -3, heading: 0 } },
	{ ...VANGUARD, scale: 0.99, guard: { x: 1.2, z: 2, heading: -Math.PI / 2 } },
	{
		...VANGUARD,
		scale: 1.02,
		clips: { rest: 'Look' },
		guard: { x: -1.2, z: 2, heading: Math.PI / 2 },
	},
	{
		...ASTRA,
		helmet: HELMET,
		clips: { walk: 'Walk', rest: 'Idle' },
		patrol: { x: -0.75, from: 6, to: 21, speed: 1.25, restS: 2 },
	},
	{
		...ASTRA,
		helmet: HELMET,
		clips: { rest: 'Idle2', react: 'Talk' },
		greet: { x: -0.8, z: 24, reach: 3.5 },
	},
	{
		...ELY,
		helmet: HELMET,
		clips: { rest: 'Idle', react: 'Talk' },
		greet: { x: 0.8, z: 9, reach: 3.5 },
	},
	// "Astronaut" by Quaternius, CC0 (poly.pizza/m/3hC2i0CTuO), on its own rig and clips; its collar rides
	// the head bone, so the head's box runs down to the shoulders: a smaller fit, the rim raised to the neck
	{
		url: '/assets/game/models/Spacesuit.glb',
		height: 1.72,
		facing: 0,
		helmet: {
			...HELMET,
			bone: 'Head',
			drop: /Head/,
			fit: 0.65,
			seat: -0.25,
			seal: { ...HELMET.seal, from: 'Neck' },
		},
		clips: { rest: 'CharacterArmature|Idle', react: 'CharacterArmature|Wave' },
		greet: { x: -0.8, z: 31, reach: 3.5 },
	},
]

// The player's own body, worn by the camera and seen looking down: the crew model without the skin
// the `drop` bones carry (the head), standing `back` m behind the eye, which puts the eye where the
// face was and the neck behind the view; walking above `walking` pace, easing into a run over `blendS`
// s, and no clip slowed below `slowest` m/s. `gaits`: each clip and how fast its boots pass the deck
// (m/s at Ely's height), so each plays at the body's speed over its own and the feet never skate.
export const PILOT_BODY = {
	...ELY,
	drop: /Head|Eye/,
	back: 0.1,
	walking: 0.15,
	blendS: 0.2,
	slowest: 0.3,
	gaits: {
		walk: { clip: 'Walk', speed: 1.52 },
		run: { clip: 'Run', speed: 2.78 },
		back: { clip: 'Back', speed: 0.84 },
		left: { clip: 'StrafeLeft', speed: 1.63 },
		right: { clip: 'StrafeRight', speed: 1.63 },
		runLeft: { clip: 'RunLeft', speed: 2.02 },
		runRight: { clip: 'RunRight', speed: 2.02 },
	},
}

// A patrol eases to its pace over easeS s, brakes over the last `brake` m of each leg (never slower
// than `creep` of its pace until it gets there), and counts as walking above `walking` m/s.
export const PILOT_PATROL = { easeS: 0.35, brake: 0.9, creep: 0.15, walking: 0.1 }

// seconds to blend one animation into the next
export const PILOT_FADE_S = 0.35
// how fast a crew member turns to face where it is going, rad/s
export const PILOT_TURN_RATE = 4

export const PILOT_BOOT = { context: 0.1, models: 0.75, frame: 0.15 }
