// The painters' thread, shared by every flat-layer shot: paintArt() resolves with the atlas that
// art.worker.js paints for `kind` at `grid`, or with null once the thread has been dropped.

let worker = null
let nextId = 0
const waiting = new Map()

function start() {
	const w = new Worker(new URL('./art.worker.js', import.meta.url), { type: 'module' })
	w.onmessage = ({ data: { id, art } }) => {
		waiting.get(id)?.(art)
		waiting.delete(id)
	}
	// a painter that fails leaves its shot without art rather than the boot waiting on it
	w.onerror = err => {
		console.error('art worker:', err.message)
		dropPainter()
	}
	return w
}

export function paintArt(kind, grid) {
	worker ??= start()
	const id = ++nextId
	return new Promise(resolve => {
		waiting.set(id, resolve)
		worker.postMessage({ id, kind, grid })
	})
}

// the intro is leaving: drop the thread, and answer every paint still owed with nothing
export function dropPainter() {
	worker?.terminate()
	worker = null
	for (const resolve of waiting.values()) resolve(null)
	waiting.clear()
}
