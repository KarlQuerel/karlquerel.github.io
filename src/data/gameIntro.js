// The game's words on screen.

// Under a walked scene until the player first moves.
export const INTRO_WALK_HINT = 'WASD TO MOVE, CLICK TO LOOK AROUND'

// The intro's cards, each held across its shots (INTRO.shots), typed in with its `accent` lit.
export const INTRO_CARDS = [
	{ lead: '', accent: '2137.' },
	{ lead: 'The water war went', accent: 'nuclear.' },
	{ lead: 'Famine and nuclear winter', accent: 'followed.' },
	{ lead: 'Earth can no longer', accent: 'keep us.' },
	{ lead: 'The survivors made peace, and spent what was left on', accent: 'leaving.' },
	{ lead: 'The Hermes Project: ten ships, ten worlds that might', accent: 'keep us.' },
	{ lead: 'You fly', accent: 'HERMES-8.' },
]

// The intro's shots still to build, named on black where they will go.
export const INTRO_SLATES = {
	waterLine: 'Ash falling on a line at a water truck, under one floodlight',
	window: 'A gloved hand wipes a frosted window: grey, nothing moves',
	launchPad: 'A salt-flat launch pad at night, a crowd at the fence. Liftoff',
	hermes8: 'HERMES-8 alone in orbit over the Earth, its lights on',
}

export const INTRO_SKIP_HINT = 'ANY KEY TO SKIP'

// The game's loader (GameBoot): HERMES-8 running its checks, each [system, reading] filled in as its share of
// the boot lands, by the screen that is loading; then the sync bar.
export const GAME_BOOT = {
	head: 'HERMES-8 // SHIP SYSTEMS',
	sync: 'SYNC',
	checks: {
		title: [
			['CORE', 'ONLINE'],
			['MEMORY', '4.71 PB'],
			['CRYO BAY', '5 PODS'],
			['HULL', '97.3%'],
		],
		intro: [
			['EARTH ARCHIVE', 'OPEN'],
			['RECORDS', '41,862'],
			['WAR FOOTAGE', '3,419 H'],
			['SIGNAL', 'CLEAN'],
		],
		ship: [
			['DECK 2', 'PRESSURISED'],
			['CREW', '5 OF 5'],
			['CABIN 4', 'OCCUPIED'],
			['DEPARTURE', 'T-06:41:09'],
		],
		pilot: [
			['STATION', 'DOCKED'],
			['CORRIDOR', 'LIT'],
			['CREW', 'ON DUTY'],
			['AIR', '20.9% O2'],
		],
	},
}
