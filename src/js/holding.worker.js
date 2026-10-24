// The holding screen's painters on their own thread: the Earth's limb is a quarter second of
// arithmetic at desktop widths, and the title and its typing should not wait on it.

import { paintGlobe, paintMoon } from './intro/earthArt.js'

self.onmessage = ({ data: { key, earth, moon } }) => {
	const globe = paintGlobe(earth.res, earth, earth.win)
	const disc = paintMoon(moon.res)
	self.postMessage({ key, globe, disc }, [globe.buffer, disc.buffer])
}
