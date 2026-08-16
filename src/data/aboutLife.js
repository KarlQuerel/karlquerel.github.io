// Drives the LIFE tab of /about (AboutLife.vue). One entry per paragraph;
// a `\n` inside an entry breaks the line without opening a paragraph gap.
export const ABOUT_ME = [
	'I come from a multicultural background.',
	'Born in France to a Lebanese mother, I spent my teenage years in Lebanon before coming back to Europe.',
	"I have been moving around ever since. The countries changed, but what I do with my free time didn't.",
]

// Intro copy shown above the dog photos on the DOGS card.
export const DOG_LINES = [
	'I always loved animals, especially dogs.\nI adopted my first one, Lesko, from the streets of Grenoble while I was still a student. He was aggressive towards other dogs, and it took us a full year of discipline and hard work to heal his traumas. I learned everything I know about dogs training him.\nTwo years later, in Lebanon, he ate rat poison and died shortly after. His sudden and brutal death shattered me… I was lost, confused, and angry.',
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
			'Staying active is my favorite way to clear my head.',
			'I practiced Filipino martial arts for five years and ran regularly until my right knee politely asked me to stop.\nFor a while, I was hooked on bouldering and lead climbing.',
			"Nowadays, I keep things grounded by hitting the gym four times a week.\nBut whenever I can, you'll find me outdoors at the beach, mostly trying to convince myself that I know what I'm doing on a surfboard.",
		],
	},
	{
		id: 'music',
		title: 'MUSIC',
		lines: [
			"I've been playing the guitar since I was eight years old, performing in three different bands during my teenage years in Lebanon.",
			'While that passion eventually faded, I still pick up the instrument whenever inspiration strikes.',
		],
	},
	{
		id: 'games',
		title: 'VIDEO GAMES',
		// `beforeLine` renders the art ahead of that paragraph so the prose from
		// there down wraps around it — the PS1 sits beside the beat it illustrates.
		media: {
			src: '/assets/about/ps1.gif',
			// a GIF can't be paused from CSS, so reduced motion gets the first frame
			still: '/assets/about/ps1-still.png',
			alt: 'Pixel-art CRT television wired to a PlayStation 1',
			beforeLine: 1,
		},
		lines: [
			'For as long as I can remember, I’ve been fascinated by video games.',
			'My first real dive was Final Fantasy VII, where I was completely amazed by the visuals, music, and story, even if I was too young to fully grasp it all.\nThen came our first home PC, and with it Heroes of Might and Magic IV and Age of Mythology. That was the spark.',
			'Years later I got into the amazing but addictive World of Warcraft. I ended up playing it for 13 years, ran a Twitch channel, and led teams of more than 20 players on Discord.\nEventually realizing how much of my life it was consuming, I deleted my account and stepped away entirely.',
			'Today I only dabble in short single-player masterpieces like This War of Mine, Outer Wilds, or Return of the Obra Dinn.',
			'Coding has since replaced that screen obsession, and this time, it gives back as much as I put in.',
		],
	},
]
