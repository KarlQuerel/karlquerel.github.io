// The intro cinematic (/game?intro), its words in data/gameIntro.js: orbit and ground intercut (GDD.md), a card
// held across its shots. The timing track for now: the orbit's shots on the title's globe and Moon (cards facing
// the camera) with the fleet as blocks, every other shot a slate until it is built. World units: the Earth's
// radius is 10 about the origin, the camera out on +z, y up.

import { EARTH } from '../intro/earth.js'
import { MOON } from '../intro/moon.js'
import { PILOT } from './pilot.js'
import { SHIP_LAB } from './shipLab.js'

// where the cut opens, the title's frame: the globe low, the Moon up to its left (a camera key: where it stands,
// where it looks)
const TITLE_FRAME = { at: [0, 6, 60], look: [0, 9, 0] }

export const INTRO = {
	boot: { context: 0.1, art: 0.75, frame: 0.15 },
	fovDeg: 40,
	near: 0.1,
	far: 500,
	// outlines on the fleet up close, none on the globe behind it
	edges: { ...PILOT.edges, far: 20 },
	sky: SHIP_LAB.sky,
	// the title's globe and Moon (js/holding.worker.js), each painted once `rows` frame heights across, then
	// resampled by the pixel pass; `light` is the painter's (x right, y down, z toward the viewer)
	earth: { radius: 10, view: EARTH.planet.view, light: [0.62, -0.3, 0.45], rows: 1.4 },
	moon: { at: [-60, 34, -90], radius: 2.7, art: MOON, light: EARTH.moon.light, rows: 0.2 },
	// the fleet's sun from the globe's light, and the void's cold fill
	light: {
		sun: { color: 'star', intensity: 3 },
		fill: { sky: 'rime', ground: 'pitch', intensity: 1.2 },
	},
	// the cards' typing (TypedReadout), the fade that ends each one, and the black before the ship
	type: { delayMs: 350, charMs: 45 },
	fadeS: 0.5,
	blackS: 1.2,
	// The cut: how long each shot holds and the card it carries (INTRO_CARDS). An orbit shot moves the camera
	// `from` one key `to` another over the shot (reduced motion holds the last), `flashes` and `fleet` naming
	// what it shows; any other shot is a `slate` (INTRO_SLATES) until it is built.
	shots: [
		{ holdS: 5, card: 0, from: TITLE_FRAME, to: { at: [0, 4, 46], look: [0, 6, 0] } },
		{ holdS: 4.5, card: 1, slate: 'dam' },
		{
			holdS: 4,
			card: 1,
			from: { at: [-9, 2, 34], look: [-3, 0, 0] },
			to: { at: [-7, 1, 30], look: [-3, 0, 0] },
			flashes: true,
		},
		{ holdS: 4.5, card: 2, slate: 'waterLine' },
		{
			holdS: 4,
			card: 2,
			from: { at: [-4, -1, 30], look: [-1, -1, 0] },
			to: { at: [-2, -2, 29], look: [-0.6, -0.8, 0] },
		},
		{ holdS: 6, card: 3, slate: 'window' },
		{ holdS: 7, card: 4, slate: 'launchPad' },
		{
			holdS: 8,
			card: 5,
			from: { at: [5, 14, 24], look: [3, 11.6, 0] },
			to: { at: [2.5, 13.5, 22], look: [2.1, 11.6, 0] },
			fleet: true,
		},
		{
			holdS: 5,
			card: 6,
			from: { at: [2, 13.4, 10], look: [0, 12.6, 3] },
			to: { at: [1.2, 13.2, 8], look: [0, 12.6, 3] },
			fleet: true,
		},
	],
	// the war on the night side, in the shot with `flashes`: `count` flashes, one after another from `leadS` into
	// it to `tailS` before its end, each `radius` at its peak `peakS` after it starts and gone `goneS` after; only
	// where the globe's light falls below `-dark`, within `spread` of its radius
	flashes: {
		count: 12,
		leadS: 0.3,
		tailS: 0.5,
		radius: 0.32,
		peakS: 0.08,
		goneS: 0.9,
		dark: 0.2,
		spread: 0.92,
		color: 'star',
	},
	// ten blocks on an arc in front of the globe, bearing `firstDeg` then every `stepDeg`; ours (the eighth) at
	// the top, 90°, with its lamp
	fleet: {
		count: 10,
		ours: 7,
		orbit: 12.6,
		z: 3,
		firstDeg: 62,
		stepDeg: 4,
		half: [0.2, 0.05, 0.07],
		hull: { color: 'silver', roughness: 0.6 },
		lamp: { color: 'glow', radius: 0.04 },
	},
}
