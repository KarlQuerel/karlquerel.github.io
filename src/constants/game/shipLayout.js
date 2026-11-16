// HERMES-8's inside, third draft (dev only, the ship lab's greybox): one main deck on the room the hollow hull
// leaves (measured in Blender: about 760 m² at a floor 3.1 m over the keel, too thin below it for a second deck); the
// hull is cut open only under the spine canopy, over the mess. Act I opens only what the story needs: the rooms the
// missing crew left behind wait behind locked doors for a later act.
// Metres in the ship's frame: x across (+x the lettered flank), y up, z toward the nose. Each room is a box: `x` and
// `z` its inner extent, its floor `floor` (a pair rises from its aft end to its fore end, a ramp), its ceiling
// `height` over that, or none (`open`, walls only `height` tall, the glass above). Rooms stand `wall` apart; a door
// cuts the wall two rooms share, shut if `locked`. Views, each cut through the hull at export:
// - `windows`: in the wall `wall` ('x0', 'x1', 'z0' or 'z1'), centred `at` along it, `width` wide, from `sill` to
//   `head` over the floor, a reveal out to the glass under the skin, `depth` m out at each corner (start-sill,
//   end-sill, end-head, start-head; start and end along the wall's axis)
// - `skylights`: the ceiling opened over `x`, `z`, a shaft up to the skin, `top` its height (y) at each corner (x0 z0,
//   x1 z0, x1 z1, x0 z1), glazed there unless `glass` is false (the canopy has its own)
// - `ports`: the floor glazed over `x`, `z`, a well down through the belly, `bottom` its height at each corner
// The depths and heights are measured on the hull (claude-ship/layout/measure.py).

export const SHIP_LAYOUT = {
	floor: 3.1,
	height: 2.6,
	wall: 0.2,
	// a doorway's height; a locked door's panel thickness, and the width of the light down its seam
	door: { height: 2.1, panel: 0.1, seam: 0.04 },
	// passages ribbed every `every` m, `depth` proud and `thick` along; light strips `width` wide, `inset` from the long
	// walls, along each ceiling and down each passage's floor
	ribs: { every: 2, depth: 0.08, thick: 0.14 },
	lines: { width: 0.05, inset: { ceiling: 0.4, floor: 0.12 } },
	colors: {
		wall: 'graphite',
		ceiling: 'steel',
		jamb: 'iron',
		rib: 'iron',
		light: 'glow',
		floorLine: 'ember',
		// a locked door: its panel, and the light down its seam
		door: 'gun',
		lock: 'brick',
	},
	// the panes in every window, skylight and port: nearly clear, so space shows through
	glass: { color: 'pitch', opacity: 0.15 },
	// what each kind of room is for, and its floor colour (the walls and ceilings stay neutral)
	roles: {
		cryo: { label: 'Cryo', floor: 'rime' },
		crew: { label: 'Crew', floor: 'clay' },
		systems: { label: 'Systems', floor: 'brass' },
		science: { label: 'Science & med', floor: 'garnet' },
		command: { label: 'Command', floor: 'pewter' },
		passage: { label: 'Passage', floor: 'zinc' },
	},
	rooms: [
		// the stern: the engines' machinery in the core (locked: the engineer's repairs), the dock over the lander
		{ id: 'engineering', name: 'Engineering', role: 'systems', x: [-3, 3], z: [-20.8, -14.2] },
		{ id: 'dock', name: 'Dock & suits', role: 'systems', x: [-9.4, -3.2], z: [-22, -14.2] },
		// mid-ship: cryo and med in the core, the lab beside them (locked: the biologist's), a hall down each flank to
		// five cabins against the skin: cabin 4 the player's, the crew's locked
		{ id: 'cryo', name: 'Cryo bay', role: 'cryo', x: [-3, 3], z: [-14, -6.2] },
		{ id: 'med', name: 'Med bay', role: 'science', x: [3.2, 6.6], z: [-14, -6.2] },
		{ id: 'lab', name: 'Lab', role: 'science', x: [-6.6, -3.2], z: [-14, -6.2] },
		{ id: 'hallP', name: 'Flank hall', role: 'passage', x: [6.8, 8.4], z: [-14, -3.2] },
		{ id: 'hallS', name: 'Flank hall', role: 'passage', x: [-8.4, -6.8], z: [-14, -3.2] },
		{ id: 'cabinA', name: 'Cabin 1', role: 'crew', x: [8.6, 12.3], z: [-14, -10.6] },
		{ id: 'cabinB', name: 'Cabin 2', role: 'crew', x: [8.6, 11.9], z: [-10.4, -7] },
		{ id: 'cabinC', name: 'Cabin 3', role: 'crew', x: [8.6, 11.4], z: [-6.8, -3.2] },
		{ id: 'cabinD', name: 'Cabin 4', role: 'crew', x: [-12.3, -8.6], z: [-14, -10.6] },
		{ id: 'cabinE', name: 'Cabin 5', role: 'crew', x: [-11.9, -8.6], z: [-10.4, -7] },
		// the mess under the canopy
		{
			id: 'mess',
			name: 'Mess',
			role: 'crew',
			x: [-6.6, 6.6],
			z: [-6, 5.2],
			height: 3,
			skylights: [
				{ x: [-1.55, 1.55], z: [-0.93, 5], top: [9.35, 9.35, 8.95, 8.95], glass: false },
			],
		},
		// forward: a hall to ops, the passage to the cockpit
		{ id: 'foreHall', name: 'Fore hall', role: 'passage', x: [-1.55, 1.55], z: [5.4, 9.6] },
		{ id: 'ops', name: 'Ops', role: 'command', x: [-2.5, 2.5], z: [9.8, 13.8] },
		{
			id: 'passage',
			name: 'Bow passage',
			role: 'passage',
			x: [-1, 1],
			z: [14, 27.6],
			floor: [3.1, 3.75],
		},
		{
			id: 'cockpit',
			name: 'Cockpit',
			role: 'command',
			x: [-0.7, 0.7],
			z: [27.8, 31.5],
			floor: [3.75, 4.2],
			height: 1.1,
			open: true,
		},
	],
	// each door in the wall `a` and `b` share, centred `at` along it, `width` wide, shut if `locked`
	doors: [
		{ a: 'engineering', b: 'cryo', at: 0, width: 1.6, locked: true },
		{ a: 'engineering', b: 'dock', at: -18, width: 1.2, locked: true },
		{ a: 'dock', b: 'hallS', at: -7.6, width: 1.2 },
		{ a: 'cryo', b: 'med', at: -10.1, width: 1.2 },
		{ a: 'cryo', b: 'lab', at: -10.1, width: 1.2, locked: true },
		{ a: 'cryo', b: 'mess', at: 0, width: 2 },
		{ a: 'med', b: 'hallP', at: -10.1, width: 1.2 },
		{ a: 'lab', b: 'hallS', at: -10.1, width: 1.2, locked: true },
		{ a: 'hallP', b: 'cabinA', at: -12.3, width: 1, locked: true },
		{ a: 'hallP', b: 'cabinB', at: -8.7, width: 1, locked: true },
		{ a: 'hallP', b: 'cabinC', at: -5, width: 1, locked: true },
		{ a: 'hallP', b: 'mess', at: -4.6, width: 1.6 },
		{ a: 'hallS', b: 'cabinD', at: -12.3, width: 1 },
		{ a: 'hallS', b: 'cabinE', at: -8.7, width: 1, locked: true },
		{ a: 'hallS', b: 'mess', at: -4.6, width: 1.6 },
		{ a: 'mess', b: 'foreHall', at: 0, width: 2 },
		{ a: 'foreHall', b: 'ops', at: 0, width: 1.6 },
		{ a: 'ops', b: 'passage', at: 0, width: 1.4 },
		{ a: 'passage', b: 'cockpit', at: 0, width: 1.4 },
	],
}
