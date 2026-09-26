// The arrival's surface on its own thread (see arrivalCut.js): relighting three ranges is a frame's
// worth of arithmetic, and it ran on the thread the contact portals are clicked on.

import { createSurface } from './arrivalSurface.js'

let surface = null

self.onmessage = ({ data }) => {
	if (data.canvases) {
		surface = createSurface(data.canvases)
	} else if (data.frame) {
		self.postMessage({ id: data.id, vent: surface.cut(data.frame, data.sunk) })
	} else {
		surface.step(data.sunk)
		// the page sends the next step once this one has landed, so the sun never runs behind a backlog
		self.postMessage({ stepped: true })
	}
}
