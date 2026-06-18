/***	HERO INTRO		***/
// The split-flap hero, as an ordered list of scroll sections. Each section is
// either:
//   { layout: 'split', lead, name }  — two blocks spread diagonally
//       (lead upper-left, name middle-right), or
//   { layout: 'center', line }       — a single centered line.
// Every value is an array of { text, accent? } segments; a segment flagged
// `accent: true` gets the highlight treatment (pixel font + retro accent color)
// in HeroFlapLine.vue. Keep segments short for legibility.

export const HERO_SECTIONS = [
	{
		layout: 'split',
		lead: [{ text: 'Hello there' }],
		name: [{ text: 'I am ' }, { text: 'KARL QUEREL', accent: true }],
	},
	{
		layout: 'split',
		lead: [{ text: 'Welcome to my website' }],
		name: [{ text: 'Placeholder text here' }],
	},
	{
		layout: 'center',
		line: [{ text: 'Press ' }, { text: 'START', accent: true }, { text: ' to explore.' }],
	},
]
