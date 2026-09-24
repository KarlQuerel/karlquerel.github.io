import TypeIt from 'typeit'
import { ref, nextTick, watch } from 'vue'
import { prefersReducedMotion } from '../usePrefersReducedMotion.js'
import { LIVE_REGION_LIMIT, TYPEWRITER_CURSOR, WELCOME_MESSAGE } from '@/constants/terminal'
import { isTyped } from './terminalText'

// Uniform (non-randomised) typing: fastest, and reads as stepped/8-bit.
const TYPEIT_OPTIONS = { speed: 0, startDelay: 0, lifelike: false, cursorChar: TYPEWRITER_CURSOR }

// Text unless the line opts into html; reduced motion prints it instantly.
const typeInto = (el, content, html) =>
	new Promise(resolve => {
		if (prefersReducedMotion()) {
			if (html) el.innerHTML = content
			else el.textContent = content
			resolve()
			return
		}
		new TypeIt(el, {
			...TYPEIT_OPTIONS,
			html,
			strings: [content],
			afterComplete: instance => {
				instance.destroy()
				resolve()
			},
		}).go()
	})

const renderLink = (el, { prefix = '', link, linkText }) => {
	const anchor = document.createElement('a')
	anchor.href = link
	anchor.target = '_blank'
	anchor.className = 'terminal-link'
	anchor.textContent = linkText
	el.replaceChildren(prefix, anchor)
}

// Types the welcome line, then each scrollback line in order as TerminalLine registers its target.
export function useTerminalTypewriter({ lines, onProgress, onIdle }) {
	const welcomeTextRef = ref(null)
	const showInputPrompt = ref(false)
	const isTyping = ref(false)
	// finished lines as plain text, for the screen-reader live region
	const announcements = ref([])
	const targets = new Map()
	let announced = 0

	const announce = el => {
		announcements.value.push({ id: announced++, text: el.textContent })
		if (announcements.value.length > LIVE_REGION_LIMIT) announcements.value.shift()
	}

	const typeWelcome = () => {
		nextTick(async () => {
			await typeInto(welcomeTextRef.value, WELCOME_MESSAGE, true)
			announce(welcomeTextRef.value)
			showInputPrompt.value = true
			nextTick(() => {
				onIdle()
				onProgress()
			})
		})
	}

	async function typeNext() {
		if (isTyping.value) return
		const index = lines.value.findIndex(line => isTyped(line) && !line.animated)
		if (index < 0) {
			nextTick(onIdle)
			return
		}
		const el = targets.get(index)
		if (!el) return // not mounted yet: registerLine retries

		const line = lines.value[index]
		isTyping.value = true
		line.animated = true
		onProgress()
		if (line.link) {
			await typeInto(el, (line.prefix || '') + line.linkText, false)
			renderLink(el, line)
		} else {
			await typeInto(el, line.content, Boolean(line.html))
		}
		announce(el)
		isTyping.value = false
		nextTick(typeNext)
	}

	const registerLine = (index, el) => {
		targets.set(index, el)
		nextTick(typeNext)
	}

	const unregisterLine = index => targets.delete(index)

	watch(
		lines,
		() =>
			nextTick(() => {
				typeNext()
				onProgress()
			}),
		{ deep: true }
	)

	return {
		welcomeTextRef,
		showInputPrompt,
		isTyping,
		announcements,
		typeWelcome,
		registerLine,
		unregisterLine,
	}
}
