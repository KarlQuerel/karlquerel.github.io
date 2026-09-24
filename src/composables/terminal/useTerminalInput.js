import { ref, computed, watch, nextTick } from 'vue'
import { complete, suggest } from './terminalCompletion'

// The input line: text, caret column, readline shortcuts, Tab completion and the ghost suggestion.
export function useTerminalInput({
	history,
	executeCommand,
	completionSources,
	onClear,
	onInterrupt,
}) {
	const currentInput = ref('')
	const cursorPosition = ref(0)

	watch(currentInput, value => {
		cursorPosition.value = value.length
	})

	const updateCursorPosition = event => {
		cursorPosition.value = event.target.selectionStart ?? event.target.value.length
	}

	const caretOf = el => el?.selectionStart ?? currentInput.value.length

	// next tick, or the value watcher would snap the caret back to the end
	const moveCaret = (el, caret) => {
		nextTick(() => {
			if (el) el.selectionStart = el.selectionEnd = caret
			cursorPosition.value = caret
		})
	}

	const setLine = (el, value, caret) => {
		currentInput.value = value
		moveCaret(el, caret)
	}

	const suggestion = computed(() =>
		cursorPosition.value === currentInput.value.length
			? suggest(currentInput.value, history.entries.value, completionSources.commandNames)
			: ''
	)
	const suggestionTail = computed(() => suggestion.value.slice(currentInput.value.length))

	const acceptSuggestion = el => {
		if (!suggestion.value) return false
		const full = suggestion.value
		currentInput.value = full
		nextTick(() => moveCaret(el, full.length))
		return true
	}

	// The mirror the user reads: text split around an inline block cursor, then the ghost tail.
	const caretAtEnd = computed(() => cursorPosition.value >= currentInput.value.length)
	const inputBeforeCursor = computed(() => currentInput.value.slice(0, cursorPosition.value))
	const inputAfterCursor = computed(() => currentInput.value.slice(cursorPosition.value + 1))
	const cursorChar = computed(() =>
		caretAtEnd.value && suggestionTail.value
			? suggestionTail.value.charAt(0)
			: currentInput.value.charAt(cursorPosition.value) || ' '
	)
	const ghostTail = computed(() =>
		caretAtEnd.value && suggestionTail.value ? suggestionTail.value.slice(1) : ''
	)

	const submit = async () => {
		const value = currentInput.value
		await executeCommand(value)
		history.record(value.trim())
		currentInput.value = ''
	}

	const recall = direction => {
		const line = history.step(direction)
		if (line !== null) currentInput.value = line
	}

	const ctrlShortcuts = {
		l: () => onClear(),
		c: () => {
			onInterrupt(currentInput.value)
			currentInput.value = ''
			history.reset()
		},
		a: el => moveCaret(el, 0),
		e: el => moveCaret(el, currentInput.value.length),
		u: el => setLine(el, currentInput.value.slice(caretOf(el)), 0),
		k: el => {
			const caret = caretOf(el)
			setLine(el, currentInput.value.slice(0, caret), caret)
		},
	}

	const handleKeyDown = async event => {
		const key = event.key.toLowerCase()

		if (event.ctrlKey && !event.altKey && !event.metaKey && Object.hasOwn(ctrlShortcuts, key)) {
			event.preventDefault()
			ctrlShortcuts[key](event.target)
			return
		}

		if (event.key === 'Tab') {
			event.preventDefault()
			currentInput.value = complete(currentInput.value, completionSources)
		} else if (event.key === 'Enter') {
			// submit instead of inserting a newline in the wrapping textarea
			event.preventDefault()
			await submit()
		} else if (event.key === 'ArrowUp') {
			// recall history rather than moving across wrapped lines
			event.preventDefault()
			recall(1)
		} else if (event.key === 'ArrowDown') {
			event.preventDefault()
			recall(-1)
		} else if (event.key === 'ArrowRight' || event.key === 'End') {
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
		inputBeforeCursor,
		inputAfterCursor,
		cursorChar,
		ghostTail,
		handleKeyDown,
		updateCursorPosition,
	}
}
