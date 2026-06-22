<template>
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
			<!-- Boot MOTD: static so it shows instantly (and under reduced motion)
			     and scrolls away with the scrollback like a real shell. -->
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

			<!-- Transient spinner while a ./script "runs" (replaces the input
			     prompt, so the line below looks like a shell still working). -->
			<div v-if="isExecutingScript" class="terminal-line">
				<span class="text-green" aria-hidden="true">{{ spinnerFrame }}</span>
			</div>

			<div
				v-if="showInputPrompt && !isProcessingTypewriter && !isExecutingScript"
				class="terminal-line current-line"
			>
				<TerminalPrompt />
				<div class="input-container">
					<!-- Visible layer: the typed text with an inline block cursor that
					     wraps along with the text (the textarea above is transparent and
					     only captures keystrokes / caret position). -->
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

	// The `history` command needs the recall list, but that ref is created later
	// by useTerminalInput; this holder is filled in once it exists.
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

	// Split the input around the caret so the block cursor can be rendered
	// inline (and wrap with the text) instead of positioned by a fixed offset.
	const inputBeforeCursor = computed(() => currentInput.value.slice(0, cursorPosition.value))
	const inputAfterCursor = computed(() => currentInput.value.slice(cursorPosition.value + 1))

	// At the end of the line with a live suggestion, the block cursor sits on the
	// first ghost char (fish-style) and the rest trails greyed-out; otherwise the
	// cursor falls on the real char under the caret (or a trailing space).
	const caretAtEnd = computed(() => cursorPosition.value >= currentInput.value.length)
	const cursorChar = computed(() =>
		caretAtEnd.value && suggestionTail.value
			? suggestionTail.value.charAt(0)
			: currentInput.value.charAt(cursorPosition.value) || ' '
	)
	const ghostTail = computed(() =>
		caretAtEnd.value && suggestionTail.value ? suggestionTail.value.slice(1) : ''
	)

	// Matrix overlay dismissed — hide it and return focus to the prompt.
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

	// --- Typewriter orchestration ------------------------------------------
	// TerminalLine registers the DOM target of each typed line here, keyed by
	// its history index. The orchestrator animates them strictly in order, one
	// at a time, marking each line `animated` once typed.
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

<style lang="scss" scoped>
	.terminal-window {
		--phosphor: #{$phosphor-green};
		position: relative;
		width: 100%;
		height: 100%;
		background: rgba(8, 12, 8, 0.92);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 10px;
		overflow: hidden;
		font-family: $font-terminal;
		font-size: 1.4rem;
	}

	// Subtle CRT scanlines, fixed over the (non-scrolling) window.
	.terminal-window::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 5;
		background: repeating-linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.18) 0,
			rgba(0, 0, 0, 0.18) 1px,
			transparent 1px,
			transparent 3px
		);
	}

	.terminal-header {
		background: rgba(100, 100, 100, 0.5);
		border-bottom: 1px solid rgba(255, 255, 255, 0.18);
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.terminal-buttons {
		display: flex;
		gap: 0.5rem;

		.btn {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			border: 1px solid $terminal-chrome-border;

			&.red {
				background: $light-red;
			}
			&.yellow {
				background: $yellow;
			}
			&.green {
				background: $terminal-dot-green;
			}
		}
	}

	.terminal-title {
		color: $light-gray;
		font-size: 0.95rem;
		letter-spacing: 0.5px;
		opacity: 0.85;
	}

	.terminal-body {
		height: calc(100% - 60px);
		padding: 1rem;
		overflow-y: auto;
		// Long lines wrap (like a real terminal) — never scroll sideways.
		overflow-x: hidden;
		// Subtle phosphor glow on every glyph.
		text-shadow: 0 0 2px currentColor;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: $terminal-scrollbar-track;
		}

		&::-webkit-scrollbar-thumb {
			background: $light-gray;
			border-radius: 4px;
		}
	}

	.terminal-line {
		display: flex;
		align-items: baseline;
		margin-bottom: 0.35rem;
		line-height: 1.25;
		text-align: start;

		&.current-line {
			margin-bottom: 0;
		}
	}

	.terminal-banner {
		// Dim, system-text login MOTD. `pre-wrap` keeps the spacing but lets long
		// lines fold on narrow screens instead of getting clipped.
		color: $light-gray;
		opacity: 0.75;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		line-height: 1.2;
		margin: 0 0 0.8rem;
	}

	.welcome-text {
		color: $light-blue;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.input-container {
		position: relative;
		flex: 1;
		min-width: 0;
	}

	// Visible text layer the user actually reads; wraps on long input.
	.input-mirror {
		color: $white;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	// Transparent capture layer stacked over the mirror, sized to it so it
	// wraps identically. Auto-grows in height since the mirror sets the box.
	.terminal-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background: transparent;
		border: none;
		outline: none;
		resize: none;
		overflow: hidden;
		color: transparent;
		caret-color: transparent;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		z-index: 1;
	}

	// Inline block cursor: inverts the glyph it sits on and flows with the text.
	.custom-cursor {
		background: var(--phosphor);
		color: $black;
		animation: blink 1.1s steps(1) infinite;
	}

	// fish-style autosuggestion: dim, glow-less ghost trailing the caret. Lives
	// only in the mirror (the textarea is empty past the input), so it never
	// shifts the real caret. Press → / End to accept.
	.input-ghost {
		color: rgba(255, 255, 255, 0.32);
		text-shadow: none;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.custom-cursor {
			animation: none;
		}
	}

	@media (max-width: #{$breakpoint-desktop}) {
		.terminal-window {
			font-size: 1.05rem;
		}

		.terminal-body {
			padding: 0.5rem;
		}

		.terminal-title {
			font-size: 0.75rem;
		}

		.terminal-line {
			margin-bottom: 0.2rem;
			line-height: 1.15;
		}
	}

	@media (max-width: #{$breakpoint-mobile}) {
		// Hold the type at exactly 1rem (16px): big enough to read and to keep the
		// hidden input from triggering iOS focus-zoom. Width for long output (e.g.
		// `help`) is reclaimed via padding, not by shrinking the font.
		.terminal-window {
			font-size: 1rem;
		}

		.terminal-body {
			padding: 0.5rem 0.6rem;
		}
	}
</style>
