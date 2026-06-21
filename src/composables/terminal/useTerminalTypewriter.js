import { ref, nextTick } from 'vue'

// Honour the user's OS-level motion preference: when reduced motion is on we
// print output instantly instead of typing it out character-by-character.
const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useTerminalTypewriter() {
	const welcomeTextRef = ref(null)
	const showInputPrompt = ref(false)

	const welcomeMessage =
		'Type <span class="text-yellow">help</span> for available commands or just type anything.'

	const typewriterSpeed = {
		speed: 0,
		startDelay: 0,
		// Uniform (non-randomised) typing: fastest, and reads as stepped/8-bit.
		lifelike: false,
	}

	const initTypewriter = focusInput => {
		nextTick(() => {
			if (prefersReducedMotion()) {
				if (welcomeTextRef.value) welcomeTextRef.value.innerHTML = welcomeMessage
				showInputPrompt.value = true
				nextTick(focusInput)
				return
			}

			const initTypeIt = () => {
				if (welcomeTextRef.value && window.TypeIt) {
					new window.TypeIt(welcomeTextRef.value, {
						strings: [welcomeMessage],
						...typewriterSpeed,
						html: true,
						cursorChar: '_',
						afterComplete: function (instance) {
							instance.destroy()
							showInputPrompt.value = true
							nextTick(() => {
								focusInput()
							})
						},
					}).go()
				}
			}

			initTypeIt()
		})
	}

	const createCommandTypewriter = (element, content, options = {}) => {
		return new Promise(resolve => {
			nextTick(() => {
				if (element && prefersReducedMotion()) {
					element.innerHTML = content
					resolve()
				} else if (element && window.TypeIt) {
					const defaultOptions = {
						...typewriterSpeed,
						html: true,
						cursorChar: '_',
						afterComplete: function (instance) {
							instance.destroy()
							resolve()
						},
					}

					new window.TypeIt(element, {
						...defaultOptions,
						...options,
						strings: [content],
					}).go()
				} else {
					resolve()
				}
			})
		})
	}

	return {
		welcomeTextRef,
		showInputPrompt,
		initTypewriter,
		createCommandTypewriter,
		typewriterSpeed,
	}
}
