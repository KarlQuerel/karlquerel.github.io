import frag from '../../shaders/intro/wake.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import { INTRO_HUD } from '../../data/gameIntro.js'
import { CRASH } from '../../constants/intro/wake.js'
import { INTRO_CRASH } from '../../constants/intro/timeline.js'
import { glassTexture } from './wake.js'

export const crash = {
	key: 'crash',
	frag,
	chunks: [hands],
	duration: INTRO_CRASH.duration,
	marks: { black: INTRO_CRASH.blackAt },
	params(t) {
		// the world comes on in jolts, not a slide; some of them flash
		const step = Math.floor(t * CRASH.steps)
		const jolt = Math.min(1, step / (INTRO_CRASH.blackAt * CRASH.steps)) * CRASH.closing
		const glare = step > 0 && step % CRASH.flashEvery === 0 ? CRASH.glare : 0
		// the frame goes over one way, kicked back a little on every other jolt
		const tilt = CRASH.tilt * jolt * (step % 2 === 0 ? 1 : CRASH.kickBack)
		return {
			p: [1, 0, 1, 1],
			q: [1, jolt, glare, tilt],
			// no hands: the jolts carry the shot
			h: [0, 0, 0, 0],
			mask: glassTexture(),
		}
	},
	hud: () => ({
		readouts: [INTRO_HUD.ship, ...INTRO_HUD.wake],
		alarms: INTRO_HUD.alarms,
		alert: INTRO_HUD.alert,
		hot: true,
	}),
}
