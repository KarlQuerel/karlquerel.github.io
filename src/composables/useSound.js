import { ref } from 'vue'
import { SOUND } from '@/constants/sound'

const read = () => {
	try {
		const stored = localStorage.getItem(SOUND.storageKey)
		return stored === null ? SOUND.onByDefault : stored === 'on'
	} catch {
		return SOUND.onByDefault
	}
}

// one setting for every page that makes sound
const soundOn = ref(read())

export function useSound() {
	const setSound = on => {
		soundOn.value = on
		try {
			localStorage.setItem(SOUND.storageKey, on ? 'on' : 'off')
		} catch {
			// storage blocked: the setting lasts this visit
		}
	}
	return { soundOn, setSound }
}
