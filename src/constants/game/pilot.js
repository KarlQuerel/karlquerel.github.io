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
	// eye height over the deck, and the head's bob per stride at a full walk
	eye: 1.6,
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

// The crew: a model, how tall it stands, which way its front faces at rest (rad about y), and what it
// does. `patrol` walks between two z marks at `x`, resting between legs; `greet` idles at a spot and
// plays `react` (if it has one) when the player comes within `reach`; `suit` dresses it as the astronaut.
export const PILOT_CREW = [
	{
		url: '/assets/game/models/Soldier.glb',
		height: 1.78,
		facing: Math.PI,
		patrol: { x: -0.75, from: 6, to: 28, speed: 1.25, restS: 2 },
		clips: { walk: 'Walk', rest: 'Idle' },
	},
	{
		url: '/assets/game/models/Soldier.glb',
		suit: true,
		height: 1.82,
		facing: Math.PI,
		greet: { x: -0.8, z: 24, reach: 3.5 },
		clips: { rest: 'Idle' },
	},
	{
		url: '/assets/game/models/RobotExpressive.glb',
		height: 1.3,
		facing: 0,
		greet: { x: 0.85, z: 16, reach: 3.5 },
		clips: { rest: 'Idle', react: 'Wave' },
	},
]

// The astronaut's suit over the Vanguard rig: what its texture's colours become, picked out by hue
// (deg), saturation and value bands; the visor; the life-support pack on the upper spine (metres, in
// the bone's own axes: x across, y up the spine, z out of the chest) with a status light on it.
export const PILOT_SUIT = {
	plate: ['chalk', 'linen'],
	cloth: ['graphite', 'pewter'],
	stripe: 'ember',
	// the texture's brightness multiplied: a white suit has to read white under the corridor's cool lamps
	gain: 1.4,
	bands: {
		red: { s: 0.45, below: 15, above: 340 },
		tan: { from: 15, to: 50, s: 0.15, v: 0.45 },
		green: { from: 50, to: 160, s: 0.12, gain: 2 },
	},
	visor: { color: 'ochre', glow: 'amber', intensity: 0.35 },
	pack: {
		bone: 'mixamorigSpine2',
		size: [0.4, 0.5, 0.2],
		offset: [0, 0.02, -0.2],
		color: 'bone',
		light: { size: [0.06, 0.03, 0.02], offset: [0.12, 0.18, -0.31], color: 'ember' },
	},
}

// seconds to blend one animation into the next
export const PILOT_FADE_S = 0.35
// how fast a crew member turns to face where it is going, rad/s
export const PILOT_TURN_RATE = 4

export const PILOT_BOOT = { context: 0.1, models: 0.75, frame: 0.15 }
