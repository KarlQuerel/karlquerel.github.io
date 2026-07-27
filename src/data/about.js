// Drives the /about page.

// Hub header + per-tab intros. Trailing space on `greetingLead` is intentional. Tab
// intros are segmented so key words can pop in yellow (`hl: true`) without v-html;
// `{ br: true }` forces a line break.
export const ABOUT_INTRO = {
	greetingLine1: 'Hello there!',
	greetingLead: "I'm ",
	greetingName: 'Karl',
	work: [
		{ text: 'For five incredible years, I traded ' },
		{ text: 'commodities', hl: true },
		{ text: ' across Europe. An environment as challenging as it was rewarding.' },
		{ br: true },
		{ text: 'Over time, the line between finance and ' },
		{ text: 'technology', hl: true },
		{ text: ' blurred, and I spent more and more nights tinkering with ' },
		{ text: 'algorithms', hl: true },
		{ text: '.' },
		{ br: true },
		{ text: 'The spark grew impossible to ignore, so I rebooted from scratch at ' },
		{ text: '42 Paris', hl: true },
		{ text: ' and dove into ' },
		{ text: 'software engineering', hl: true },
		{ text: '.' },
		{ br: true },
		{ text: 'Today, I build tech for ' },
		{ text: 'renewable energy', hl: true },
		{ text: " and I'm loving every second of it." },
	],
	life: [
		{
			text: 'PLACEHOLDER',
		},
	],
}

// Career timeline, oldest first. `type` ('job' | 'study') tints the badge; `current`
// flags the present role (gold); `emblem` is the sprite on the rail; `chapter` adds a
// divider above the card. Jobs: career-defining roles only.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		year: '2003 – 2010',
		title: 'French Baccalauréat in Economics',
		place: 'Grand Lycée Franco-Libanais',
		location: 'Beirut, Lebanon',
		flag: 'lebanon',
		emblem: 'diploma',
	},
	{
		type: 'study',
		year: '2010 – 2013',
		title: 'Bachelor of Business Administration',
		place: 'University of Geneva (HEC)',
		location: 'Geneva, Switzerland',
		flag: 'switzerland',
		emblem: 'book',
	},
	{
		type: 'study',
		year: '2013 – 2015',
		title: 'Bachelor in International Business',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
		emblem: 'globe',
	},
	{
		type: 'study',
		year: '2015 – 2017',
		title: 'MSc Finance',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
		emblem: 'chart',
	},
	{
		type: 'job',
		year: '2017 – 2018',
		title: 'Sales Associate',
		place: 'Cedar Europe',
		location: 'Madrid, Spain',
		flag: 'spain',
		emblem: 'gold-bars',
	},
	{
		type: 'job',
		year: '2018 – 2022',
		title: 'Commodity Broker',
		place: 'Cedar Europe',
		location: 'Paris, France',
		flag: 'france',
		emblem: 'oil-barrel',
	},
	{
		type: 'study',
		year: '2022 – 2024',
		title: 'Software Engineering',
		place: '42 Paris',
		location: 'Paris, France',
		flag: 'france',
		chapter: 'Career pivot',
		emblem: 'terminal-42',
	},
	{
		type: 'job',
		year: '2025 – Present',
		title: 'Software Engineer',
		place: 'Zetra',
		location: 'Paris, France',
		flag: 'france',
		current: true,
		emblem: 'charger',
	},
]

// Kicker label per milestone type, shown above the title.
export const CAREER_TYPE_LABELS = {
	study: 'Education',
	job: 'Experience',
}
