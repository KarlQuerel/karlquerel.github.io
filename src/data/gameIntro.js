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
	dam: 'A dry reservoir at dusk. Searchlights on the dam, a white flash on the horizon',
	waterLine: 'Ash falling on a line at a water truck, under one floodlight',
	window: 'A gloved hand wipes a frosted window: grey, nothing moves',
	launchPad: 'A salt-flat launch pad at night, a crowd at the fence. Liftoff',
}

export const INTRO_SKIP_HINT = 'ANY KEY TO SKIP'
