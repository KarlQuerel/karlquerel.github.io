import frag from '../../shaders/intro/chamber.frag.glsl?raw'
import { CHAMBER } from '../../constants/intro/chamber.js'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { ramp, smoothstep } from '../math.js'

// self-running motion steps: a clock quantised to `steps` a second
const stepped = (t, steps) => Math.floor(t * steps) / steps

export const chamber = {
	key: 'chamber',
	frag,
	duration: CHAMBER.duration,
	card: { at: CHAMBER.cardAt, text: INTRO_CARDS.vote },
	params: t => {
		const { from, to, steps } = CHAMBER.hands
		const arm = Math.min(
			2,
			Math.max(0, Math.floor((t - CHAMBER.speaker.at) * CHAMBER.speaker.steps) + 1)
		)
		return {
			p: [stepped(t, steps), stepped(t, CHAMBER.dustSteps), from, to - from],
			q: [arm, 0, smoothstep(ramp(t, 0, CHAMBER.pushEnd)), 0],
		}
	},
}
