/***	HERO INTRO		***/
// The split-flap hero, as an ordered list of scroll sections. Each section is
// either:
//   { layout: 'split', lead, name }  — two blocks spread diagonally
//       (lead upper-left, name middle-right), or
//   { layout: 'center', line }       — a single centered line.
// Every value is an array of { text, accent? } segments; a segment flagged
// `accent: true` gets the highlight treatment (pixel font + retro accent color)
// in HeroFlapLine.vue. Keep segments short for legibility.
// A `center` section may carry `to`: a route the whole line links to (rendered
// as the homepage's call-to-action button in HeroIntro.vue).

export const HERO_SECTIONS = [
	{
		layout: 'split',
		lead: [{ text: 'Hello there' }],
		name: [{ text: 'I am ' }, { text: 'KARL QUEREL', accent: true }],
	},
	{
		layout: 'split',
		lead: [{ text: 'Commodity broker' }],
		name: [{ text: 'turned ' }, { text: 'DEVELOPER', accent: true }],
	},
	{
		layout: 'center',
		line: [{ text: 'Press ' }, { text: 'START', accent: true }, { text: ' to explore.' }],
		to: '/terminal',
	},
]
