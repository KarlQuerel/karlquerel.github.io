// Drives the WORK and LIFE stations of the landing journey (HomeJourney.vue).

// Station headings, rendered by PageTitle (see also CONTACT_HEADING /
// SPORT_HEADING — one heading shape across the whole site). Trailing space on
// `lead` is intentional: it separates the lead from the accent.
export const ABOUT_HEADINGS = {
	work: { lead: 'How I got ', accent: 'here' },
	life: { lead: 'Off the ', accent: 'clock' },
}

// Career timeline, oldest first. `type` ('job' | 'study') tints the badge; `current`
// flags the present role (gold); `emblem` is the sprite on the rail; `detail` is an
// optional one-line caption on it, kept to the milestones that carry the story — bare
// rows read as the run-up between them.
// `chapter` opens an act: a divider above the card, and every row under it belongs to
// that act until the next one. They are what turn eight milestones into a story with
// movements rather than a list — so name the arc, not the employer.
// Jobs: career-defining roles only. `from`/`to` are the rail's tick labels: a `to` that
// matches the next entry's `from` is drawn once, so keep contiguous periods exact.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		from: '2003',
		to: '2010',
		chapter: 'Beirut',
		title: 'French Baccalauréat in Economics',
		place: 'Grand Lycée Franco-Libanais',
		location: 'Beirut, Lebanon',
		flag: 'lebanon',
		emblem: 'mortarboard',
	},
	{
		type: 'study',
		from: '2010',
		to: '2013',
		chapter: 'Business school',
		title: 'Bachelor of Business Administration',
		place: 'University of Geneva (HEC)',
		location: 'Geneva, Switzerland',
		flag: 'switzerland',
		emblem: 'chart',
		detail: 'Left Lebanon at 17 to start my studies in Europe.',
	},
	{
		type: 'study',
		from: '2013',
		to: '2015',
		title: 'Bachelor in International Business',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
		emblem: 'globe',
	},
	{
		type: 'study',
		from: '2015',
		to: '2017',
		title: 'Master in Finance',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
		emblem: 'euro-coin',
		detail: 'Corporate finance and derivatives.',
	},
	{
		type: 'job',
		from: '2017',
		to: '2018',
		chapter: 'Commodities',
		title: 'Sales Associate',
		place: 'Cedar Europe',
		location: 'Madrid, Spain',
		flag: 'spain',
		emblem: 'desk-phone',
		detail: 'Moved to Madrid: logistics and petrochemical sales.',
	},
	{
		type: 'job',
		from: '2018',
		to: '2022',
		title: 'Commodity Broker',
		place: 'Cedar Europe',
		location: 'Paris, France',
		flag: 'france',
		emblem: 'oil-barrel',
		detail: 'Traded gold, oil, and petrochemicals across EMEA.',
	},
	{
		type: 'study',
		from: '2022',
		// no `to`: the opening tick carries this one on its own
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
		from: '2025',
		to: 'Now',
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
