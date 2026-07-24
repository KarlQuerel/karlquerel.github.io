// Drives the /about page.

// Two-line hub header — line 1 "Hello there!", line 2 "I'm Karl" with the name in
// yellow. Swaps to the matching tab text once a path (work | life) is chosen. The
// trailing space on `greetingLead` is intentional — it separates the lead from the
// name that follows. Tab intros are segmented so key words can pop in yellow
// (`hl: true`) without needing v-html; segments carry their own spacing, and a
// `{ br: true }` segment forces a line break between sentences.
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

// Vertical career timeline — oldest first (by start date), newest last. `type`
// ('job' | 'study') drives the coloured category tag. `current: true` flags the one
// you're living now. `summary` is optional — reserved for standout milestones, not
// routine entries, so cards stay scannable. `chapter` renders a centered divider
// above that card (the finance → software era break) without disturbing the zigzag.
// Jobs are deliberately curated: career-defining roles only, no student-era internships.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		year: '2003 – 2010',
		title: 'French Baccalauréat in Economics',
		place: 'Grand Lycée Franco-Libanais',
		location: 'Beirut, Lebanon',
		flag: 'lebanon',
	},
	{
		type: 'study',
		year: '2010 – 2013',
		title: 'Bachelor of Business Administration',
		place: 'University of Geneva (HEC)',
		location: 'Geneva, Switzerland',
		flag: 'switzerland',
	},
	{
		type: 'study',
		year: '2013 – 2015',
		title: 'Bachelor in International Business',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
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

// Human label for each milestone `type`, kept out of the template so all About copy
// lives together. Drives the coloured category tag on the timeline cards.
export const CAREER_TYPE_LABELS = {
	study: 'Education',
	job: 'Experience',
}
