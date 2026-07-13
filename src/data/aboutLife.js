// Personal side of the /about page — drives the LIFE tab (AboutLife.vue).

// Lead intro card. One line per paragraph.
export const ABOUT_ME = [
	'Off the clock I keep it simple: my dogs, long walks, the gym, and good coffee.',
	'I took the scenic route into code — five years broking commodities before retraining at 42 Paris.',
	'When I am not shipping software you will find me lifting, exploring a new city, or planning the next trip.',
]

// The two dogs — one photo each. Drop in a real picture by replacing `photo`
// and flipping `placeholder` to false (placeholders render pixelated + contained
// so the small sprite reads cleanly; real photos render normally + cover the frame).
export const DOGS = [
	{ name: 'Yako', photo: '/assets/img/Yako_Animations/Sit.gif', placeholder: true },
	// TODO: second dog — set the real name + photo, then flip `placeholder`.
	{ name: 'Dog #2', photo: '/assets/img/Yako_Animations/Idle.gif', placeholder: true },
]

// The remaining LIFE sections, each a themed card. `id` drives the accent colour
// (see [data-section] rules in AboutLife.vue). `link` renders a void-button that
// routes into the site; `tags` render as pixel chips. All copy is placeholder —
// swap freely.
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
