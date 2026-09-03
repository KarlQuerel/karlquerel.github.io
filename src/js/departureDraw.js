// The departure's sprites as one step per canvas, so the same drawing can be run in one
// go by a worker or spread over animation frames on the main thread (departureCut.js).
// `canvases` is { sky, bands[] }; each step fills its slot in `out`.

import { DEPARTURE_RIDGE } from '../constants/journey.js'
import { drawMoon } from './ridge.js'
import { drawSky } from './sky.js'

export function drawSteps(canvases, frame, seed, out) {
	return [
		() => {
			out.sky = drawSky(canvases.sky, { ...frame, bleed: DEPARTURE_RIDGE.sky.depth })
		},
		...DEPARTURE_RIDGE.bands.map((band, i) => () => {
			out.bands[i] = drawMoon(canvases.bands[i], band, seed, { ...frame, bleed: band.depth })
		}),
	]
}
