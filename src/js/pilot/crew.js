// The pilot's crew: rigged glTF characters, each scaled to its height and driven by a small behaviour,
// a patrol down the deck or a greeting when the player comes near.

import { AnimationMixer, Box3, LoopOnce, LoopRepeat, Vector3 } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { dressSuit } from './suit.js'
import { PILOT_CREW, PILOT_FADE_S, PILOT_TURN_RATE } from '../../constants/game/pilot.js'

const loader = new GLTFLoader()

// the shortest way round from one heading to another
const turnToward = (from, to, rate) => {
	const d = Math.atan2(Math.sin(to - from), Math.cos(to - from))
	return from + Math.sign(d) * Math.min(Math.abs(d), rate)
}

async function load(spec) {
	const gltf = await loader.loadAsync(spec.url)
	const body = gltf.scene
	const size = new Box3().setFromObject(body).getSize(new Vector3())
	body.scale.setScalar(spec.height / size.y)
	if (spec.suit) dressSuit(body)
	const mixer = new AnimationMixer(body)
	const actions = Object.fromEntries(
		Object.entries(spec.clips).map(([role, name]) => [
			role,
			mixer.clipAction(gltf.animations.find(clip => clip.name === name)),
		])
	)
	return { spec, body, mixer, actions, playing: null, heading: 0 }
}

function play(npc, role, once = false) {
	const next = npc.actions[role]
	if (npc.playing === next) return
	next.reset()
		.setLoop(once ? LoopOnce : LoopRepeat, once ? 1 : Infinity)
		.play()
	if (npc.playing) next.crossFadeFrom(npc.playing, PILOT_FADE_S, true)
	npc.playing = next
}

// face a heading (0 = down +z), the model's own front allowed for
function face(npc, heading, dt) {
	npc.heading = turnToward(npc.heading, heading, PILOT_TURN_RATE * dt)
	npc.body.rotation.y = npc.heading + npc.spec.facing
}

function patrol(npc, dt) {
	const { from, to, speed, restS } = npc.spec.patrol
	const s = (npc.state ??= { z: from, dir: 1, rest: 0 })
	if (s.rest > 0) {
		s.rest -= dt
		play(npc, 'rest')
		if (s.rest <= 0) s.dir = -s.dir
	} else {
		play(npc, 'walk')
		s.z += s.dir * speed * dt
		if (s.z > to || s.z < from) {
			s.z = Math.min(to, Math.max(from, s.z))
			s.rest = restS
		}
	}
	npc.body.position.set(npc.spec.patrol.x, 0, s.z)
	face(npc, s.dir > 0 ? 0 : Math.PI, dt)
}

// idles facing the player; a wave once each time they come within reach
function greet(npc, dt, player) {
	const { x, z, reach } = npc.spec.greet
	const s = (npc.state ??= { near: false })
	npc.body.position.set(x, 0, z)
	const dx = player.x - x
	const dz = player.z - z
	const near = Math.hypot(dx, dz) < reach
	if (near && !s.near && npc.actions.react) play(npc, 'react', true)
	if (npc.playing === npc.actions.react && !npc.playing.isRunning()) play(npc, 'rest')
	if (!npc.playing) play(npc, 'rest')
	s.near = near
	face(npc, Math.atan2(dx, dz), dt)
}

export async function addCrew(scene, onLoaded) {
	let loaded = 0
	const crew = await Promise.all(
		PILOT_CREW.map(spec =>
			load(spec).then(npc => {
				onLoaded(++loaded / PILOT_CREW.length)
				return npc
			})
		)
	)
	for (const npc of crew) scene.add(npc.body)
	return (dt, player) => {
		for (const npc of crew) {
			if (npc.spec.patrol) patrol(npc, dt)
			else greet(npc, dt, player)
			npc.mixer.update(dt)
		}
	}
}
