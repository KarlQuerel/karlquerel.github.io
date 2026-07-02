import { ref } from 'vue'
import { trackTerminalVisit, trackTerminalCommand, loadTerminalStats } from '@/js/firebase-setup.js'

export function useVisitTracker() {
	const visitCount = ref(0)
	const commandStats = ref({})
	const lastVisit = ref(null)

	// firebase-setup already swallows Firestore errors and returns safe defaults,
	// so these never reject — no second error-handling layer needed here.
	const loadVisitData = async () => {
		const stats = await loadTerminalStats()
		visitCount.value = stats.totalVisits
		commandStats.value = stats.commandStats
		lastVisit.value = stats.lastVisit
	}

	const trackVisit = async () => {
		await trackTerminalVisit()
		visitCount.value++
		lastVisit.value = new Date()
	}

	const trackCommand = async command => {
		await trackTerminalCommand(command)

		if (!commandStats.value[command]) {
			commandStats.value[command] = 0
		}
		commandStats.value[command]++
	}

	const getPopularCommands = (limit = 5) => {
		return Object.entries(commandStats.value)
			.sort(([, a], [, b]) => b - a)
			.slice(0, limit)
			.map(([command, count]) => ({ command, count }))
	}

	const getVisitStats = () => {
		return {
			totalVisits: visitCount.value,
			lastVisit: lastVisit.value,
			popularCommands: getPopularCommands(),
			totalCommands: Object.values(commandStats.value).reduce((sum, count) => sum + count, 0),
		}
	}

	// Initialize on first load
	loadVisitData()

	return {
		trackVisit,
		trackCommand,
		getVisitStats,
		loadVisitData,
	}
}
