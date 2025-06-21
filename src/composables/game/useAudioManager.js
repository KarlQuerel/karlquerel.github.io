import { ref, onUnmounted } from 'vue'

export function useAudioManager() {
	const bgMusic = ref(null)
	const clickSound = ref(null)

	const initAudio = () => {
		if (bgMusic.value) {
			bgMusic.value.volume = 1
		}
		if (clickSound.value) {
			clickSound.value.volume = 1
			clickSound.value.load()
		}
	}

	const playBackgroundMusic = async () => {
		if (bgMusic.value) {
			try {
				bgMusic.value.volume = 1
				await bgMusic.value.play()
			} catch (error) {}
		}
	}

	const playClickSound = async () => {
		if (clickSound.value) {
			try {
				clickSound.value.currentTime = 0
				await clickSound.value.play()
			} catch (error) {}
		}
	}

	const cleanup = () => {
		if (bgMusic.value) {
			bgMusic.value.pause()
			bgMusic.value.currentTime = 0
		}
		if (clickSound.value) {
			clickSound.value.pause()
			clickSound.value.currentTime = 0
		}
	}

	onUnmounted(() => {
		cleanup()
	})

	return {
		bgMusic,
		clickSound,
		initAudio,
		playBackgroundMusic,
		playClickSound,
		cleanup,
	}
}
