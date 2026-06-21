import { ref, computed, watch, nextTick } from 'vue'
import { HISTORY_STORAGE_KEY, HISTORY_LIMIT } from '@/constants/terminal'

// Owns the input line: current text, cursor column, tab-completion, readline
// shortcuts and the recall history (persisted to localStorage so arrow-up
// survives reloads). Everything is driven off `cursorPosition` (a
// column index); the monospace font lets the component place the block cursor
// with a simple `1ch` offset.
export function useTerminalInput({
	executeCommand,
	commands,
	executableScripts,
	themeNames,
	fsComplete,
	onClear,
	onInterrupt,
}) {
	const currentInput = ref('')
	const commandHistory = ref(loadHistory())
	const historyIndex = ref(-1)
	const cursorPosition = ref(0)

	function loadHistory() {
		try {
			const raw = localStorage.getItem(HISTORY_STORAGE_KEY)
			return raw ? JSON.parse(raw) : []
		} catch {
			return []
		}
	}

	const persistHistory = () => {
		try {
			localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(commandHistory.value))
		} catch {
			// Storage can be unavailable (private mode); recall just won't persist.
		}
	}

	// Keep the cursor column in sync whenever the text changes (typing, tab,
	// history recall). Field-level edits refine it via updateCursorPosition.
	watch(currentInput, newValue => {
		cursorPosition.value = newValue.length
	})

	const updateCursorPosition = event => {
		const input = event?.target || document.querySelector('.terminal-input')
		if (input) {
			cursorPosition.value = input.selectionStart ?? input.value.length
		}
	}

	// --- readline-style line editing ---------------------------------------
	const caretOf = el => el?.selectionStart ?? currentInput.value.length

	// Replace the line and place the caret; the value-change watcher would snap
	// the caret to the end, so we set the final position in the next tick.
	const setLine = (el, value, caret) => {
		currentInput.value = value
		nextTick(() => {
			if (el) el.selectionStart = el.selectionEnd = caret
			cursorPosition.value = caret
		})
	}

	const moveCaret = (el, caret) => {
		nextTick(() => {
			if (el) el.selectionStart = el.selectionEnd = caret
			cursorPosition.value = caret
		})
	}

	const killToStart = el => setLine(el, currentInput.value.slice(caretOf(el)), 0)
	const killToEnd = el => {
		const caret = caretOf(el)
		setLine(el, currentInput.value.slice(0, caret), caret)
	}

	// --- tab completion ----------------------------------------------------
	const longestCommonPrefix = items => {
		if (items.length === 0) return ''
		let prefix = items[0]
		for (const item of items) {
			while (!item.startsWith(prefix)) prefix = prefix.slice(0, -1)
			if (!prefix) break
		}
		return prefix
	}

	// Candidates for the token under completion: command names (or ./scripts)
	// for the first word, theme names after `theme`, otherwise filesystem paths.
	const tabCandidates = () => {
		const parts = currentInput.value.split(' ')
		if (parts.length === 1) {
			const token = parts[0]
			if (token.startsWith('./')) {
				const name = token.slice(2).toLowerCase()
				return Object.keys(executableScripts)
					.filter(script => script.toLowerCase().startsWith(name))
					.sort()
					.map(script => './' + script)
			}
			return Object.keys(commands)
				.filter(name => name.startsWith(token.toLowerCase()))
				.sort()
		}
		const command = parts[0].toLowerCase()
		const token = parts[parts.length - 1]
		if (command === 'theme') {
			return (themeNames || []).filter(name => name.startsWith(token.toLowerCase())).sort()
		}
		if (command === 'help' || command === 'man') {
			return Object.keys(commands)
				.filter(name => name.startsWith(token.toLowerCase()))
				.sort()
		}
		return fsComplete ? fsComplete(token) : []
	}

	const handleTabCompletion = () => {
		const candidates = tabCandidates()
		if (candidates.length === 0) return

		const parts = currentInput.value.split(' ')
		const token = parts[parts.length - 1]
		const replaceLast = value => {
			parts[parts.length - 1] = value
			currentInput.value = parts.join(' ')
		}

		if (candidates.length === 1) {
			replaceLast(candidates[0])
			return
		}
		// Multiple matches: complete as far as their shared prefix.
		const prefix = longestCommonPrefix(candidates)
		if (prefix.length > token.length) {
			replaceLast(prefix)
		}
	}

	// --- autosuggestion (fish-style ghost text) ----------------------------
	// The best continuation of what's typed: most-recent matching history entry
	// first, then a command name. Only when the caret sits at the very end — a
	// suggestion trailing a mid-line caret would just be noise.
	const suggestion = computed(() => {
		const value = currentInput.value
		if (!value || cursorPosition.value !== value.length) return ''
		const fromHistory = commandHistory.value.find(
			entry => entry.startsWith(value) && entry.length > value.length
		)
		if (fromHistory) return fromHistory
		if (!value.includes(' ')) {
			const fromCommand = Object.keys(commands)
				.sort()
				.find(name => name.startsWith(value) && name.length > value.length)
			if (fromCommand) return fromCommand
		}
		return ''
	})

	// What the component renders greyed-out after the caret.
	const suggestionTail = computed(() =>
		suggestion.value ? suggestion.value.slice(currentInput.value.length) : ''
	)

	// Commit the ghost suggestion as real input (caret to the new end).
	const acceptSuggestion = el => {
		if (!suggestion.value) return false
		const full = suggestion.value
		currentInput.value = full
		nextTick(() => moveCaret(el, full.length))
		return true
	}

	// --- submit / history --------------------------------------------------
	const submit = async () => {
		const value = currentInput.value
		await executeCommand(value)

		const trimmed = value.trim()
		if (trimmed && commandHistory.value[0] !== trimmed) {
			commandHistory.value.unshift(trimmed)
			if (commandHistory.value.length > HISTORY_LIMIT) {
				commandHistory.value.length = HISTORY_LIMIT
			}
			persistHistory()
		}

		historyIndex.value = -1
		currentInput.value = ''
	}

	const navigateHistory = direction => {
		if (commandHistory.value.length === 0) return

		historyIndex.value += direction

		if (historyIndex.value < 0) {
			historyIndex.value = -1
			currentInput.value = ''
		} else if (historyIndex.value >= commandHistory.value.length) {
			historyIndex.value = commandHistory.value.length - 1
		}

		if (historyIndex.value >= 0) {
			currentInput.value = commandHistory.value[historyIndex.value]
		}

		nextTick(() => updateCursorPosition())
	}

	const focusInput = terminalInput => {
		terminalInput?.focus()
	}

	const handleKeyDown = async event => {
		const key = event.key.toLowerCase()

		// Ctrl shortcuts (readline-style), only when no other modifier is held.
		if (event.ctrlKey && !event.altKey && !event.metaKey) {
			if (key === 'l') {
				event.preventDefault()
				onClear?.()
				return
			}
			if (key === 'c') {
				event.preventDefault()
				onInterrupt?.(currentInput.value)
				currentInput.value = ''
				historyIndex.value = -1
				return
			}
			if (key === 'a') {
				event.preventDefault()
				moveCaret(event.target, 0)
				return
			}
			if (key === 'e') {
				event.preventDefault()
				moveCaret(event.target, currentInput.value.length)
				return
			}
			if (key === 'u') {
				event.preventDefault()
				killToStart(event.target)
				return
			}
			if (key === 'k') {
				event.preventDefault()
				killToEnd(event.target)
				return
			}
		}

		if (event.key === 'Tab') {
			event.preventDefault()
			handleTabCompletion()
		} else if (event.key === 'Enter') {
			// Submit instead of inserting a newline in the (wrapping) textarea.
			event.preventDefault()
			await submit()
		} else if (event.key === 'ArrowUp') {
			// Up/Down recall history rather than moving across wrapped lines.
			event.preventDefault()
			navigateHistory(1)
		} else if (event.key === 'ArrowDown') {
			event.preventDefault()
			navigateHistory(-1)
		} else if (event.key === 'ArrowRight' || event.key === 'End') {
			// Accept the ghost suggestion when the caret is already at the end;
			// otherwise let the key move the caret as usual.
			if (
				caretOf(event.target) === currentInput.value.length &&
				acceptSuggestion(event.target)
			) {
				event.preventDefault()
			} else {
				nextTick(() => updateCursorPosition(event))
			}
		} else if (event.key === 'ArrowLeft') {
			nextTick(() => updateCursorPosition(event))
		}
	}

	return {
		currentInput,
		cursorPosition,
		commandHistory,
		suggestionTail,
		handleKeyDown,
		focusInput,
		updateCursorPosition,
	}
}
