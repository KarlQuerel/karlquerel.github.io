import frag from '../../shaders/intro/corridor.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import edgeCells from '../../shaders/intro/edgeCells.glsl?raw'
import { INTRO_CARDS, INTRO_ROLES, INTRO_WALK_HINT } from '../../data/gameIntro.js'
import { itemOf } from './wake.js'
import { paletteSnap } from './paletteSnap.js'
import { createWalk, lookWalk, stepWalk } from './walk.js'
import { createGait, footFrame, gaitPhase, stepGait } from './gait.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { ramp } from '../math.js'

const C = CORRIDOR
const palette = paletteSnap(C.palette, C.seam)
// when the player reached the lockers and picked a role, the shot's clock at the last frame, the walk
// and the boots under it
const walk = createWalk(C.walk)
const state = { arrivedAt: 0, pickedAt: 0, last: null, walk, gait: createGait(walk) }

export const corridor = {
	key: 'corridor',
	frag,
	chunks: [hands, human, palette, edgeCells],
	// outlined and glinted by the edge pass
	edges: palette,
	cellPx: C.cellPx,
	pov: true,
	walk: true,
	// blocks on the role pick at the door
	duration: 0,
	card: { at: C.cardAt, text: INTRO_CARDS.team },
	enter() {
		state.arrivedAt = 0
		state.pickedAt = 0
		state.last = null
		state.walk = createWalk(C.walk)
		state.gait = createGait(state.walk)
	},
	params(t, io) {
		const w = state.walk
		const g = state.gait
		const dt = state.last === null ? 0 : t - state.last
		state.last = t
		// the player's until the role is picked, then they stand while the hands come up
		if (!state.pickedAt) {
			lookWalk(w, io.turn)
			if (dt > 0) {
				stepWalk(w, io.keys, dt, C.walk)
				stepGait(g, w, dt)
			}
		}
		io.turn[0] = io.turn[1] = 0
		if (!state.arrivedAt && w.z >= C.walk.arrive) state.arrivedAt = t
		const glow = C.glowRest + (1 - C.glowRest) * ramp(w.z, C.glowFrom, C.walk.arrive)
		const lit = state.arrivedAt ? ramp(t, state.arrivedAt, state.arrivedAt + C.lockersRise) : 0
		const item = itemOf(io)
		if (item && !state.pickedAt) state.pickedAt = t
		return {
			p: [w.z, gaitPhase(g), glow, lit],
			q: [io.still ? 0 : w.pace, w.x, w.heading, w.pitch],
			r: footFrame(g.feet[0], w),
			s: footFrame(g.feet[1], w),
			// the hands stay down for the walk and come up with the picked tool
			h: [2, item, item ? ramp(t, state.pickedAt, state.pickedAt + C.handsRise) : 0, 0],
		}
	},
	hint: () => (state.walk.moved ? null : INTRO_WALK_HINT),
	choice: (_clock, _marks, choices) =>
		state.arrivedAt && !choices.role
			? { key: 'role', options: INTRO_ROLES.map(({ key, label }) => ({ key, label })) }
			: null,
	ready: t => state.pickedAt > 0 && t >= state.pickedAt + C.handsRise + C.pickBeat,
}
