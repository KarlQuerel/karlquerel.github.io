// The intro cinematic (/game?intro), its words in data/gameIntro.js: orbit and ground intercut (GDD.md), a card
// held across its shots. The timing track for now: the orbit's shots on the title's globe and Moon (cards facing
// the camera), every other shot a slate until it is built. World units: the Earth's radius is 10 about the origin,
// the camera out on +z, y up.

import { EARTH } from '../intro/earth.js'
import { MOON } from '../intro/moon.js'
import { PILOT } from './pilot.js'

// where the cut opens, the title's frame: the globe low, the Moon up to its left (a camera key: where it stands,
// where it looks)
const TITLE_FRAME = { at: [0, 6, 60], look: [0, 9, 0] }

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
	// the title's globe and Moon (js/holding.worker.js), each painted once `rows` frame heights across, then
	// resampled by the pixel pass; `light` is the painter's (x right, y down, z toward the viewer)
	earth: { radius: 10, view: EARTH.planet.view, light: [0.62, -0.3, 0.45], rows: 1.4 },
	moon: { at: [-60, 34, -90], radius: 2.7, art: MOON, light: EARTH.moon.light, rows: 0.2 },
	// the cards' typing (TypedReadout), the fade that ends each one, and the black before the ship
	type: { delayMs: 350, charMs: 45 },
	fadeS: 0.5,
	blackS: 1.2,
	// how a shot with a `cut` comes in, over its first `s`: `flash` out of white in steps, the bomb's light carried
	// over the cut (a hard cut under reduced motion); `black` held black, the card waiting, so the last one lands
	cuts: { flash: { s: 0.6 }, black: { s: 0.9 } },
	// The cut: how long each shot holds and the card it carries (INTRO_CARDS), any other a hard cut. An orbit
	// shot moves the camera `from` one key `to` another over the shot (reduced motion holds the last), `flashes`
	// and `launch` naming what it shows; any other shot is a `slate` (INTRO_SLATES) until it is built.
	shots: [
		{ holdS: 5, card: 0, from: TITLE_FRAME, to: { at: [0, 4, 46], look: [0, 6, 0] } },
		{ holdS: 4.5, card: 1, slate: 'dam' },
		{
			holdS: 4,
			card: 1,
			from: { at: [-9, 2, 34], look: [-3, 0, 0] },
			to: { at: [-7, 1, 30], look: [-3, 0, 0] },
			flashes: true,
			cut: 'flash',
		},
		{ holdS: 4.5, card: 2, slate: 'waterLine' },
		{
			holdS: 4,
			card: 2,
			from: { at: [-4, -1, 30], look: [-1, -1, 0] },
			to: { at: [-2, -2, 29], look: [-0.6, -0.8, 0] },
		},
		{ holdS: 6, card: 3, slate: 'window' },
		{ holdS: 7, card: 4, slate: 'launchPad', cut: 'black' },
		{
			holdS: 7,
			card: 5,
			from: { at: [3, 7, 36], look: [0, 7, 0] },
			to: { at: [0, 6, 33], look: [0, 7.5, 0] },
			launch: true,
		},
		{ holdS: 5, card: 6, slate: 'hermes8' },
	],
	// the war on the night side, in the shot with `flashes`: `count` flashes, one after another from `leadS` into
	// it to `tailS` before its end, each `radius` at its peak `peakS` after it starts and gone `goneS` after; only
	// where the globe's light falls below `-dark`, within `spread` of its radius
	flashes: {
		count: 12,
		leadS: 0.6,
		tailS: 0.5,
		radius: 0.32,
		peakS: 0.08,
		goneS: 0.9,
		dark: 0.2,
		spread: 0.92,
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
}
