// HERMES-8's rooms dressed with props (SHIP_PROPS): each placed in its room on the floor, and the footprint it
// leaves on the deck, for the walk to keep clear of.

import { Box3, Group } from 'three'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { SHIP_PROP_MODELS, SHIP_PROPS } from '../../constants/game/shipProps.js'
import { loadProp } from './models.js'
import { floorOf } from './shipInterior.js'

const ROOM = Object.fromEntries(SHIP_LAYOUT.rooms.map(room => [room.id, room]))
const middle = ([a, b]) => (a + b) / 2

// the props, placed, and each one's footprint: its x and z extents
export async function placeProps() {
	const props = new Group()
	const models = await Promise.all(
		SHIP_PROPS.map(p => loadProp({ url: SHIP_PROP_MODELS[p.model] }))
	)
	const footprints = SHIP_PROPS.map((p, i) => {
		const room = ROOM[p.room]
		const [x, z] = [middle(room.x) + p.at[0], middle(room.z) + p.at[1]]
		const prop = models[i]
		prop.position.set(x, floorOf(room, z), z)
		prop.rotation.y = p.turn ?? 0
		props.add(prop)
		const { min, max } = new Box3().setFromObject(prop)
		return { x: [min.x, max.x], z: [min.z, max.z] }
	})
	return { props, footprints }
}

// whether a body `r` m round at x, z stands on any footprint
export const onProp = (footprints, x, z, r) =>
	footprints.some(f => x > f.x[0] - r && x < f.x[1] + r && z > f.z[0] - r && z < f.z[1] + r)
