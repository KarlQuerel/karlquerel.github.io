// The surface shader's own thread. At 192 cells square a sweep is a whole 60Hz frame of
// arithmetic, so run on the main thread it *is* the frame — and the scroll it exists to decorate
// is what stutters.

import { createPlanetShader } from './planetShader.js'

let shader = null

self.onmessage = ({ data: msg }) => {
	if (msg.type === 'init') {
		shader = createPlanetShader(msg)
		return
	}
	const { buffer, spin, lightYaw, cloudThin } = msg
	// hand the buffer back whatever happens: the component treats holding it as
	// permission to ask for the next sweep, so swallowing one would stall the globe
	if (shader) shader.draw(new Uint8ClampedArray(buffer), spin, lightYaw, cloudThin)
	self.postMessage({ buffer }, [buffer])
}
