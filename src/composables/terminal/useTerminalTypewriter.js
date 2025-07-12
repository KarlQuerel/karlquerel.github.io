import { ref, nextTick } from 'vue'

export function useTerminalTypewriter() {
	const welcomeTextRef = ref(null)
	const showInputPrompt = ref(false)

	const initTypewriter = focusInput => {
		nextTick(() => {
			const initTypeIt = () => {
				if (welcomeTextRef.value && window.TypeIt) {
					new window.TypeIt(welcomeTextRef.value, {
						strings: [
							'Welcome to my website!',
							'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.',
						],
						speed: 50,
						lifelike: true,
						startDelay: 500,
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

	return {
		welcomeTextRef,
		showInputPrompt,
		initTypewriter,
	}
}
