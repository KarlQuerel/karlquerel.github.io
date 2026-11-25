// The intro's Earth in 3D (constants/game/intro.js `earth`): the painted world map (paintEarthSurface) on a turning
// sphere whose shader finishes it the painter's way, palette ramps stepped by the sun with one-cell seams, the
// night's fires and cities, the limb's tones; a smoke shell drifting over it; the dusty air past the limb, in
// cells as the painter lays it. The seas' drain, the smoke's cover and the cities still lit are uniforms, so a
// shot can let the planet die. Every cell lands on a palette tone and goes through the pixel pass as drawn.

import {
	BackSide,
	DataTexture,
	Group,
	Mesh,
	NearestFilter,
	RGBAFormat,
	ShaderMaterial,
	SphereGeometry,
	Vector2,
	Vector3,
} from 'three'
import { PILOT_EXACT_ALPHA } from '../../constants/game/pilot.js'
import { INTRO } from '../../constants/game/intro.js'
import { EARTH_MAP } from '../../constants/intro/earthMap.js'
import { PALETTE } from '../../constants/palette.js'
import { EARTH_SURFACE } from '../intro/earthMap.js'

const M = EARTH_MAP
const S = EARTH_SURFACE
const E = INTRO.earth
const num = v => (Number.isInteger(v) ? `${v}.0` : `${v}`)

// The tone table, a palette colour per texel (none where a tone is left blank): the ramps by material, then the
// night's, the scar and the cities, the limb's pairs, the air's bands.
const TONE_ROWS = [
	...S.rampNames.map(name => M.ramps[name]),
	[M.night.sea, M.night.land, M.night.smoke, ...M.night.fire],
	[...M.scar, ...S.cityTones],
	[...M.limb.tones.lit, ...M.limb.tones.dusk, ...M.limb.tones.night],
	M.air.bands.map(([tone]) => tone),
]
const ROW = { night: S.rampNames.length, marks: S.rampNames.length + 1 }
ROW.limb = ROW.marks + 1
ROW.air = ROW.limb + 1
const TONE_WIDTH = Math.max(...TONE_ROWS.map(row => row.length))

function toneTable() {
	const data = new Uint8Array(TONE_WIDTH * TONE_ROWS.length * 4)
	TONE_ROWS.forEach((row, y) =>
		row.forEach(
			(name, x) => name && data.set([...PALETTE[name], 255], (y * TONE_WIDTH + x) * 4)
		)
	)
	return nearest(new DataTexture(data, TONE_WIDTH, TONE_ROWS.length, RGBAFormat))
}

function nearest(texture) {
	texture.magFilter = texture.minFilter = NearestFilter
	texture.needsUpdate = true
	return texture
}

const vertex = `
varying vec3 vLocal;
varying vec3 vNormalW;
varying vec3 vNormalV;
varying vec3 vViewPos;
void main(){
  vLocal = position;
  vNormalW = normalize(mat3(modelMatrix)*normal);
  vNormalV = normalize(normalMatrix*normal);
  vec4 mv = modelViewMatrix*vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix*mv;
}`

// what every shader here shares: the map and the tones, the painter's dither and seam, the way back to linear light
const common = `
uniform sampler2D tMap;
uniform sampler2D tTones;
uniform vec3 uSun;
varying vec3 vLocal;
varying vec3 vNormalW;
varying vec3 vNormalV;
varying vec3 vViewPos;
const float EARTH_PI = 3.14159265;
const float EXACT = ${num(PILOT_EXACT_ALPHA)};
const float LEVELS = ${num(M.ramps.sea.length)};
const float GAIN = ${num(M.light.gain)};
const float SEAM = ${num(M.light.seam)};
const float BAYER[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
float threshold(vec2 c){ return (BAYER[int(mod(c.y, 4.0))*4 + int(mod(c.x, 4.0))] + 0.5)/16.0; }
float seamIndex(float lit, float levels, vec2 c, float seam){
  float v = lit*(levels - 1.0);
  float i = floor(v);
  float f = v - i;
  float s = f >= 0.5 ? 1.0 : 0.0;
  if (seam > 0.0 && abs(f - 0.5) <= seam) s = (f - (0.5 - seam))/(2.0*seam) > threshold(c) ? 1.0 : 0.0;
  return clamp(i + s, 0.0, levels - 1.0);
}
vec4 toneAt(float row, float col){
  return texture2D(tTones, (vec2(col, row) + 0.5)/vec2(${num(TONE_WIDTH)}, ${num(TONE_ROWS.length)}));
}
// the map's texel under a point of the sphere: three's frame is right-handed, the painter's is not, so east is -z
vec4 mapAt(vec3 local){
  vec3 p = normalize(local);
  vec2 uv = vec2(atan(-p.z, p.x)/(2.0*EARTH_PI) + 0.5, 0.5 - asin(clamp(p.y, -1.0, 1.0))/EARTH_PI);
  return floor(texture2D(tMap, uv)*255.0 + 0.5);
}
vec3 toLinear(vec3 c){ return mix(c/12.92, pow((c + 0.055)/1.055, vec3(2.4)), step(0.04045, c)); }
// the air over the ground near the limb, seen edge-on: past LIMB_FROM it goes over to the pair for its light
vec3 overLimb(vec3 col, float lit, vec2 c){
  float nv = dot(normalize(vNormalV), normalize(-vViewPos));
  float d2 = 1.0 - nv*nv;
  if (d2 <= ${num(M.limb.from)}) return col;
  float k = (d2 - ${num(M.limb.from)})/${num(1 - M.limb.from)}*${num(M.limb.gain)};
  float over = seamIndex(clamp(k, 0.0, 1.0), 3.0, c, SEAM);
  if (over < 0.5) return col;
  vec4 tone = toneAt(${num(ROW.limb)}, (lit >= 3.0 ? 0.0 : lit >= 1.0 ? 2.0 : 4.0) + over - 1.0);
  return tone.a > 0.5 ? tone.rgb : col;
}`

const ground = `
uniform float uDrain;
uniform float uCitiesLeft;
${common}
void main(){
  vec2 c = floor(gl_FragCoord.xy);
  vec4 m = mapAt(vLocal);
  float what = m.r;
  float burn = 0.0;
  if (what < 0.5){
    float sea = m.g/${num(S.seaPerDeg)};
    what = sea > uDrain ? ${num(S.SEA)} : sea > uDrain - ${num(M.drying.rim)} ? ${num(S.SHORE)} : ${num(S.SALT)};
  } else burn = m.g;
  float diff = dot(normalize(vNormalW), uSun);
  float lit = -1.0;
  vec3 col;
  if (diff <= 0.0){
    float fire = mod(m.b, 4.0);
    col = toneAt(${num(ROW.night)}, what <= ${num(S.SHORE)} ? 0.0 : 1.0).rgb;
    if (burn == ${num(S.FRONT)} && fire > 0.5) col = toneAt(${num(ROW.night)}, 2.0 + fire).rgb;
  } else {
    lit = seamIndex(clamp(diff*GAIN, 0.0, 1.0), LEVELS, c, SEAM);
    if (burn == ${num(S.BURNED)}) lit = max(0.0, lit - 1.0);
    col = burn == ${num(S.FRONT)} ? toneAt(${num(ROW.marks)}, lit > 2.0 ? 1.0 : 0.0).rgb : toneAt(what, lit).rgb;
  }
  col = overLimb(col, lit, c);
  // what is left of the cities, each going dark in its turn as uCitiesLeft falls
  float city = mod(floor(m.b/4.0), 4.0);
  float turn = floor(m.b/16.0);
  if (what >= ${num(S.GROUND)} && city > 0.5 && diff <= ${num(M.night.cities.until)} && (turn + 0.5)/16.0 < uCitiesLeft)
    col = toneAt(${num(ROW.marks)}, 1.0 + city).rgb;
  gl_FragColor = vec4(toLinear(col), EXACT);
}`

// the smoke where its field tops uCover, its thin edge frayed in Bayer order and a step down
const smoke = `
uniform float uCover;
${common}
void main(){
  vec2 c = floor(gl_FragCoord.xy);
  float k = (mapAt(vLocal).a/255.0*${num(S.smokeSpan)} - uCover)/${num(M.smoke.edge)};
  if (k <= threshold(c)) discard;
  float diff = dot(normalize(vNormalW), uSun);
  float lit = -1.0;
  vec3 col = toneAt(${num(ROW.night)}, 2.0).rgb;
  if (diff > 0.0){
    lit = seamIndex(clamp(diff*GAIN, 0.0, 1.0), LEVELS, c, SEAM);
    if (k < 1.0) lit = max(0.0, lit - 1.0);
    col = toneAt(${num(S.SMOKE)}, lit).rgb;
  }
  gl_FragColor = vec4(toLinear(overLimb(col, lit, c)), EXACT);
}`

// The air past the limb, the painter's paintAir: as deep as the limb faces the sun, inner band out, the first
// band only where it faces it past LINE_FROM, seams dithered, the last band thinning to a checker.
const A = M.air
const air = `
uniform vec3 uCentreV;
uniform float uCellsAt;
uniform vec2 uSunDir;
${common}
const float BAND_CELLS[${A.bands.length}] = float[${A.bands.length}](${A.bands.map(([, cells]) => num(cells)).join(', ')});
void main(){
  vec2 c = floor(gl_FragCoord.xy);
  // how far past the limb, in cells: the view ray at its closest to the globe's middle, so the band hugs the
  // silhouette perspective draws, not a circle round the middle
  vec3 rd = normalize(vViewPos);
  vec3 q = rd*dot(uCentreV, rd);
  vec3 d = q - uCentreV;
  float out_ = (length(d) - ${num(E.radius)})*uCellsAt/max(-q.z, 0.001);
  if (out_ < 0.0) discard;
  float toward = dot(normalize(d.xy), uSunDir);
  float deep = ${num(A.night)} + ${num(A.depth - A.night)}*clamp((toward + ${num(A.wrap)})/${num(1 + A.wrap)}, 0.0, 1.0);
  if (out_ >= deep) discard;
  float f = out_/deep*${num(A.bands.reduce((sum, [, cells]) => sum + cells, 0))};
  float band = ${num(A.bands.length)};
  float into = 0.0;
  for (int b = 0; b < ${A.bands.length}; b++){
    if (f < BAND_CELLS[b]){ into = f/BAND_CELLS[b]; band = float(b); break; }
    f -= BAND_CELLS[b];
  }
  if (band < 0.5 && toward < ${num(A.lineFrom)}) band = 1.0;
  if (band > 0.5 && into < ${num(A.seam)} && into/${num(A.seam)} < threshold(c)) band -= 1.0;
  if (band > ${num(A.bands.length - 1.5)} && into > threshold(c)) discard;
  gl_FragColor = vec4(toLinear(toneAt(${num(ROW.air)}, min(band, ${num(A.bands.length - 1)})).rgb), EXACT);
}`

// how far the globe has turned at `t`: a turn of -(90° + lon) brings that meridian round to face +z, the camera's side
export const earthTurn = t => (-(90 + E.faceLon) + E.spinDegS * t) * (Math.PI / 180)

// `surface` is paintEarthSurface's map, `cols` x `rows`
export function createIntroEarth(surface, cols, rows) {
	const map = nearest(new DataTexture(surface, cols, rows, RGBAFormat))
	const tones = toneTable()
	const sun = new Vector3(...E.sun).normalize()
	const shared = { tMap: { value: map }, tTones: { value: tones }, uSun: { value: sun } }
	const material = (fragmentShader, uniforms, side) =>
		new ShaderMaterial({
			vertexShader: vertex,
			fragmentShader,
			uniforms: { ...shared, ...uniforms },
			...(side && { side }),
		})
	const sphere = new SphereGeometry(E.radius, E.segments[0], E.segments[1])
	const globe = new Mesh(
		sphere,
		material(ground, { uDrain: { value: 0 }, uCitiesLeft: { value: 1 } })
	)
	const haze = new Mesh(sphere, material(smoke, { uCover: { value: 0 } }))
	haze.scale.setScalar(E.smoke.lift)
	const glow = new Mesh(
		sphere,
		material(
			air,
			{
				uCentreV: { value: new Vector3() },
				uCellsAt: { value: 1 },
				uSunDir: { value: new Vector2() },
			},
			BackSide
		)
	)
	const group = new Group()
	group.add(globe, haze, glow)

	const toView = new Vector3()
	const middle = new Vector3()
	// The globe turned to the clock, the planet's state set, and the air laid in cells of this grid, `height`
	// rows, as `camera` sees the globe.
	function update(t, { drain, cover, cities }, camera, { height }) {
		globe.rotation.y = earthTurn(t)
		haze.rotation.y = globe.rotation.y + E.smoke.driftDegS * t * (Math.PI / 180)
		globe.material.uniforms.uDrain.value = drain
		globe.material.uniforms.uCitiesLeft.value = cities
		haze.material.uniforms.uCover.value = cover
		middle.setFromMatrixPosition(group.matrixWorld)
		const distance = camera.position.distanceTo(middle)
		const u = glow.material.uniforms
		u.uCellsAt.value = height / 2 / Math.tan((camera.fov * Math.PI) / 360)
		u.uCentreV.value.copy(middle).applyMatrix4(camera.matrixWorldInverse)
		// the globe's radius in cells as it stands, for the shell's reach
		const cells = Math.tan(Math.asin(Math.min(1, E.radius / distance))) * u.uCellsAt.value
		toView.copy(sun).transformDirection(camera.matrixWorldInverse)
		u.uSunDir.value.set(toView.x, toView.y).normalize()
		// the shell wide enough for the deepest band, short of the camera
		const reach = 1 + (A.depth + 2) / Math.max(1, cells)
		glow.scale.setScalar(Math.min(reach, (distance / E.radius) * E.air.nearest))
	}

	function dispose() {
		map.dispose()
		tones.dispose()
		sphere.dispose()
		for (const mesh of [globe, haze, glow]) mesh.material.dispose()
	}

	return { group, globe, sun, update, dispose }
}
