import frag from '../../shaders/intro/black.frag.glsl?raw'
import { INTRO_ACT_WORLD } from '../../data/gameIntro.js'

// the second act's title over black, after the drop
export const worldTitle = {
	key: 'worldTitle',
	frag,
	title: INTRO_ACT_WORLD,
	duration: 4.5,
	params: () => ({}),
}
