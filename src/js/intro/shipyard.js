import frag from '../../shaders/intro/shipyard.frag.glsl?raw'
import { SHIPYARD } from '../../constants/intro/shipyard.js'
import { ramp, smoothstep } from '../math.js'

const lerp = ([a, b], k) => a + (b - a) * k

// Between the vote and the corridor: the ten ships being finished in orbit. No card.
export const shipyard = {
	key: 'shipyard',
	frag,
	duration: SHIPYARD.duration,
	params: t => {
		const { path } = SHIPYARD
		const k = t / SHIPYARD.duration
		const move = smoothstep(ramp(k, 0, 1))
		const close = smoothstep(ramp(k, ...path.close))
		const settle = smoothstep(ramp(k, ...SHIPYARD.settle))
		return {
			p: [
				lerp(path.x, close),
				lerp(path.y, close) + SHIPYARD.rise * settle,
				lerp(path.z, move) + SHIPYARD.pull * settle,
				ramp(t, 0, SHIPYARD.reveal),
			],
			q: [
				SHIPYARD.lookYaw,
				SHIPYARD.lookPitch,
				lerp(SHIPYARD.yaw, move),
				SHIPYARD.bank * Math.sin(Math.PI * move),
			],
			// the climb's tilt rides the hands slot: this shot has no hands
			h: [SHIPYARD.tilt * settle, 0, 0, 0],
		}
	},
}
