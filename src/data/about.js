// Drives the /about page.

// Two-line hub header — line 1 "Hello from" + a pixel-art Earth (see PixelEarth.vue),
// line 2 "I'm Karl" with the name in yellow. Swaps to the matching tab text once a
// path (work | life) is chosen. Trailing spaces on `greetingLine1` / `greetingLead`
// are intentional — they separate each part from the element that follows.
export const ABOUT_INTRO = {
	greetingLine1: 'Hello from ',
	greetingLead: "I'm ",
	greetingName: 'Karl',
	work: 'Placeholder — a short intro about my work goes here.',
	life: 'Off the clock, I swap the screen for the outdoors, usually with my dog Yako somewhere nearby.',
}

// Vertical career timeline — oldest first, newest last. All placeholder for now;
// swap in real milestones. `current: true` flags the one you're living now (blinks).
export const CAREER_TIMELINE = [
	{
		year: '20XX',
		title: 'Placeholder milestone 1',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 2',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 3',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 4',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 5',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 6',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 7',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 8',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 9',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
	},
	{
		year: '20XX',
		title: 'Placeholder milestone 10',
		place: 'Location',
		summary: 'Placeholder — a line about what you did here.',
		current: true,
	},
]
