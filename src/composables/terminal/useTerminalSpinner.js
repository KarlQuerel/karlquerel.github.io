import { ref } from 'vue'
import { SPINNER_FRAMES, SPINNER_FRAME_MS } from '@/constants/terminal'

// Kept out of the scrollback: it is transient UI, and parking it there collides with the typewriter.
export function useTerminalSpinner() {
	const isSpinning = ref(false)
	const spinnerFrame = ref('')

	const startSpinner = () => {
		isSpinning.value = true
		let i = 0
		spinnerFrame.value = SPINNER_FRAMES[0]
		const timer = setInterval(() => {
			i = (i + 1) % SPINNER_FRAMES.length
			spinnerFrame.value = SPINNER_FRAMES[i]
		}, SPINNER_FRAME_MS)
		return () => {
			clearInterval(timer)
			isSpinning.value = false
			spinnerFrame.value = ''
		}
	}

	const spinFor = async (ms, finish) => {
		const stop = startSpinner()
		try {
			await new Promise(resolve => setTimeout(resolve, ms))
			finish()
		} finally {
			stop()
		}
	}

	return { isSpinning, spinnerFrame, startSpinner, spinFor }
}
