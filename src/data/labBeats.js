// Copy for the landing flyby's scroll beats. `key` is both the v-for key and the
// section's SCSS modifier — the beat heights are the flight plan, so they live in
// LabPage.vue's stylesheet next to the reasoning for each one.
//
// The contact arrival at the end reuses CONTACT_HEADING / CONTACT_CHANNELS from
// data/contact.js: same links, same wording as the journey's own arrival.

export const LAB_BEATS = [
	// one screen of nothing: the opening frame is meant to read as a photograph
	{ key: 'still' },
	{
		key: 'work',
		kicker: '01 · RING PASS',
		lead: 'How I got ',
		accent: 'here',
		lines: [
			'Traded gold, oil, and petrochemicals across EMEA.',
			'Rebooted from scratch. Deep dive into C and Unix.',
			'Building the software behind EV charging and renewable energy.',
		],
	},
	{
		key: 'life',
		kicker: '02 · CLOSE PASS',
		lead: 'Off the ',
		accent: 'clock',
		lines: [
			'I come from a multicultural background.',
			'I have been moving around ever since. The countries changed, but what I do with my free time didn’t.',
		],
	},
	// the descent: the sky is the content here, so no card competes with it
	{ key: 'entry' },
]

// The name, for screen readers. It is drawn into the scene as geometry, so the
// document still needs a real heading.
export const LAB_TITLE = 'Karl Querel — Software Engineer'

// Where the SOURCE link in the fixed chrome points.
export const LAB_SOURCE_URL =
	'https://github.com/KarlQuerel/karlquerel.github.io/tree/master/src/components/lab'
