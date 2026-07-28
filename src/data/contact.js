// Drives the /contact page.

// The page heading, rendered by PageTitle like every other page. Trailing space on
// `lead` is intentional — it separates the lead from the accented word.
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
	icon: '/assets/contact/bug.png',
	issueUrl: `https://github.com/KarlQuerel/karlquerel.github.io/issues/new?labels=bug&title=${encodeURIComponent(
		'Bug report'
	)}&body=${encodeURIComponent(ISSUE_BODY)}`,
}
