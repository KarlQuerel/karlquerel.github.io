import {
	CONTACT_LINKS,
	GEOLOCATION_TIMEOUT_MS,
	HELP_COMMANDS,
	HELP_HINT,
	MAN_PAGES,
	NEOFETCH_LOGO,
	REVERSE_GEOCODE_URL,
	STATS_COMMAND_WIDTH,
	SYSTEM_INFO,
} from '@/constants/terminal'
import { escapeHtml, markup, plain } from './terminalText'

const manPage = topic => (Object.hasOwn(MAN_PAGES, topic) ? MAN_PAGES[topic] : null)

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

const locate = async () => {
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			timeout: GEOLOCATION_TIMEOUT_MS,
			enableHighAccuracy: true,
		})
	})
	const { latitude, longitude, accuracy } = position.coords
	const response = await fetch(
		`${REVERSE_GEOCODE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
	)
	if (!response.ok) throw new Error('Geocoding failed')
	const data = await response.json()
	return {
		city: data.city || data.locality || 'Unknown City',
		country: data.countryName || 'Unknown Country',
		accuracy,
	}
}

// Who Karl is and what the shell knows: help, man, about, contact, neofetch, stats, location.
export function createInfoCommands({ loadVisitStats, getThemeName }) {
	return {
		help: args => {
			const topic = (args || '').trim().toLowerCase()
			if (topic) {
				const page = manPage(topic)
				if (page) return [plain(page)]
				return [
					markup(
						`No help for <span class="text-red">${escapeHtml(topic)}</span>. Try: help`
					),
				]
			}
			const width = Math.max(...HELP_COMMANDS.map(([name]) => name.length))
			return [
				...HELP_COMMANDS.map(([name, color, desc]) =>
					markup(
						`• <span class="${color}">${name}</span>${' '.repeat(width - name.length)} - ${desc}`
					)
				),
				plain(''),
				markup(HELP_HINT),
			]
		},

		man: args => {
			const topic = args.trim().toLowerCase()
			const page = manPage(topic)
			if (page) return [plain(page)]
			return [
				markup(
					topic
						? `No manual entry for <span class="text-red">${escapeHtml(topic)}</span>`
						: 'What manual page do you want? Try: man help'
				),
			]
		},

		about: () => [
			markup(
				'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience'
			),
			markup(
				'• Studied at <span class="text-purple">HEC Geneva</span>, <span class="text-purple">GEM</span> and <span class="text-purple">42 Paris</span>'
			),
			markup('• Transitioned into <span class="text-green">software development</span>'),
			markup('• Currently working at <span class="text-azure">Zetra</span>'),
		],

		contact: () => CONTACT_LINKS.map(link => ({ type: 'typewriter', ...link })),

		neofetch: () => {
			const themeLabel = `Phosphor ${capitalize(getThemeName())}`
			const info = SYSTEM_INFO.map(([key, value]) => [
				key,
				key === 'Theme' ? themeLabel : value,
			])
			const logoWidth = Math.max(...NEOFETCH_LOGO.map(line => line.length))
			const rows = Math.max(NEOFETCH_LOGO.length, info.length)
			return Array.from({ length: rows }, (_, i) => {
				const logo = (NEOFETCH_LOGO[i] || '').padEnd(logoWidth)
				const [key, value] = info[i] || []
				const right = key
					? `<span class="text-green">${key}</span>: <span class="text-blue">${escapeHtml(value)}</span>`
					: ''
				return markup(`<span class="text-yellow">${escapeHtml(logo)}</span>   ${right}`)
			})
		},

		// Everything below comes from Firestore, which any client can write: escape it all.
		stats: async () => {
			const stats = await loadVisitStats()
			const count = value => `<span class="text-blue">${escapeHtml(value)}</span>`
			return [
				markup('<span class="text-green">📈 Terminal Statistics </span>'),
				markup(`• Visitors    - ${count(stats.totalVisits)}`),
				markup(`• Commands    - ${count(stats.totalCommands)}`),
				...(stats.lastVisit
					? [
							markup(
								`• Last visit  - <span class="text-yellow">${escapeHtml(stats.lastVisit.toLocaleDateString())}</span>`
							),
						]
					: []),
				...(stats.popularCommands.length > 0
					? [markup('<span class="text-purple">🏆 Most popular commands </span>')]
					: []),
				...stats.popularCommands.map(({ command, count: times }) =>
					markup(
						`• ${escapeHtml(command.padEnd(STATS_COMMAND_WIDTH))} - ${count(times)} times`
					)
				),
			]
		},

		location: async () => {
			try {
				const { city, country, accuracy } = await locate()
				return [
					markup('<span class="text-green">📍 Location detected!</span>'),
					markup(
						`• Country     - <span class="text-green">${escapeHtml(country)}</span>`
					),
					markup(`• City        - <span class="text-green">${escapeHtml(city)}</span>`),
					markup(
						`• Accuracy    - <span class="text-blue">±${Math.round(accuracy)}m</span>`
					),
				]
			} catch {
				return [markup('<span class="text-red">❌ Location access denied</span>')]
			}
		},
	}
}
