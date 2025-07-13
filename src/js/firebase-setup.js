import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore'

// Firebase config
const firebaseConfig = {
	apiKey: 'AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8',
	authDomain: 'click-counter-4f529.firebaseapp.com',
	projectId: 'click-counter-4f529',
	storageBucket: 'click-counter-4f529.appspot.com',
	messagingSenderId: '950861743362',
	appId: '1:950861743362:web:77dc41eb31b34334566e1b',
	measurementId: 'G-7EEMWQS33Z',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const clickRef = doc(db, 'clicks', 'counter')
const terminalStatsRef = doc(db, 'terminal', 'stats')

export async function updateClicks() {
	await updateDoc(clickRef, { count: increment(1) })
}

export async function loadClicks() {
	const docSnap = await getDoc(clickRef)
	return docSnap.exists() ? docSnap.data().count : 0
}

// Terminal statistics functions
export async function trackTerminalVisit() {
	try {
		const docSnap = await getDoc(terminalStatsRef)
		if (docSnap.exists()) {
			await updateDoc(terminalStatsRef, {
				totalVisits: increment(1),
				lastVisit: new Date().toISOString(),
			})
		} else {
			await setDoc(terminalStatsRef, {
				totalVisits: 1,
				totalCommands: 0,
				commandStats: {},
				lastVisit: new Date().toISOString(),
			})
		}
	} catch (error) {
		console.warn('Failed to track terminal visit:', error)
	}
}

export async function trackTerminalCommand(command) {
	try {
		const docSnap = await getDoc(terminalStatsRef)
		if (docSnap.exists()) {
			const data = docSnap.data()
			const commandStats = data.commandStats || {}

			// Update command count
			commandStats[command] = (commandStats[command] || 0) + 1

			await updateDoc(terminalStatsRef, {
				totalCommands: increment(1),
				commandStats: commandStats,
			})
		} else {
			// Initialize if document doesn't exist
			await setDoc(terminalStatsRef, {
				totalVisits: 0,
				totalCommands: 1,
				commandStats: { [command]: 1 },
				lastVisit: new Date().toISOString(),
			})
		}
	} catch (error) {
		console.warn('Failed to track terminal command:', error)
	}
}

export async function loadTerminalStats() {
	try {
		const docSnap = await getDoc(terminalStatsRef)
		if (docSnap.exists()) {
			const data = docSnap.data()
			return {
				totalVisits: data.totalVisits || 0,
				totalCommands: data.totalCommands || 0,
				commandStats: data.commandStats || {},
				lastVisit: data.lastVisit ? new Date(data.lastVisit) : null,
			}
		} else {
			return {
				totalVisits: 0,
				totalCommands: 0,
				commandStats: {},
				lastVisit: null,
			}
		}
	} catch (error) {
		console.warn('Failed to load terminal stats:', error)
		return {
			totalVisits: 0,
			totalCommands: 0,
			commandStats: {},
			lastVisit: null,
		}
	}
}
