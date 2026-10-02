import frag from '../../shaders/intro/year.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { YEAR } from '../../constants/intro/year.js'
import { clamp01, ramp } from '../math.js'
import { skyPan } from './layerCamera.js'
import { LAYERS_CHUNK, sky } from './sky.js'

export const year = {
	key: 'year',
	frag,
	chunks: [LAYERS_CHUNK],
	// the earth shot's grid, so the field is the same cells on both sides of the cut
	cellPx: EARTH.cellPx,
	duration: YEAR.duration,
	card: { at: YEAR.cardAt, text: INTRO_CARDS.year },
	params(t, io, _gl, grid) {
		// eased out to a stop on the earth shot's first pan, so the stars do not jump at the cut
		const u = 1 - clamp01(t / YEAR.duration)
		const k = u * u * u
		const [tx, ty] = EARTH.travel
		const [dx, dy] = YEAR.drift
		return {
			p: [...skyPan(grid, io, [tx + dx * k, ty + dy * k]), ramp(t, 0, YEAR.rise), 0],
			sky: sky.texture,
		}
	},
}
