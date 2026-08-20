// The only primary link while the rest of the site lives on the landing journey:
// everything else (work, life, contact) is a station you scroll to, not a page.
export const NAVBAR_LINKS = [{ to: '/game', label: 'Game' }]

// The landing journey's stations, in flight order. The rail tracks these and
// lets you jump between them. Deliberately separate from NAVBAR_LINKS: these
// are positions on one page, not routes, and trimming the nav must not empty
// the rail. Keep in step with the `stops` thresholds in HomeJourney.vue.
export const JOURNEY_STOPS = [
	{ to: '/#top', label: 'Home' },
	{ to: '/#work', label: 'Work' },
	{ to: '/#life', label: 'Life' },
	{ to: '/#contact', label: 'Contact' },
]
