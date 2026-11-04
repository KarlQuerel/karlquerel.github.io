// The three.js corridor pilot (dev only): the corridor rebuilt as meshes, crewed by rigged characters,
// drawn on the art grid and snapped to the corridor shot's palette. World units are metres, y up, the
// deck at y = 0, the walk running down +z to the door.

import { CORRIDOR } from '../intro/corridor.js'

export const PILOT = {
	// a finer cell than the shader corridor's (CORRIDOR.cellPx 5.6): the crew read better at it;
	// its palette, so the two can be compared side by side
	cellPx: 3,
	seam: CORRIDOR.seam,
	palette: CORRIDOR.palette,
	walk: CORRIDOR.walk,
	// eye height over the deck (the crew model's own eyes), where the eye sits from the neck it tips
	// about (ahead, up), how far the head can tip down and up (rad), and the head's bob per
	// stride at a full walk
	eye: 1.58,
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

// The crew: a model, how tall it stands, which way its front faces at rest (rad about y), its clips
// by role, how fast its walk clip covers the deck (m/s, so the feet keep their grip), and what it does.
// `patrol` walks between two z marks at `x`, resting between legs; `greet` idles at a spot and plays
// `react` (if it has one) when the player comes within `reach`.
const ASTRA = { url: '/assets/game/models/Astra.glb', height: 1.7, facing: 0, walkSpeed: 1.45 }
// Mixamo's Ely by K. Atienza on Astra's clips; his longer legs carry the same walk further
const ELY = { url: '/assets/game/models/Ely.glb', height: 1.79, facing: 0, walkSpeed: 1.53 }

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

export const PILOT_CREW = [
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
	{
		url: '/assets/game/models/RobotExpressive.glb',
		height: 1.3,
		facing: 0,
		greet: { x: 0.85, z: 16, reach: 3.5 },
		clips: { rest: 'Idle', react: 'Wave' },
	},
]

// The player's own body, worn by the camera and seen looking down: the crew model without the skin
// the `drop` bones carry (the head), standing `back` m behind the eye, which puts the eye where the
// face was and the neck behind the view; walking above `walking` pace.
export const PILOT_BODY = {
	...ASTRA,
	drop: /Head/,
	back: 0.1,
	walking: 0.15,
}

// A patrol eases to its pace over easeS s, brakes over the last `brake` m of each leg (never slower
// than `creep` of its pace until it gets there), and counts as walking above `walking` m/s.
export const PILOT_PATROL = { easeS: 0.35, brake: 0.9, creep: 0.15, walking: 0.1 }

// seconds to blend one animation into the next
export const PILOT_FADE_S = 0.35
// how fast a crew member turns to face where it is going, rad/s
export const PILOT_TURN_RATE = 4

export const PILOT_BOOT = { context: 0.1, models: 0.75, frame: 0.15 }
