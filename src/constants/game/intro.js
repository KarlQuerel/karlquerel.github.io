// The intro cinematic (/game?intro), its words in data/gameIntro.js: orbit and ground intercut (GDD.md), a card
// held across its shots. The orbit's shots on the Earth in 3D (js/pilot/introEarth.js) and the title's Moon on a
// card facing the camera; every other shot a slate until it is built. World units: the Earth's radius is 10
// about the origin, the camera out on +z, y up.

import { EARTH } from '../intro/earth.js'
import { EARTH_MAP } from '../intro/earthMap.js'
import { MOON } from '../intro/moon.js'
import { PILOT } from './pilot.js'

// where the cut opens, the title's frame: the globe low, the Moon up to its left (a camera key: where it stands,
// where it looks)
const TITLE_FRAME = { at: [0, 6, 60], look: [0, 9, 0] }

// The planet's state in a shot: the seas drained `drain` degrees from the old coasts, the smoke cut at `cover`
// (lower is more), `cities` the share still lit. In the war, then in 2137 as the title shows it.
const WAR = { drain: 1, cover: 0.62, cities: 1 }
const NOW = { drain: EARTH_MAP.drying.drain, cover: EARTH_MAP.smoke.cover, cities: 0.15 }

export const INTRO = {
	boot: { context: 0.1, art: 0.75, frame: 0.15 },
	fovDeg: 40,
	near: 0.1,
	far: 500,
	// outlines only within `far`: the globe and its lights stand past it, flat
	edges: { ...PILOT.edges, far: 20 },
	// Earth's own sky: NASA's star map baked onto the palette (scripts/sky/bake.mjs, its `earth` grade; credit in
	// public/assets/CREDITS.txt); the nebula is the alien world's
	sky: '/assets/game/sky/milkyway.png',
	// The Earth: its world map `map` texels (js/pilot/introArt.worker.js), on a sphere of `segments`, turned so
	// `faceLon` faces the camera at the start (Africa and Europe, as the title shows it), turning `spinDegS` east;
	// lit from `sun` (world, toward it); `citiesLit` of the land's built lattice lit, more than the title's so the
	// lights going out read. Its smoke a shell `lift` globe radii out, drifting `driftDegS` faster; the air's
	// shell at most `nearest` of the camera's distance.
	earth: {
		radius: 10,
		map: [1024, 512],
		segments: [96, 64],
		faceLon: 15,
		spinDegS: 1.2,
		sun: [0.62, 0.3, 0.45],
		citiesLit: 0.1,
		smoke: { lift: 1.006, driftDegS: 0.3 },
		air: { nearest: 0.95 },
	},
	// the title's Moon (js/intro/earthArt.js), painted once `rows` frame heights across on a card facing the camera
	moon: { at: [-60, 34, -90], radius: 2.7, art: MOON, light: EARTH.moon.light, rows: 0.2 },
	// the cards' typing (TypedReadout), the fade that ends each one, and the black before the ship
	type: { delayMs: 350, charMs: 45 },
	fadeS: 0.5,
	blackS: 1.2,
	// how a shot with a `cut` comes in, over its first `s`: `flash` out of white in steps, the bomb's light carried
	// over the cut (a hard cut under reduced motion); `black` held black, the card waiting, so the last one lands
	cuts: { flash: { s: 0.6 }, black: { s: 0.9 } },
	// The cut: how long each shot holds and the card it carries (INTRO_CARDS), any other a hard cut. An orbit
	// shot moves the camera `from` one key `to` another and the planet from one `world` state to the other over
	// the shot (reduced motion holds the last), `flashes` and `launch` naming what it shows; any other shot is a
	// `slate` (INTRO_SLATES) until it is built.
	shots: [
		{
			holdS: 5,
			card: 0,
			from: TITLE_FRAME,
			to: { at: [-7, 3, 42], look: [0, 5, 0] },
			world: [NOW, NOW],
		},
		{ holdS: 4.5, card: 1, slate: 'dam' },
		{
			holdS: 4,
			card: 1,
			from: { at: [-17, 4, 29], look: [-4, 1, 0] },
			to: { at: [-9, -1, 31], look: [-3, -1, 0] },
			world: [WAR, WAR],
			flashes: true,
			cut: 'flash',
		},
		{ holdS: 4.5, card: 2, slate: 'waterLine' },
		{
			holdS: 4,
			card: 2,
			from: { at: [-9, -9, 19], look: [-3, -2, 0] },
			to: { at: [1, -6, 20], look: [0, -1, 0] },
			world: [WAR, NOW],
		},
		{ holdS: 6, card: 3, slate: 'window' },
		{ holdS: 7, card: 4, slate: 'launchPad', cut: 'black' },
		{
			holdS: 7,
			card: 5,
			from: { at: [7, 5, 36], look: [0, 7, 0] },
			to: { at: [-2, 7, 32], look: [0, 8, 0] },
			world: [NOW, NOW],
			launch: true,
		},
		{ holdS: 5, card: 6, slate: 'hermes8' },
	],
	// the war on the night side, in the shot with `flashes`: `count` flashes on the ground, one after another from
	// `leadS` into it to `tailS` before its end, each `radius` at its peak `peakS` after it starts and gone `goneS`
	// after; only where the sun falls below `-dark` and the ground faces the shot's camera past `facing`
	flashes: {
		count: 12,
		leadS: 0.6,
		tailS: 0.5,
		radius: 0.32,
		peakS: 0.08,
		goneS: 0.9,
		dark: 0.2,
		facing: 0.35,
		color: 'star',
	},
	// the light followed up from the pad, in the shot with `launch`: `leadS` into it, it climbs off the limb at
	// `bearingDeg` from `from` to `to` globe radii over `climbS`, `radius` across, a `trail` thick behind it
	launch: {
		leadS: 0.8,
		bearingDeg: 96,
		from: 1,
		to: 1.3,
		climbS: 5,
		radius: 0.3,
		trail: 0.06,
		color: 'glow',
	},
	// War debris and dead satellites the opening drifts through: `count` broken plates strung along the first
	// shot's path from `along[0]` to `along[1]` of it, `aside` units off it, each `size` long and `thin` of that
	// deep, tumbling up to `tumbleDegS`, in one of `colors`. The only thing lit: the sun from the globe's side
	// and a cold fill, so their faces flash as they turn.
	debris: {
		count: 16,
		along: [-0.3, 1.1],
		aside: [1.5, 6],
		size: [0.2, 0.9],
		thin: 0.12,
		tumbleDegS: 40,
		colors: ['gun', 'steel', 'pewter'],
	},
	light: {
		sun: { color: 'star', intensity: 3 },
		fill: { sky: 'rime', ground: 'pitch', intensity: 0.8 },
	},
}
