// A room's own light on three's standard materials (roomLight.glsl): each keeps its colour, glow and roughness and
// is lit by the room's lines alone, never by the sun outside the hull. A room hands over its lines once and gets
// back a painter for its parts and each line's gain, to turn it up or down.

import { DoubleSide, MeshStandardMaterial } from 'three'
import light from '../../shaders/pilot/roomLight.glsl?raw'
import { paletteHex, paletteMix } from '../../constants/palette.js'

const num = v => (Number.isInteger(v) ? `${v}.0` : `${v}`)
const vec3 = v => `vec3(${v.map(num).join(', ')})`
const array = (name, vs) => `const vec3 ${name}[RL_SEGMENTS] = vec3[](${vs.map(vec3).join(', ')});`

const WORLD_VERTEX = `
vec4 rlW = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
rlW = instanceMatrix*rlW;
#endif
vRlWorld = (modelMatrix*rlW).xyz;
`
// three's colours back to the palette's sRGB for the light, and the light's back to three's for the pixel pass
const LIT_FRAGMENT = `
vec3 rlCol = roomLight(vRlWorld, inverseTransformDirection(normal, viewMatrix), sRGBTransferOETF(diffuseColor).rgb,
  sRGBTransferOETF(vec4(totalEmissiveRadiance, 1.0)).rgb, 1.0 - roughnessFactor);
gl_FragColor = vec4(sRGBTransferEOTF(vec4(max(rlCol, 0.0), 1.0)).rgb, diffuseColor.a);
`

// `key` names the room's program; `lines` its lights, each { a, b, color: 0..1 sRGB at its power, face: the way
// it shines, or none all round, wrap: how far round past its side it still reaches }; `fill`, `soft`, `sheen`,
// `metal` and `neutral` as roomLight.glsl reads them. Returns { paint, gain }: paint(spec) a material for
// { base, rough, glow, k, flat, opacity } (palette names), one per spec, lit by the room; gain each line's
// brightness (1 as given).
export function roomPainter(key, { lines, fill, soft, sheen, metal, neutral }) {
	const glsl = `#define RL_SEGMENTS ${lines.length}
${array(
	'RL_A',
	lines.map(l => l.a)
)}
${array(
	'RL_B',
	lines.map(l => l.b)
)}
${array(
	'RL_FACE',
	lines.map(l => l.face ?? [0, 0, 0])
)}
${array(
	'RL_COLOR',
	lines.map(l => l.color)
)}
const float RL_WRAP[RL_SEGMENTS] = float[](${lines.map(l => num(l.wrap ?? 0)).join(', ')});
const vec3 RL_FILL = ${vec3(fill)};
const float RL_SOFT = ${num(soft)};
const float RL_SHEEN = ${num(sheen)};
const vec3 RL_METAL = ${vec3(metal)};
const vec2 RL_NEUTRAL = vec2(${neutral.map(num).join(', ')});
${light}`
	const gain = new Float32Array(lines.length).fill(1)
	const uRlGain = { value: gain }
	const patch = shader => {
		shader.uniforms.uRlGain = uRlGain
		shader.vertexShader = `varying vec3 vRlWorld;\n${shader.vertexShader}`.replace(
			'#include <project_vertex>',
			`#include <project_vertex>\n${WORLD_VERTEX}`
		)
		shader.fragmentShader = shader.fragmentShader
			.replace('void main() {', `${glsl}\nvoid main() {`)
			.replace('#include <opaque_fragment>', LIT_FRAGMENT)
	}
	const take = material => {
		material.onBeforeCompile = patch
		material.customProgramCacheKey = () => `room:${key}`
		material.needsUpdate = true
		return material
	}
	const made = new Map()
	const paint = ({ base, rough = 1, glow, k = 1, flat = false, opacity = 1 }) => {
		const name = JSON.stringify([base, rough, glow, k, flat, opacity])
		if (made.has(name)) return made.get(name)
		const material = new MeshStandardMaterial({
			color: base ? paletteHex(base) : 0,
			emissive: glow ? paletteHex(glow) : 0,
			emissiveIntensity: k,
			roughness: rough,
			flatShading: flat,
			side: DoubleSide,
			// glass: what lies behind it keeps its own depth, and so its outline
			transparent: opacity < 1,
			opacity,
			depthWrite: opacity === 1,
		})
		if (opacity < 1) material.defines = { RL_GLASS: '' }
		made.set(name, material)
		return take(material)
	}
	return { paint, gain }
}

// a light's colour at its power: a palette mix [a, b, t] scaled
export const lineColor = ({ color, power }) => paletteMix(color).map(c => c * power)
