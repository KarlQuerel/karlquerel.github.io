// Drives the /about page.

// Two-line hub header — line 1 "Hello there!", line 2 "I'm Karl" with the name in
// yellow. Swaps to the matching tab text once a path (work | life) is chosen. The
// trailing space on `greetingLead` is intentional — it separates the lead from the
// name that follows. Tab intros are segmented so key words can pop in yellow
// (`hl: true`) without needing v-html; segments carry their own spacing.
export const ABOUT_INTRO = {
	greetingLine1: 'Hello there!',
	greetingLead: "I'm ",
	greetingName: 'Karl',
	work: [
		{ text: 'After five years as a ' },
		{ text: 'commodity trader', hl: true },
		{ text: ', I made a sharp turn into ' },
		{ text: 'software', hl: true },
		{ text: " and enrolled at 42. Starting over wasn't easy, but it was the right call." },
	],
	life: [
		{
			text: 'Off the clock, I swap the screen for the outdoors, usually with my dog Yako somewhere nearby.',
		},
	],
}

// Vertical career timeline — oldest first, newest last. `type` ('job' | 'study')
// drives the coloured category tag. `current: true` flags the one you're living now
// (blinks). `summary` is optional — reserved for standout milestones (e.g. the 42
// pivot), not routine entries, so cards stay scannable. Currently education only; jobs
// (type: 'job') interleave by date once added, with the latest role flagged current.
export const CAREER_TIMELINE = [
	{
		type: 'study',
		year: '2003 – 2010',
		title: 'French Baccalauréat — Economics',
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
		title: 'MSc, Finance',
		place: 'Grenoble École de Management',
		location: 'Grenoble, France',
		flag: 'france',
	},
	{
		type: 'study',
		year: '2022 – 2024',
		title: 'Software Engineering',
		place: '42 Paris',
		location: 'Paris, France',
		flag: 'france',
		summary:
			'Peer-to-peer, project-based software engineering — my pivot from finance into code.',
	},
]

// Human label for each milestone `type`, kept out of the template so all About copy
// lives together. Drives the coloured category tag on the timeline cards.
export const CAREER_TYPE_LABELS = {
	study: 'Education',
	job: 'Experience',
}
