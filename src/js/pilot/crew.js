// The pilot's crew: rigged glTF characters, helmeted when their spec says so, each driven by a small
// behaviour, a patrol down the deck, a greeting when the player comes near or a guard at its post,
// playing its clips by role and, standing about, a fidget now and then.

import { AnimationMixer, LoopOnce, LoopRepeat } from 'three'
import { liftTurn } from './liftTurn.js'
import { loadRigged, wearHelmet } from './models.js'
import { clamp, randIn } from '../math.js'
import {
	PILOT_CREW,
	PILOT_FADE_S,
	PILOT_IDLE,
	PILOT_PATROL,
	PILOT_TURN_RATE,
} from '../../constants/game/pilot.js'

// the shortest way round from one heading to another
const turnToward = (from, to, rate) => {
	const d = Math.atan2(Math.sin(to - from), Math.cos(to - from))
	return from + Math.sign(d) * Math.min(Math.abs(d), rate)
}

// a rigged model playing its clips by role; a walk plays as fast as the body moves, its stride as long
// as the body is tall; a turn (any role named turn…) hands its yaw to the body; the first clip starts
// anywhere in its cycle so no two crew move in step
async function clipRig(spec) {
	const { body, clips } = await loadRigged(spec)
	if (spec.helmet) await wearHelmet(body, spec.helmet)
	const mixer = new AnimationMixer(body)
	const turns = new Map()
	const actions = Object.fromEntries(
		Object.entries(spec.clips).map(([role, name]) => {
			if (!role.startsWith('turn')) return [role, mixer.clipAction(clips[name])]
			const turn = liftTurn(clips[name], body)
			const action = mixer.clipAction(turn.clip)
			turns.set(action, turn)
			return [role, action]
		})
	)
	const fidgets = (spec.fidgets ?? []).map(name => mixer.clipAction(clips[name]))
	let playing = null
	let calm = randIn(PILOT_IDLE.everyS)
	function start(next, once) {
		if (playing === next) return
		next.reset()
			.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity)
			.play()
		// a clip played once holds its last pose while the next fades in
		next.clampWhenFinished = once
		if (playing) next.crossFadeFrom(playing, PILOT_FADE_S, true)
		else next.time = Math.random() * next.getClip().duration
		playing = next
	}
	// a clip played once is still running
	const busy = () => playing?.loop === LoopOnce && playing.isRunning()
	return {
		body,
		busy,
		can: role => role in actions,
		play: (role, once = false) => start(actions[role], once),
		// standing about: the rest clip, and after a calm spell of it a fidget played once
		idle(dt) {
			if (busy()) return
			calm -= dt
			if (calm > 0 || !fidgets.length) return start(actions.rest, false)
			calm = randIn(PILOT_IDLE.everyS)
			start(fidgets[Math.floor(Math.random() * fidgets.length)], true)
		},
		// how far the playing turn has turned the body (rad)
		yaw: () => turns.get(playing)?.yaw(playing.time) ?? 0,
		pace(speed) {
			if (spec.walkSpeed)
				actions.walk.timeScale = speed / (spec.walkSpeed * (spec.scale ?? 1))
		},
		update: dt => mixer.update(dt),
	}
}

// face a heading (0 = down +z), the model's own front and any turn under way allowed for
function face(npc, heading, dt) {
	npc.heading = turnToward(npc.heading, heading, PILOT_TURN_RATE * dt)
	npc.body.rotation.y = npc.heading + npc.spec.facing + npc.rig.yaw()
}

// down the deck and back: up to pace, braked to a stop on each end mark, a rest there, then a turn on
// the spot toward the middle of the deck before setting off the other way
function patrol(npc, dt) {
	const { x, from, to, speed, restS } = npc.spec.patrol
	const { accel, walking } = PILOT_PATROL
	const s = (npc.state ??= { z: from, dir: 1, v: 0, phase: 'walk', rest: 0 })
	const left = s.dir > 0 ? to - s.z : s.z - from
	if (s.phase === 'walk' && left <= 0) {
		s.phase = 'rest'
		s.rest = restS
	} else if (s.phase === 'rest' && (s.rest -= dt) <= 0) {
		s.phase = 'turn'
		// a left turn swings the front from +z through +x
		npc.rig.play(s.dir * x < 0 ? 'turnLeft' : 'turnRight', true)
	} else if (s.phase === 'turn' && !npc.rig.busy()) {
		// the body keeps the facing the turn left it with
		npc.heading += npc.rig.yaw()
		s.phase = 'walk'
		s.dir = -s.dir
	}
	const walk = s.phase === 'walk'
	s.v = walk ? Math.min(speed, s.v + accel * dt, Math.sqrt(2 * accel * Math.max(0, left))) : 0
	s.z = clamp(s.z + s.dir * s.v * dt, from, to)
	if (s.v > walking) npc.rig.play('walk')
	else if (s.phase !== 'turn') npc.rig.idle(dt)
	npc.rig.pace(s.v)
	npc.body.position.set(x, 0, s.z)
	face(npc, walk ? (s.dir > 0 ? 0 : Math.PI) : npc.heading, dt)
}

// stands its post, never turning
function guard(npc, dt) {
	const { x, z, heading } = npc.spec.guard
	npc.body.position.set(x, 0, z)
	npc.body.rotation.y = heading + npc.spec.facing
	npc.rig.idle(dt)
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
	npc.rig.idle(dt)
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
			else if (npc.spec.guard) guard(npc, dt)
			else greet(npc, dt, player)
			npc.rig.update(dt)
		}
	}
}
