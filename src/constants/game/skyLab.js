// The skybox lab (dev only, /game?sky): a plain of rocks under the open world's sky, walked in first
// person in the game's pixel look. Metres, y up, the ground at y = 0.

import { PILOT } from './pilot.js'

export const SKY_LAB = {
	boot: { context: 0.1, sky: 0.75, frame: 0.15 },
	// the sky: a 2:1 equirect panorama baked onto PALETTE (scripts/sky/bake.mjs; credit in
	// public/assets/CREDITS.txt)
	sky: '/assets/game/sky/nebula.png',
	// what lights the plain: the sky itself (prefiltered into scene.environment) at `sky`, and a pale
	// key, toward `from`, so the rocks keep their form where the nebula is dark (three's lights take
	// about π to show a face its own colour)
	light: { sky: 3, key: 4, color: 'silver', from: [0.6, 0.8, 0.4] },
	// the palette's cold night ramp, as starlight paints the departure ridge
	ground: { radius: 1500, color: 'zinc' },
	// boulders scattered `clear` to `reach` m out, `size` m across, flattened to `squat`; spires
	// `spire.radius` wide and `spire.height` tall among them
	rocks: {
		count: 260,
		clear: 4,
		reach: 140,
		size: [0.3, 3.5],
		squat: 0.6,
		color: 'frost',
		spires: 24,
		spire: { radius: [0.8, 2.5], height: [8, 30], sides: 5 },
	},
	walk: { x: 0, z: 0 },
	box: { halfWidth: 150, back: -150, front: 150 },
	eye: PILOT.eye,
	fovDeg: PILOT.fovDeg,
	near: PILOT.near,
	far: 2000,
	// far enough to see the zenith and your feet
	tilt: { up: 1.5, down: 1.3 },
}
