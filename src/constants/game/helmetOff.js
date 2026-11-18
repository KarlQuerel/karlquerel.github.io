// A crewmate takes their helmet off, holds it at their side a while, then puts it back on (dev only, the ship lab:
// G starts it on whoever stands nearest). The body plays its idle and the Mixamo hold in HELMET_MOVES (Ely's
// skeleton, cut by claude-mixamo/bundle.mjs); the helmet follows the steps' anchors and both hands reach for its
// sides by IK as hard as `hands` says.

export const HELMET_MOVES = '/assets/game/models/HelmetMoves.glb'

// where the helmet's rim goes (its origin, the shell rising ~0.3 m above it): `worn` on the head; or `at` [x, y, z] m
// in the body's frame (x to its left, z ahead) from a bone (Mixamo name, no prefix) or, without one, from the feet,
// upright as worn on a level head but turned `tip` [x, y, z] rad
const WORN = 'worn'
const ABOVE = { from: 'Head', at: [0, 0.3, 0.04] }
const CHEST = { from: 'Spine2', at: [0, -0.06, 0.36], tip: [0.35, 0, 0] }
const RIGHT = { from: 'RightHand', at: [-0.04, -0.15, 0.06] }

export const HELMET_OFF = {
	keys: ['KeyG'],
	// G reaches a crewmate this near the player (m)
	reach: 4,
	// the head shows once the helmet is this far off its seat (m)
	clear: 0.05,
	// each wrist on a side of the helmet: [out, up, ahead] from its middle, in shares of its box (its shell at
	// out 0.5); each elbow bent toward [out, up, ahead] of its shoulder
	grip: [0.62, 0, 0],
	elbow: [0.8, -1, -0.3],
	// the bundle's clips, each played once from the step that names it (rest: the rig's own idle)
	clips: ['Carry'],
	// in order: `s` long, a clip started, the helmet carried to an anchor and the hands' grips [left, right]
	// eased to by its end
	steps: [
		{ s: 1, clip: 'rest' },
		// hands to its sides, lift it clear, bring it down in front of the chest
		{ s: 0.5, hands: [1, 1] },
		{ s: 0.6, helmet: ABOVE },
		{ s: 0.6, helmet: CHEST },
		// into the right hand, held at the side
		{ s: 0.6, clip: 'Carry', helmet: RIGHT, hands: [0, 0] },
		{ s: 2.4 },
		// both hands on it, up over the head and down onto it
		{ s: 0.6, clip: 'rest', helmet: CHEST, hands: [1, 1] },
		{ s: 0.7, helmet: ABOVE },
		{ s: 0.6, helmet: WORN },
		{ s: 0.5, hands: [0, 0] },
	],
}
