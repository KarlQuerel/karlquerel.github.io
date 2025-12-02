import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useTerminalCommands } from '../hooks/terminal/useTerminalCommands'
import { useTerminalInput } from '../hooks/terminal/useTerminalInput'
import { useTerminalTypewriter } from '../hooks/terminal/useTerminalTypewriter'
import { useVisitTracker } from '../hooks/terminal/useVisitTracker'
import { sanitizeHtml } from '../utils/htmlSanitizer'
import { getTerminalLineRenderer } from '../hooks/terminal/useTerminalRenderer'
import type { TerminalLine } from '../types/terminal'

function Terminal(): React.JSX.Element {
	const terminalBodyRef = useRef<HTMLDivElement>(null)
	const terminalInputRef = useRef<HTMLInputElement>(null)

	const { commands, availableFiles, executableScripts, terminalHistory, executeCommand } =
		useTerminalCommands()

	const {
		welcomeTextRef,
		showInputPrompt,
		initTypewriter,
		createCommandTypewriter,
		typewriterSpeed,
	} = useTerminalTypewriter()

	const { trackCommand, trackVisit } = useVisitTracker()
	const [isProcessingTypewriter, setIsProcessingTypewriter] = useState<boolean>(false)

	// Enhanced execute command with tracking
	const enhancedExecuteCommand = async (input: string): Promise<void> => {
		const trimmedInput = input.trim()

		if (trimmedInput) {
			const command = trimmedInput.split(' ')[0]
			const isValidCommand =
				commands[command] !== undefined ||
				command.startsWith('./') ||
				availableFiles.includes(command) ||
				executableScripts[command] !== undefined

			if (isValidCommand) {
				trackCommand(command)
			} else {
				trackCommand('invalid')
			}
		}

		executeCommand(input)
	}

	const { currentInput, setCurrentInput, cursorPosition, handleKeyDown, focusInput } =
		useTerminalInput(
			enhancedExecuteCommand,
			commands as Record<string, () => unknown[]>,
			availableFiles,
			executableScripts as Record<string, () => unknown[]>
		)

	const scrollToBottom = useCallback((): void => {
		if (terminalBodyRef.current) {
			terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
		}
	}, [])

	const processTypewriterOutputs = useCallback(async (): Promise<void> => {
		if (isProcessingTypewriter) return

		const typewriterElements = document.querySelectorAll<HTMLElement>('[data-index]')
		let nextElement: {
			element: HTMLElement
			index: number
			line: TerminalLine & { animated?: boolean }
		} | null = null

		for (const element of typewriterElements) {
			const index = parseInt(element.getAttribute('data-index') || '0', 10)
			const line = terminalHistory[index] as TerminalLine & { animated?: boolean }

			if (line && (line.type === 'typewriter' || line.type === 'output') && !line.animated) {
				nextElement = { element, index, line }
				break
			}
		}

		if (nextElement) {
			setIsProcessingTypewriter(true)
			const { element, line } = nextElement
			line.animated = true

			scrollToBottom()

			if (line.link) {
				const fullContent = (line.prefix || '') + (line.linkText || '')
				await createCommandTypewriter(element, fullContent, typewriterSpeed)

				element.innerHTML =
					(line.prefix || '') +
					`<a href="${line.link}" target="_blank" class="terminal-link" rel="noreferrer">${line.linkText}</a>`

				// Attach event listeners to link
				setTimeout(() => {
					const linkElement = element.querySelector<HTMLAnchorElement>('.terminal-link')
					if (linkElement) {
						linkElement.style.color = '#00ff00'
						linkElement.style.textDecoration = 'none'
						linkElement.style.borderBottom = '1px dotted #00ff00'
						linkElement.style.transition = 'all 0.3s ease'

						linkElement.addEventListener('mouseenter', () => {
							linkElement.style.color = '#00ccff'
							linkElement.style.borderBottomColor = '#00ccff'
							linkElement.style.textShadow = '0 0 5px #00ccff'
						})

						linkElement.addEventListener('mouseleave', () => {
							linkElement.style.color = '#00ff00'
							linkElement.style.borderBottomColor = '#00ff00'
							linkElement.style.textShadow = 'none'
						})

						linkElement.addEventListener('mousedown', () => {
							linkElement.style.color = '#ff5f56'
						})

						linkElement.addEventListener('mouseup', () => {
							linkElement.style.color = '#00ccff'
						})
					}
				}, 0)
			} else {
				await createCommandTypewriter(element, line.content || '', typewriterSpeed)
			}

			setIsProcessingTypewriter(false)

			// Process next typewriter
			setTimeout(() => {
				processTypewriterOutputs()
			}, 0)
		} else {
			setIsProcessingTypewriter(false)
			setTimeout(() => {
				focusInput(terminalInputRef.current)
			}, 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		terminalHistory,
		isProcessingTypewriter,
		createCommandTypewriter,
		typewriterSpeed,
		focusInput,
		scrollToBottom,
	])

	// Watch terminalHistory for new typewriter outputs
	useEffect(() => {
		processTypewriterOutputs()
		scrollToBottom()
	}, [terminalHistory, processTypewriterOutputs, scrollToBottom])

	// Watch currentInput for scrolling
	useEffect(() => {
		scrollToBottom()
	}, [currentInput, scrollToBottom])

	// Initialize on mount
	useEffect(() => {
		trackVisit()
		initTypewriter(() => {
			focusInput(terminalInputRef.current)
			scrollToBottom()
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Render a terminal line
	const renderTerminalLine = (line: TerminalLine, index: number): React.JSX.Element => {
		const renderer = getTerminalLineRenderer(line, index)

		switch (renderer.type) {
			case 'command':
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span className="mr-2 flex-shrink-0 font-bold text-retro-green lg:mr-1 lg:text-[0.8rem]">
							{'>'}
						</span>
						<span className="text-white lg:text-[0.8rem]">{renderer.content}</span>
					</div>
				)

			case 'typewriter':
			case 'typewriter-link':
			case 'output':
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span
className={`
										${line.type === 'typewriter' || line.type === 'output' ?
										'whitespace-pre-wrap text-[#cccccc]' : ''}
									`}
							data-index={index}
						/>
					</div>
				)

			case 'html':
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span
							className={
								line.type === 'output' ? 'whitespace-pre-wrap text-[#cccccc]' : ''
							}
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(renderer.content || ''),
							}}
						/>
					</div>
				)

			case 'link':
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span
							className={
								line.type === 'output' ? 'whitespace-pre-wrap text-[#cccccc]' : ''
							}
						>
							{renderer.prefix}
							<a
								href={renderer.link}
								target="_blank"
								className="terminal-link"
								rel="noreferrer"
							>
								{renderer.linkText}
							</a>
						</span>
					</div>
				)

			case 'image':
				return (
					<div
						key={index}
						className={`my-4 text-center ${
							renderer.animated
								? 'relative h-[70px] w-full overflow-hidden text-left'
								: ''
						}`}
					>
						<img
							src={renderer.src}
							alt={renderer.alt}
className={`
										max-h-[300px] max-w-full ${renderer.animated ? 'running-yako absolute
										top-1/2 h-20 w-auto max-w-none -translate-y-1/2 border-none
										shadow-none' : ''} lg:max-h-[200px]
									`}
						/>
					</div>
				)

			case 'text':
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span
							className={
								line.type === 'output' ? 'whitespace-pre-wrap text-[#cccccc]' : ''
							}
						>
							{renderer.content}
						</span>
					</div>
				)

			default:
				return (
					<div
						key={index}
className={`
									relative z-10 mb-2 flex items-baseline text-left text-base
									leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
								`}
					>
						<span className="text-white">{renderer.content}</span>
					</div>
				)
		}
	}

	return (
		<div
className={`
						terminal-retro relative h-[80vh] w-[90%] overflow-hidden
						rounded-[30px] bg-black/50 shadow-[0_0_75px_#00ff00] lg:w-full
					`}
			data-nosnippet
		>
			<div
className={`
							relative z-10 flex items-center gap-4 border-b-2 border-retro-green
							bg-[rgba(0,0,0,0.8)] px-4 py-2
						`}
			>
				<div className="flex gap-2">
					<div className="h-3 w-3 rounded-full border border-[#444] bg-light-red" />
					<div className="h-3 w-3 rounded-full border border-[#444] bg-yellow" />
					<div className="h-3 w-3 rounded-full border border-[#444] bg-[#27ca3f]" />
				</div>
				<div className="font-['Press_Start_2P'] text-[0.7rem] uppercase tracking-[1px] text-retro-green lg:text-[0.5rem]">
					BARELY_WORKING_TERMINAL_V0.3
				</div>
			</div>

			<div
className={`
							terminal-retro relative z-10 h-[calc(100%-60px)] overflow-y-auto p-4
							lg:p-2 lg:text-[0.5rem] [&::-webkit-scrollbar-thumb]:rounded
							[&::-webkit-scrollbar-thumb]:bg-retro-green
							[&::-webkit-scrollbar-thumb]:shadow-[0_0_5px_#00ff00]
							[&::-webkit-scrollbar-track]:bg-[#000] [&::-webkit-scrollbar]:w-2
						`}
				ref={terminalBodyRef}
				onClick={() => focusInput(terminalInputRef.current)}
			>
				<div
className={`
								relative z-10 mb-2 flex items-baseline text-left text-base
								leading-[1.4] lg:mb-1 lg:text-[0.8rem] lg:leading-[1.1]
							`}
				>
					<span className="mr-2 flex-shrink-0 font-bold text-retro-green lg:mr-1 lg:text-[0.8rem]">
						{'>'}
					</span>
					<span className="text-light-blue" ref={welcomeTextRef} data-nosnippet />
				</div>

				{terminalHistory.map((line, index) => renderTerminalLine(line, index))}

				{showInputPrompt && !isProcessingTypewriter && (
					<div className="relative z-10 mb-0 flex items-baseline text-left text-base leading-[1.4]">
						<span className="mr-2 flex-shrink-0 font-bold text-retro-green lg:mr-1 lg:text-[0.8rem]">
							{'>'}
						</span>
						<div className="relative flex flex-1">
							<input
								ref={terminalInputRef}
								value={currentInput}
								onChange={e => setCurrentInput(e.target.value)}
								onKeyDown={handleKeyDown}
className={`
											font-inherit relative z-[1] min-w-0 flex-1 border-none bg-transparent
											text-inherit text-white caret-transparent outline-none
											lg:text-[0.8rem]
										`}
								autoComplete="off"
								spellCheck="false"
							/>
							<span
className={`
											custom-cursor pointer-events-none absolute left-0 top-0 font-bold
											text-retro-green will-change-transform
										`}
								style={{
									transform: `translateX(calc(1ch * ${cursorPosition}))`,
								}}
							>
								_
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Terminal
