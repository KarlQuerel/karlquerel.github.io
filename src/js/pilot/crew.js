// The pilot's crew: rigged glTF characters, helmeted when their spec says so, each driven by a small
// behaviour, a patrol down the deck or a greeting when the player comes near, playing its clips by role.

import { AnimationMixer, LoopOnce, LoopRepeat } from 'three'
import { loadRigged, wearHelmet } from './models.js'
import { approach, clamp } from '../math.js'
import {
	PILOT_CREW,
	PILOT_FADE_S,
	PILOT_PATROL,
	PILOT_TURN_RATE,
} from '../../constants/game/pilot.js'

// the shortest way round from one heading to another
const turnToward = (from, to, rate) => {
	const d = Math.atan2(Math.sin(to - from), Math.cos(to - from))
	return from + Math.sign(d) * Math.min(Math.abs(d), rate)
}

// a rigged model playing its clips by role; a walk plays as fast as the body moves
async function clipRig(spec) {
	const { body, clips } = await loadRigged(spec)
	if (spec.helmet) await wearHelmet(body, spec.helmet)
	const mixer = new AnimationMixer(body)
	const actions = Object.fromEntries(
		Object.entries(spec.clips).map(([role, name]) => [role, mixer.clipAction(clips[name])])
	)
	let playing = null
	return {
		body,
		can: role => role in actions,
		play(role, once = false) {
			const next = actions[role]
			if (playing === next) return
			next.reset()
				.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity)
				.play()
			if (playing) next.crossFadeFrom(playing, PILOT_FADE_S, true)
			playing = next
		},
		// a clip played once is still running
		busy: () => playing?.loop === LoopOnce && playing.isRunning(),
		pace(speed) {
			if (spec.walkSpeed) actions.walk.timeScale = speed / spec.walkSpeed
		},
		update: dt => mixer.update(dt),
	}
}

// face a heading (0 = down +z), the model's own front allowed for
function face(npc, heading, dt) {
	npc.heading = turnToward(npc.heading, heading, PILOT_TURN_RATE * dt)
	npc.body.rotation.y = npc.heading + npc.spec.facing
}

// down the deck and back, easing off into each end and turning round there for a rest
function patrol(npc, dt) {
	const { x, from, to, speed, restS } = npc.spec.patrol
	const s = (npc.state ??= { z: from, dir: 1, rest: 0, v: 0 })
	const left = s.dir > 0 ? to - s.z : s.z - from
	const want = s.rest > 0 ? 0 : speed * clamp(left / PILOT_PATROL.brake, PILOT_PATROL.creep, 1)
	s.v = approach(s.v, want, dt, PILOT_PATROL.easeS)
	if (s.rest > 0) s.rest -= dt
	else if (left <= 0) {
		s.rest = restS
		s.dir = -s.dir
		s.v = 0
	}
	s.z = clamp(s.z + s.dir * s.v * dt, from, to)
	npc.rig.play(s.v > PILOT_PATROL.walking ? 'walk' : 'rest')
	npc.rig.pace(s.v)
	npc.body.position.set(x, 0, s.z)
	face(npc, s.dir > 0 ? 0 : Math.PI, dt)
}

// idles facing the player; reacts (a wave, a word) once each time they come within reach
function greet(npc, dt, player) {
	const { x, z, reach } = npc.spec.greet
	const s = (npc.state ??= { near: false })
	npc.body.position.set(x, 0, z)
	const dx = player.x - x
	const dz = player.z - z
	const near = Math.hypot(dx, dz) < reach
	if (near && !s.near && npc.rig.can('react')) npc.rig.play('react', true)
	if (!npc.rig.busy()) npc.rig.play('rest')
	s.near = near
	face(npc, Math.atan2(dx, dz), dt)
}

export async function addCrew(scene, onLoaded) {
	let loaded = 0
	const crew = await Promise.all(
		PILOT_CREW.map(async spec => {
			const rig = await clipRig(spec)
			onLoaded(++loaded / PILOT_CREW.length)
			return { spec, rig, body: rig.body, heading: 0, state: null }
		})
	)
	for (const npc of crew) scene.add(npc.body)
	return (dt, player) => {
		for (const npc of crew) {
			if (npc.spec.patrol) patrol(npc, dt)
			else greet(npc, dt, player)
			npc.rig.update(dt)
		}
	}
}
