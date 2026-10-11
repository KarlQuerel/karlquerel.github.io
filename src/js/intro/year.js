import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { YEAR } from '../../constants/intro/year.js'
import { clamp01, ramp, smoothstep } from '../math.js'
import { skyPan } from './layerCamera.js'
import { earth, earthLayers, earthOpening } from './earth.js'

// the earth shot's own program with its layers held back: the starfield alone, still rising
export const year = {
	key: 'year',
	frag: earth.frag,
	chunks: earth.chunks,
	// the earth shot's grid, so the field is the same pixels on both sides of the wipe
	cellPx: EARTH.cellPx,
	duration: YEAR.duration,
	card: { at: YEAR.cardAt, text: INTRO_CARDS.year },
	resize: (gl, grid) => earth.resize(gl, grid),
	params(t, io, _gl, grid) {
		// eased out to a stop on the earth shot's opening pan, so the cut between the two does not show
		const u = 1 - clamp01(t / YEAR.duration)
		const k = u * u * u
		const [tx, ty] = earthOpening()
		const [dx, dy] = YEAR.drift
		return {
			p: [...skyPan(grid, io, [tx + dx * k, ty + dy * k]), 0, 0],
			// the sun held back, how much of the starfield has yet to rise, every layer held back
			q: [0, 1, 1 - smoothstep(ramp(t, 0, YEAR.rise)), 1],
			...earthLayers(grid),
		}
	},
}
