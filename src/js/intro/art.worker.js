// The flat-layer shots' painters on their own thread (see artWorker.js): an atlas is a third of a
// second of arithmetic at 720p and seconds on a big screen, and it was painted on the thread the
// loader animates on.

import { paintEarthAtlas } from './earthArt.js'
import { paintFieldsAtlas } from './fieldsArt.js'

const PAINTERS = { earth: paintEarthAtlas, fields: paintFieldsAtlas }

self.onmessage = ({ data: { id, kind, grid } }) => {
	const art = PAINTERS[kind](grid)
	self.postMessage({ id, art }, [art.data.buffer])
}
