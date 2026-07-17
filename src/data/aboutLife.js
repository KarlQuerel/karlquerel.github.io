// Drives the LIFE tab of /about (AboutLife.vue). One line per paragraph.
export const ABOUT_ME = [
	'I come from a multicultural background — born in France, raised by a Lebanese mother. I spent my teenage years in Lebanon, then left at 17 for Geneva to study and explore the world.',
	"I've been moving around Europe ever since, switching cities, teams and languages along the way. Sliding between French, English and Arabic in a multinational room is where I feel most at home.",
]

// Intro copy shown above the dog photos on the DOGS card.
export const DOG_LINES = [
	"I've always loved animals, especially dogs. I adopted my first, Lesko, straight off the streets the moment I was financially independent.",
	"I dog-sat for years — Yako, my border collie, has had more than 20 dogs pass through under his roof. To me, a home isn't a home until there's an animal in it.",
	'Dogs live by the values that speak to me most: loyalty, playfulness and staying fully in the present — all wrapped around a never-ending stomach.',
]

// Transparent-cutout webp photos (public/assets/about/), shown on the dark panel.
// Each dog picks a hover `effect`:
//   'pixelate'  — `photoLo` (~32px) shown pixelated at rest, swapped for `photo` on hover.
//   'slideshow' — `slides` cycled while hovered; slide 0 is the resting frame.
// `placeholder-slide-*` are temporary stand-ins to be replaced with real photos.
export const DOGS = [
	{
		name: 'Lesko',
		effect: 'pixelate',
		photo: '/assets/about/lesko.webp',
		photoLo: '/assets/about/lesko-px.webp',
	},
	{
		name: 'Yako',
		effect: 'slideshow',
		slides: [
			'/assets/about/yako.webp',
			'/assets/about/placeholder-slide-1.webp',
			'/assets/about/placeholder-slide-2.webp',
			'/assets/about/placeholder-slide-3.webp',
		],
	},
]

// Milliseconds each slideshow frame holds before advancing to the next.
export const SLIDE_INTERVAL_MS = 1000

// `id` drives the accent colour ([data-section] in AboutLife.vue).
export const LIFE_SECTIONS = [
	{
		id: 'sports',
		title: 'SPORTS',
		lines: [
			'Sport has always been part of me — four years of Kali, a bit of football as a kid, a marathon, and a good few years spent climbing.',
			"These days I'm in the gym four times a week, chasing consistency more than any single discipline.",
		],
		link: { to: '/sport', label: 'SEE MY WEEKLY SPLIT' },
	},
	{
		id: 'finance',
		title: 'FINANCE',
		lines: [
			'Finance is a genuine passion, not just a line on a CV. I like understanding how money really moves — markets, incentives, and the systems quietly running underneath everything.',
			'It scratches the same itch as coding: reading a complex system, finding the edge, and playing the long game with real stakes.',
		],
	},
	{
		id: 'music',
		title: 'MUSIC',
		lines: [
			"I've played guitar since I was eight and never really stopped. As a teenager I took it on stage, performing in two bands.",
			"It's still my favourite way to step away from a screen — hands on the strings instead of a keyboard.",
		],
	},
	{
		id: 'games',
		title: 'VIDEO GAMES',
		lines: [
			"On the geeky side, I've always loved video games — though the love wasn't mutual. What began as a hobby slid into a fierce addiction.",
			'I poured more than a decade into World of Warcraft (for the Alliance), ran a Twitch channel, and lost myself in Heroes of the Storm, Dead by Daylight and just about any multiplayer game you could name.',
			'It took years, and some hard honesty with myself, to walk away from gaming for good. Coding has since taken over that same one-more-run energy — just pointed at something that gives back.',
		],
	},
]
