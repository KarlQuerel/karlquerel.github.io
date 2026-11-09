// The corridor pilot's Earth through the glass, painted off the main thread: the holding screen's Earth of
// 3812 as a whole disc, a second of arithmetic the boot should not stall on.

import { paintEarthMap } from '../intro/earthMap.js'
import { EARTH_MAP } from '../../constants/intro/earthMap.js'

// gain: the light's spread over the ramps, in place of the holding screen's
self.onmessage = ({ data: { res, view, light, gain } }) => {
	const M = { ...EARTH_MAP, light: { ...EARTH_MAP.light, gain } }
	const disc = paintEarthMap(res, { view, light }, { x0: 0, y0: 0, w: res, h: res }, M)
	self.postMessage(disc, [disc.buffer])
}
