// The intro cinematic (/game?intro), its words in data/gameIntro.js: one shot on the Earth, a card a beat. A
// rough cut to judge the pacing: the globe and the Moon are the title's paintings on cards facing the camera,
// the fleet is blocks. World units: the Earth's radius is 10 about the origin, the camera out on +z, y up.

import { EARTH } from '../intro/earth.js'
import { MOON } from '../intro/moon.js'
import { PILOT } from './pilot.js'
import { SHIP_LAB } from './shipLab.js'

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
	// where the camera starts, the title's frame: the globe low, the Moon up to its left
	start: { at: [0, 6, 60], look: [0, 9, 0] },
	// one a card: how long it holds, and where the camera ends it, reached over the beat (reduced motion cuts)
	beats: [
		{ holdS: 4.5, at: [0, 4, 46], look: [0, 6, 0] },
		{ holdS: 5.5, at: [-7, 1, 30], look: [-3, 0, 0] },
		{ holdS: 5.5, at: [-3, -2, 29], look: [-1, -1, 0] },
		{ holdS: 4.5, at: [-2, -1.5, 30], look: [-0.6, -0.8, 0] },
		{ holdS: 6.5, at: [0, 5, 34], look: [0, 6, 0] },
		{ holdS: 7, at: [2.5, 13.5, 22], look: [2.1, 11.6, 0] },
		{ holdS: 4.5, at: [1.2, 13.2, 8], look: [0, 12.6, 3] },
	],
	// the war on the night side, in `beat`: `count` flashes, one after another from `leadS` into it to `tailS`
	// before its end, each `radius` at its peak `peakS` after it starts and gone `goneS` after; only where the
	// globe's light falls below `-dark`, within `spread` of its radius
	flashes: {
		beat: 1,
		count: 12,
		leadS: 0.6,
		tailS: 1,
		radius: 0.32,
		peakS: 0.08,
		goneS: 0.9,
		dark: 0.2,
		spread: 0.92,
		color: 'star',
	},
	// the launches in `beat`: `count` trails off the limb between the fleet's first and last bearings, one every
	// `everyS` from `leadS`, each climbing to the fleet's orbit in `climbS`
	trails: {
		beat: 4,
		count: 5,
		leadS: 0.8,
		everyS: 0.7,
		climbS: 2.2,
		radius: 0.05,
		color: 'glow',
	},
	// ten blocks on an arc in front of the globe from `beat` on, bearing `firstDeg` then every `stepDeg`; ours
	// (the eighth) at the top, 90°, with its lamp
	fleet: {
		beat: 5,
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
