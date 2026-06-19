/***	ABOUT DATA		***/
// Drives the /about page. Keep it short — edit the copy here.

export const ABOUT_INTRO = [
	'I am a former commodity broker turned software developer.',
	'After five years in finance, I retrained at 42 Paris and now build software at Zetra.',
]

// Pixel-art scenery sprites (CC0, see public/assets/about/CREDITS.txt).
// `w` is the on-screen width in px — height follows the sprite's aspect ratio.
export const SCENERY_SPRITES = {
	tree: { src: '/assets/about/tree.png', w: 60 },
	bush: { src: '/assets/about/bush.png', w: 54 },
	rock: { src: '/assets/about/rock.png', w: 38 },
	boulder: { src: '/assets/about/boulder.png', w: 54 },
	pond: { src: '/assets/about/pond.png', w: 84 },
}

// Vertical career timeline — oldest first, newest last.
// Years are placeholders: swap them for the real ones whenever you like.
// `current: true` flags the milestone you're living now (it gets the blinking node).
// `scenery` places RPG props in the grassland beside the path; they pop in on scroll.
//   side: which gutter ('left' | 'right'), top: vertical spot within the row.
export const CAREER_TIMELINE = [
	{
		year: '2012',
		title: 'HEC Geneva',
		place: 'Geneva, CH',
		summary: 'Where it began — studying business and economics.',
		scenery: [
			{ key: 'tree', side: 'left', top: '4%' },
			{ key: 'bush', side: 'right', top: '58%' },
		],
	},
	{
		year: '2014',
		title: 'Grenoble École de Management',
		place: 'Grenoble, FR',
		summary: 'Sharpened the finance toolkit before going pro.',
		scenery: [
			{ key: 'rock', side: 'left', top: '34%' },
			{ key: 'tree', side: 'right', top: '6%' },
		],
	},
	{
		year: '2015',
		title: 'Commodity Broker',
		place: 'Finance',
		summary: 'Five years trading physical commodities and managing risk.',
		scenery: [
			{ key: 'bush', side: 'left', top: '20%' },
			{ key: 'boulder', side: 'right', top: '42%' },
		],
	},
	{
		year: '2020',
		title: '42 Paris',
		place: 'Paris, FR',
		summary: 'Hard reset — retrained from scratch at the peer-to-peer coding school.',
		scenery: [
			{ key: 'pond', side: 'left', top: '20%' },
			{ key: 'tree', side: 'right', top: '52%' },
		],
	},
	{
		year: '2023',
		title: 'Software Developer · Zetra',
		place: 'Now',
		summary: 'Building software full-time.',
		current: true,
		scenery: [
			{ key: 'bush', side: 'left', top: '12%' },
			{ key: 'rock', side: 'right', top: '56%' },
		],
	},
	{
		year: '20XX',
		title: 'Next chapter…',
		place: 'TBD',
		summary: 'Placeholder — drop your next milestone here.',
		scenery: [
			{ key: 'tree', side: 'left', top: '16%' },
			{ key: 'boulder', side: 'right', top: '30%' },
		],
	},
]
