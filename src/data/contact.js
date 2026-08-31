// Drives the contact arrival at the end of the landing journey (JourneyArrival.vue).

import { CAREER_TIMELINE } from './about'

// The page heading, rendered by PageTitle like every other page. Trailing space on
// `lead` is intentional — it separates the lead from the accented word.
export const CONTACT_HEADING = {
	lead: 'Send me a ',
	accent: 'signal',
}

// The line under the heading: what the signal reaches today. Read off the timeline
// entry flagged `current`, so it can never drift out of date with WORK.
const CURRENT_ROLE = CAREER_TIMELINE.find(entry => entry.current)
export const CONTACT_NOW = `Now · ${CURRENT_ROLE.title} @ ${CURRENT_ROLE.place}`

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

// The bug-report chip pinned bottom-right: opens a prefilled GitHub issue.
const ISSUE_BODY = ['### What happened?', '', '### Where?', '', '### Browser', ''].join('\n')

export const BUG_REPORT = {
	// terse chip label; the icon carries the rest, the aria label keeps it explicit
	label: 'BUG?',
	ariaLabel: 'Report a bug',
	icon: '/assets/contact/bug.png',
	issueUrl: `https://github.com/KarlQuerel/karlquerel.github.io/issues/new?labels=bug&title=${encodeURIComponent(
		'Bug report'
	)}&body=${encodeURIComponent(ISSUE_BODY)}`,
}
