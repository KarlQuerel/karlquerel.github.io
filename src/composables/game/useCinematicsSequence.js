import { ref, computed } from 'vue'
import { CINEMATICS_MESSAGES, CINEMATICS_CONFIG } from '@/data/cinematicsData'

export function useCinematicsSequence() {
	const currentSequence = ref(0)
	const shouldFadeOut = ref(false)
	const { LETTER_DELAY, MESSAGE_GAP, BASE_DELAY } = CINEMATICS_CONFIG

	const sequences = [
		CINEMATICS_MESSAGES.first,
		CINEMATICS_MESSAGES.second,
		CINEMATICS_MESSAGES.third,
		null, // Fourth sequence (title screen)
	]

	const currentMessages = computed(() => {
		const messages = sequences[currentSequence.value]
		if (!messages) return []

		return messages.map((text, index) => {
			const previousMessages = messages.slice(0, index)
			const totalPreviousDelay = previousMessages.reduce((acc, msg) => {
				return acc + msg.length * LETTER_DELAY + MESSAGE_GAP
			}, 0)

			return {
				text,
				startDelay: BASE_DELAY + totalPreviousDelay,
				messageDuration: text.length * LETTER_DELAY,
				messageId: `${currentSequence.value}-${index}`,
			}
		})
	})

	const isLastSequence = computed(() => currentSequence.value === sequences.length - 1)
	const isFourthSequence = computed(() => currentSequence.value === 3)

	const nextSequence = () => {
		if (isLastSequence.value) return false

		shouldFadeOut.value = true

		setTimeout(() => {
			shouldFadeOut.value = false
			currentSequence.value++
		}, CINEMATICS_CONFIG.TIMEOUT_BETWEEN_BLOCKS)

		return true
	}

	const reset = () => {
		currentSequence.value = 0
		shouldFadeOut.value = false
	}

	return {
		currentSequence,
		shouldFadeOut,
		currentMessages,
		isLastSequence,
		isFourthSequence,
		nextSequence,
		reset,
	}
}
