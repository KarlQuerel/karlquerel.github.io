// Public client identifiers, shipped in the bundle anyway. Not secrets: Firestore rules gate access.
const firebaseConfig = {
	apiKey: 'AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8',
	authDomain: 'click-counter-4f529.firebaseapp.com',
	projectId: 'click-counter-4f529',
	storageBucket: 'click-counter-4f529.appspot.com',
	messagingSenderId: '950861743362',
	appId: '1:950861743362:web:77dc41eb31b34334566e1b',
	measurementId: 'G-7EEMWQS33Z',
}

// Lazy handle: the Firestore SDK loads on first use, off the route's critical path.
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

// Single merged setDoc with atomic increments: no read-before-write, no lost updates, creates on first write.
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
