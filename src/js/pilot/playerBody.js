// The player's own body: the crew's model worn by the camera without its head, so looking down shows
// a whole body (chest, arms, legs, boots), its neck held just behind the eye; the crew's helmet stands in
// for the head on the shadow layer alone, so the player's shadow has one the camera never sees. It walks,
// runs, steps back and sideways as the keys move it, the clips blended by the way it goes, each at the
// body's speed over its own so the boots never skate.

import { AnimationMixer, Vector3 } from 'three'
import { PILOT_BODY, PILOT_SHADOW } from '../../constants/game/pilot.js'
import { WALK } from '../../constants/intro/walk.js'
import { approach } from '../math.js'
import { loadRigged, wearHelmet } from './models.js'

// each gait's share of the step: the way the body goes off the way it faces, split ahead, back, left
// and right (their squares sum to one), the side and ahead ones split again between walk and run
function shares(w, run) {
	const a = Math.atan2(w.side, w.ahead)
	const ahead = Math.max(0, Math.cos(a)) ** 2
	const left = Math.max(0, -Math.sin(a)) ** 2
	const right = Math.max(0, Math.sin(a)) ** 2
	return {
		walk: ahead * (1 - run),
		run: ahead * run,
		back: Math.max(0, -Math.cos(a)) ** 2,
		left: left * (1 - run),
		right: right * (1 - run),
		runLeft: left * run,
		runRight: right * run,
	}
}

export async function addPlayerBody(scene) {
	const { body, clips } = await loadRigged(PILOT_BODY)
	for (const part of await wearHelmet(body, PILOT_BODY.helmet))
		part.traverse(o => o.layers.set(PILOT_SHADOW.layer))
	const mixer = new AnimationMixer(body)
	const rest = mixer.clipAction(clips.Idle).play()
	const gaits = Object.entries(PILOT_BODY.gaits).map(([key, { clip, speed }]) => ({
		key,
		speed,
		action: mixer.clipAction(clips[clip]).play(),
	}))
	let neck
	body.traverse(o => {
		if (o.isBone && /Neck$/.test(o.name)) neck ??= o
	})
	const at = new Vector3()
	let run = 0
	scene.add(body)
	// w: the player's walk; the shader corridor's x runs the other way, as the camera's does
	const update = (dt, w) => {
		const x = -w.x + Math.sin(w.heading) * PILOT_BODY.back
		const z = w.z - Math.cos(w.heading) * PILOT_BODY.back
		body.position.set(x, 0, z)
		body.rotation.y = -w.heading
		run = approach(run, w.sprint ? 1 : 0, dt, PILOT_BODY.blendS)
		const moving = Math.min(1, w.pace / PILOT_BODY.walking)
		const speed = Math.max(w.pace * WALK.speed, PILOT_BODY.slowest)
		const share = shares(w, run)
		rest.setEffectiveWeight(1 - moving)
		for (const gait of gaits) {
			gait.action.setEffectiveWeight(moving * share[gait.key])
			gait.action.setEffectiveTimeScale(speed / gait.speed)
		}
		mixer.update(dt)
		// the neck held `back` behind the eye however a clip leans or sways, so no collar or shoulder
		// swings in front of the camera
		body.updateMatrixWorld()
		neck.getWorldPosition(at)
		body.position.x += x - at.x
		body.position.z += z - at.z
	}
	return { body, update }
}
