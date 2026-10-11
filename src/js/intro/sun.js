import raw from '../../shaders/intro/sun.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { SUN } from '../../constants/intro/sun.js'
import { ramp, smoothstep } from '../math.js'
import { earthEase } from './layerCamera.js'
import { EARTH_CHUNKS, earth, earthLayers, earthPan } from './earth.js'
import { glslNum, glslVec } from './sky.js'

const { flow } = SUN
const layout = [
	`const vec2 FOCUS = ${glslVec(SUN.focus)};`,
	`const float ZOOM_LN = ${glslNum(Math.log(SUN.zoom))};`,
	`const vec3 FLOW = ${glslVec([flow.sky, flow.moon, flow.globe])};`,
]
const frag = raw.replace('__LAYOUT__', layout.join('\n'))

export const sun = {
	key: 'sun',
	frag,
	chunks: EARTH_CHUNKS,
	cellPx: EARTH.cellPx,
	duration: SUN.duration,
	card: { at: SUN.cardAt, text: INTRO_CARDS.sun },
	// the globe and the Moon are the earth shot's own painted layers
	resize: (gl, grid) => earth.resize(gl, grid),
	// uP = the earth shot's pan, still drifting, the star's clock, its age; uQ.x = the push 0..1, uQ.z =
	// the heat (star() in layers.glsl); uH = the earth layers' sides, canvas px per art pixel
	params(t, io, _gl, grid) {
		const push = earthEase(t / SUN.duration)
		const age = EARTH.star.age + (SUN.age - EARTH.star.age) * smoothstep(ramp(t, ...SUN.redden))
		return {
			// the star keeps the earth shot's clock, so its boil runs on across the cut
			p: [...earthPan(EARTH.duration + t, io, grid), EARTH.duration + t, age],
			q: [push, 0, smoothstep(ramp(push, ...SUN.heat)), 0],
			...earthLayers(grid),
		}
	},
}
