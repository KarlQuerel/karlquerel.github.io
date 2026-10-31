// The holding screen's painters on their own thread: the Earth's limb is half a second of arithmetic
// at desktop widths, and the title and its typing should not wait on it.

import { paintMoon } from './intro/earthArt.js'
import { paintEarthMap } from './intro/earthMap.js'

self.onmessage = ({ data: { key, earth, moon } }) => {
	const globe = paintEarthMap(earth.res, earth, earth.win)
	const disc = paintMoon(moon.res, moon.art, moon.light)
	self.postMessage({ key, globe, disc }, [globe.buffer, disc.buffer])
}
