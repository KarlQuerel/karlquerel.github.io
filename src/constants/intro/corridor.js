import { ENTRY } from '../journey.js'

// Shot 6, the corridor: the player walks it to the door and picks a role at the lockers.
export const CORRIDOR = {
	// the hands rise into frame with the picked tool
	handsRise: 0.8,
	// The deck the player walks, inside the shader's walls (W 1.6 less its ribs, BACK_Z -3.5, DOOR_Z 35):
	// from short of the first bay, facing the door; the lockers wake once they reach `arrive`.
	walk: { x: 0, z: -2, halfWidth: 1, back: -3, front: 33, arrive: 31.5 },
	// the door's light comes up from `glowRest` as the player nears it, from this far down the deck
	glowFrom: 4,
	glowRest: 0.35,
	lockersRise: 1.2,
	// a beat after the hands are up before the cut
	pickBeat: 0.8,
	// the contact scene's pixel art: its cell, its seam, and the ship's colours out of PALETTE
	cellPx: ENTRY.ridgeCellPx,
	seam: ENTRY.ridgeSeam,
	palette: [
		'void',
		'pitch',
		'soot',
		'iron',
		'steel',
		'zinc',
		'frost',
		'rime',
		'graphite',
		'gun',
		'pewter',
		'brushed',
		'silver',
		'star',
		'tide',
		'rust',
		'brick',
		'amber',
		'ember',
		'glow',
		'stone',
		'bone',
		'chalk',
		'cream',
		'linen',
	],
}
