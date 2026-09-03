// The departure's sprites, cut off the main thread (see departureCut.js). The canvases
// arrive once, as OffscreenCanvases; a frame to cut them for arrives as often as the
// window changes shape, and each answer carries the cuts back with the id it was asked
// under, so a stale answer can be told from the latest.

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
