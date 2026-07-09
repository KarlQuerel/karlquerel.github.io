// Drives the /about page.

// `greeting` is the neutral header line; it swaps to the matching tab line once a
// path (work | life) is chosen. Keys match the tab ids in About.vue.
export const ABOUT_INTRO = {
	greeting: "Hello there, I'm Karl",
	work: 'Five years trading commodities taught me a lot. I still spend my days on a screen. I just build software now instead of moving gold and oil.',
	life: 'Off the clock, I swap the screen for the outdoors, usually with my dog Yako somewhere nearby.',
}

// Vertical career timeline — oldest first, newest last. Years are placeholders.
// `current: true` flags the milestone you're living now (gets the blinking node).
export const CAREER_TIMELINE = [
	{
		year: '2012',
		title: 'HEC Geneva',
		place: 'Geneva, CH',
		summary: 'Where it began — studying business and economics.',
	},
	{
		year: '2014',
		title: 'Grenoble École de Management',
		place: 'Grenoble, FR',
		summary: 'Sharpened the finance toolkit before going pro.',
	},
	{
		year: '2015',
		title: 'Commodity Broker',
		place: 'Finance',
		summary: 'Five years trading physical commodities and managing risk.',
	},
	{
		year: '2020',
		title: '42 Paris',
		place: 'Paris, FR',
		summary: 'Hard reset — retrained from scratch at the peer-to-peer coding school.',
	},
	{
		year: '2023',
		title: 'Software Developer · Zetra',
		place: 'Now',
		summary: 'Building software full-time.',
		current: true,
	},
	{
		year: '20XX',
		title: 'Next chapter…',
		place: 'TBD',
		summary: 'Placeholder — drop your next milestone here.',
	},
]
