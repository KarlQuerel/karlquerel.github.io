// The homepage hero, rendered as a Star Wars-style opening crawl that recedes
// toward a vanishing point (see HeroIntro.vue for the perspective transform).
// Keep `paragraphs` sentences short so each line stays legible while tilted away.

export const HERO_CRAWL = {
	episode: 'YEAR 3812',
	title: 'THE LAST ENVOY',
	name: 'Karl Querel',
	scrollHint: 'Scroll to begin',
	paragraphs: [
		'Earth is dying. The sun that fed it for five billion years now gutters like a failing lamp.',
		'The harvests were the first to go. Then the oceans began to freeze.',
		'One ship was built from what remained. One envoy was chosen to cross the void.',
		'A distant world may hold the answer. You were sent to find it.',
		'You have been asleep for a very long time.',
		'Something is wrong.',
	],
}

// Copy for the wake-up beat that follows the crawl: the ship HUD the envoy's
// eyes open onto, and its alarm chatter. Rendered by ShipHud.vue.
export const HERO_WAKE = {
	ship: 'ESV MERIDIAN',
	readouts: ['CRYO BAY 01 - POD OPEN', 'CREW 1/1 - VITALS ERRATIC', 'DEST: KEPLER-442B'],
	alarms: ['HULL INTEGRITY 34%', 'O2 RESERVE LOW', 'NAV ARRAY OFFLINE', 'GRAVITY WELL DETECTED'],
	alert: 'PROXIMITY ALERT',
	respond: 'RESPOND',
	skip: 'SKIP >>',
	cryoEngage: 'CRYOSTASIS ENGAGED',
	dayCounter: 'DAY 141,209',
	// Plain-language version of the beat for assistive tech (the HUD is decorative).
	srNarration:
		'You wake aboard the ESV Meridian. Alarms are sounding: hull integrity failing, oxygen low, navigation offline. A proximity alert is demanding a response.',
}
