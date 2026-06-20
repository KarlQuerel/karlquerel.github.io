import { ref, nextTick } from 'vue'

export function useTerminalTypewriter() {
	const welcomeTextRef = ref(null)
	const showInputPrompt = ref(false)

	const typewriterSpeed = {
		speed: 0,
		startDelay: 0,
		// Uniform (non-randomised) typing: fastest, and reads as stepped/8-bit.
		lifelike: false,
	}

	const initTypewriter = focusInput => {
		nextTick(() => {
			const initTypeIt = () => {
				if (welcomeTextRef.value && window.TypeIt) {
					new window.TypeIt(welcomeTextRef.value, {
						strings: [
							'Type <span class="text-yellow">help</span> for available commands or just type anything.',
						],
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
				if (element && window.TypeIt) {
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
