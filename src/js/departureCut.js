// Cutting the departure's sprites without freezing the page: a few hundred ms of height-field work.

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
	let onStepLatest = null
	worker.onmessage = ({ data }) => {
		// only the newest cut is worth applying; a reshape mid-cut supersedes it
		if (data.id !== latest) return
		if (data.cuts) resolveLatest(data.cuts)
		else onStepLatest(data.done, data.total)
	}
	return {
		cut(frame, seed, onStep) {
			const id = ++latest
			return new Promise(resolve => {
				resolveLatest = resolve
				onStepLatest = onStep
				worker.postMessage({ id, frame, seed })
			})
		},
		dispose: () => worker.terminate(),
	}
}

function frameCutter(canvases) {
	let pending = 0
	return {
		cut(frame, seed, onStep) {
			cancelAnimationFrame(pending)
			const out = { sky: null, bands: [] }
			const queue = drawSteps(canvases, frame, seed, out)
			const total = queue.length
			return new Promise(resolve => {
				const next = () => {
					queue.shift()()
					onStep(total - queue.length, total)
					if (queue.length) pending = requestAnimationFrame(next)
					else resolve(out)
				}
				pending = requestAnimationFrame(next)
			})
		},
		dispose: () => cancelAnimationFrame(pending),
	}
}
