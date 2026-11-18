import { EARTH } from '../../constants/intro/earth.js'
import { MENU } from '../../constants/intro/menu.js'
import { clamp01, smootherstep } from '../math.js'
import { skyPan } from './layerCamera.js'
import { earth, earthLayers } from './earth.js'

// The title screen's shot, on the Earth picture: the camera comes down onto the Earth and rests (EARTH.rest).
// Reduced motion skips the entrance.
export const menu = {
	...earth,
	key: 'menu',
	params(t, io, _gl, grid) {
		const u = io.still ? 0 : 1 - smootherstep(clamp01(t / MENU.entrance))
		const [x, y] = EARTH.rest
		return {
			p: [...skyPan(grid, io, [x, y + MENU.from * u]), t, 0],
			...earthLayers(grid),
		}
	},
}
