// The arrival's surface without freezing the page: on a worker where the canvases can be handed over,
// otherwise on the page, behind one interface (the work itself is arrivalSurface.js).

import { createSurface } from './arrivalSurface.js'

export function createArrival(canvases) {
	const offscreen =
		typeof OffscreenCanvas !== 'undefined' && 'transferControlToOffscreen' in canvases.sky
	return offscreen ? workerArrival(canvases) : pageArrival(canvases)
}

function workerArrival(canvases) {
	const worker = new Worker(new URL('./arrival.worker.js', import.meta.url), { type: 'module' })
	const sky = canvases.sky.transferControlToOffscreen()
	const bands = canvases.bands.map(canvas => canvas.transferControlToOffscreen())
	worker.postMessage({ canvases: { sky, bands } }, [sky, ...bands])
	let latest = 0
	let resolveLatest = null
	// one step in flight at a time: a step reads the sun as it stands, never a queue of stale ticks
	let stepping = false
	worker.onmessage = ({ data }) => {
		if (data.stepped) stepping = false
		// only the newest cut is worth applying; a reshape mid-cut supersedes it
		else if (data.id === latest) resolveLatest(data.vent)
	}
	// the canvases are the worker's now, so a failed worker cannot hand them back: say so, loudly
	worker.onerror = event => console.error(event)
	return {
		cut(frame, sunk) {
			const id = ++latest
			return new Promise(resolve => {
				resolveLatest = resolve
				worker.postMessage({ id, frame, sunk })
			})
		},
		step(sunk) {
			if (stepping) return
			stepping = true
			worker.postMessage({ sunk })
		},
		dispose: () => worker.terminate(),
	}
}

function pageArrival(canvases) {
	const surface = createSurface(canvases)
	return {
		cut: (frame, sunk) => Promise.resolve(surface.cut(frame, sunk)),
		step: surface.step,
		dispose() {},
	}
}
