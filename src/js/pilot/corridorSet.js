// The corridor pilot's set: the intro corridor rebuilt in meshes, its shell and what stands in it, lit the
// way the shader lit it. Its tick wakes the lines round the player, brings the door's glow up as they near
// it and the lockers' light once they arrive (CORRIDOR's beats, as the shot has them), and runs what moves;
// its box is where the player can walk: the corridor and the bays off it, round what stands in them.

import { addRepair } from './corridorDrone.js'
import { addProps } from './corridorProps.js'
import { addShell, ROOMS } from './corridorShell.js'
import { sizeCorridor, takeCorridorLight, tickCorridor } from './corridorMaterial.js'
import { CORRIDOR } from '../../constants/intro/corridor.js'
import { PILOT_ROOM, PILOT_SET } from '../../constants/game/pilot.js'
import { ramp } from '../math.js'

// whether the player can stand at (x, z), three's frame: on the corridor's walk, up to the glass in the
// span or in a bay's room, their body clear of the walls and of every footprint
function standable(blocks) {
	const { body } = PILOT_ROOM
	const { halfWidth, bays, span } = PILOT_SET
	const inBay = (x, z) =>
		ROOMS.some(
			b =>
				Math.abs(z - b.z) <= bays.half - body &&
				b.side * x >= 0 &&
				b.side * x <= halfWidth + b.depth - body
		)
	const inSpan = (x, z) => z > span.from && z < span.to && Math.abs(x) <= span.reach
	const clear = (x, z) =>
		!blocks.some(
			([x0, x1, z0, z1]) => x > x0 - body && x < x1 + body && z > z0 - body && z < z1 + body
		)
	return (x, z) =>
		(Math.abs(x) <= CORRIDOR.walk.halfWidth || inBay(x, z) || inSpan(x, z)) && clear(x, z)
}

export async function addCorridor(scene) {
	addShell(scene)
	const props = await addProps(scene)
	const repair = addRepair(scene)
	const open = standable(props.blocks)
	// the walk's x is the shader corridor's, three's mirrored
	const box = {
		...CORRIDOR.walk,
		halfWidth: PILOT_SET.halfWidth + Math.max(...ROOMS.map(b => b.depth)),
		open: (x, z) => open(-x, z),
	}
	let arrivedAt = 0
	// walk: the shader corridor's, whose z is three's
	const tick = (dt, clock, walk) => {
		if (!arrivedAt && walk.z >= CORRIDOR.walk.arrive) arrivedAt = clock
		const near = ramp(walk.z, CORRIDOR.glowFrom, CORRIDOR.walk.arrive)
		tickCorridor({
			z: walk.z,
			clock,
			door: CORRIDOR.glowRest + (1 - CORRIDOR.glowRest) * near,
			lit: arrivedAt ? ramp(clock, arrivedAt, arrivedAt + CORRIDOR.lockersRise) : 0,
		})
		props.tick(dt, clock)
		repair(dt, clock)
	}
	return { tick, box }
}

// every model's own material lit by the corridor, once everything is in the scene
export const lightModels = scene =>
	scene.traverse(o => {
		if (o.isMesh) [o.material].flat().forEach(takeCorridorLight)
	})

export { sizeCorridor }
