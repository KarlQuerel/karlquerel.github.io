// Drives the LIFE tab of /about (AboutLife.vue). One entry per paragraph;
// a `\n` inside an entry breaks the line without opening a paragraph gap.
// Copy is still placeholder outside DOG_LINES, written card by card.
export const ABOUT_ME = [
	'Placeholder placeholder placeholder placeholder placeholder.',
	'Placeholder placeholder placeholder placeholder placeholder.',
]

// Intro copy shown above the dog photos on the DOGS card.
export const DOG_LINES = [
	'I always loved animals, especially dogs.\nI adopted my first one, Lesko, from the streets of Grenoble while I was still a student. He was aggressive towards other dogs, and it took us a full year of discipline and hard work to heal his traumas. I learned everything I know about dogs training him.\nTwo years later, in Lebanon, he ate rat poison and died shortly after. His sudden and brutal death shattered me… I was lost, confused and angry.',
	"Less than a week later, fate handed me baby Yako. He was three weeks old, not even weaned. I couldn't grasp the idea of adopting another dog, let alone be ready for it. But Yako taught me that life goes on, no matter what.",
	"For almost a decade now I've dog-sat in my free time, and Yako has seen a lot of dogs come through his home.",
	"To me, a home isn't a home without an animal. And dogs hold the values that speak to me most: loyalty, playfulness, and living in the present (alongside a bottomless stomach).",
]

// Photo decks (public/assets/about/) — 800×800 webp squares cropped around each dog.
// First photo is the resting frame; clicking the deck cycles through them.
// `years` sits under the name: a closed range for Lesko, open for Yako.
export const DOGS = [
	{
		name: 'Lesko',
		years: '2014 – 2017',
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
		years: '2017 – Today',
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
