import { ref } from 'vue'

export function useCinematicsAudio() {
	const audioPool = ref([])
	const POOL_SIZE = 3 // Reduced from 5
	let currentAudioIndex = 0

	const initAudioPool = () => {
		for (let i = 0; i < POOL_SIZE; i++) {
			const audio = new Audio('/assets/sound/typing.mp3')
			audio.volume = 0.35
			audio.preload = 'auto'
			audioPool.value.push(audio)
		}
	}

	const playTypingSound = duration => {
		if (audioPool.value.length === 0) return

		const audio = audioPool.value[currentAudioIndex]
		audio.currentTime = 0
		audio.loop = true

		const playPromise = audio.play()
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					setTimeout(() => {
						audio.loop = false
						audio.pause()
						audio.currentTime = 0
					}, duration * 1000)
				})
				.catch(() => {
					audio.load()
				})
		}

		currentAudioIndex = (currentAudioIndex + 1) % POOL_SIZE
	}

	const cleanup = () => {
		audioPool.value.forEach(audio => {
			audio.pause()
			audio.currentTime = 0
		})
	}

	return {
		initAudioPool,
		playTypingSound,
		cleanup,
	}
}
