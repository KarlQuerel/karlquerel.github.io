import { useState, useEffect } from 'react'

interface UseTerminalInputParams {
	executeCommand: (command: string) => Promise<void>
	commands: Record<string, () => unknown[]>
	availableFiles: string[]
	executableScripts: Record<string, () => unknown[]>
}

interface UseTerminalInputReturn {
	currentInput: string
	setCurrentInput: (input: string) => void
	cursorPosition: number
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
	focusInput: (terminalInput: HTMLInputElement | null) => void
	updateCursorPosition: () => void
}

export function useTerminalInput(
	executeCommand: UseTerminalInputParams['executeCommand'],
	commands: UseTerminalInputParams['commands'],
	availableFiles: UseTerminalInputParams['availableFiles'],
	executableScripts: UseTerminalInputParams['executableScripts']
): UseTerminalInputReturn {
	const [currentInput, setCurrentInput] = useState<string>('')
	const [commandHistory, setCommandHistory] = useState<string[]>([])
	const [historyIndex, setHistoryIndex] = useState<number>(-1)
	const [cursorPosition, setCursorPosition] = useState<number>(0)

	// Tab completion state
	const [_tabMatches, setTabMatches] = useState<string[]>([])
	const [_tabIndex, setTabIndex] = useState<number>(-1)
	const [_isTabbing, setIsTabbing] = useState<boolean>(false)

	// Update cursor position when input changes
	useEffect(() => {
		setCursorPosition(currentInput.length)
	}, [currentInput])

	// Update cursor position based on input field selection
	const updateCursorPosition = (): void => {
		const input = document.querySelector<HTMLInputElement>('.terminal-input')
		if (input) {
			setCursorPosition(input.selectionStart || input.value.length)
		}
	}

	// Tab completion handler
	const handleTabCompletion = (): void => {
		const input = currentInput
		const parts = input.split(' ')
		const command = parts[0]
		const currentArg = parts.length > 1 ? parts[parts.length - 1] : ''

		setIsTabbing(prev => {
			if (!prev) {
				// First tab press - find matches
				let matches: string[] = []
				if (parts.length === 1) {
					if (command.startsWith('./')) {
						const scriptName = command.substring(2)
						const scriptNames = [...Object.keys(executableScripts), 'i_am_not_a_virus.exe']
						matches = scriptNames
							.filter(script => script.toLowerCase().startsWith(scriptName.toLowerCase()))
							.map(script => './' + script)
							.sort()
					} else {
						const commandNames = Object.keys(commands)
						matches = commandNames
							.filter(cmd => cmd.toLowerCase().startsWith(command.toLowerCase()))
							.sort()
					}
				} else if (command.toLowerCase() === 'cat' && parts.length === 2) {
					matches = availableFiles
						.filter(file => file.toLowerCase().startsWith(currentArg.toLowerCase()))
						.sort()
				}
				setTabMatches(matches)
				setTabIndex(-1)
				return true
			}
			return prev
		})

		// Cycle through matches
		setTabMatches(prevMatches => {
			if (prevMatches.length > 0) {
				setTabIndex(prevIndex => {
					const newIndex = (prevIndex + 1) % prevMatches.length
					let newInput = ''

					if (parts.length === 1) {
						newInput = prevMatches[newIndex]
						setCurrentInput(newInput)
					} else if (command.toLowerCase() === 'cat') {
						const newParts = [...parts]
						newParts[newParts.length - 1] = prevMatches[newIndex]
						newInput = newParts.join(' ')
						setCurrentInput(newInput)
					}

					// Update CSS variable for cursor position
					setTimeout(() => {
						document.documentElement.style.setProperty('--cursor-position', newInput.length.toString())
					}, 0)

					return newIndex
				})
			}
			return prevMatches
		})
	}

	// Handle key events
	const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
		if (event.key === 'Tab') {
			event.preventDefault()
			handleTabCompletion()
		} else if (event.key === 'Enter') {
			await executeCommand(currentInput)
			setCommandHistory(prev => [currentInput, ...prev])
			setHistoryIndex(-1)
			setCurrentInput('')
			setIsTabbing(false)
			setTabMatches([])
			setTabIndex(-1)
		} else if (event.key === 'ArrowUp') {
			navigateHistory(1)
			setIsTabbing(false)
			setTabMatches([])
			setTabIndex(-1)
		} else if (event.key === 'ArrowDown') {
			navigateHistory(-1)
			setIsTabbing(false)
			setTabMatches([])
			setTabIndex(-1)
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			// React's useEffect will handle this automatically after state updates
			setTimeout(() => {
				updateCursorPosition()
			}, 0)
		} else {
			setIsTabbing(false)
			setTabMatches([])
			setTabIndex(-1)
		}
	}

	const navigateHistory = (direction: number): void => {
		if (commandHistory.length === 0) return

		const newIndex = historyIndex + direction

		if (newIndex < 0) {
			setHistoryIndex(-1)
			setCurrentInput('')
		} else if (newIndex >= commandHistory.length) {
			setHistoryIndex(commandHistory.length - 1)
		} else {
			setHistoryIndex(newIndex)
			setCurrentInput(commandHistory[newIndex])
		}

		// React's useEffect will handle this automatically
		setTimeout(() => {
			updateCursorPosition()
		}, 0)
	}

	const focusInput = (terminalInput: HTMLInputElement | null): void => {
		if (terminalInput) {
			terminalInput.focus()
		}
	}

	return {
		currentInput,
		setCurrentInput,
		cursorPosition,
		handleKeyDown,
		focusInput,
		updateCursorPosition,
	}
}

