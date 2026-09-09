// Drives the WORK and LIFE stations of the landing journey (HomeJourney.vue).

// Station headings, rendered by PageTitle — one heading shape across the whole site.
export const ABOUT_HEADINGS = {
	work: { lead: 'How I got ', accent: 'here' },
	life: { lead: 'Off the ', accent: 'clock' },
}

// Career timeline, oldest first. `type` tints the badge, `current` flags the present role (gold),
// `emblem` is the rail sprite, `detail` an optional caption kept to the milestones that carry it.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		from: '2003',
		to: '2010',
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
