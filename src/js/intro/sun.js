import raw from '../../shaders/intro/sun.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { SUN } from '../../constants/intro/sun.js'
import { INTRO_TRANSITIONS } from '../../constants/intro/transitions.js'
import { pixelTexture } from '../gl.js'
import { ramp, smoothstep } from '../math.js'
import { arrive, skyPan } from './layerCamera.js'
import { LAYERS_CHUNK, glslVec, sky } from './sky.js'
import { paintSunAtlas, sunRadii } from './sunArt.js'

// it opens on the earth shot's sun, exactly where that shot leaves it
const frag = raw
	.replace('__SUN_AT__', glslVec(SUN.at))
	.replace('__EARTH_SUN_AT__', glslVec(EARTH.star.at))

let atlas = null
let painted = ''
let sizes = [0, 0, 0]
let radii = [0, 0, 0]

// how far through the states the star is: 0 young, 1 middle-aged, 2 a giant; fractions are a swell
const stateAt = t => SUN.states.slice(1).reduce((s, { at }) => s + ramp(t, at - SUN.swell, at), 0)

export const sun = {
	key: 'sun',
	frag,
	chunks: [LAYERS_CHUNK],
	cellPx: SUN.cellPx,
	duration: SUN.duration,
	card: { at: SUN.cardAt, text: INTRO_CARDS.sun },
	setup(gl) {
		atlas = pixelTexture(gl)
		painted = ''
	},
	// painting is the expensive part: only a grid of a new size repaints
	resize(gl, grid) {
		const key = `${grid.width}x${grid.height}`
		if (key === painted) return
		painted = key
		const art = paintSunAtlas(grid)
		gl.bindTexture(gl.TEXTURE_2D, atlas)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			art.width,
			art.height,
			0,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			art.data
		)
		sizes = art.sizes
		radii = sunRadii(grid)
	},
	release(gl) {
		gl.deleteTexture(atlas)
		atlas = null
		painted = ''
	},
	// uP = approach 0..1, radius in cells, Mercury's transit, the ejection; uQ = the sky's pan, seconds,
	// the state; uH = the three sprites' sides and how far the painted disc has taken over the plain one
	params(t, io, _gl, grid) {
		const a = smoothstep(ramp(t, SUN.hold, SUN.approach))
		const s = stateAt(t)
		const i = Math.min(1, Math.floor(s))
		const settled = radii[i] + (radii[i + 1] - radii[i]) * (s - i)
		const from = EARTH.star.radius * Math.min(grid.width, grid.height)
		const radius = t < SUN.approach ? from + (radii[0] - from) * a : settled
		const drift = SUN.drift * smoothstep(ramp(t, 0, SUN.duration))
		const carry = arrive(t, INTRO_TRANSITIONS.sun.dur, SUN.carry)
		return {
			p: [a, radius, ramp(t, ...SUN.transit), ramp(t, ...SUN.ejection)],
			q: [...skyPan(grid, io, [drift + carry, 0]), t, s],
			h: [...sizes, ramp(t, SUN.approach - SUN.reveal, SUN.approach)],
			mask: atlas,
			sky: sky.texture,
		}
	},
}
