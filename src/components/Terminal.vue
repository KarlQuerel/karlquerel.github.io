<template>
	<div class="terminal-container">
		<div class="terminal-window" data-nosnippet :style="{ '--phosphor': phosphor }">
			<div class="terminal-header">
				<div class="terminal-buttons" aria-hidden="true">
					<div class="btn red" />
					<div class="btn yellow" />
					<div class="btn green" />
				</div>
				<div class="terminal-title">{{ WINDOW_TITLE }}</div>
			</div>

			<div class="terminal-body" ref="terminalBody" @click="focusInput(terminalInput)">
				<!-- static boot MOTD: instant, reduced-motion safe, scrolls away like a real shell -->
				<div class="terminal-banner" aria-hidden="true">{{ motd }}</div>

				<div class="terminal-line">
					<TerminalPrompt />
					<span class="welcome-text" ref="welcomeTextRef" data-nosnippet />
				</div>

				<TerminalLine
					v-for="(line, index) in terminalHistory"
					:key="index"
					:line="line"
					:index="index"
					@register="registerLine"
					@unregister="unregisterLine"
				/>

				<!-- transient spinner replacing the prompt while a ./script "runs" -->
				<div v-if="isExecutingScript" class="terminal-line">
					<span class="text-green" aria-hidden="true">{{ spinnerFrame }}</span>
				</div>

				<div
					v-if="showInputPrompt && !isProcessingTypewriter && !isExecutingScript"
					class="terminal-line current-line"
				>
					<TerminalPrompt />
					<div class="input-container">
						<!-- visible layer: typed text + inline block cursor; the textarea above only captures keys -->
						<div class="input-mirror" aria-hidden="true">
							<span>{{ inputBeforeCursor }}</span
							><span class="custom-cursor">{{ cursorChar }}</span
							><span>{{ inputAfterCursor }}</span
							><span class="input-ghost">{{ ghostTail }}</span>
						</div>
						<textarea
							ref="terminalInput"
							v-model="currentInput"
							@keydown="handleKeyDown"
							@keyup="updateCursorPosition"
							@click="updateCursorPosition"
							@input="updateCursorPosition"
							class="terminal-input"
							rows="1"
							autocomplete="off"
							spellcheck="false"
							aria-label="Terminal input"
						/>
					</div>
				</div>
			</div>

			<TerminalMatrix v-if="showMatrix" :color="phosphor" @close="onMatrixClose" />
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, watch, nextTick } from 'vue'
	import { useTerminalCommands } from '@/composables/terminal/useTerminalCommands'
	import { useTerminalInput } from '@/composables/terminal/useTerminalInput'
	import { useTerminalTypewriter } from '@/composables/terminal/useTerminalTypewriter'
	import { useTerminalTheme } from '@/composables/terminal/useTerminalTheme'
	import { useVisitTracker } from '@/composables/terminal/useVisitTracker'
	import TerminalLine from './terminal/TerminalLine.vue'
	import TerminalPrompt from './terminal/TerminalPrompt.vue'
	import TerminalMatrix from './terminal/TerminalMatrix.vue'
	import { WINDOW_TITLE, BANNER_MOTD } from '@/constants/terminal'

	// Login MOTD + a live "Last login" line, like a real shell on connect.
	const now = new Date()
	const motd = [
		...BANNER_MOTD,
		`Last login: ${now.toDateString()} ${now.toLocaleTimeString()} on ttys000`,
	].join('\n')

	const terminalBody = ref(null)
	const terminalInput = ref(null)
	const showMatrix = ref(false)

	const { phosphor, themeNames, themeName, setTheme } = useTerminalTheme()
	const { trackCommand, trackVisit, getVisitStats, loadVisitData } = useVisitTracker()

	// holder for the recall list — useTerminalInput creates the ref later
	let commandHistoryRef = null

	const {
		commands,
		availableFiles,
		executableScripts,
		terminalHistory,
		isExecutingScript,
		spinnerFrame,
		executeCommand,
		fsComplete,
	} = useTerminalCommands({
		getVisitStats,
		loadVisitData,
		setTheme,
		themeNames,
		getThemeName: () => themeName.value,
		getHistory: () => commandHistoryRef?.value ?? [],
		onMatrix: () => {
			showMatrix.value = true
		},
	})

	const {
		welcomeTextRef,
		showInputPrompt,
		initTypewriter,
		createCommandTypewriter,
		typewriterSpeed,
	} = useTerminalTypewriter()

	// Count command usage (real vs. invalid) before running it.
	const enhancedExecuteCommand = input => {
		const trimmed = input.trim()
		if (trimmed) {
			const command = trimmed.split(' ')[0]
			const isValid =
				commands[command] ||
				command.startsWith('./') ||
				availableFiles.includes(command) ||
				executableScripts[command]
			trackCommand(isValid ? command : 'invalid')
		}
		executeCommand(input)
	}

	const clearScreen = () => {
		terminalHistory.value = []
	}

	// Ctrl+C: echo the aborted line and drop it, like a real shell.
	const interruptLine = input => {
		terminalHistory.value.push({ type: 'command', content: `${input}^C` })
	}

	const {
		currentInput,
		cursorPosition,
		commandHistory,
		suggestionTail,
		handleKeyDown,
		focusInput,
		updateCursorPosition,
	} = useTerminalInput({
		executeCommand: enhancedExecuteCommand,
		commands,
		executableScripts,
		themeNames,
		fsComplete,
		onClear: clearScreen,
		onInterrupt: interruptLine,
	})

	commandHistoryRef = commandHistory

	// split around the caret so the block cursor renders inline and wraps with the text
	const inputBeforeCursor = computed(() => currentInput.value.slice(0, cursorPosition.value))
	const inputAfterCursor = computed(() => currentInput.value.slice(cursorPosition.value + 1))

	// fish-style: at end-of-line the cursor sits on the first ghost char, the rest trails grey
	const caretAtEnd = computed(() => cursorPosition.value >= currentInput.value.length)
	const cursorChar = computed(() =>
		caretAtEnd.value && suggestionTail.value
			? suggestionTail.value.charAt(0)
			: currentInput.value.charAt(cursorPosition.value) || ' '
	)
	const ghostTail = computed(() =>
		caretAtEnd.value && suggestionTail.value ? suggestionTail.value.slice(1) : ''
	)

	const onMatrixClose = () => {
		showMatrix.value = false
		nextTick(() => focusInput(terminalInput.value))
	}

	const scrollToBottom = () => {
		nextTick(() => {
			if (terminalBody.value) {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			}
		})
	}

	// TerminalLine registers each typed line's DOM target; the orchestrator animates them in order
	const lineTargets = new Map()
	const isProcessingTypewriter = ref(false)

	const registerLine = (index, el) => {
		lineTargets.set(index, el)
		nextTick(processTypewriterOutputs)
	}

	const unregisterLine = index => {
		lineTargets.delete(index)
	}

	const isAnimatable = line =>
		(line.type === 'typewriter' || line.type === 'output') && !line.image

	async function processTypewriterOutputs() {
		if (isProcessingTypewriter.value) return

		let next = null
		for (let i = 0; i < terminalHistory.value.length; i++) {
			const line = terminalHistory.value[i]
			if (!isAnimatable(line) || line.animated) continue

			const el = lineTargets.get(i)
			if (!el) return // not mounted yet; registerLine will retry
			next = { el, line }
			break
		}

		if (!next) {
			nextTick(() => focusInput(terminalInput.value))
			return
		}

		isProcessingTypewriter.value = true
		next.line.animated = true
		scrollToBottom()

		if (next.line.link) {
			const fullContent = (next.line.prefix || '') + next.line.linkText
			await createCommandTypewriter(next.el, fullContent, typewriterSpeed)
			next.el.innerHTML =
				(next.line.prefix || '') +
				`<a href="${next.line.link}" target="_blank" class="terminal-link">${next.line.linkText}</a>`
		} else {
			await createCommandTypewriter(next.el, next.line.content, typewriterSpeed)
		}

		isProcessingTypewriter.value = false
		nextTick(processTypewriterOutputs)
	}

	watch(
		terminalHistory,
		() => {
			nextTick(() => {
				processTypewriterOutputs()
				scrollToBottom()
			})
		},
		{ deep: true }
	)

	watch(currentInput, scrollToBottom)

	onMounted(() => {
		trackVisit()
		initTypewriter(() => {
			focusInput(terminalInput.value)
			scrollToBottom()
		})
	})
</script>
