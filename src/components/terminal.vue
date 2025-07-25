<template>
	<div class="terminal-window">
		<div class="terminal-header">
			<div class="terminal-buttons">
				<div class="btn red" />
				<div class="btn yellow" />
				<div class="btn green" />
			</div>
			<div class="terminal-title">BARELY_WORKING_TERMINAL_V0.3</div>
		</div>

		<div class="terminal-body" ref="terminalBody" @click="focusInput(terminalInput)">
			<div class="terminal-line">
				<span class="prompt">></span>
				<span class="welcome-text" ref="welcomeTextRef" />
			</div>

			<div v-for="(line, index) in terminalHistory" :key="index" class="terminal-line">
				<span v-if="line.type === 'command'" class="prompt">></span>
				<span v-if="line.type === 'command'" class="command">{{ line.content }}</span>
				<span
					v-if="line.type === 'typewriter' && !line.link && !line.image"
					:class="line.type"
					:ref="`typewriter-${index}`"
					:data-index="index"
				/>
				<span
					v-if="line.type === 'typewriter' && line.link"
					:class="line.type"
					:ref="`typewriter-${index}`"
					:data-index="index"
				/>
				<span
					v-if="
						!line.link &&
						!line.image &&
						!line.html &&
						line.type !== 'typewriter' &&
						line.type !== 'command' &&
						line.type !== 'output'
					"
					:class="line.type"
					>{{ line.content }}</span
				>
				<span
					v-else-if="line.html && line.type !== 'typewriter' && line.type !== 'output'"
					:class="line.type"
					v-html="line.content"
				/>
				<span
					v-else-if="line.type === 'output'"
					:class="line.type"
					:ref="`typewriter-${index}`"
					:data-index="index"
				/>
				<span v-else-if="line.link && line.type !== 'typewriter'" :class="line.type">
					{{ line.prefix }}
					<a :href="line.link" target="_blank" class="terminal-link">{{
						line.linkText
					}}</a>
				</span>
				<div
					v-else-if="line.image"
					class="terminal-image-container"
					:class="{ 'animated-runner': line.animated }"
				>
					<img
						:src="line.image"
						:alt="line.alt || 'Terminal image'"
						class="terminal-image"
						:class="{ 'running-yako': line.animated }"
					/>
				</div>
			</div>

			<div
				v-if="showInputPrompt && !isProcessingTypewriter"
				class="terminal-line current-line"
			>
				<span class="prompt">></span>
				<div class="input-container">
					<input
						ref="terminalInput"
						v-model="currentInput"
						@keydown="handleKeyDown"
						@keyup="updateCursorPosition"
						@click="updateCursorPosition"
						@input="updateCursorPosition"
						class="terminal-input"
						autocomplete="off"
						spellcheck="false"
					/>
					<span
						class="custom-cursor"
						:style="{ transform: `translateX(calc(1ch * ${cursorPosition}))` }"
						>_</span
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, watch, nextTick } from 'vue'
	import { useTerminalCommands } from '@/composables/terminal/useTerminalCommands'
	import { useTerminalInput } from '@/composables/terminal/useTerminalInput'
	import { useTerminalTypewriter } from '@/composables/terminal/useTerminalTypewriter'
	import { useVisitTracker } from '@/composables/terminal/useVisitTracker'

	const terminalBody = ref(null)
	const terminalInput = ref(null)

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

	const originalExecuteCommand = executeCommand
	const enhancedExecuteCommand = async input => {
		const trimmedInput = input.trim()

		if (trimmedInput) {
			const command = trimmedInput.split(' ')[0]
			const isValidCommand =
				commands[command] ||
				command.startsWith('./') ||
				availableFiles.includes(command) ||
				executableScripts[command]

			if (isValidCommand) {
				trackCommand(command)
			} else {
				trackCommand('invalid')
			}
		}

		originalExecuteCommand(input)
	}

	const { currentInput, cursorPosition, handleKeyDown, focusInput, updateCursorPosition } =
		useTerminalInput(enhancedExecuteCommand, commands, availableFiles, executableScripts)

	const scrollToBottom = () => {
		if (terminalBody.value) {
			nextTick(() => {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			})
		}
	}

	const isProcessingTypewriter = ref(false)

	const processTypewriterOutputs = async () => {
		if (isProcessingTypewriter.value) return

		const typewriterElements = document.querySelectorAll('[data-index]')
		let nextElement = null

		for (const element of typewriterElements) {
			const index = parseInt(element.getAttribute('data-index'))
			const line = terminalHistory.value[index]

			if (line && (line.type === 'typewriter' || line.type === 'output') && !line.animated) {
				nextElement = { element, index, line }
				break
			}
		}

		if (nextElement) {
			isProcessingTypewriter.value = true
			const { element, line } = nextElement
			line.animated = true

			scrollToBottom()

			if (line.link) {
				const fullContent = (line.prefix || '') + line.linkText
				await createCommandTypewriter(element, fullContent, typewriterSpeed)

				element.innerHTML =
					(line.prefix || '') +
					`<a href="${line.link}" target="_blank" class="terminal-link">${line.linkText}</a>`

				nextTick(() => {
					const linkElement = element.querySelector('.terminal-link')
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
				})
			} else {
				await createCommandTypewriter(element, line.content, typewriterSpeed)
			}

			isProcessingTypewriter.value = false

			nextTick(() => {
				processTypewriterOutputs()
			})
		} else {
			isProcessingTypewriter.value = false
			nextTick(() => {
				focusInput(terminalInput.value)
			})
		}
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

	watch(currentInput, () => {
		scrollToBottom()
	})

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
		width: 90%;
		height: 80vh;
		background: rgba(0, 0, 0, 0.5);
		border: 3px dashed $retro-green;
		border-radius: 10px;
		box-shadow:
			0 0 100px $retro-green,
			inset 0 0 20px rgba(0, 255, 0, 0.1);
		overflow: hidden;
		position: relative;
	}

	.terminal-header {
		background: rgba(100, 100, 100, 0.5);

		border-bottom: 2px solid $retro-green;
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
			border: 1px solid #444;

			&.red {
				background: $light-red;
			}
			&.yellow {
				background: #ffbd2e;
			}
			&.green {
				background: #27ca3f;
			}
		}
	}

	.terminal-title {
		color: $retro-green;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.terminal-body {
		height: calc(100% - 60px);
		padding: 1rem;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #111;
		}

		&::-webkit-scrollbar-thumb {
			background: $retro-green;
			border-radius: 4px;
		}
	}

	.terminal-line {
		display: flex;
		align-items: baseline;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		line-height: 1.4;
		text-align: start;

		&.current-line {
			margin-bottom: 0;
		}
	}

	.prompt {
		color: $retro-green;
		margin-right: 0.5rem;
		font-weight: bold;
		flex-shrink: 0;
	}

	.welcome-text {
		color: $light-blue;
	}

	.command {
		color: white;
	}

	.output {
		color: #cccccc;
		white-space: pre-wrap;
	}

	.typewriter {
		color: #cccccc;
		white-space: pre-wrap;
	}

	:deep(.text-green) {
		color: $retro-green;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-blue) {
		color: $light-blue;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-azure) {
		color: $azure;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-yellow) {
		color: $yellow;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-red) {
		color: $light-red;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-purple) {
		color: $purple;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-mint) {
		color: $mint;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-orange) {
		color: $orange;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-cream) {
		color: $cream;
		text-shadow: 0 0 3px currentColor;
	}

	.terminal-link {
		color: $retro-green;
		text-decoration: none;
		border-bottom: 1px dotted $retro-green;
		transition: all 0.3s ease;

		&:hover {
			color: $light-blue;
			border-bottom-color: $light-blue;
			text-shadow: 0 0 5px currentColor;
		}

		&:active {
			color: $light-red;
		}
	}

	.input-container {
		position: relative;
		display: flex;
		flex: 1;
	}

	.terminal-input {
		background: transparent;
		border: none;
		outline: none;
		color: white;
		font-family: inherit;
		font-size: inherit;
		flex: 1;
		caret-color: transparent;
		min-width: 0;
		position: relative;
		z-index: 1;
	}

	.custom-cursor {
		position: absolute;
		left: 0;
		top: 0;
		color: $retro-green;
		font-weight: bold;
		pointer-events: none;
		animation: blink 1.5s infinite;
		transform: translateX(calc(1ch * var(--cursor-position, 0)));
		will-change: transform;
	}

	@keyframes blink {
		0%,
		60% {
			opacity: 1;
		}
		61%,
		100% {
			opacity: 0;
		}
	}

	.terminal-image-container {
		margin: 1rem 0;
		text-align: center;

		&.animated-runner {
			position: relative;
			height: 70px;
			width: 100%;
			overflow: hidden;
			text-align: left;
		}
	}

	.terminal-image {
		max-width: 100%;
		max-height: 300px;

		&.running-yako {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			height: 80px;
			width: auto;
			max-width: none;
			border: none;
			box-shadow: none;
			animation: yakoBackAndForth 20s linear infinite;
			will-change: transform;
		}
	}

	@keyframes yakoBackAndForth {
		0% {
			left: -150px;
			transform: translateY(-50%) rotateY(0deg);
		}

		25% {
			left: calc(100% - 10px);
			transform: translateY(-50%) rotateY(0deg);
		}

		25.1% {
			transform: translateY(-50%) rotateY(180deg);
		}

		50% {
			left: calc(100% - 10px);
			transform: translateY(-50%) rotateY(180deg);
		}

		75% {
			left: -150px;
			transform: translateY(-50%) rotateY(180deg);
		}

		75.1% {
			transform: translateY(-50%) rotateY(0deg);
		}

		100% {
			left: -150px;
			transform: translateY(-50%) rotateY(0deg);
		}
	}

	@keyframes flicker {
		0%,
		90% {
			opacity: 1;
		}
		91%,
		94% {
			opacity: 0.6;
		}
		95%,
		97% {
			opacity: 0.8;
		}
		98%,
		99% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	.terminal-line:nth-child(odd) {
		animation: flicker 4s infinite;
	}

	@media (max-width: 1024px) {
		.terminal-window {
			width: 100%;
			height: 80vh;
		}

		.welcome-text,
		.terminal-input,
		.output,
		.command {
			font-size: 0.8rem;
		}

		.terminal-body {
			font-size: 0.5rem;
			padding: 0.5rem;
		}

		.terminal-title {
			font-size: 0.5rem;
		}

		.terminal-line {
			margin-bottom: 0.25rem;
			line-height: 1.1;
			font-size: 0.8rem;
		}

		.prompt {
			font-size: 0.8rem;
			margin-right: 0.25rem;
		}

		.terminal-image {
			max-height: 200px;

			&.running-yako {
				animation: yakoBackAndForth 10s linear infinite;
			}
		}
	}
</style>
