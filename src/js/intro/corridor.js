import frag from '../../shaders/intro/corridor.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import { INTRO_CARDS, INTRO_HUD, INTRO_ROLES } from '../../data/gameIntro.js'
import { itemOf } from './wake.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { ramp } from '../math.js'

const C = CORRIDOR
const TURN = Math.PI * 2
// when the role was picked, so the cut can wait a beat after it
const state = { pickedAt: 0 }

export const corridor = {
	key: 'corridor',
	frag,
	chunks: [hands, human],
	// blocks on the role pick at the door
	duration: 0,
	card: { at: C.cardAt, text: INTRO_CARDS.team },
	marks: { hud: C.hudAt, lockers: C.arrival },
	enter() {
		state.pickedAt = 0
	},
	params(t, io) {
		const x = ramp(t, 0, C.arrival)
		// already moving at the start, easing to a stop at the door; the ease is part linear so the bays are seen
		const walk = x + (1 - (1 - x) * (1 - x) - x) * C.walkEase
		const pace = 1 - x
		const glow = C.glowRest + (1 - C.glowRest) * ramp(t, C.glowFrom, C.arrival)
		const lit = ramp(t, C.arrival, C.arrival + C.lockersRise)
		const item = itemOf(io)
		if (item && !state.pickedAt) state.pickedAt = t
		return {
			p: [walk, t * C.bobHz * TURN, glow, lit],
			q: [pace, 0, 0, 0],
			// the hands stay down for the walk and come up with the picked tool
			h: [2, item, item ? ramp(t, state.pickedAt, state.pickedAt + C.handsRise) : 0, 0],
		}
	},
	hud: (clock, marks) =>
		marks.hud
			? {
					readouts: [INTRO_HUD.ship, ...INTRO_HUD.readouts],
					boot: ramp(clock, C.hudAt, C.hudAt + C.hudBoot),
				}
			: null,
	choice: (_clock, marks, choices) =>
		marks.lockers && !choices.role
			? { key: 'role', options: INTRO_ROLES.map(({ key, label }) => ({ key, label })) }
			: null,
	ready: t => state.pickedAt > 0 && t >= state.pickedAt + C.handsRise + C.pickBeat,
}
