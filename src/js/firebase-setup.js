import { initializeApp } from 'firebase/app'
// lite SDK: REST-only, no realtime listeners — a fraction of the full Firestore bundle
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore/lite'

// Firebase config — public web client identifiers, injected from .env at build
// time (see .env.example) so they stay out of source per project convention.
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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

			commandStats[command] = (commandStats[command] || 0) + 1

			await updateDoc(terminalStatsRef, {
				totalCommands: increment(1),
				commandStats: commandStats,
			})
		} else {
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
