// The player's helmet from the inside, and the suit's readouts on its glass. The helmet is the crew's own: a
// copy of the one the player's body wears for its shadow, hung on the camera where it sits round the body's
// eyes, its glass cut away so only its rim shows. The readouts are arcs along the rim's lower left, laid out
// on the art grid from the rim as it falls there (the helmet drawn alone at each resize) and drawn by the
// pixel pass over its finished cells, so they land on whole cells in the palette's colours.

import {
	Color,
	DataTexture,
	MeshBasicMaterial,
	NearestFilter,
	Object3D,
	PerspectiveCamera,
	ShaderMaterial,
	Vector2,
	Vector3,
	WebGLRenderTarget,
} from 'three'
import { PILOT_BODY, PILOT_VISOR } from '../../constants/game/pilot.js'
import { paletteHex } from '../../constants/palette.js'
import { paletteConsts } from '../intro/paletteSnap.js'
import { isPanel, loadProp, texels } from './models.js'

// the visor's vertices: those of the triangles whose middle lies on its texels, grown over shared vertices to
// its whole uv island (the stencil printed on it too), which a uv seam splits from the rest of the shell
function glassVertices(shell) {
	const { width, height, data } = texels(shell.material.map).pixels
	const { uv } = shell.geometry.attributes
	const index = shell.geometry.index.array
	const texel = (s, size) => Math.min(size - 1, Math.max(0, Math.floor(s * size)))
	const glass = new Set()
	for (let t = 0; t < index.length; t += 3) {
		const tri = [index[t], index[t + 1], index[t + 2]]
		const x = texel(tri.reduce((s, v) => s + uv.getX(v), 0) / 3, width)
		const y = texel(tri.reduce((s, v) => s + uv.getY(v), 0) / 3, height)
		const i = (y * width + x) * 4
		if (isPanel(data[i], data[i + 1], data[i + 2])) tri.forEach(v => glass.add(v))
	}
	for (let grown = true; grown; ) {
		grown = false
		for (let t = 0; t < index.length; t += 3) {
			const tri = [index[t], index[t + 1], index[t + 2]]
			if (tri.some(v => glass.has(v)) && !tri.every(v => glass.has(v))) {
				tri.forEach(v => glass.add(v))
				grown = true
			}
		}
	}
	return glass
}

// the helmet less its visor; the lining shares the shell's vertices, so it loses the same triangles
function cutGlass(helmet) {
	let shell
	helmet.traverse(o => {
		if (o.isMesh && o.material.map) shell ??= o
	})
	const glass = glassVertices(shell)
	helmet.traverse(mesh => {
		if (!mesh.isMesh) return
		const index = mesh.geometry.index.array
		const kept = []
		for (let t = 0; t < index.length; t += 3)
			if (!glass.has(index[t]) || !glass.has(index[t + 1]) || !glass.has(index[t + 2]))
				kept.push(index[t], index[t + 1], index[t + 2])
		// a clone shares the original's geometry
		mesh.geometry = mesh.geometry.clone()
		mesh.geometry.setIndex(kept)
	})
}

// the helmet's inside, unlit (a ShaderMaterial, so the corridor's light leaves it be)
function insideMaterial() {
	const { base, rim, turn } = PILOT_VISOR.inside
	return new ShaderMaterial({
		uniforms: {
			uBase: { value: new Color(paletteHex(base)) },
			uRim: { value: new Color(paletteHex(rim)) },
		},
		vertexShader: `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vec4 at = modelViewMatrix*vec4(position, 1.0);
  vNormal = normalMatrix*normal;
  vView = -at.xyz;
  gl_Position = projectionMatrix*at;
}`,
		fragmentShader: `
uniform vec3 uBase;
uniform vec3 uRim;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  float edgeOn = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
  gl_FragColor = vec4(mix(uBase, uRim, pow(edgeOn, ${turn.toFixed(1)})), 1.0);
}`,
	})
}

// the worn helmet in the frame of the body's eyes looking down its front (+z; the camera looks down -z), taken
// before any clip poses the body
function fromEyes(body, helmet) {
	body.updateMatrixWorld(true)
	const eye = new Object3D()
	const eyes = []
	body.traverse(o => {
		if (o.isBone && /Eye$/.test(o.name)) eyes.push(o.getWorldPosition(new Vector3()))
	})
	eyes.forEach(at => eye.position.addScaledVector(at, 1 / eyes.length))
	eye.rotation.y = Math.PI
	eye.updateMatrixWorld()
	return eye.matrixWorld.clone().invert().multiply(helmet.matrixWorld)
}

// a 3x5 glyph's fifteen bits, row by row from the top (common.glsl's glyphBit)
const glyphCode = rows =>
	rows.reduce(
		(sum, row, y) => [...row].reduce((s, bit, x) => s + Number(bit) * 2 ** (y * 3 + x), sum),
		0
	)

const GLYPH = { height: 5, pitch: 4 }
const WHITE = new MeshBasicMaterial()

// the helmet drawn alone on the art grid: its red channel lit where it stands, rows from the bottom
function rimMask(renderer, scene, camera, width, height) {
	const target = new WebGLRenderTarget(width, height)
	const eye = new PerspectiveCamera().copy(camera, false)
	eye.layers.set(PILOT_VISOR.layer)
	const { background } = scene
	scene.background = null
	scene.overrideMaterial = WHITE
	renderer.setRenderTarget(target)
	renderer.render(scene, eye)
	const mask = new Uint8Array(width * height * 4)
	renderer.readRenderTargetPixels(target, 0, 0, width, height, mask)
	renderer.setRenderTarget(null)
	scene.overrideMaterial = null
	scene.background = background
	target.dispose()
	return mask
}

// each readout's arc: the region's cells off the helmet whose nearest helmet cell lies `from` to `from` + 1 away,
// each with its angle about the view's middle
function arcCells(mask, width, height) {
	const { readouts, region } = PILOT_VISOR
	const reach = Math.max(...readouts.map(r => r.from)) + 1
	const helmet = (x, y) =>
		x >= 0 && y >= 0 && x < width && y < height && mask[(y * width + x) * 4] > 127
	const arcs = readouts.map(() => [])
	for (let y = 0; y < region[1] * height; y++)
		for (let x = 0; x < region[0] * width; x++) {
			if (helmet(x, y)) continue
			let near = Infinity
			for (let dy = -reach; dy <= reach; dy++)
				for (let dx = -reach; dx <= reach; dx++)
					if (helmet(x + dx, y + dy)) near = Math.min(near, Math.hypot(dx, dy))
			readouts.forEach(({ from }, i) => {
				if (near >= from && near < from + 1)
					arcs[i].push({ x, y, a: Math.atan2(y - height / 2, x - width / 2) })
			})
		}
	return arcs
}

// the arcs as a texture, a cell's arc (1 up, 0 for none) in red and how far along it in green, 0 at its labelled
// end (the one nearest the view's bottom middle); and each label's lower left cell, right of that end
function arcMap(arcs, width, height) {
	const { segments, gap } = PILOT_VISOR
	const data = new Uint8Array(width * height * 4)
	const labels = arcs.map((cells, i) => {
		if (!cells.length) return new Vector2(-width, -height)
		const angles = cells.map(c => c.a)
		const [end, start] = [Math.max(...angles), Math.min(...angles)]
		for (const { x, y, a } of cells) {
			const t = (end - a) / (end - start)
			if ((t * segments) % 1 > 1 - gap) continue
			const at = (y * width + x) * 4
			data.set([i + 1, Math.round(t * 255), 0, 255], at)
		}
		const { x, y } = cells.find(c => c.a === end)
		return new Vector2(x + 2, y - (GLYPH.height >> 1))
	})
	const map = new DataTexture(data, width, height)
	map.magFilter = map.minFilter = NearestFilter
	map.needsUpdate = true
	return { map, labels }
}

// one readout's GLSL: its arc lit from its labelled end as far as its meter, its label right of that end
function readoutGlsl({ label }, i) {
	const { colors, low, blinkHz, font } = PILOT_VISOR
	// paletteConsts' names for the colours
	const [LIT, DIM, LOW] = [colors.lit, colors.dim, colors.low].map(name => name.toUpperCase())
	const ink = [...label]
		.map(
			(ch, k) =>
				`glyphBit(${glyphCode(font[ch])}.0, vec2(c.x - ${k * GLYPH.pitch}.0, ${GLYPH.height - 1}.0 - c.y))`
		)
		.join(' + ')
	return `
  m = uMeter[${i}];
  lit = m < ${low.toFixed(1)} ? ${LOW} : ${LIT};
  on = m >= ${low.toFixed(1)} || fract(uTime*${blinkHz.toFixed(3)}) < 0.5;
  if (which == ${i}.0) col = arc.g <= m/100.0 && m > 0.0 && on ? lit : ${DIM};
  c = floor(frag) - uLabel[${i}];
  if (${ink} > 0.0) col = lit;`
}

// the helmet worn from the inside and its readouts: wear() hangs it on the camera, layout() fits the arcs to its
// rim at each resize, show() sets them from PLAY's meters; `overlay` is the pixel pass's
export function createVisor() {
	const { readouts, colors } = PILOT_VISOR
	const uniforms = {
		uTime: { value: 0 },
		uMeter: { value: readouts.map(() => 0) },
		uLabel: { value: readouts.map(() => new Vector2()) },
		tReadout: { value: new DataTexture(new Uint8Array(4), 1, 1) },
	}
	const glsl = `
${paletteConsts(Object.values(colors))}
uniform sampler2D tReadout;
uniform float uMeter[${readouts.length}];
uniform vec2 uLabel[${readouts.length}];
vec3 overlay(vec3 col, vec2 frag){
  vec4 arc = texture2D(tReadout, frag/uRes);
  float which = floor(arc.r*255.0 + 0.5) - 1.0;
  vec2 c;
  float m;
  vec3 lit;
  bool on;
${readouts.map(readoutGlsl).join('\n')}
  return col;
}`
	return {
		overlay: { glsl, uniforms },
		// player: addPlayerBody's { body, helmet }
		async wear(camera, { body, helmet }) {
			const inside = await loadProp(PILOT_BODY.helmet)
			cutGlass(inside)
			const material = insideMaterial()
			inside.traverse(o => {
				if (!o.isMesh) return
				o.material = material
				o.layers.enable(PILOT_VISOR.layer)
			})
			fromEyes(body, helmet).decompose(inside.position, inside.quaternion, inside.scale)
			// the eye further back and lower is the helmet further ahead and higher
			inside.position.z -= PILOT_VISOR.back
			inside.position.y += PILOT_VISOR.lower
			camera.add(inside)
		},
		layout(renderer, scene, camera, width, height) {
			const mask = rimMask(renderer, scene, camera, width, height)
			const { map, labels } = arcMap(arcCells(mask, width, height), width, height)
			uniforms.tReadout.value.dispose()
			uniforms.tReadout.value = map
			uniforms.uLabel.value = labels
		},
		show(time, meters) {
			uniforms.uTime.value = time
			readouts.forEach(({ meter }, i) => (uniforms.uMeter.value[i] = meters[meter]))
		},
		dispose() {
			uniforms.tReadout.value.dispose()
		},
	}
}
