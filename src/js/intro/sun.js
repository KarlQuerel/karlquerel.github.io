import raw from '../../shaders/intro/sun.frag.glsl?raw'
import { INTRO_CARDS } from '../../data/gameIntro.js'
import { EARTH } from '../../constants/intro/earth.js'
import { SUN } from '../../constants/intro/sun.js'
import { PALETTE } from '../../constants/palette.js'
import { ramp, smoothstep } from '../math.js'
import { skyPan } from './layerCamera.js'
import { LAYERS_CHUNK, glslNum, glslVec, sky } from './sky.js'

const rgb = name => glslVec(PALETTE[name].map(c => c / 255))
// the planets, unrolled into calls: GLSL ES 1.00 has no constant arrays
const planets = SUN.planets.map(
	p =>
		`  col = planet(col, cell, ${glslNum(p.x)}, ${glslNum(p.r)}, ${rgb(p.lit)}, ${rgb(p.dark)});`
)
const layout = [
	`const vec2 SUN_AT = ${glslVec(SUN.at)};`,
	`const float HEAT = ${glslNum(SUN.heat)};`,
	`const float FLASH = ${glslNum(SUN.flash)};`,
]
const frag = raw
	.replace('__LAYOUT__', layout.join('\n'))
	.replace('__PLANETS__', planets.join('\n'))
	.replace(
		'__ORBITS__',
		SUN.planets.map(p => `  col = orbit(col, d, ang, ${glslNum(p.x)});`).join('\n')
	)

const TAU = Math.PI * 2

// The swell 0..1: eased at both ends, surging `surges` times between. A monotone warp of the clock, so
// the star only ever grows; `surging` is how hard it is pushing right now, 0..1.
function swell(t) {
	const u = ramp(t, ...SUN.swell)
	const k = SUN.surges * TAU
	const warped = u - (SUN.surge * Math.sin(k * u)) / k
	const surging = u > 0 && u < 1 ? Math.max(0, Math.cos(k * u)) : 0
	return { grown: smoothstep(warped), surging }
}

export const sun = {
	key: 'sun',
	frag,
	chunks: [LAYERS_CHUNK],
	cellPx: SUN.cellPx,
	duration: SUN.duration,
	card: { at: SUN.cardAt, text: INTRO_CARDS.sun },
	// uP = radius in cells, the ejection 0..1; uQ = the sky's pan, the star's clock, its age;
	// uH.x = the corona's reach
	params(t, io, _gl, grid) {
		const { grown, surging } = swell(t)
		const { young, giant } = SUN.limb
		const radius = (young + (giant - young) * grown - SUN.at[0]) * grid.width
		const age = EARTH.star.age + (SUN.age - EARTH.star.age) * grown
		const drift = SUN.drift * smoothstep(ramp(t, 0, SUN.duration))
		return {
			p: [radius, ramp(t, ...SUN.ejection), 0, 0],
			q: [...skyPan(grid, io, [drift, 0]), t, age],
			h: [1 + SUN.puff * surging, 0, 0, 0],
			sky: sky.texture,
		}
	},
}
