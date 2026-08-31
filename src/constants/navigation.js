// The landing journey's stations, in flight order. The rail tracks these and
// lets you jump between them. These are positions on one page, not routes.
// Keep in step with the `stops` thresholds in HomeJourney.vue.
export const JOURNEY_STOPS = [
	{ to: '/#top', label: 'Home' },
	{ to: '/#work', label: 'Work' },
	{ to: '/#life', label: 'Life' },
	{ to: '/#contact', label: 'Contact' },
]

// The GAME chip riding the journey chrome, one rung under the way-out chip.
export const GAME_LINK = { to: '/game', label: 'Game' }

// The one-chip way home on the chromeless pages (terminal, 404, the game's
// holding screen) — there is no navbar, and a page reached by link needs a door.
export const HOME_LINK = { to: '/', label: 'Home' }
