// The point-and-click scene graph: each scene is a location, a few beats of
// text, and the choices leading onward. `to` targets another scene id; `route`
// leaves the game for a site path. Art per scene comes later — the stage
// renders the location label until then.

export const START_SCENE = 'wake'

export const GAME_SCENES = {
	wake: {
		location: 'CRYO BAY 01',
		text: [
			'Impact. Then silence — almost. A klaxon still cries somewhere deep in the wreck.',
			'Your pod is cracked open. The cold air tastes of smoke and ozone.',
		],
		options: [
			{ label: 'Pull yourself out of the pod', to: 'bay' },
			{ label: 'Check the pod diagnostics', to: 'diagnostics' },
		],
	},
	diagnostics: {
		location: 'CRYO BAY 01 - POD CONSOLE',
		text: [
			'The cracked screen flickers: SLEEP DURATION 141,209 DAYS. REVIVAL: EMERGENCY.',
			'Below, in steady red letters: CRASH SITE - KEPLER-442B. CREW REMAINING: 1.',
		],
		options: [{ label: 'Climb out of the pod', to: 'bay' }],
	},
	bay: {
		location: 'CRYO BAY 01',
		text: [
			'Emergency light paints the bay in slow red pulses. The floor lists hard to port.',
			'The main corridor is buried under a collapsed bulkhead. A supply locker hangs open beside it.',
		],
		options: [
			{ label: 'Search the supply locker', to: 'locker' },
			{ label: 'Squeeze past the bulkhead', to: 'corridor' },
		],
	},
	locker: {
		location: 'SUPPLY LOCKER',
		text: [
			'An emergency beacon, dead. A flare pistol, one flare. A ration bar that expired eight centuries ago.',
			'You take what might matter.',
		],
		options: [{ label: 'Head for the corridor', to: 'corridor' }],
	},
	corridor: {
		location: 'MAIN CORRIDOR',
		text: [
			'Halfway down, the hull is torn open. Through the gash: violet sky, two moons, black grass bending in the wind.',
			'The bridge door at the far end stands ajar, its console still blinking.',
		],
		options: [
			{ label: 'Continue to the bridge', to: 'bridge' },
			{ label: 'Step out through the breach', to: 'breach' },
		],
	},
	breach: {
		location: 'HULL BREACH',
		text: [
			'You lean into the alien wind. It is cold, and it smells of rain that never fell on Earth.',
			'Something far off answers the klaxon — a long, low note. Not an echo.',
		],
		options: [{ label: 'Back inside. The bridge first.', to: 'bridge' }],
	},
	bridge: {
		location: 'BRIDGE',
		text: [
			'The canopy is shattered. The nav array is scrap. But one console still breathes.',
			'On its screen, a single line repeats: SIGNAL DETECTED - SOURCE: SURFACE.',
		],
		options: [{ label: 'Trace the signal', to: 'end' }],
	},
	end: {
		location: 'TO BE CONTINUED',
		text: [
			'The signal is real. Something on this world is transmitting.',
			'This is as far as the wreck goes — for now. The surface comes next.',
		],
		options: [
			{ label: 'Start over', to: START_SCENE },
			{ label: 'Back to reality', route: '/' },
		],
	},
}
