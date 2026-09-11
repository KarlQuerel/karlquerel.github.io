// Drives the contact arrival at the end of the landing journey (JourneyArrival.vue).

import { GAME_LINK } from '@/constants/navigation'

// The page heading, rendered by PageTitle. Trailing space on `lead` separates it from the accent.
export const CONTACT_HEADING = {
	lead: 'Send me a ',
	accent: 'signal',
}

// Each channel renders as a PixelPortal icon; `blank: true` opens in a new tab.
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

// The title menu under the portals: the game's door once the visitor has landed, on the same
// route as the GAME chip so both move together when the game ships.
export const GAME_MENU = { label: 'New game', to: GAME_LINK.to }

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
