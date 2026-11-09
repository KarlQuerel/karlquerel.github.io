// A turn on the spot played by the body instead of its hips: the hips' yaw over the clip comes out of
// their tracks and back as a curve the body follows, so the turn blends in and out like any other clip
// and the body ends up facing where the clip left it.

import { NumberKeyframeTrack, Quaternion, Vector3 } from 'three'

const wrap = a => Math.atan2(Math.sin(a), Math.cos(a))

// clip: a turn borrowed onto `body`'s rig. Returns the clip without the hips' yaw, and `yaw(t)`, how far
// the body has turned at clip time t (rad, left positive, as three's rotation.y)
export function liftTurn(clip, body) {
	let hips
	body.traverse(o => {
		if (o.isBone && /Hips$/.test(o.name)) hips ??= o
	})
	body.updateMatrixWorld(true)
	// up, in the frame the hips' tracks are written in
	const up = new Vector3(0, 1, 0).applyQuaternion(
		hips.parent.getWorldQuaternion(new Quaternion()).invert()
	)
	const lifted = clip.clone()
	const track = property => lifted.tracks.find(t => t.name === `${hips.name}.${property}`)
	const turn = track('quaternion')
	// a copy: a cloned track can share its source's arrays
	const v = (turn.values = turn.values.slice())
	const q = new Quaternion()
	const undo = new Quaternion()
	const angles = []
	for (let i = 0; i < v.length; i += 4) {
		// the twist about up, kept continuous from key to key
		const twist = 2 * Math.atan2(v[i] * up.x + v[i + 1] * up.y + v[i + 2] * up.z, v[i + 3])
		const prev = angles.at(-1)
		angles.push(prev === undefined ? twist : prev + wrap(twist - prev))
	}
	const start = angles[0]
	angles.forEach((a, k) => {
		undo.setFromAxisAngle(up, start - a)
		q.fromArray(v, k * 4)
			.premultiply(undo)
			.toArray(v, k * 4)
	})
	const yaw = new NumberKeyframeTrack(
		'.yaw',
		turn.times,
		angles.map(a => a - start)
	)
	const curve = yaw.createInterpolant()
	const at = t => curve.evaluate(t)[0]
	// the hips swing round with the body, so their travel is undone about up as well
	const travel = track('position')
	if (travel) {
		const p = (travel.values = travel.values.slice())
		const point = new Vector3()
		for (let k = 0; k < travel.times.length; k++) {
			undo.setFromAxisAngle(up, -at(travel.times[k]))
			point
				.fromArray(p, k * 3)
				.applyQuaternion(undo)
				.toArray(p, k * 3)
		}
	}
	return { clip: lifted, yaw: at }
}
