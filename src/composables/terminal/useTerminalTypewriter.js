import { ref, nextTick, watch } from 'vue'
import { prefersReducedMotion } from '../usePrefersReducedMotion.js'
import {
	LIVE_REGION_LIMIT,
	TYPEWRITER_CPS,
	TYPEWRITER_CURSOR,
	WELCOME_MESSAGE,
} from '@/constants/terminal'
import { isTyped } from './terminalText'

// Parsed detached so entities decode and tags keep their classes; plain text never hits the parser.
const parseContent = (content, html) => {
	const template = document.createElement('template')
	if (html) template.innerHTML = content
	else template.content.append(content)
	return template.content
}

const textNodesOf = fragment => {
	const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT)
	const nodes = []
	for (let node = walker.nextNode(); node; node = walker.nextNode()) nodes.push(node)
	return nodes
}

// Mounts the markup at once with its text emptied, then refills the text nodes character by
// character at TYPEWRITER_CPS from elapsed time, so the pace holds at any frame rate.
const typeInto = (el, content, html) =>
	new Promise(resolve => {
		const fragment = parseContent(content, html)
		if (prefersReducedMotion()) {
			el.replaceChildren(fragment)
			resolve()
			return
		}
		const slots = textNodesOf(fragment).map(node => ({ node, text: node.data }))
		const total = slots.reduce((sum, slot) => sum + slot.text.length, 0)
		for (const slot of slots) slot.node.data = ''
		const cursor = document.createTextNode(TYPEWRITER_CURSOR)
		el.replaceChildren(fragment, cursor)

		const start = performance.now()
		const step = now => {
			// an unmounted target (clear mid-line) just finishes silently
			const revealed = el.isConnected
				? Math.min(total, Math.max(0, Math.floor(((now - start) * TYPEWRITER_CPS) / 1000)))
				: total
			let remaining = revealed
			for (const { node, text } of slots) {
				const shown = Math.min(text.length, remaining)
				if (node.data.length !== shown) node.data = text.slice(0, shown)
				remaining -= shown
			}
			if (revealed < total) {
				requestAnimationFrame(step)
				return
			}
			cursor.remove()
			resolve()
		}
		requestAnimationFrame(step)
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
