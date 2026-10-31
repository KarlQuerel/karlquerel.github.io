import frag from '../../shaders/intro/black.frag.glsl?raw'
import { INTRO_ACT } from '../../data/gameIntro.js'

// the name over black, and the act it opens on; it rests until SKIP
export const title = {
	key: 'title',
	frag,
	title: INTRO_ACT,
	duration: 0,
	params: () => ({}),
}
