import { useState, useEffect } from 'react'
import { trackTerminalVisit, trackTerminalCommand, loadTerminalStats } from '../../js/firebase-setup.js'

interface CommandStats {
	[command: string]: number
}

interface PopularCommand {
	command: string
	count: number
}

interface VisitStats {
	totalVisits: number
	lastVisit: Date | null
	popularCommands: PopularCommand[]
	totalCommands: number
}

interface UseVisitTrackerReturn {
	trackVisit: () => Promise<void>
	trackCommand: (command: string) => Promise<void>
	getVisitStats: () => VisitStats
	loadVisitData: () => Promise<void>
}

export function useVisitTracker(): UseVisitTrackerReturn {
	const [visitCount, setVisitCount] = useState<number>(0)
	const [commandStats, setCommandStats] = useState<CommandStats>({})
	const [lastVisit, setLastVisit] = useState<Date | null>(null)

	// Load data from Firebase
	const loadVisitData = async (): Promise<void> => {
		try {
			const stats = await loadTerminalStats()

			setVisitCount(stats.totalVisits)
			setCommandStats(stats.commandStats)
			setLastVisit(stats.lastVisit)
		} catch (error) {
			console.warn('Failed to load visit data:', error)
		}
	}

	// Track a visit
	const trackVisit = async (): Promise<void> => {
		try {
			await trackTerminalVisit()
			setVisitCount(prev => prev + 1)
			setLastVisit(new Date())
		} catch (error) {
			console.warn('Failed to track visit:', error)
		}
	}

	// Track command usage
	const trackCommand = async (command: string): Promise<void> => {
		try {
			await trackTerminalCommand(command)

			setCommandStats(prev => {
				const newStats = { ...prev }
				if (!newStats[command]) {
					newStats[command] = 0
				}
				newStats[command]++
				return newStats
			})
		} catch (error) {
			console.warn('Failed to track command:', error)
		}
	}

	// Get most popular commands
	const getPopularCommands = (limit: number = 5): PopularCommand[] => {
		return Object.entries(commandStats)
			.sort(([, a], [, b]) => b - a)
			.slice(0, limit)
			.map(([command, count]) => ({ command, count }))
	}

	// Get visit statistics
	const getVisitStats = (): VisitStats => {
		return {
			totalVisits: visitCount,
			lastVisit: lastVisit,
			popularCommands: getPopularCommands(),
			totalCommands: Object.values(commandStats).reduce((sum, count) => sum + count, 0),
		}
	}

	// Initialize on first load
	useEffect(() => {
		loadVisitData()
	}, [])

	return {
		trackVisit,
		trackCommand,
		getVisitStats,
		loadVisitData,
	}
}

