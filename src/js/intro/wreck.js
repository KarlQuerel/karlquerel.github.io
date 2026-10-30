import frag from '../../shaders/intro/corridor.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import edgeCells from '../../shaders/intro/edgeCells.glsl?raw'
import { INTRO_PUSH_HINT, INTRO_WALK_HINT } from '../../data/gameIntro.js'
import { paletteSnap } from './paletteSnap.js'
import { createWalk, lookWalk, stepWalk } from './walk.js'
import { createGait, footFrame, gaitPhase, stepGait } from './gait.js'
import { aimDrift, createDrift, driftUniforms, pushDrift, stepDrift } from './drift.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { WALK_KEYS } from '../../constants/intro/walk.js'
import { WRECK } from '../../constants/intro/wreck.js'
import { riseFall } from '../math.js'

// the walk, the boots, the pod, where the view meets it, and the last push
function fresh() {
	const walk = createWalk(CORRIDOR.walk)
	return {
		walk,
		gait: createGait(walk),
		pod: createDrift(),
		aimed: null,
		using: false,
		pushedAt: null,
		last: null,
	}
}
let state = fresh()
const palette = paletteSnap(WRECK.palette, CORRIDOR.seam)

// Act I opens here: the corridor's own source drawn wrecked, so a change to the corridor lands in both.
export const wreck = {
	key: 'wreck',
	frag,
	chunks: [hands, human, palette, edgeCells, '#define WRECK'],
	edges: palette,
	cellPx: CORRIDOR.cellPx,
	pov: true,
	walk: true,
	act: true,
	duration: 0,
	enter() {
		state = fresh()
	},
	params(t, io) {
		const { walk: w, gait: g, pod } = state
		const dt = state.last === null ? 0 : t - state.last
		state.last = t
		lookWalk(w, io.turn)
		io.turn[0] = io.turn[1] = 0
		if (dt > 0) {
			stepWalk(w, io.keys, dt, CORRIDOR.walk)
			// before the boots: the pod may have stopped the player short
			stepDrift(pod, w, dt)
			stepGait(g, w, dt)
		}
		state.aimed = aimDrift(pod, w)
		// one push per press of the key
		const using = WALK_KEYS.use.some(code => io.keys.has(code))
		if (using && !state.using && state.aimed) {
			pushDrift(pod, w, state.aimed)
			state.pushedAt = t
		}
		state.using = using
		const push = state.pushedAt
		return {
			p: [w.z, gaitPhase(g), 0, 0],
			q: [io.still ? 0 : w.pace, w.x, w.heading, w.pitch],
			r: footFrame(g.feet[0], w),
			s: footFrame(g.feet[1], w),
			// the hands reach out for a push and drop again
			h: [1, 0, push === null ? 0 : riseFall(t, push, push + 0.15, push + WRECK.handsS), 0],
			b: driftUniforms(pod),
		}
	},
	hint: () => {
		if (!state.walk.moved) return INTRO_WALK_HINT
		return state.aimed ? INTRO_PUSH_HINT : null
	},
}
