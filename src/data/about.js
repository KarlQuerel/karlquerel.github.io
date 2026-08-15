// Drives the /about page.

// Page headings for the hub and each tab, rendered by PageTitle (see also
// CONTACT_HEADING / SPORT_HEADING — one heading shape across the whole site).
// Trailing space on `lead` is intentional: it separates the lead from the accent.
export const ABOUT_HEADINGS = {
	hub: { line1: 'Hello there!', lead: "I'm ", accent: 'Karl' },
	work: { lead: 'How I got ', accent: 'here' },
	life: { lead: 'Off the ', accent: 'clock' },
}

// Career timeline, oldest first. `type` ('job' | 'study') tints the badge; `current`
// flags the present role (gold); `emblem` is the sprite on the rail; `chapter` adds a
// divider above the card; `detail` is an optional one-line caption on it, kept to the
// milestones that carry the story — bare rows read as the run-up between them.
// Jobs: career-defining roles only.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		year: '2003 – 2010',
		title: 'French Baccalauréat in Economics',
		place: 'Grand Lycée Franco-Libanais',
		location: 'Beirut, Lebanon',
		flag: 'lebanon',
		emblem: 'mortarboard',
	},
	{
		type: 'study',
		year: '2010 – 2013',
		title: 'Bachelor of Business Administration',
		place: 'University of Geneva (HEC)',
		location: 'Geneva, Switzerland',
		flag: 'switzerland',
		emblem: 'chart',
		detail: 'Left Lebanon at 17 to start my studies in Europe.',
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
		emblem: 'euro-coin',
		detail: 'Corporate finance and derivatives.',
	},
	{
		type: 'job',
		year: '2017 – 2018',
		title: 'Sales Associate',
		place: 'Cedar Europe',
		location: 'Madrid, Spain',
		flag: 'spain',
		emblem: 'desk-phone',
		detail: 'Moved to Madrid: logistics and petrochemical sales.',
	},
	{
		type: 'job',
		year: '2018 – 2022',
		title: 'Commodity Broker',
		place: 'Cedar Europe',
		location: 'Paris, France',
		flag: 'france',
		emblem: 'oil-barrel',
		detail: 'Traded gold, oil, and petrochemicals across EMEA.',
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
		detail: 'Rebooted from scratch. Deep dive into C and Unix.',
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
		detail: 'Building the software behind EV charging and renewable energy.',
	},
]

// Kicker label per milestone type, shown above the title.
export const CAREER_TYPE_LABELS = {
	study: 'Education',
	job: 'Experience',
}
