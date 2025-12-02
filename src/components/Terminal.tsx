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
	const typewriterRefs = useRef<Record<string, HTMLSpanElement | null>>({})

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
		useTerminalInput(enhancedExecuteCommand, commands as Record<string, () => unknown[]>, availableFiles, executableScripts as Record<string, () => unknown[]>)

	const scrollToBottom = useCallback((): void => {
		if (terminalBodyRef.current) {
			terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
		}
	}, [])

	const processTypewriterOutputs = useCallback(async (): Promise<void> => {
		if (isProcessingTypewriter) return

		const typewriterElements = document.querySelectorAll<HTMLElement>('[data-index]')
		let nextElement: { element: HTMLElement; index: number; line: TerminalLine & { animated?: boolean } } | null = null

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
	}, [terminalHistory, isProcessingTypewriter, createCommandTypewriter, typewriterSpeed, focusInput, scrollToBottom])

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
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span className="text-retro-green mr-2 font-bold flex-shrink-0 lg:text-[0.8rem] lg:mr-1">
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
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span
							className={line.type === 'typewriter' || line.type === 'output' ? 'text-[#cccccc] whitespace-pre-wrap' : ''}
							ref={el => {
								if (el) typewriterRefs.current[`typewriter-${index}`] = el
							}}
							data-index={index}
						/>
					</div>
				)

			case 'html':
				return (
					<div
						key={index}
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span
							className={line.type === 'output' ? 'text-[#cccccc] whitespace-pre-wrap' : ''}
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
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span className={line.type === 'output' ? 'text-[#cccccc] whitespace-pre-wrap' : ''}>
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
						className={`my-4 text-center ${renderer.animated ? 'relative h-[70px] w-full overflow-hidden text-left' : ''}`}
					>
						<img
							src={renderer.src}
							alt={renderer.alt}
							className={`max-w-full max-h-[300px] ${renderer.animated ? 'running-yako absolute top-1/2 -translate-y-1/2 h-20 w-auto max-w-none border-none shadow-none' : ''} lg:max-h-[200px]`}
						/>
					</div>
				)

			case 'text':
				return (
					<div
						key={index}
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span className={line.type === 'output' ? 'text-[#cccccc] whitespace-pre-wrap' : ''}>
							{renderer.content}
						</span>
					</div>
				)

			default:
				return (
					<div
						key={index}
						className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]"
					>
						<span>{renderer.content}</span>
					</div>
				)
		}
	}

	return (
		<div
			className="w-[90%] h-[80vh] bg-black/50 border-3 border-dashed border-retro-green rounded-[10px] shadow-[0_0_100px_#00ff00,inset_0_0_20px_rgba(0,255,0,0.1)] overflow-hidden relative lg:w-full"
			data-nosnippet
		>
			<div className="bg-[rgba(100,100,100,0.5)] border-b-2 border-retro-green py-2 px-4 flex items-center gap-4">
				<div className="flex gap-2">
					<div className="w-3 h-3 rounded-full border border-[#444] bg-light-red" />
					<div className="w-3 h-3 rounded-full border border-[#444] bg-yellow" />
					<div className="w-3 h-3 rounded-full border border-[#444] bg-[#27ca3f]" />
				</div>
				<div className="text-retro-green text-[0.7rem] uppercase tracking-[1px] lg:text-[0.5rem]">
					BARELY_WORKING_TERMINAL_V0.3
				</div>
			</div>

			<div
				className="h-[calc(100%-60px)] p-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#111] [&::-webkit-scrollbar-thumb]:bg-retro-green [&::-webkit-scrollbar-thumb]:rounded lg:text-[0.5rem] lg:p-2"
				ref={terminalBodyRef}
				onClick={() => focusInput(terminalInputRef.current)}
			>
				<div className="flex items-baseline mb-2 text-base leading-[1.4] text-left lg:mb-1 lg:leading-[1.1] lg:text-[0.8rem]">
					<span className="text-retro-green mr-2 font-bold flex-shrink-0 lg:text-[0.8rem] lg:mr-1">
						{'>'}
					</span>
					<span className="text-light-blue" ref={welcomeTextRef} data-nosnippet />
				</div>

				{terminalHistory.map((line, index) => renderTerminalLine(line, index))}

				{showInputPrompt && !isProcessingTypewriter && (
					<div className="flex items-baseline mb-0 text-base leading-[1.4] text-left">
						<span className="text-retro-green mr-2 font-bold flex-shrink-0 lg:text-[0.8rem] lg:mr-1">
							{'>'}
						</span>
						<div className="relative flex flex-1">
							<input
								ref={terminalInputRef}
								value={currentInput}
								onChange={e => setCurrentInput(e.target.value)}
								onKeyDown={handleKeyDown}
								className="bg-transparent border-none outline-none text-white font-inherit text-inherit flex-1 caret-transparent min-w-0 relative z-[1] lg:text-[0.8rem]"
								autoComplete="off"
								spellCheck="false"
							/>
							<span
								className="custom-cursor absolute left-0 top-0 text-retro-green font-bold pointer-events-none will-change-transform"
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

