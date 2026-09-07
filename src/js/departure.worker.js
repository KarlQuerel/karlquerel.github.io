// The departure's sprites, cut off the main thread (see departureCut.js).

import { drawSteps } from './departureDraw.js'

let canvases = null

self.onmessage = ({ data }) => {
	if (data.canvases) {
		canvases = data.canvases
		return
	}
	const out = { sky: null, bands: [] }
	const steps = drawSteps(canvases, data.frame, data.seed, out)
	steps.forEach((step, i) => {
		step()
		self.postMessage({ id: data.id, done: i + 1, total: steps.length })
	})
	self.postMessage({ id: data.id, cuts: out })
}
