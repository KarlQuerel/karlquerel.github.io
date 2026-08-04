// Drives the LIFE tab of /about (AboutLife.vue). One line per paragraph.
// All copy is placeholder for now — real text to be written card by card.
export const ABOUT_ME = [
	'Placeholder placeholder placeholder placeholder placeholder.',
	'Placeholder placeholder placeholder placeholder placeholder.',
]

// Intro copy shown above the dog photos on the DOGS card.
export const DOG_LINES = [
	'Placeholder placeholder placeholder placeholder placeholder.',
	'Placeholder placeholder placeholder placeholder placeholder.',
]

// Transparent-cutout webp photos (public/assets/about/), shown on the dark panel.
// Three per dog, first is the resting frame; clicking the deck cycles through them.
// `placeholder-slide-*` are temporary stand-ins to be replaced with real photos.
export const DOGS = [
	{
		name: 'Lesko',
		photos: [
			'/assets/about/lesko.webp',
			'/assets/about/placeholder-slide-1.webp',
			'/assets/about/placeholder-slide-2.webp',
		],
	},
	{
		name: 'Yako',
		photos: [
			'/assets/about/yako.webp',
			'/assets/about/placeholder-slide-3.webp',
			'/assets/about/placeholder-slide-2.webp',
		],
	},
]

// `id` drives the accent colour ([data-section] in AboutLife.vue).
export const LIFE_SECTIONS = [
	{
		id: 'sports',
		title: 'SPORTS',
		lines: [
			'Placeholder placeholder placeholder placeholder placeholder.',
			'Placeholder placeholder placeholder placeholder placeholder.',
		],
	},
	{
		id: 'finance',
		title: 'FINANCE',
		lines: [
			'Placeholder placeholder placeholder placeholder placeholder.',
			'Placeholder placeholder placeholder placeholder placeholder.',
		],
	},
	{
		id: 'music',
		title: 'MUSIC',
		lines: [
			'Placeholder placeholder placeholder placeholder placeholder.',
			'Placeholder placeholder placeholder placeholder placeholder.',
		],
	},
	{
		id: 'games',
		title: 'VIDEO GAMES',
		lines: [
			'Placeholder placeholder placeholder placeholder placeholder.',
			'Placeholder placeholder placeholder placeholder placeholder.',
		],
	},
]
