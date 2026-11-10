import { EARTH } from '../../constants/intro/earth.js'
import { MENU } from '../../constants/intro/menu.js'
import { INTRO_STILL_START } from '../../constants/intro/timeline.js'
import { clamp01, smootherstep } from '../math.js'
import { skyPan } from './layerCamera.js'
import { earth, earthLayers } from './earth.js'

// The title screen, on the earth shot's program and art: the camera comes down onto the Earth and rests
// on the earth shot's opening frame until a key starts the game (io.started); then
// the cut to the earth shot does not show. Reduced motion skips the entrance and, once started, the
// intro too.
export const menu = {
	key: 'menu',
	menu: true,
	frag: earth.frag,
	chunks: earth.chunks,
	cellPx: EARTH.cellPx,
	duration: 0,
	marks: { up: MENU.entrance },
	resize: (gl, grid) => earth.resize(gl, grid),
	params(t, io, _gl, grid) {
		const u = io.still ? 0 : 1 - smootherstep(clamp01(t / MENU.entrance))
		const [x, y] = EARTH.rest
		return {
			p: [...skyPan(grid, io, [x, y + MENU.from * u]), t, 0],
			...earthLayers(grid),
		}
	},
	ready: (t, io) => io.started && (io.still ? INTRO_STILL_START : t >= MENU.entrance),
}
