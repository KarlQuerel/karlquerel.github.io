// HERMES-8's crew on departure day (dev only, the ship lab): one per room, each in their role's suit, standing `at`
// [x, z] m from their room's middle and facing `watch` (rad about up, 0 toward the nose) till the player comes
// within `reach` m. Then they turn to the player and say their next line over the helmet radio, playing `talk`
// while it lasts; once each time the player comes near, one speaker at a time. The walk keeps `foot` m clear of
// where each one stands.
// The voices are ElevenLabs eleven_v4 helmet takes of draft lines (claude-voice/emotions.py), Elena's a stand-in
// until her older voice is cast: local only (.git/info/exclude) until the lines are final.

import { HELMET_MOVES, HELMET_OFF } from './helmetOff.js'
import { PILOT_RIGS } from './pilot.js'

const { astra, ely, vanguard, helmet, locomotion } = PILOT_RIGS
const QUARTER = Math.PI / 2
// the helmet routine's clips (HELMET_OFF), borrowed by those with a face under the helmet: not the captain, whose
// suit has only a hood under it
const HELMET_OFF_CLIPS = Object.fromEntries(HELMET_OFF.clips.map(name => [name, name]))
const voice = (who, count = 3) =>
	Array.from({ length: count }, (_, i) => `/assets/game/voices/${who}-${i + 1}.mp3`)

export const SHIP_CREW_TALK = { reach: 2.6, foot: 0.35 }
// Hermes, the ship, through the suit wherever the player is: each press of `keys` says its next line, over whoever
// is talking. Its chosen voice (Kokoro Heart, ship + sweep) by claude-voice/hermes_game.py: three departure-day
// lines, two from the wake, the three it was chosen on
export const SHIP_HERMES = { keys: ['KeyH'], lines: voice('hermes', 8) }
// a light on each of them, so their suits read indoors (the ship lab lights only from outside): `above` their floor
// and `ahead` of them the way they face, reaching `distance` m, short of the walls
export const SHIP_CREW_LAMP = { color: 'star', intensity: 2.2, distance: 1.7, above: 1.1, ahead: 1 }

export const SHIP_CREW = [
	// the captain in ops, facing the door in from the mess: the soldier's stance, Ely's talk borrowed
	{
		...vanguard,
		clipsFrom: [locomotion, ely.url],
		borrow: ['Guard', 'NeckStretch', 'LookAbout', 'Talk'],
		clips: { rest: 'Guard', talk: 'Talk' },
		room: 'ops',
		at: [1.3, 0.6],
		watch: Math.PI,
		lines: voice('henrik'),
	},
	// the medic by her instrument trolley, facing the door in from the cryo bay
	{
		...astra,
		panels: 'cream',
		helmet,
		clipsFrom: HELMET_MOVES,
		clips: { rest: 'Idle', talk: 'Talk', ...HELMET_OFF_CLIPS },
		fidgets: ['Idle2'],
		room: 'med',
		at: [0.4, -1.6],
		watch: -QUARTER,
		lines: voice('elena'),
	},
	// the engineer among the suits in the dock, facing the door in from the flank hall
	{
		...ely,
		panels: 'brass',
		helmet,
		clipsFrom: HELMET_MOVES,
		clips: { rest: 'Idle', talk: 'Talk', ...HELMET_OFF_CLIPS },
		fidgets: ['Idle2'],
		room: 'dock',
		at: [0.8, -1.2],
		watch: -0.4,
		lines: voice('ekko'),
	},
	// the scientist in the mess, under the canopy's glass, facing the way in from the cryo bay
	{
		...astra,
		panels: 'rime',
		helmet,
		clipsFrom: HELMET_MOVES,
		clips: { rest: 'Idle', talk: 'Talk', ...HELMET_OFF_CLIPS },
		fidgets: ['Idle2'],
		room: 'mess',
		at: [1.2, 1.6],
		watch: Math.PI,
		lines: voice('noor'),
	},
]
