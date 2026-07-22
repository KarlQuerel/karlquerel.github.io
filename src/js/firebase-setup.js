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

// Lazy handle: the Firestore SDK (the bulk of the old Terminal chunk) loads via
// dynamic import on first use, off the route's critical path. Memoised so
// initializeApp runs once. lite SDK: REST-only, no realtime listeners.
let handlePromise = null

function getHandle() {
	if (!handlePromise) {
		handlePromise = Promise.all([
			import('firebase/app'),
			import('firebase/firestore/lite'),
		]).then(([{ initializeApp }, firestore]) => ({
			firestore,
			statsRef: firestore.doc(
				firestore.getFirestore(initializeApp(firebaseConfig)),
				'terminal',
				'stats'
			),
		}))
	}
	return handlePromise
}

// Writes are single merged setDoc calls with atomic increments — no
// read-before-write round trip, no lost updates between concurrent visitors,
// and merge creates the doc on first write.
export async function trackTerminalVisit() {
	try {
		const { firestore, statsRef } = await getHandle()
		await firestore.setDoc(
			statsRef,
			{
				totalVisits: firestore.increment(1),
				lastVisit: new Date().toISOString(),
			},
			{ merge: true }
		)
	} catch (error) {
		console.warn('Failed to track terminal visit:', error)
	}
}

export async function trackTerminalCommand(command) {
	try {
		const { firestore, statsRef } = await getHandle()
		await firestore.setDoc(
			statsRef,
			{
				totalCommands: firestore.increment(1),
				commandStats: { [command]: firestore.increment(1) },
			},
			{ merge: true }
		)
	} catch (error) {
		console.warn('Failed to track terminal command:', error)
	}
}

export async function loadTerminalStats() {
	try {
		const { firestore, statsRef } = await getHandle()
		const docSnap = await firestore.getDoc(statsRef)
		const data = docSnap.exists() ? docSnap.data() : {}
		return {
			totalVisits: data.totalVisits || 0,
			totalCommands: data.totalCommands || 0,
			commandStats: data.commandStats || {},
			lastVisit: data.lastVisit ? new Date(data.lastVisit) : null,
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
