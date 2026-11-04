// The player's own body: the crew's model worn by the camera without its head, so looking down shows
// a whole body (chest, arms, legs, boots), standing just behind the eye and walking as fast as the
// player does.

import { AnimationMixer } from 'three'
import { PILOT_BODY } from '../../constants/game/pilot.js'
import { WALK } from '../../constants/intro/walk.js'
import { dropSkin, loadRigged } from './models.js'

export async function addPlayerBody(scene) {
	const { body, clips } = await loadRigged(PILOT_BODY)
	dropSkin(body, PILOT_BODY.drop)
	const mixer = new AnimationMixer(body)
	const rest = mixer.clipAction(clips.Idle).play()
	const walking = mixer.clipAction(clips.Walk).play()
	scene.add(body)
	// w: the player's walk; the shader corridor's x runs the other way, as the camera's does
	return (dt, w) => {
		const sin = Math.sin(w.heading)
		const cos = Math.cos(w.heading)
		body.position.set(-w.x + sin * PILOT_BODY.back, 0, w.z - cos * PILOT_BODY.back)
		body.rotation.y = -w.heading
		const stride = Math.min(1, w.pace / PILOT_BODY.walking)
		walking.setEffectiveWeight(stride)
		rest.setEffectiveWeight(1 - stride)
		walking.setEffectiveTimeScale(Math.max(w.pace * WALK.speed, 0.3) / PILOT_BODY.walkSpeed)
		mixer.update(dt)
	}
}
