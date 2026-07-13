// Drives the LIFE tab of /about (AboutLife.vue). One line per paragraph.
export const ABOUT_ME = [
	'Off the clock I keep it simple: my dogs, long walks, the gym, and good coffee.',
	'I took the scenic route into code — five years broking commodities before retraining at 42 Paris.',
	'When I am not shipping software you will find me lifting, exploring a new city, or planning the next trip.',
]

// swap `photo` for a real picture and flip `placeholder` to drop the pixelated rendering
export const DOGS = [
	{ name: 'Yako', photo: '/assets/img/Yako_Animations/Sit.gif', placeholder: true },
	// TODO: second dog — set the real name + photo, then flip `placeholder`.
	{ name: 'Dog #2', photo: '/assets/img/Yako_Animations/Idle.gif', placeholder: true },
]

// `id` drives the accent colour ([data-section] in AboutLife.vue); copy is placeholder
export const LIFE_SECTIONS = [
	{
		id: 'sports',
		title: 'SPORTS',
		lines: [
			'Lifting is the anchor of my week — a fixed split I actually stick to.',
			'Add in long walks and the odd run, and that is most of my movement.',
		],
		link: { to: '/sport', label: 'SEE MY WEEKLY SPLIT' },
	},
	{
		id: 'music',
		title: 'MUSIC',
		lines: ['Always something playing — desk, gym, or on the move.'],
		tags: ['Hip-hop', 'Electronic', 'Rock', 'Lo-fi'],
	},
	{
		id: 'games',
		title: 'VIDEO GAMES',
		lines: ['Grew up on the PS1 and never really put the controller down.'],
		tags: ['RPGs', 'Roguelikes', 'Indie', 'Retro'],
	},
]
