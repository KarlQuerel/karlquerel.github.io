// The game's one state: the three meters, what the envoy carries and knows, and the truth about the
// world. The shots read and write it through io.game; the wreck resets it when act I opens.

import { PLAY } from '../../constants/game/play.js'
import { clamp } from '../math.js'

export function createGame() {
	const g = {
		o2: 0,
		hull: 0,
		signal: 0,
		items: new Set(),
		flags: new Set(),
		// whether the world is green, and which test gives it away if it is not
		green: true,
		fails: '',
		// what the envoy has found out, test by test: true, false, or undefined until tried
		found: {},
		reset() {
			Object.assign(g, PLAY.start)
			g.items.clear()
			g.flags.clear()
			g.found = {}
			g.green = Math.random() < PLAY.greenOdds
			g.fails = PLAY.tests[Math.floor(Math.random() * PLAY.tests.length)]
			// on the dev server `?green=1|0` fixes the world's truth, for driving a run headless
			if (import.meta.env.DEV) {
				const q = new URLSearchParams(window.location.search)
				if (q.has('green')) g.green = q.get('green') !== '0'
			}
		},
		spend(meter, amount) {
			g[meter] = clamp(g[meter] - amount, 0, 100)
		},
		gain(meter, amount) {
			g.spend(meter, -amount)
		},
		has: item => g.items.has(item),
		take: item => g.items.add(item),
		is: flag => g.flags.has(flag),
		set: flag => g.flags.add(flag),
		// what a test finds: the truth, or the one failing sign of a world that is not green
		test(name) {
			g.found[name] = g.green || g.fails !== name
			return g.found[name]
		},
		// every test tried and passed
		confirmed: () => PLAY.tests.every(t => g.found[t] === true),
		// the meters as the shaders take them, with the wrist readout's lift
		uniform: wrist => [g.o2, g.hull, g.signal, wrist],
		// the run as plain data, for a checkpoint, and back
		snapshot: () => ({
			o2: g.o2,
			hull: g.hull,
			signal: g.signal,
			items: [...g.items],
			flags: [...g.flags],
			green: g.green,
			fails: g.fails,
			found: { ...g.found },
		}),
		restore(s) {
			Object.assign(g, {
				o2: s.o2,
				hull: s.hull,
				signal: s.signal,
				green: s.green,
				fails: s.fails,
			})
			g.items = new Set(s.items)
			g.flags = new Set(s.flags)
			g.found = { ...s.found }
		},
	}
	g.reset()
	return g
}
