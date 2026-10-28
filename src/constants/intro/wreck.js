import { CORRIDOR } from './corridor.js'

// Act I's opener, the corridor wrecked in orbit, and the one thing drifting down it: the second pod,
// its sleeper inside. World units and seconds.
export const WRECK = {
	// the corridor's colours, and the reds the emergency light and the frozen blood need
	palette: [...CORRIDOR.palette, 'garnet', 'clay'],
	// The pod: a capsule `half` from its centre to each end's centre and `radius` round, its long axis
	// its own x, the window on its +y face; POD in corridor.frag.glsl is drawn to the same size. It
	// drifts from `at`, turned `turn` about `axis`, with a slow drift and tumble; `spin` is how much a
	// knock off-centre sets it turning. It starts across the corridor, too long to slip past, low and
	// its window tipped toward the player coming down the deck, so the glass is the first thing seen.
	pod: {
		half: 0.75,
		radius: 0.38,
		at: [0, -0.9, 16.8],
		axis: [1, 0.25, 0.1],
		turn: -0.65,
		drift: [0, 0.004, -0.02],
		tumble: [0.008, 0.015, 0.004],
		spin: 0.4,
	},
	// the box the pod's end centres keep to: the shader's walls (W 1.6 less its ribs, FLOOR -1.6,
	// CEIL 1, BACK_Z -3.5, DOOR_Z 35) less the pod's radius
	box: { x: 1.14, yLo: -1.22, yHi: 0.62, zLo: -3.12, zHi: 34.6 },
	// how much speed a bounce keeps, and the loss that brings it to rest: scraping walls and hoses
	bounce: 0.35,
	dragS: 12,
	// the player: a column from the deck to the eye; walking into the pod passes on this share of the pace
	player: { radius: 0.3, floor: -1.6, eye: 0 },
	shove: 0.25,
	// E pushes the pod where the view meets it within reach: slowly, it is heavy
	reach: 2,
	push: 0.45,
	// the hands come up for a push and drop again
	handsS: 0.7,
}
