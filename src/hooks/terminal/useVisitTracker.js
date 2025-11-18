import { useState, useEffect } from 'react'
import { trackTerminalVisit, trackTerminalCommand, loadTerminalStats } from '../../js/firebase-setup.js'

export function useVisitTracker() {
	const [visitCount, setVisitCount] = useState(0)
	const [commandStats, setCommandStats] = useState({})
	const [lastVisit, setLastVisit] = useState(null)

	// Load data from Firebase
	const loadVisitData = async () => {
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
	const trackVisit = async () => {
		try {
			await trackTerminalVisit()
			setVisitCount(prev => prev + 1)
			setLastVisit(new Date())
		} catch (error) {
			console.warn('Failed to track visit:', error)
		}
	}

	// Track command usage
	const trackCommand = async command => {
		try {
			await trackTerminalCommand(command)

			setCommandStats(prev => ({
				...prev,
				[command]: (prev[command] || 0) + 1,
			}))
		} catch (error) {
			console.warn('Failed to track command:', error)
		}
	}

	// Get most popular commands
	const getPopularCommands = (limit = 5) => {
		return Object.entries(commandStats)
			.sort(([, a], [, b]) => b - a)
			.slice(0, limit)
			.map(([command, count]) => ({ command, count }))
	}

	// Get visit statistics
	const getVisitStats = () => {
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

