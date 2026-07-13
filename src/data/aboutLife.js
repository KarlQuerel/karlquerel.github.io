// Drives the LIFE tab of /about (AboutLife.vue). One line per paragraph.
// Copy is PLACEHOLDER on purpose — Karl writes the real lines himself.
export const ABOUT_ME = ['PLACEHOLDER']

// Transparent-cutout webp photos (public/assets/about/), shown on the dark panel.
export const DOGS = [
	{ name: 'Lesko', photo: '/assets/about/lesko.webp' },
	{ name: 'Yako', photo: '/assets/about/yako.webp' },
]

// `id` drives the accent colour ([data-section] in AboutLife.vue).
export const LIFE_SECTIONS = [
	{
		id: 'sports',
		title: 'SPORTS',
		lines: ['PLACEHOLDER'],
		link: { to: '/sport', label: 'SEE MY WEEKLY SPLIT' },
	},
	{
		id: 'music',
		title: 'MUSIC',
		lines: ['PLACEHOLDER'],
		tags: ['Hip-hop', 'Electronic', 'Rock', 'Lo-fi'],
	},
	{
		id: 'games',
		title: 'VIDEO GAMES',
		lines: ['PLACEHOLDER'],
		tags: ['RPGs', 'Roguelikes', 'Indie', 'Retro'],
	},
]
