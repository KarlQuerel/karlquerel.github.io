import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore'

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

export async function updateClicks() {
	await updateDoc(clickRef, { count: increment(1) })
}

export async function loadClicks() {
	const docSnap = await getDoc(clickRef)
	return docSnap.exists() ? docSnap.data().count : 0
}
