// HERMES-8's crew on departure day (SHIP_CREW): each at their post on their room's floor, idling till the player
// comes near, then turned to them, talking with their hands through their next line. One speaks at a time. G has
// the nearest who can take their helmet off and put it back on (HELMET_OFF), holding still while they do.

import { Group, PointLight } from 'three'
import { HELMET_OFF } from '../../constants/game/helmetOff.js'
import { paletteHex } from '../../constants/palette.js'
import {
	SHIP_CREW,
	SHIP_CREW_LAMP,
	SHIP_CREW_TALK,
	SHIP_HERMES,
} from '../../constants/game/shipCrew.js'
import { SHIP_LAYOUT } from '../../constants/game/shipLayout.js'
import { clipRig, face } from './crew.js'
import { helmetRoutine } from './helmetOff.js'
import { floorOf } from './shipInterior.js'

const ROOM = Object.fromEntries(SHIP_LAYOUT.rooms.map(room => [room.id, room]))
const middle = ([a, b]) => (a + b) / 2

export async function addShipCrew() {
	const { reach, foot } = SHIP_CREW_TALK
	const crew = await Promise.all(
		SHIP_CREW.map(async spec => {
			const room = ROOM[spec.room]
			const [x, z] = [middle(room.x) + spec.at[0], middle(room.z) + spec.at[1]]
			const rig = await clipRig(spec)
			rig.body.position.set(x, floorOf(room, z), z)
			const lines = spec.lines.map(src => Object.assign(new Audio(src), { preload: 'auto' }))
			const off = HELMET_OFF.clips.every(role => rig.can(role)) ? helmetRoutine(rig) : null
			// `due` a line till they have said one this visit
			return {
				spec,
				rig,
				body: rig.body,
				x,
				z,
				heading: spec.watch,
				due: true,
				next: 0,
				lines,
				off,
			}
		})
	)
	const group = new Group()
	group.add(...crew.map(npc => npc.body))
	const { color, intensity, distance, above } = SHIP_CREW_LAMP
	for (const npc of crew) {
		npc.lamp = new PointLight(paletteHex(color), intensity, distance)
		npc.lamp.position.y = npc.body.position.y + above
		group.add(npc.lamp)
	}
	const ship = {
		lines: SHIP_HERMES.lines.map(src => Object.assign(new Audio(src), { preload: 'auto' })),
		next: 0,
	}
	// the line playing and who says it (no one: Hermes)
	let speaking = null
	// G held, so one press starts one routine
	let taking = false

	function play(line, npc) {
		speaking = { npc, line }
		const done = () => {
			if (speaking?.line === line) speaking = null
		}
		line.currentTime = 0
		line.onended = done
		line.play().catch(done)
	}

	// a speaker's next line, round again after the last
	function next(voice) {
		const line = voice.lines[voice.next]
		voice.next = (voice.next + 1) % voice.lines.length
		return line
	}

	// the crewmate nearest the player who can take their helmet off, within reach
	function nearest(player) {
		const dist = npc => Math.hypot(player.x - npc.x, player.z - npc.z)
		const able = crew.filter(npc => npc.off && dist(npc) < HELMET_OFF.reach)
		return able.sort((a, b) => dist(a) - dist(b))[0]
	}

	function hush() {
		speaking?.line.pause()
		speaking = null
	}

	return {
		group,
		// where each stands, for the walk to keep clear of
		footprints: crew.map(({ x, z }) => ({ x: [x - foot, x + foot], z: [z - foot, z + foot] })),
		// `player` its x, z in the ship's frame, or null while outside; `keys` the codes held
		update(dt, player, keys) {
			// stepping out leaves the crew behind, not the ship
			if (!player && speaking?.npc) hush()
			const take = HELMET_OFF.keys.some(key => keys.has(key))
			if (take && !taking && player) nearest(player)?.off.start()
			taking = take
			for (const npc of crew) {
				const [dx, dz] = player ? [player.x - npc.x, player.z - npc.z] : [0, 0]
				const near = Boolean(player) && Math.hypot(dx, dz) < reach
				const busy = npc.off?.running()
				if (!near) npc.due = true
				else if (npc.due && !speaking && !busy) {
					npc.due = false
					play(next(npc), npc)
				}
				if (busy) npc.off.step(dt)
				else if (speaking?.npc === npc) npc.rig.play('talk')
				else npc.rig.idle(dt)
				if (!busy) face(npc, near ? Math.atan2(dx, dz) : npc.spec.watch, dt)
				npc.lamp.position.x = npc.x + Math.sin(npc.heading) * SHIP_CREW_LAMP.ahead
				npc.lamp.position.z = npc.z + Math.cos(npc.heading) * SHIP_CREW_LAMP.ahead
				npc.rig.update(dt)
				npc.off?.pose()
			}
		},
		// Hermes's next line, cutting in over whoever is talking
		hermes() {
			hush()
			play(next(ship), null)
		},
		hush,
	}
}
