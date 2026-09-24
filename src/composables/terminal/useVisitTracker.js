import { POPULAR_COMMANDS_LIMIT } from '@/constants/terminal'
import { trackTerminalVisit, trackTerminalCommand, loadTerminalStats } from '@/js/firebase-setup.js'

// firebase-setup swallows Firestore errors and returns safe defaults, so nothing here rejects.
export function useVisitTracker() {
	let previousVisit = Promise.resolve(null)

	// read before writing, so "Last visit" is the one before this session
	const trackVisit = () => {
		previousVisit = loadTerminalStats().then(async ({ lastVisit }) => {
			await trackTerminalVisit()
			return lastVisit
		})
	}

	const loadVisitStats = async () => {
		const lastVisit = await previousVisit
		const { totalVisits, commandStats } = await loadTerminalStats()
		const counts = Object.entries(commandStats)
		return {
			totalVisits,
			lastVisit,
			totalCommands: counts.reduce((sum, [, count]) => sum + count, 0),
			popularCommands: counts
				.sort(([, a], [, b]) => b - a)
				.slice(0, POPULAR_COMMANDS_LIMIT)
				.map(([command, count]) => ({ command, count })),
		}
	}

	return { trackVisit, trackCommand: trackTerminalCommand, loadVisitStats }
}
