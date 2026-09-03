// Cutting the departure's sprites without freezing the page. The scene is drawn once
// per frame size, but that once is a few hundred milliseconds of height-field work on
// a slow machine, and spent on the main thread it is a frozen first frame. Where the
// browser has OffscreenCanvas the canvases are handed to a worker and drawn there;
// where it has not, they are drawn here, one canvas per animation frame, so no single
// task holds the thread long. Either way `cut` resolves with the cuts the component
// sizes its canvases by and hangs the destination from.

import { drawSteps } from './departureDraw.js'

export function createCutter(canvases) {
	const offscreen =
		typeof OffscreenCanvas !== 'undefined' && 'transferControlToOffscreen' in canvases.sky
	return offscreen ? workerCutter(canvases) : frameCutter(canvases)
}

function workerCutter(canvases) {
	const worker = new Worker(new URL('./departure.worker.js', import.meta.url), { type: 'module' })
	const sky = canvases.sky.transferControlToOffscreen()
	const bands = canvases.bands.map(canvas => canvas.transferControlToOffscreen())
	worker.postMessage({ canvases: { sky, bands } }, [sky, ...bands])
	let latest = 0
	let resolveLatest = null
	worker.onmessage = ({ data }) => {
		// only the newest cut is worth applying; a reshape mid-cut supersedes it
		if (data.id === latest) resolveLatest(data.cuts)
	}
	return {
		cut(frame, seed) {
			const id = ++latest
			return new Promise(resolve => {
				resolveLatest = resolve
				worker.postMessage({ id, frame, seed })
			})
		},
		dispose: () => worker.terminate(),
	}
}

function frameCutter(canvases) {
	let pending = 0
	return {
		cut(frame, seed) {
			cancelAnimationFrame(pending)
			const out = { sky: null, bands: [] }
			const queue = drawSteps(canvases, frame, seed, out)
			return new Promise(resolve => {
				const next = () => {
					queue.shift()()
					if (queue.length) pending = requestAnimationFrame(next)
					else resolve(out)
				}
				pending = requestAnimationFrame(next)
			})
		},
		dispose: () => cancelAnimationFrame(pending),
	}
}
