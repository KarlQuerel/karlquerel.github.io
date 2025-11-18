import { useState, useRef, useEffect } from 'react'

export function useTerminalTypewriter() {
	const welcomeTextRef = useRef(null)
	const [showInputPrompt, setShowInputPrompt] = useState(false)

	const typewriterSpeed = {
		speed: 6,
		startDelay: 0,
	}

	const initTypewriter = focusInput => {
		useEffect(() => {
			const initTypeIt = () => {
				if (welcomeTextRef.current && window.TypeIt) {
					new window.TypeIt(welcomeTextRef.current, {
						strings: [
							'Welcome to my website!',
							'<br>Type <span class="text-yellow">help</span> for available commands or just type anything.',
						],
						...typewriterSpeed,
						lifelike: true,
						html: true,
						cursorChar: '_',
						afterComplete: function (instance) {
							instance.destroy()
							setShowInputPrompt(true)
							setTimeout(() => {
								focusInput()
							}, 0)
						},
					}).go()
				}
			}

			initTypeIt()
		}, [focusInput])
	}

	const createCommandTypewriter = (element, content, options = {}) => {
		return new Promise(resolve => {
			setTimeout(() => {
				if (element && window.TypeIt) {
					const defaultOptions = {
						...typewriterSpeed,
						lifelike: true,
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
			}, 0)
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

