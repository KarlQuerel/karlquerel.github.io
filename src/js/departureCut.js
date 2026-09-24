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
	let rejectLatest = null
	let onStepLatest = null
	// the canvases are the worker's now, so a failed worker cannot hand them back: every cut fails
	let failure = null
	worker.onmessage = ({ data }) => {
		// only the newest cut is worth applying; a reshape mid-cut supersedes it
		if (data.id !== latest) return
		if (data.cuts) resolveLatest(data.cuts)
		else onStepLatest(data.done, data.total)
	}
	worker.onerror = worker.onmessageerror = event => {
		failure = event
		rejectLatest?.(event)
	}
	return {
		cut(frame, seed, onStep) {
			if (failure) return Promise.reject(failure)
			const id = ++latest
			return new Promise((resolve, reject) => {
				resolveLatest = resolve
				rejectLatest = reject
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
			return new Promise((resolve, reject) => {
				const next = () => {
					try {
						queue.shift()()
					} catch (error) {
						reject(error)
						return
					}
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
