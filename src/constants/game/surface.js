import { ENTRY } from '../journey.js'

// Acts II and III: the candidate world's surface, walked. World units (metres) and seconds. The
// terrain's numbers live here AND in shaders/intro/surface.frag.glsl (terrain()): change both.
export const SURFACE = {
	cellPx: ENTRY.ridgeCellPx,
	seam: ENTRY.ridgeSeam,
	// at most 32 colours: the sky's pale warmth, rock and dust, the lake, the suit's steel, light
	palette: [
		'linen',
		'cream',
		'chalk',
		'sand',
		'dune',
		'stone',
		'bone',
		'ash',
		'shale',
		'basalt',
		'rust',
		'brick',
		'clay',
		'deep',
		'brine',
		'tide',
		'shoal',
		'foam',
		'pitch',
		'soot',
		'iron',
		'steel',
		'rime',
		'graphite',
		'pewter',
		'silver',
		'star',
		'ember',
		'glow',
		'amber',
	],
	// the ground: three rolling waves [amp, fx, fz, px, pz], a ridge across the far end, a lake in a
	// bowl to the left; the water stands at `water`
	terrain: {
		waves: [
			[1.6, 0.11, 0.09, 0.3, 1.1],
			[0.7, 0.27, 0.23, 2.0, 0.4],
			[0.25, 0.8, 0.7, 0.9, 2.3],
		],
		ridge: { z: 45, height: 12, width: 9 },
		lake: { x: -25, z: 15, radius: 12, depth: 4 },
		// a ring of mountains far round the plain, well past the walk's bounds
		mountains: { at: 150, height: 30, width: 28 },
		water: 0,
	},
	// the eye over the ground, and the walk's bounds (the ridge's far side is the edge of the world)
	eye: 1.6,
	// a lighter world: every step this much longer, slower and higher than on the deck
	lope: 1.45,
	walk: { x: 0, z: 0, halfWidth: 58, back: -30, front: 52 },
	// where the beats wait: the pod and its dish, the lake's deep point, the fronds, the ridge top
	spots: {
		dish: { x: 1.6, z: -3, reach: 2.6 },
		sample: { x: -25, z: 15, reach: 4 },
		fronds: { x: -22, z: 27, reach: 9 },
		ridge: { x: 0, z: 45, reach: 6, width: 24 },
	},
	// the air: the voice asks this long after landing, once the envoy is on dry ground
	airAskAt: 12,
	// the suit on the surface: air per second, and the hull per second per metre under water
	o2PerS: 0.1,
	hullPerMS: 0.6,
	// a failed water sample burns the suit
	acidHull: 25,
	// the scanner: a sweep takes this long and this much signal
	scan: { seconds: 2.2, signal: 12 },
	// the send: the air it takes from the suit
	sendO2: 45,
	// the voice warns once the air falls under this
	o2Low: 25,
	// the landing line comes this long after the eyes open
	landAt: 1.5,
}
