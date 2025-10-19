import { ref, nextTick, computed } from 'vue'
import { CINEMATICS_MESSAGES, CINEMATICS_CONFIG } from '@/data/cinematicsData'

export function useCinematicsTypewriter() {
	const currentSequence = ref(0)
	const shouldFadeOut = ref(false)
	const showContinueButton = ref(false)
	const typewriterInstances = ref([])

	const sequences = [
		CINEMATICS_MESSAGES.first,
		CINEMATICS_MESSAGES.second,
		CINEMATICS_MESSAGES.third,
		null, // Fourth sequence (title screen)
	]

	const typewriterSpeed = {
		speed: 30, // Slower typing = more pause between messages
		startDelay: 0,
		deleteSpeed: 0, // No deletion
		breakLines: false, // No line breaks
	}

	const currentMessages = computed(() => {
		const messages = sequences[currentSequence.value]
		if (!messages) return []
		return messages
	})

	const isLastSequence = computed(() => currentSequence.value === sequences.length - 1)
	const isFourthSequence = computed(() => currentSequence.value === 3)

	const createSequentialTypewriter = (element, messages, playTypingSound, stopAllAudio) => {
		return new Promise(resolve => {
			nextTick(() => {
				if (element && window.TypeIt) {
					// Clear any existing content first
					element.innerHTML = ''

					// Clear instances array - let TypeIt handle its own cleanup
					typewriterInstances.value = []

					// Shared delay between messages
					const messageDelay = 1000 //

					// Create a single TypeIt instance for all messages
					const instance = new window.TypeIt(element, {
						strings: messages, // Join messages with line breaks
						...typewriterSpeed,
						lifelike: true,
						html: true,
						cursor: false,
						deleteSpeed: 0,
						breakLines: true,
						nextStringDelay: messageDelay, // Use shared delay
						waitUntilVisible: true,
						afterComplete: function (_instance) {
							// Let TypeIt handle its own cleanup
							resolve()
						},
					}).go()

					typewriterInstances.value.push(instance)

					// Play typing sound for each message as it starts
					if (playTypingSound && stopAllAudio) {
						// Calculate audio timing to match TypeIt's actual behavior
						let totalTime = 0
						messages.forEach((message, _index) => {
							// Calculate duration based on actual message length
							// TypeIt speed: 30 = ~33ms per character
							const messageDuration = message.length * 33
							const messageStartTime = totalTime

							setTimeout(() => {
								stopAllAudio() // Stop any currently playing audio
								playTypingSound(messageDuration)
							}, messageStartTime)

							// Add message duration + delay for next message
							totalTime += messageDuration + messageDelay
						})
					}
				} else {
					resolve()
				}
			})
		})
	}

	const startSequence = async (messageElements, playTypingSound, stopAllAudio) => {
		if (!messageElements || messageElements.length === 0) return

		// Use the first element to contain all messages sequentially
		const firstElement = messageElements[0]
		if (firstElement) {
			await createSequentialTypewriter(
				firstElement,
				currentMessages.value,
				playTypingSound,
				stopAllAudio
			)
		}

		// Add buffer time before fade out
		await new Promise(resolve => setTimeout(resolve, 2000))

		// Trigger fade out and sequence progression
		shouldFadeOut.value = true

		setTimeout(() => {
			const hasNext = nextSequence()
			if (!hasNext) {
				// Final sequence completed - show continue button
				setTimeout(() => {
					showContinueButton.value = true
				}, CINEMATICS_CONFIG.FADE_OUT_DELAY * 1000)
			}
		}, CINEMATICS_CONFIG.TIMEOUT_BETWEEN_BLOCKS)
	}

	const nextSequence = () => {
		if (isLastSequence.value) return false

		shouldFadeOut.value = false
		currentSequence.value++
		console.log('Sequence advanced to:', currentSequence.value)
		return true
	}

	const reset = () => {
		currentSequence.value = 0
		shouldFadeOut.value = false
		showContinueButton.value = false
		// Clean up any existing typewriter instances
		typewriterInstances.value.forEach(instance => {
			if (instance && typeof instance.destroy === 'function') {
				instance.destroy()
			}
		})
		typewriterInstances.value = []
	}

	return {
		currentSequence,
		shouldFadeOut,
		showContinueButton,
		currentMessages,
		isLastSequence,
		isFourthSequence,
		startSequence,
		nextSequence,
		reset,
		typewriterSpeed,
	}
}
