// The intro's art off the main thread: the Earth's world map (a second of arithmetic) and the Moon's disc.

import { paintMoon } from '../intro/earthArt.js'
import { paintEarthSurface } from '../intro/earthMap.js'

self.onmessage = ({ data: { cols, rows, map, moon } }) => {
	const surface = paintEarthSurface(cols, rows, map)
	const disc = paintMoon(moon.res, moon.art, moon.light)
	self.postMessage({ surface, disc }, [surface.buffer, disc.buffer])
}
