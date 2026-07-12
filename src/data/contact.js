// Drives the /contact page.

// The page heading — styled like the About greeting (white pixel caps with the last
// word accented in yellow). Trailing space on `lead` separates it from the accent.
export const CONTACT_HEADING = {
	lead: 'Send me a ',
	accent: 'signal',
}

// Each channel renders as a card. `blank: true` opens the link in a new tab.
export const CONTACT_CHANNELS = [
	{
		key: 'email',
		channel: 'Email',
		value: 'karlquerel@gmail.com',
		href: 'mailto:karlquerel@gmail.com',
		blank: false,
	},
	{
		key: 'github',
		channel: 'GitHub',
		value: 'github.com/KarlQuerel',
		href: 'https://github.com/KarlQuerel',
		blank: true,
	},
	{
		key: 'linkedin',
		channel: 'LinkedIn',
		value: 'linkedin.com/in/karlquerel',
		href: 'https://www.linkedin.com/in/karlquerel',
		blank: true,
	},
]
