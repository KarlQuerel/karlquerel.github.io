/***	HERO INTRO		***/
// The homepage hero rendered as a Star Wars-style opening crawl. As the visitor
// scrolls the runway, the deck recedes into the starfield toward a vanishing
// point (see HeroIntro.vue for the scroll-driven perspective transform).
//
//   episode    — small pixel label above the title.
//   title      — the crawl headline.
//   paragraphs — the receding body copy; keep sentences short so each line
//                stays legible while tilted away.

export const HERO_CRAWL = {
	episode: 'EPISODE I',
	title: 'THE CAREER PIVOT',
	paragraphs: [
		'It is a period of reinvention. KARL QUEREL, once a COMMODITY BROKER navigating the chaos of global markets, has left the trading floor in pursuit of a new craft.',
		'Armed with stubborn curiosity and an unhealthy love of clean code, he now builds for the web — turning caffeine and pixels into working software.',
		'Scroll onward, traveler, to explore the projects, experiments, and stories that chart his journey from MARKETS to MACHINES....',
	],
}
