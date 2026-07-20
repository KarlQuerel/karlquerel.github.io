// Drives the /contact page.

// The page heading — styled like the About greeting (white pixel caps with the last
// word accented in yellow). Trailing space on `lead` separates it from the accent.
export const CONTACT_HEADING = {
	lead: 'Send me a ',
	accent: 'signal',
}

// Each channel renders as an icon portal (PixelPortal), like the About hub.
// `blank: true` opens the link in a new tab.
export const CONTACT_CHANNELS = [
	{
		key: 'email',
		label: 'EMAIL',
		icon: '/assets/contact/email.png',
		href: 'mailto:karlquerel@gmail.com',
		blank: false,
	},
	{
		key: 'linkedin',
		label: 'LINKEDIN',
		icon: '/assets/contact/linkedin.png',
		href: 'https://www.linkedin.com/in/karlquerel',
		blank: true,
	},
	{
		key: 'github',
		label: 'GITHUB',
		icon: '/assets/contact/github.png',
		href: 'https://github.com/KarlQuerel',
		blank: true,
	},
]

// The bug-report button at the foot of the page: opens a prefilled GitHub issue.
const ISSUE_BODY = ['### What happened?', '', '### Where?', '', '### Browser', ''].join('\n')

export const BUG_REPORT = {
	label: 'REPORT A BUG',
	// placeholder art — swap for the hand-drawn pixel bug when it exists
	icon: '/assets/contact/bug.png',
	issueUrl: `https://github.com/KarlQuerel/karlquerel.github.io/issues/new?labels=bug&title=${encodeURIComponent(
		'Bug report'
	)}&body=${encodeURIComponent(ISSUE_BODY)}`,
}
