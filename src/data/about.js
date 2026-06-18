/***	ABOUT DATA		***/
// Drives the /about page. Keep it short — edit the copy here.

export const ABOUT_INTRO = [
	'I am a former commodity broker turned software developer.',
	'After five years in finance, I retrained at 42 Paris and now build software at Zetra.',
]

// Vertical career timeline — oldest first, newest last.
// Years are placeholders: swap them for the real ones whenever you like.
// `current: true` flags the milestone you're living now (it gets the blinking node).
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
