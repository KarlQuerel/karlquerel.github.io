import { ref } from 'vue'
import { trackTerminalVisit, trackTerminalCommand, loadTerminalStats } from '@/js/firebase-setup.js'

export function useVisitTracker() {
	const visitCount = ref(0)
	const commandStats = ref({})
	const lastVisit = ref(null)

	// Load data from Firebase
	const loadVisitData = async () => {
		try {
			const stats = await loadTerminalStats()

			visitCount.value = stats.totalVisits
			commandStats.value = stats.commandStats
			lastVisit.value = stats.lastVisit
		} catch (error) {
			console.warn('Failed to load visit data:', error)
		}
	}

	// Track a visit
	const trackVisit = async () => {
		try {
			await trackTerminalVisit()
			visitCount.value++
			lastVisit.value = new Date()
		} catch (error) {
			console.warn('Failed to track visit:', error)
		}
	}

	// Track command usage
	const trackCommand = async command => {
		try {
			await trackTerminalCommand(command)

			if (!commandStats.value[command]) {
				commandStats.value[command] = 0
			}
			commandStats.value[command]++
		} catch (error) {
			console.warn('Failed to track command:', error)
		}
	}

	// Get most popular commands
	const getPopularCommands = (limit = 5) => {
		return Object.entries(commandStats.value)
			.sort(([, a], [, b]) => b - a)
			.slice(0, limit)
			.map(([command, count]) => ({ command, count }))
	}

	// Get visit statistics
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
		visitCount,
		commandStats,
		lastVisit,
		trackVisit,
		trackCommand,
		getPopularCommands,
		getVisitStats,
		loadVisitData,
	}
}
