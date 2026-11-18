// The ship lab (dev only, /game?ship): HERMES-8 and its drive ring alone among the stars, the camera
// swung round them, or the player aboard in the gallery under the spine canopy, to judge the ship in the
// game's pixel look. Metres in the models' own frame: the nose toward +z, y up, the belly on y = 0.

import { PILOT, PILOT_ROOM } from './pilot.js'

// every pane, the model's own cockpit glass too: a teal visor, lit faintly from within so it reads as glass against a
// dark sky, mirrored over that, solid from outside so no room shows through (aboard, see `aboard.glass`)
const VISOR = {
	base: 'gun',
	tint: 'veil',
	metalness: 1,
	roughness: 0.08,
	transparent: false,
	opacity: 1,
	depthWrite: true,
}

// the pixel pass at a ship's scale: outlines at full ink within far / 2
const EDGES = { ...PILOT.edges, far: 600 }

export const SHIP_LAB = {
	boot: { context: 0.1, models: 0.6, body: 0.2, frame: 0.1 },
	// the sky: a 2:1 equirect panorama baked onto PALETTE (scripts/sky/bake.mjs; credit in
	// public/assets/CREDITS.txt)
	sky: '/assets/game/sky/nebula.png',
	// the ship first (the orbit's centre), then the ring: one frame for both, so loaded at one origin the
	// ring sits round the stern. The ship is "Spaceship PAK DA (K) TU-1600 Zvezda" by Ilya Shevchuk, CC BY
	// 4.0, modified (sketchfab.com/3d-models/spaceship-pak-da-k-tu-1600-zvezda-30e58a90fe874f21afdfaa5c4022b311):
	// local only (.git/info/exclude) until that credit is on the site
	models: ['/assets/game/models/hermes8-ship.glb', '/assets/game/models/hermes8-ring.glb'],
	// the models' plain materials, made to be repainted by name: each the palette colour nearest its own, the glass
	// a visor
	paint: {
		hermes_tile: { base: 'silver' },
		hermes_tps: { base: 'steel' },
		hermes_ink: { base: 'iron' },
		hermes_floor: { base: 'soot' },
		hermes_glass: VISOR,
		UV_glass: VISOR,
		hermes_light: { glow: 'glow' },
		hermes_glow: { glow: 'glow' },
	},
	// a sun toward `from` (three's lights take about π to show a face its own colour), the void's cold
	// fill on the side turned from it, and the sky itself at `sky` (prefiltered into scene.environment),
	// so the model's metal has something to reflect
	light: {
		sky: 1,
		sun: { color: 'star', intensity: 3.2, from: [0.55, 0.5, 0.65] },
		fill: { sky: 'rime', ground: 'pitch', intensity: 1.4 },
	},
	// the camera on its orbit round the ship's middle: `frame` times both models' size away, turned `yaw` and
	// tipped `pitch` (rad, at most `tilt` either way); W/S move it in and out by `zoom` of its distance a
	// second, from `reach[0]` to `reach[1]` times their size; A/D and the side arrows swing it round
	// `swing` rad a second
	orbit: {
		frame: 1.25,
		yaw: 0.8,
		pitch: 0.3,
		tilt: 1.45,
		zoom: 0.9,
		reach: [0.35, 4],
		swing: 0.6,
	},
	fovDeg: 35,
	near: 1,
	far: 4000,
	// E steps aboard in the cryo bay, at `start` [x, z], facing the nose: the walk through the greybox of the
	// inside (SHIP_LAYOUT), kept `body` m from its walls, with the corridor's eye, lens and near plane and a head
	// that tips far enough up to look through the glass. The `glass` materials (the canopy's, and the model's own
	// cockpit glass, opaque from outside) let more through from inside, at `opacity`.
	aboard: {
		start: [-1.3, -12.3],
		body: PILOT_ROOM.body,
		eye: PILOT.eye,
		fovDeg: PILOT.fovDeg,
		near: PILOT.near,
		tilt: { up: 1.5, down: 1.3 },
		glass: { names: ['hermes_glass', 'UV_glass', 'hall_glass'], opacity: 0.15 },
		// aboard, the hull draws only its outer faces, so no window shows the inside of a wing or an engine;
		// except in this box (x, y, z), the model's own cockpit tub, seen from inside on purpose
		hullInside: { x: [-3, 3], y: [2, 8.5], z: [27, 36] },
		// creases glint softer aboard, and never on the hallway's near-white panels: there its fine detail sparkled
		// white as the walk moved
		edges: { ...EDGES, glint: 1.15, bright: 0.7 },
	},
	// the passages (`role`) and every room walked in dressed with one bay of "Space Ship Hallway" by yeeyeeman, CC BY
	// 4.0, modified (sketchfab.com/3d-models/space-ship-hallway-e97dce00ae5549a8a3795e06bc2cfc96; cut pillar to
	// pillar, 2.6 m tall, by claude-ship/hallway/bay.py): local only (.git/info/exclude) until that credit is on the
	// site. Down a passage the whole bay repeats, its walls (`relief` m deep, `band` m over the floor) squeezed to keep
	// `clear` m between them; round a room the bay's wall out to its cove (`cove` m from the bay's middle) lines every
	// wall, the ceiling's middle (its light) runs in rows `rows` m apart, its deck plates tile the floor. All `inset`
	// m in from the greybox, cut away across each door and `jamb` m round it, opened under skylights; portholes on a
	// hull window keep their glass, the rest are `screen` panels. Repainted by name: the cyan line ember, the floor
	// bars unlit (lit, they read far future).
	hallway: {
		model: '/assets/game/models/ship-hallway-bay.glb',
		role: 'passage',
		relief: 0.4,
		clear: 1,
		inset: 0.01,
		band: [0.05, 2.05],
		jamb: 0.1,
		cove: 0.35,
		rows: 2.4,
		screen: 'deep',
		paint: {
			hall_panel: { base: 'silver' },
			hall_frame: { base: 'iron' },
			hall_trim: { base: 'gun' },
			hall_floor: { base: 'soot' },
			hall_plate: { base: 'graphite' },
			hall_glass: { base: 'pitch' },
			hall_light: { glow: 'glow' },
			hall_footlight: { base: 'gun' },
			hall_strip: { glow: 'ember' },
		},
	},
	// the pixel pass at a ship's scale (EDGES), cells softened from 250 m
	edges: EDGES,
	distant: { ...PILOT.distant, from: 250, to: 600 },
}
