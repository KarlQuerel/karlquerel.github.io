// The departure's sprites as one step per canvas, so a worker or the main thread can run the same drawing.

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
