import frag from '../../shaders/intro/corridor.frag.glsl?raw'
import hands from '../../shaders/intro/hands.glsl?raw'
import human from '../../shaders/intro/human.glsl?raw'
import edgeCells from '../../shaders/intro/edgeCells.glsl?raw'
import { paletteSnap } from '../intro/paletteSnap.js'
import { wreckView } from '../intro/wreck.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { WRECK } from '../../constants/intro/wreck.js'
import { WRECK_ACT } from '../../constants/game/play.js'

const palette = paletteSnap(WRECK.palette, CORRIDOR.seam)
// opened on its own (dev): no wreck frame to hold, a dark corridor and no hands
const STILL = { p: [0, 0, 0, 1], h: [0, 0, 0, 0] }

// The way down: the wreck's last frame shaken until the cut to black, the pod riding the air. The
// same source as the wreck, so the two share one program.
export const descent = {
	key: 'descent',
	frag,
	chunks: [hands, human, palette, edgeCells, '#define WRECK'],
	edges: palette,
	cellPx: CORRIDOR.cellPx,
	pov: true,
	shake: true,
	duration: WRECK_ACT.descent.shakeS + WRECK_ACT.descent.blackS,
	marks: { black: WRECK_ACT.descent.shakeS },
	params: () => wreckView() ?? STILL,
}
