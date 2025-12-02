import { useState, useMemo, useRef, useCallback } from 'react'
import { CINEMATICS_MESSAGES, CINEMATICS_CONFIG } from '../../data/cinematicsData'

interface TypewriterSpeed {
	speed: number
	startDelay: number
	deleteSpeed: number
	breakLines: boolean
}

interface UseCinematicsTypewriterReturn {
	currentSequence: number
	shouldFadeOut: boolean
	showContinueButton: boolean
	isFourthSequence: boolean
	startSequence: (
		messageElements: HTMLElement[],
		playTypingSound: (duration: number) => void,
		stopAllAudio: () => void
	) => Promise<void>
}

export function useCinematicsTypewriter(): UseCinematicsTypewriterReturn {
	const [currentSequence, setCurrentSequence] = useState<number>(0)
	const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false)
	const [showContinueButton, setShowContinueButton] = useState<boolean>(false)
	const typewriterInstancesRef = useRef<any[]>([])

	const sequences: (readonly string[] | null)[] = [
		CINEMATICS_MESSAGES.first,
		CINEMATICS_MESSAGES.second,
		CINEMATICS_MESSAGES.third,
		null, // Fourth sequence (title screen)
	]

	const typewriterSpeed: TypewriterSpeed = {
		speed: 30, // Slower typing = more pause between messages
		startDelay: 0,
		deleteSpeed: 0, // No deletion
		breakLines: false, // No line breaks
	}

	const currentMessages = useMemo<readonly string[]>(() => {
		const messages = sequences[currentSequence]
		if (!messages) return []
		return messages
	}, [currentSequence])

	const isLastSequence = useMemo<boolean>(
		() => currentSequence === sequences.length - 1,
		[currentSequence]
	)
	const isFourthSequence = useMemo<boolean>(() => currentSequence === 3, [currentSequence])

	const nextSequence = useCallback((): boolean => {
		if (isLastSequence) return false

		setShouldFadeOut(false)
		setCurrentSequence(prev => prev + 1)
		return true
	}, [isLastSequence])

	const createSequentialTypewriter = (
		element: HTMLElement,
		messages: readonly string[],
		playTypingSound: (duration: number) => void,
		stopAllAudio: () => void
	): Promise<void> => {
		return new Promise(resolve => {
			// React's useEffect automatically waits for DOM updates
			setTimeout(() => {
				if (element && window.TypeIt) {
					// Clear any existing content first
					element.innerHTML = ''

					// Clear instances array - let TypeIt handle its own cleanup
					typewriterInstancesRef.current = []

					// Shared delay between messages
					const messageDelay = 1000

					// Create a single TypeIt instance for all messages
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const instance = new (window as any).TypeIt(element, {
						strings: [...messages], // Convert readonly array to mutable
						...typewriterSpeed,
						lifelike: true,
						html: true,
						cursor: false,
						deleteSpeed: 0,
						breakLines: true,
						nextStringDelay: messageDelay, // Use shared delay
						waitUntilVisible: true,
						afterComplete: function (_instance: any) {
							// Let TypeIt handle its own cleanup
							resolve()
						},
					}).go()

					typewriterInstancesRef.current.push(instance)

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
			}, 0)
		})
	}

	const startSequence = useCallback(
		async (
			messageElements: HTMLElement[],
			playTypingSound: (duration: number) => void,
			stopAllAudio: () => void
		): Promise<void> => {
			if (!messageElements || messageElements.length === 0) return

			// Use the first element to contain all messages sequentially
			const firstElement = messageElements[0]
			if (firstElement) {
				await createSequentialTypewriter(
					firstElement,
					currentMessages,
					playTypingSound,
					stopAllAudio
				)
			}

			// Add buffer time before fade out
			await new Promise<void>(resolve => setTimeout(resolve, 2000))

			// Trigger fade out and sequence progression
			setShouldFadeOut(true)

			setTimeout(() => {
				const hasNext = nextSequence()
				if (!hasNext) {
					// Final sequence completed - show continue button
					setTimeout(() => {
						setShowContinueButton(true)
					}, CINEMATICS_CONFIG.FADE_OUT_DELAY * 1000)
				}
			}, CINEMATICS_CONFIG.TIMEOUT_BETWEEN_BLOCKS)
		},
		[currentMessages, nextSequence]
	)


	return {
		currentSequence,
		shouldFadeOut,
		showContinueButton,
		isFourthSequence,
		startSequence,
	}
}

