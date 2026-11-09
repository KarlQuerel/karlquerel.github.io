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
import { PILOT, PILOT_EXACT_ALPHA } from '../../constants/game/pilot.js'

const { step, turn, ink, glint, far } = PILOT.edges
const { from, to, sigma } = PILOT.distant

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

float distant(float z){ return smoothstep(${from.toFixed(1)}, ${to.toFixed(1)}, z); }

// what lies in front stays out of the mean, so a near silhouette keeps its edge over a soft far end
vec3 farMean(vec2 frag){
  vec3 sum = vec3(0.0);
  float total = 0.0;
  for (int y = -2; y <= 2; y++){
    for (int x = -2; x <= 2; x++){
      vec2 q = frag + vec2(x, y);
      float k = exp(-float(x*x + y*y)/${(2 * sigma * sigma).toFixed(3)})*distant(depthAt(q));
      sum += texture2D(tColor, q/uRes).rgb*k;
      total += k;
    }
  }
  return sum/max(total, 1e-4);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec4 cell = texture2D(tColor, frag/uRes);
  float z = depthAt(frag);
  float soft = distant(z);
  // a cell drawn in the palette's colours already: as it is, no snap and no edges
  if (cell.a < ${(PILOT_EXACT_ALPHA + 1) / 2} && soft <= 0.0){ gl_FragColor = vec4(toSrgb(cell.rgb), 1.0); return; }
  vec3 lin = soft > 0.0 ? mix(cell.rgb, farMean(frag), soft) : cell.rgb;
  vec3 col = palColor(snapIndex(toSrgb(lin), frag));
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
			// the normals in view space, for the creases
			scene.overrideMaterial = normalMaterial
			renderer.setRenderTarget(normals)
			renderer.render(scene, camera)
			scene.overrideMaterial = null
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
