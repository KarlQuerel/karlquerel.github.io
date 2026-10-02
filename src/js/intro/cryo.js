import frag from '../../shaders/intro/cryo.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { itemOf } from './wake.js'
import { CRYO } from '../../constants/intro/cryo.js'
import { ramp } from '../math.js'

const window = (t, [from, to]) => ramp(t, from, to)

export const cryo = {
	key: 'cryo',
	frag,
	chunks: [hands, human],
	duration: CRYO.duration,
	card: { at: CRYO.cardAt, text: INTRO_CARDS.chosen },
	hud: () => ({}),
	params(t, io) {
		const reach = window(t, CRYO.reach)
		const grip = window(t, CRYO.grip)
		return {
			p: [reach, grip, window(t, CRYO.lid), window(t, CRYO.frost)],
			q: [
				window(t, CRYO.eyelid),
				window(t, CRYO.walk),
				window(t, CRYO.walk) * CRYO.strides,
				0,
			],
			// reaching as they rise into frame, then closing on the rails; the role's item stays in hand
			h: [1 - grip, itemOf(io), reach, 0],
		}
	},
}
