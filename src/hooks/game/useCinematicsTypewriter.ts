import { useState, useRef, useMemo } from 'react'
import { CINEMATICS_MESSAGES, CINEMATICS_CONFIG } from '../../data/cinematicsData'

interface UseCinematicsTypewriterReturn {
	currentSequence: number
	shouldFadeOut: boolean
	showContinueButton: boolean
	isFourthSequence: boolean
	startSequence: (
		elements: HTMLElement[],
		playTypingSound: (duration: number) => void,
		stopAllAudio: () => void
	) => void
}

// TypeItOptions is defined in global.d.ts
declare global {
	interface TypeItOptions {
		strings?: string[]
		speed?: number
		startDelay?: number
		nextStringDelay?: number
		waitUntilVisible?: boolean
		cursor?: boolean
		cursorChar?: string
		cursorSpeed?: number
		breakLines?: boolean
		html?: boolean
		lifeLike?: boolean
		lifelike?: boolean
		deleteSpeed?: number
		loop?: boolean
		loopDelay?: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		afterComplete?: (instance: any) => void
	}
}

export function useCinematicsTypewriter(): UseCinematicsTypewriterReturn {
	const [currentSequence, setCurrentSequence] = useState<number>(0)
	const [shouldFadeOut, setShouldFadeOut] = useState<boolean>(false)
	const [showContinueButton, setShowContinueButton] = useState<boolean>(false)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const typewriterInstancesRef = useRef<any[]>([])

	const sequences = useMemo(
		() => [CINEMATICS_MESSAGES.first, CINEMATICS_MESSAGES.second, CINEMATICS_MESSAGES.third],
		[]
	)

	const isFourthSequence = currentSequence >= sequences.length

	const startSequence = (
		elements: HTMLElement[],
		playTypingSound: (duration: number) => void,
		stopAllAudio: () => void
	): void => {
		if (isFourthSequence) {
			setShowContinueButton(true)
			return
		}

		const sequenceMessages = sequences[currentSequence]
		if (!sequenceMessages || elements.length === 0) return

		// Clean up previous instances
		typewriterInstancesRef.current.forEach(instance => {
			if (instance && typeof instance.destroy === 'function') {
				instance.destroy()
			}
		})
		typewriterInstancesRef.current = []
		stopAllAudio()

		const element = elements[0]
		if (!element || !window.TypeIt) return

		let messageIndex = 0

		const processNextMessage = (): void => {
			if (messageIndex >= sequenceMessages.length) {
				// Sequence complete
				setTimeout(() => {
					setShouldFadeOut(true)
					setTimeout(() => {
						setShouldFadeOut(false)
						setCurrentSequence(prev => prev + 1)
						if (currentSequence + 1 >= sequences.length) {
							setShowContinueButton(true)
						}
					}, CINEMATICS_CONFIG.FADE_OUT_DELAY * 1000)
				}, CINEMATICS_CONFIG.MESSAGE_GAP * 1000)
				return
			}

			const message = sequenceMessages[messageIndex]
			const messageLength = message.length
			const typingDuration = messageLength * CINEMATICS_CONFIG.LETTER_DELAY * 1000

			// Play typing sound
			playTypingSound(typingDuration)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const instance: any = new (window as any).TypeIt(element, {
				strings: [message],
				speed: CINEMATICS_CONFIG.LETTER_DELAY * 1000,
				startDelay: messageIndex === 0 ? CINEMATICS_CONFIG.BASE_DELAY * 1000 : 0,
				nextStringDelay: CINEMATICS_CONFIG.MESSAGE_GAP * 1000,
				html: true,
				lifeLike: true,
				cursor: false,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				afterComplete: function (completedInstance: any) {
					if (completedInstance && typeof completedInstance.destroy === 'function') {
						completedInstance.destroy()
					}
					messageIndex++
					setTimeout(() => {
						processNextMessage()
					}, CINEMATICS_CONFIG.TIMEOUT_BETWEEN_BLOCKS)
				},
			})

			typewriterInstancesRef.current.push(instance)
			instance.go()
		}

		processNextMessage()
	}

	return {
		currentSequence,
		shouldFadeOut,
		showContinueButton,
		isFourthSequence,
		startSequence,
	}
}
