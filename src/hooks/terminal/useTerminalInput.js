import { useState, useEffect, useCallback } from 'react'

export function useTerminalInput(executeCommand, commands, availableFiles, executableScripts) {
	const [currentInput, setCurrentInput] = useState('')
	const [commandHistory, setCommandHistory] = useState([])
	const [historyIndex, setHistoryIndex] = useState(-1)
	const [cursorPosition, setCursorPosition] = useState(0)

	// Tab completion state
	const [tabMatches, setTabMatches] = useState([])
	const [tabIndex, setTabIndex] = useState(-1)
	const [isTabbing, setIsTabbing] = useState(false)

	// Update cursor position based on input value
	useEffect(() => {
		setCursorPosition(currentInput.length)
	}, [currentInput])

	// Update cursor position based on input field selection
	const updateCursorPosition = useCallback(event => {
		const input = event?.target || document.querySelector('.terminal-input')
		if (input) {
			setCursorPosition(input.selectionStart || input.value.length)
		}
	}, [])

	// Tab completion handler
	const handleTabCompletion = useCallback(() => {
		const input = currentInput
		const parts = input.split(' ')
		const command = parts[0]
		const currentArg = parts.length > 1 ? parts[parts.length - 1] : ''

		if (!isTabbing) {
			setIsTabbing(true)
			setTabMatches([])
			setTabIndex(-1)

			if (parts.length === 1) {
				if (command.startsWith('./')) {
					const scriptName = command.substring(2)
					const scriptNames = [...Object.keys(executableScripts), 'i_am_not_a_virus.exe']
					const matches = scriptNames
						.filter(script => script.toLowerCase().startsWith(scriptName.toLowerCase()))
						.map(script => './' + script)
						.sort()
					setTabMatches(matches)
				} else {
					const commandNames = Object.keys(commands)
					const matches = commandNames
						.filter(cmd => cmd.toLowerCase().startsWith(command.toLowerCase()))
						.sort()
					setTabMatches(matches)
				}
			} else if (command.toLowerCase() === 'cat' && parts.length === 2) {
				const matches = availableFiles
					.filter(file => file.toLowerCase().startsWith(currentArg.toLowerCase()))
					.sort()
				setTabMatches(matches)
			}
		}

		if (tabMatches.length > 0) {
			const newIndex = (tabIndex + 1) % tabMatches.length
			setTabIndex(newIndex)

			if (parts.length === 1) {
				setCurrentInput(tabMatches[newIndex])
			} else if (command.toLowerCase() === 'cat') {
				parts[parts.length - 1] = tabMatches[newIndex]
				setCurrentInput(parts.join(' '))
			}

			setTimeout(() => {
				const cursorPos = currentInput.length
				document.documentElement.style.setProperty('--cursor-position', cursorPos.toString())
			}, 0)
		}
	}, [currentInput, commands, availableFiles, executableScripts, isTabbing, tabMatches, tabIndex])

	// Navigate history
	const navigateHistory = useCallback(
		direction => {
			if (commandHistory.length === 0) return

			let newIndex = historyIndex + direction

			if (newIndex < 0) {
				newIndex = -1
				setCurrentInput('')
			} else if (newIndex >= commandHistory.length) {
				newIndex = commandHistory.length - 1
			}

			setHistoryIndex(newIndex)

			if (newIndex >= 0) {
				setCurrentInput(commandHistory[newIndex])
			}

			setTimeout(() => {
				updateCursorPosition()
			}, 0)
		},
		[commandHistory, historyIndex, updateCursorPosition]
	)

	// Handle key events
	const handleKeyDown = useCallback(
		async event => {
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
				setTimeout(() => {
					updateCursorPosition(event)
				}, 0)
			} else {
				setIsTabbing(false)
				setTabMatches([])
				setTabIndex(-1)
			}
		},
		[currentInput, executeCommand, handleTabCompletion, navigateHistory, updateCursorPosition]
	)

	const focusInput = useCallback(terminalInput => {
		if (terminalInput) {
			terminalInput.focus()
		}
	}, [])

	return {
		currentInput,
		setCurrentInput,
		cursorPosition,
		handleKeyDown,
		focusInput,
		updateCursorPosition,
	}
}

