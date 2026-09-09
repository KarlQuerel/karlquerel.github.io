// The surface shader's own thread: at 192 cells square a sweep is a whole 60Hz frame of arithmetic.

import { createPlanetShader } from './planetShader.js'

let shader = null

self.onmessage = ({ data: msg }) => {
	if (msg.type === 'init') {
		shader = createPlanetShader(msg)
		return
	}
	const { buffer, spin, lightYaw, cloudThin } = msg
	// hand the buffer back whatever happens: holding it is the component's permission to ask for the next sweep
	if (shader) shader.draw(new Uint8ClampedArray(buffer), spin, lightYaw, cloudThin)
	self.postMessage({ buffer }, [buffer])
}
