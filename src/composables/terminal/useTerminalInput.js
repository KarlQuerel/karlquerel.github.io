import { ref, watch, nextTick } from 'vue'

export function useTerminalInput(executeCommand, commands, availableFiles, executableScripts) {
	const currentInput = ref('')
	const commandHistory = ref([])
	const historyIndex = ref(-1)
	const cursorPosition = ref(0)

	// Tab completion state
	const tabMatches = ref([])
	const tabIndex = ref(-1)
	const isTabbing = ref(false)
	const originalTabPattern = ref('')

	// Watch currentInput to update cursor position
	watch(currentInput, newValue => {
		cursorPosition.value = newValue.length
	})

	// Update cursor position based on input field selection
	const updateCursorPosition = event => {
		const input = event?.target || document.querySelector('.terminal-input')
		if (input) {
			cursorPosition.value = input.selectionStart || input.value.length
		}
	}

	// Tab completion handler
	const handleTabCompletion = () => {
		const input = currentInput.value
		const parts = input.split(' ')
		const command = parts[0]
		const currentArg = parts.length > 1 ? parts[parts.length - 1] : ''

		if (!isTabbing.value) {
			isTabbing.value = true
			tabMatches.value = []
			tabIndex.value = -1

			if (parts.length === 1) {
				if (command.startsWith('./')) {
					const scriptName = command.substring(2)
					originalTabPattern.value = scriptName
					const scriptNames = [...Object.keys(executableScripts), 'i_am_not_a_virus.exe']
					tabMatches.value = scriptNames
						.filter(script => script.toLowerCase().startsWith(scriptName.toLowerCase()))
						.map(script => './' + script)
						.sort()
				} else {
					originalTabPattern.value = command
					const commandNames = Object.keys(commands)
					tabMatches.value = commandNames
						.filter(cmd => cmd.toLowerCase().startsWith(command.toLowerCase()))
						.sort()
				}
			} else if (command.toLowerCase() === 'cat' && parts.length === 2) {
				originalTabPattern.value = currentArg
				tabMatches.value = availableFiles
					.filter(file => file.toLowerCase().startsWith(currentArg.toLowerCase()))
					.sort()
			}
		}

		if (tabMatches.value.length > 0) {
			tabIndex.value = (tabIndex.value + 1) % tabMatches.value.length

			if (parts.length === 1) {
				currentInput.value = tabMatches.value[tabIndex.value]
			} else if (command.toLowerCase() === 'cat') {
				parts[parts.length - 1] = tabMatches.value[tabIndex.value]
				currentInput.value = parts.join(' ')
			}

			nextTick(() => {
				const cursorPosition = currentInput.value.length
				document.documentElement.style.setProperty(
					'--cursor-position',
					cursorPosition.toString()
				)
			})
		}
	}

	// Handle key events
	const handleKeyDown = async event => {
		if (event.key === 'Tab') {
			event.preventDefault()
			handleTabCompletion()
		} else if (event.key === 'Enter') {
			await executeCommand(currentInput.value)
			commandHistory.value.unshift(currentInput.value)
			historyIndex.value = -1
			currentInput.value = ''
			isTabbing.value = false
			tabMatches.value = []
			tabIndex.value = -1
			originalTabPattern.value = ''
		} else if (event.key === 'ArrowUp') {
			navigateHistory(-1)
			isTabbing.value = false
			tabMatches.value = []
			tabIndex.value = -1
			originalTabPattern.value = ''
		} else if (event.key === 'ArrowDown') {
			navigateHistory(1)
			isTabbing.value = false
			tabMatches.value = []
			tabIndex.value = -1
			originalTabPattern.value = ''
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			// Update cursor position after arrow key movement
			nextTick(() => {
				updateCursorPosition(event)
			})
		} else {
			isTabbing.value = false
			tabMatches.value = []
			tabIndex.value = -1
			originalTabPattern.value = ''
		}
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

		// Update cursor position after history navigation
		nextTick(() => {
			updateCursorPosition()
		})
	}

	const focusInput = terminalInput => {
		if (terminalInput) {
			terminalInput.focus()
		}
	}

	return {
		currentInput,
		commandHistory,
		historyIndex,
		cursorPosition,
		tabMatches,
		tabIndex,
		isTabbing,
		originalTabPattern,
		handleKeyDown,
		focusInput,
		updateCursorPosition,
	}
}
