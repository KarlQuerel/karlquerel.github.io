// The pilot's pixel pass: the scene drawn on the art grid, every cell snapped to the shot's palette, then
// outlined where it stands in front of what lies beside it and glinted along a crease, as the shader
// shots' edge pass does (shaders/intro/edges.frag.glsl).

import {
	DepthTexture,
	DoubleSide,
	Mesh,
	MeshNormalMaterial,
	NearestFilter,
	OrthographicCamera,
	PlaneGeometry,
	ShaderMaterial,
	WebGLRenderTarget,
} from 'three'
import common from '../../shaders/intro/common.glsl?raw'
import { paletteSnap } from '../intro/paletteSnap.js'
import { PILOT } from '../../constants/game/pilot.js'

const { step, turn, ink, glint, far } = PILOT.edges

const frag = `
#include <packing>
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform sampler2D tNormal;
uniform float cameraNear;
uniform float cameraFar;
${paletteSnap(PILOT.palette, PILOT.seam)}

float depthAt(vec2 frag){
  return -perspectiveDepthToViewZ(texture2D(tDepth, frag/uRes).x, cameraNear, cameraFar);
}
vec3 normalAt(vec2 frag){ return texture2D(tNormal, frag/uRes).xyz*2.0 - 1.0; }
vec3 toSrgb(vec3 c){
  return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec3 col = palColor(snapIndex(toSrgb(texture2D(tColor, frag/uRes).rgb), frag));
  float z = depthAt(frag);
  float near = smoothstep(${far.toFixed(1)}, ${(far / 2).toFixed(1)}, z);
  float w = 1.0/z;
  vec3 n = normalAt(frag);
  float outline = 0.0, crease = 0.0;
  for (int i = 0; i < 4; i++){
    vec2 o = i == 0 ? vec2(1.0, 0.0) : i == 1 ? vec2(-1.0, 0.0) : i == 2 ? vec2(0.0, 1.0) : vec2(0.0, -1.0);
    float wa = 1.0/depthAt(frag + o);
    float wb = 1.0/depthAt(frag - o);
    outline = max(outline, step(${step.toFixed(3)}*w, 2.0*w - wa - wb));
    crease = max(crease, step(${turn.toFixed(3)}, 1.0 - dot(n, normalAt(frag + o))) * step(wa, w));
  }
  if (outline > 0.0) col = palColor(nearestIndex(col*mix(1.0, ${ink.toFixed(3)}, near)));
  else if (crease > 0.0) col = palColor(nearestIndex(col*mix(1.0, ${glint.toFixed(3)}, near)));
  gl_FragColor = vec4(col, 1.0);
}
`

const target = () =>
	new WebGLRenderTarget(1, 1, { minFilter: NearestFilter, magFilter: NearestFilter })

export function createPixelPost(renderer, camera) {
	const color = target()
	color.depthTexture = new DepthTexture(1, 1)
	const normals = target()
	// both sides: the player stands inside the hull, facing its back faces
	const normalMaterial = new MeshNormalMaterial({ side: DoubleSide })
	const material = new ShaderMaterial({
		uniforms: {
			tColor: { value: color.texture },
			tDepth: { value: color.depthTexture },
			tNormal: { value: normals.texture },
			uRes: { value: [1, 1] },
			cameraNear: { value: camera.near },
			cameraFar: { value: camera.far },
		},
		vertexShader: 'void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }',
		fragmentShader: `${common}\n${frag}`,
		depthTest: false,
		depthWrite: false,
	})
	const quad = new Mesh(new PlaneGeometry(2, 2), material)
	const screen = new OrthographicCamera()

	return {
		resize(width, height) {
			color.setSize(width, height)
			normals.setSize(width, height)
			material.uniforms.uRes.value = [width, height]
		},
		render(scene) {
			renderer.setRenderTarget(color)
			renderer.render(scene, camera)
			// the normals in view space, for the creases; the fog off so they stay whole at range
			const { fog } = scene
			scene.fog = null
			scene.overrideMaterial = normalMaterial
			renderer.setRenderTarget(normals)
			renderer.render(scene, camera)
			scene.overrideMaterial = null
			scene.fog = fog
			renderer.setRenderTarget(null)
			renderer.render(quad, screen)
		},
		dispose() {
			color.dispose()
			normals.dispose()
			normalMaterial.dispose()
			material.dispose()
			quad.geometry.dispose()
		},
	}
}
