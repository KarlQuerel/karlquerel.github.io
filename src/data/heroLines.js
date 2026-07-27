// The homepage hero, rendered as a Star Wars-style opening crawl that recedes
// toward a vanishing point (see HeroIntro.vue for the perspective transform).
// Keep `paragraphs` sentences short so each line stays legible while tilted away.

export const HERO_CRAWL = {
	episode: 'TRANSMISSION 001',
	title: 'UNDER CONSTRUCTION',
	name: 'Karl Querel',
	scrollHint: 'Scroll to begin',
	paragraphs: [
		'This corner of the galaxy is still being built.',
		'New systems are coming online, one by one.',
		'Feel free to explore what is already here.',
		'The rest is not far behind.',
	],
}

// The teaser's closing beat: the scroll jumps to lightspeed and lands on COMING SOON.
export const HERO_TEASER = {
	comingSoon: 'COMING SOON',
	sub: 'Transmission incoming',
	skip: 'SKIP >>',
}

// The live homepage while the site is built — name, status line, and a nudge toward
// the menu star. `hintBefore`/`hintAfter` wrap the inline star glyph in the template.
export const HOME_LANDING = {
	name: 'Karl Querel',
	label: 'Under construction',
	hintBefore: 'Tap the',
	hintAfter: 'to explore',
	hintSr: 'Use the menu star at the top of the page to explore the site.',
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
