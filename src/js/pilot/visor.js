// The suit's gauge on the helmet's glass: air up the left arc, power up the right, in cells that go dark from the
// top as the meters drain, a sign inside under each arc. Laid out once on a small grid of its own, low in the
// left corner, and lit by the pixel pass over its finished cells, so it lands on whole cells in the palette's
// colours.

import { DataTexture, NearestFilter, Vector2 } from 'three'
import { PILOT_VISOR } from '../../constants/game/pilot.js'
import { PLAY } from '../../constants/game/play.js'
import { paletteConsts } from '../intro/paletteSnap.js'

// what a gauge cell is, in its texture's red channel
const FILL = 1
const EDGE = 2
const SIGN = 3
const SIDES = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
]

// the gauge on a square grid of its own `size` cells across, its middle at the centre, rows from the bottom: red
// what each cell is, green its segment along its arc, blue its side (0 air, 255 power)
function layGauge() {
	const { band, segments, gap, sides } = PILOT_VISOR
	const half = Math.ceil(band[1]) + 2
	const size = 2 * half
	// each arc cell's segment, numbered on from the first side's so neighbours on either side differ
	const segment = new Int16Array(size * size).fill(-1)
	for (let y = 0; y < size; y++)
		for (let x = 0; x < size; x++) {
			const dx = x + 0.5 - half
			const dy = y + 0.5 - half
			const r = Math.hypot(dx, dy)
			if (r < band[0] || r > band[1]) continue
			// degrees clockwise from straight up
			const deg = ((Math.atan2(dx, dy) * 180) / Math.PI + 360) % 360
			sides.forEach(({ arc: [from, to] }, side) => {
				const t = (deg - from) / (to - from)
				if (t < 0 || t > 1 || (t * segments) % 1 > 1 - gap) return
				segment[y * size + x] =
					side * segments + Math.min(segments - 1, Math.floor(t * segments))
			})
		}
	const data = new Uint8Array(size * size * 4)
	segment.forEach((id, i) => {
		if (id < 0) return
		const [x, y] = [i % size, Math.floor(i / size)]
		const edge = SIDES.some(([dx, dy]) => segment[(y + dy) * size + x + dx] !== id)
		const side = Math.floor(id / segments)
		data.set([edge ? EDGE : FILL, id % segments, side * 255, 255], i * 4)
	})
	sides.forEach(({ sign }, side) =>
		sign.rows.forEach((row, r) =>
			[...row].forEach((bit, q) => {
				if (bit !== '#') return
				const i = (half - sign.at[1] - 1 - r) * size + half + sign.at[0] + q
				data.set([SIGN, 0, side * 255, 255], i * 4)
			})
		)
	)
	const map = new DataTexture(data, size, size)
	map.magFilter = map.minFilter = NearestFilter
	map.needsUpdate = true
	return { map, half, size }
}

// The meters as they drain till the acts spend them: down from PLAY.start, full again once empty.
export const drainedMeters = time =>
	Object.fromEntries(
		Object.entries(PILOT_VISOR.drainPerS).map(([meter, perS]) => {
			const full = PLAY.start[meter]
			return [meter, full - ((time * perS) % full)]
		})
	)

// the gauge: show() lights it from the meters; `overlay` is the pixel pass's
export function createVisor() {
	const { at, segments, sides, low, blinkHz } = PILOT_VISOR
	const { map, half, size } = layGauge()
	const uniforms = {
		uTime: { value: 0 },
		uMeter: { value: new Vector2() },
		tGauge: { value: map },
	}
	const [air, power] = sides.map(({ colors }) => colors.map(name => name.toUpperCase()))
	const [lowLit, lowDim] = low.colors.map(name => name.toUpperCase())
	const names = [...new Set([...sides.flatMap(({ colors }) => colors), ...low.colors])]
	const glsl = `
${paletteConsts(names)}
uniform sampler2D tGauge;
uniform vec2 uMeter;
vec3 overlay(vec3 col, vec2 frag){
  vec2 p = floor(frag) - vec2(${at[0] - half}.0, ${at[1] - half}.0);
  if (p.x < 0.0 || p.y < 0.0 || p.x >= ${size}.0 || p.y >= ${size}.0) return col;
  vec4 g = texture2D(tGauge, (p + 0.5)/${size}.0);
  float kind = floor(g.r*255.0 + 0.5);
  if (kind < 0.5) return col;
  bool right = g.b > 0.5;
  float m = right ? uMeter.y : uMeter.x;
  bool low = m < ${low.below.toFixed(1)};
  bool on = !low || fract(uTime*${blinkHz.toFixed(3)}) < 0.5;
  vec3 lit = low ? ${lowLit} : right ? ${power[0]} : ${air[0]};
  vec3 dim = low ? ${lowDim} : right ? ${power[1]} : ${air[1]};
  if (kind > ${SIGN - 0.5}) return on ? lit : dim;
  bool full = (floor(g.g*255.0 + 0.5) + 0.5)/${segments.toFixed(1)} <= m/100.0;
  if (full && on) return lit;
  return kind > ${EDGE - 0.5} ? dim : col;
}`
	return {
		overlay: { glsl, uniforms },
		show(time, meters) {
			uniforms.uTime.value = time
			uniforms.uMeter.value.set(...sides.map(({ meter }) => meters[meter]))
		},
		dispose() {
			map.dispose()
		},
	}
}
