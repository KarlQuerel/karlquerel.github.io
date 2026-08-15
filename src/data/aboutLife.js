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

// Photo decks (public/assets/about/) — 800×800 webp squares cropped around each dog.
// First photo is the resting frame; clicking the deck cycles through them.
export const DOGS = [
	{
		name: 'Lesko',
		photos: [
			'/assets/about/L1.webp',
			'/assets/about/L2.webp',
			'/assets/about/L3.webp',
			'/assets/about/L4.webp',
			'/assets/about/L5.webp',
		],
	},
	{
		name: 'Yako',
		photos: [
			'/assets/about/Y1.webp',
			'/assets/about/Y2.webp',
			'/assets/about/Y3.webp',
			'/assets/about/Y4.webp',
			'/assets/about/Y5.webp',
			'/assets/about/Y6.webp',
			'/assets/about/Y7.webp',
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
