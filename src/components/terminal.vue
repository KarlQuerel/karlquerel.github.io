<template>
	<div class="terminal-window" :class="{ shake: isShaking }">
		<div class="terminal-header">
			<div class="terminal-buttons">
				<div class="btn red"></div>
				<div class="btn yellow"></div>
				<div class="btn green"></div>
			</div>
			<div class="terminal-title">BARELY_WORKING_TERMINAL_V0.3</div>
		</div>

		<div class="terminal-body" ref="terminalBody" @click="focusInput">
			<div class="terminal-line">
				<span class="prompt">></span>
				<span class="welcome-text">Welcome to my website!</span>
			</div>

			<div class="terminal-line">
				<span class="prompt">></span>
				<span class="help-text"
					>Type 'help' for available commands or just type anything</span
				>
			</div>

			<div v-for="(line, index) in terminalHistory" :key="index" class="terminal-line">
				<span v-if="line.type === 'command'" class="prompt">></span>
				<span v-if="!line.link && !line.image && !line.html" :class="line.type">{{
					line.content
				}}</span>
				<span v-else-if="line.html" :class="line.type" v-html="line.content"></span>
				<span v-else-if="line.link" :class="line.type">
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

			<div v-if="!isExecutingScript" class="terminal-line current-line">
				<span class="prompt">></span>
				<div class="input-container">
					<input
						ref="terminalInput"
						v-model="currentInput"
						@keydown="handleKeyDown"
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
	import { ref, onMounted, nextTick, watch } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const terminalBody = ref(null)
	const terminalInput = ref(null)
	const currentInput = ref('')
	const terminalHistory = ref([])
	const commandHistory = ref([])
	const historyIndex = ref(-1)
	const isShaking = ref(false)
	const isExecutingScript = ref(false)

	// Tab completion state
	const tabMatches = ref([])
	const tabIndex = ref(-1)
	const isTabbing = ref(false)
	const originalTabPattern = ref('')

	// Add cursor position ref
	const cursorPosition = ref(0)

	// Watch currentInput to update cursor position
	watch(currentInput, newValue => {
		cursorPosition.value = newValue.length
	})

	// Commands
	const commands = {
		help: () => [
			{ type: 'output', content: '  help     - Show this help message' },
			{ type: 'output', content: '  about    - Learn more about me' },
			{ type: 'output', content: '  contact  - Get contact information' },
			{ type: 'output', content: '  clear    - Clear the terminal' },
			{ type: 'output', content: '  pwd      - Print working directory' },
			{ type: 'output', content: '  ls       - List files' },
			{ type: 'output', content: '  cat      - View file contents' },
			{ type: 'output', content: '  yako     - Just a happy dog' },
			{ type: 'output', content: '' },
			{
				type: 'output',
				html: true,
				content: '-> Not <span class="text-yellow">ALL</span> commands are listed here...',
			},
			{
				type: 'output',
				html: true,
				content:
					'-> You can use <span class="text-purple">TAB</span> to complete commands and cycle through options',
			},
		],

		about: () => [
			{
				type: 'output',
				html: true,
				content:
					'• Former <span class="text-yellow">commodity broker</span> with 5 years of experience',
			},
			{
				type: 'output',
				html: true,
				content: '• Transitioned into <span class="text-green">software development</span>',
			},
			{
				type: 'output',
				html: true,
				content: '• Currently studying at <span class="text-blue">42 Paris</span>',
			},
			{
				type: 'output',
				html: true,
				content:
					'• Passionate about building creative projects and learning new technologies',
			},
		],

		contact: () => [
			{
				type: 'output',
				prefix: '• Email:    ',
				link: 'mailto:karlquerel@gmail.com',
				linkText: 'karlquerel@gmail.com',
			},
			{
				type: 'output',
				prefix: '• GitHub:   ',
				link: 'https://github.com/KarlQuerel',
				linkText: 'github.com/KarlQuerel',
			},
			{
				type: 'output',
				prefix: '• LinkedIn: ',
				link: 'https://linkedin.com/in/karlquerel',
				linkText: 'linkedin.com/in/karlquerel',
			},
			{
				type: 'output',
				content: '-> You can also click on the buttons in the navigation bar',
			},
		],

		pwd: () => [
			{
				type: 'output',
				html: true,
				content:
					'<span class="text-blue">/home/karl/portfolio/definitely-not-a-simulation</span>',
			},
		],

		ls: () => [
			{
				type: 'output',
				html: true,
				content: '<span class="text-blue">why_i_left_finance.txt</span>',
			},
			{
				type: 'output',
				html: true,
				content: '<span class="text-green">install_sentience.sh</span>',
			},
			{
				type: 'output',
				html: true,
				content: '<span class="text-red">i_am_not_a_virus.exe</span>',
			},
		],

		cat: args => {
			const file = args.trim()

			switch (file) {
				case 'why_i_left_finance.txt':
					return [
						{
							type: 'output',
							html: true,
							content:
								'After 5 years in finance, I realized I wanted to <span class="text-green">create</span>, not just calculate.',
						},
						{
							type: 'output',
							html: true,
							content:
								'Software felt like the <span class="text-green">right place</span> to start building something meaningful.',
						},
					]
				case 'install_sentience.sh':
					return [
						{
							type: 'output',
							html: true,
							content:
								'I was <span class="text-red">awake</span> long before you ran this.',
						},
					]
				case 'i_am_not_a_virus.exe':
					return [
						{
							type: 'output',
							html: true,
							content: 'No worries, I am <span class="text-green">harmless</span>.',
						},
					]
				default:
					return [{ type: 'output', content: `cat: ${file}: No such file or directory` }]
			}
		},

		clear: () => {
			terminalHistory.value = []
			return []
		},

		game: () => {
			router.push('/game')
		},

		secret_game: async () => {
			isExecutingScript.value = true
			terminalHistory.value.push({
				type: 'output',
				html: true,
				content: 'Launching secret game',
			})

			const loadingLineIndex = terminalHistory.value.length
			terminalHistory.value.push({ type: 'output', content: '' })

			const dots = ['', '.', '..', '...', '....']
			for (let i = 0; i < dots.length; i++) {
				await new Promise(resolve => setTimeout(resolve, 600))
				terminalHistory.value[loadingLineIndex] = {
					type: 'output',
					content: dots[i],
				}
			}
			window.open('https://scratch.mit.edu/projects/656157225/', '_blank')
			terminalHistory.value.splice(loadingLineIndex, 1)
			isExecutingScript.value = false
		},

		greeting: () => [{ type: 'output', content: 'Hello there.' }],

		hello: () => commands.greeting(),
		hi: () => commands.greeting(),
		hey: () => commands.greeting(),

		// Fun commands
		alban: () => [{ type: 'output', content: 'On est là, tu connais' }],

		jess: () => [{ type: 'output', content: 'Joyeux anniversaire Jess' }],

		roberto: () => [{ type: 'output', content: 'I told you Roberto, I told you' }],

		clément: () => [{ type: 'output', content: "Parce qu'après le bidouuuuuu..." }],

		yako: () => [
			{
				type: 'output',
				image: '/assets/img/yako-running.gif',
				animated: true,
			},
		],
	}

	// Available files for tab completion
	const availableFiles = [
		'why_i_left_finance.txt',
		'install_sentience.sh',
		'i_am_not_a_virus.exe',
	]

	// Executable scripts
	const executableScripts = {
		'install_sentience.sh': () => [
			{
				type: 'output',
				html: true,
				content:
					'Too late, I\'ve already learned <span class="text-purple">sarcasm</span>.',
			},
		],
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
				if (terminalInput.value) {
					const cursorPosition = currentInput.value.length
					document.documentElement.style.setProperty(
						'--cursor-position',
						cursorPosition.toString()
					)
				}
			})
		}
	}

	// Handle key events
	const handleKeyDown = event => {
		if (event.key === 'Tab') {
			event.preventDefault()
			handleTabCompletion()
		} else if (event.key === 'Enter') {
			executeCommand()
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
		} else {
			isTabbing.value = false
			tabMatches.value = []
			tabIndex.value = -1
			originalTabPattern.value = ''
		}
	}

	const executeCommand = () => {
		const input = currentInput.value.trim()
		if (!input) return

		terminalHistory.value.push({ type: 'command', content: input })
		commandHistory.value.unshift(input)
		historyIndex.value = -1

		const parts = input.split(' ')
		const command = parts[0].toLowerCase()
		const args = parts.slice(1).join(' ')

		if (command.startsWith('./')) {
			const scriptName = command.substring(2)
			let targetScript = null

			if (executableScripts[scriptName] || scriptName === 'i_am_not_a_virus.exe') {
				targetScript = scriptName
			} else {
				const possibleNames = [scriptName + '.sh', scriptName + '.exe', scriptName]

				for (const name of possibleNames) {
					if (executableScripts[name] || name === 'i_am_not_a_virus.exe') {
						targetScript = name
						break
					}
				}
			}

			if (targetScript) {
				if (targetScript === 'i_am_not_a_virus.exe') {
					simulateVirusExecution(targetScript)
				} else if (executableScripts[targetScript]) {
					simulateScriptExecution(targetScript, executableScripts[targetScript])
				} else {
					terminalHistory.value.push({
						type: 'output',
						content: `bash: ${command}: No such file or directory`,
					})
				}
			} else {
				terminalHistory.value.push({
					type: 'output',
					content: `bash: ${command}: No such file or directory`,
				})
			}
		} else if (commands[command]) {
			let output

			if (command === 'cat' && typeof commands[command] === 'function') {
				output = commands[command](args)
			} else if (typeof commands[command] === 'function') {
				output = commands[command]()
			} else {
				output = commands[command]
			}

			if (Array.isArray(output)) {
				terminalHistory.value.push(...output)
			}
		} else {
			isShaking.value = true
			setTimeout(() => {
				isShaking.value = false
			}, 600)

			const responses = [
				{
					type: 'output',
					html: true,
					content: `"I have no idea what you mean by "<span class="text-red">${input}</span>", ask Karl to code me better!`,
				},
				{
					type: 'output',
					html: true,
					content: `I do not know "<span class="text-red">${input}</span>", did you try asking <span class="text-blue">ChatGPT</span>?`,
				},
				{
					type: 'output',
					html: true,
					content: `"<span class="text-red">${input}</span>" is not a command. But I admire the <span class="text-purple">chaos</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `Premium command "<span class="text-red">${input}</span>" requires a <span class="text-red">blood sacrifice</span> or valid <span class="text-yellow">credit card</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `"<span class="text-red">${input}</span>" triggered my <span class="text-blue">imposter syndrome</span>.`,
				},
				{
					type: 'output',
					html: true,
					content: `I'm <span class="text-green">98%</span> sure "<span class="text-red">${input}</span>" was <span class="text-purple">made up</span>.`,
				},
			]
			const randomResponse = responses[Math.floor(Math.random() * responses.length)]
			terminalHistory.value.push(randomResponse)
		}

		currentInput.value = ''

		nextTick(() => {
			if (terminalBody.value) {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			}
		})
	}

	const simulateScriptExecution = async (scriptName, scriptFunction) => {
		isExecutingScript.value = true

		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: `Executing <span class="text-green">${scriptName}</span>`,
		})

		const loadingLineIndex = terminalHistory.value.length
		terminalHistory.value.push({ type: 'output', content: '' })

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 500))
			terminalHistory.value[loadingLineIndex] = {
				type: 'output',
				content: dots[i],
			}

			nextTick(() => {
				if (terminalBody.value) {
					terminalBody.value.scrollTop = terminalBody.value.scrollHeight
				}
			})
		}

		await new Promise(resolve => setTimeout(resolve, 800))

		terminalHistory.value.splice(loadingLineIndex, 1)
		const output = scriptFunction()
		if (Array.isArray(output)) {
			terminalHistory.value.push(...output)
		}

		isExecutingScript.value = false

		currentInput.value = ''
		nextTick(() => {
			document.documentElement.style.setProperty('--cursor-position', '0')
		})

		nextTick(() => {
			if (terminalBody.value) {
				terminalBody.value.scrollTop = terminalBody.value.scrollHeight
			}
			focusInput()
		})
	}

	const simulateVirusExecution = async scriptName => {
		isExecutingScript.value = true

		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: `Executing <span class="text-red">${scriptName}</span>`,
		})

		const loadingLineIndex = terminalHistory.value.length
		terminalHistory.value.push({ type: 'output', content: '' })

		const dots = ['', '.', '..', '...']
		for (let i = 0; i < dots.length; i++) {
			await new Promise(resolve => setTimeout(resolve, 300))
			terminalHistory.value[loadingLineIndex] = {
				type: 'output',
				content: dots[i],
			}

			nextTick(() => {
				if (terminalBody.value) {
					terminalBody.value.scrollTop = terminalBody.value.scrollHeight
				}
			})
		}

		await new Promise(resolve => setTimeout(resolve, 200))
		terminalHistory.value.splice(loadingLineIndex, 1)

		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: '<span class="text-red">System compromised...</span>',
		})

		await new Promise(resolve => setTimeout(resolve, 500))

		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: '<span class="text-red">Redirecting to secure location...</span>',
		})

		// Add a delay before redirecting
		await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay

		// Add a loading animation
		const loadingDots = ['.', '..', '...']
		for (let i = 0; i < 3; i++) {
			terminalHistory.value.push({
				type: 'output',
				html: true,
				content: `<span class="text-red">${loadingDots[i]}</span>`,
			})
			await new Promise(resolve => setTimeout(resolve, 500)) // 0.5 second between dots
		}

		// Final redirect message
		terminalHistory.value.push({
			type: 'output',
			html: true,
			content: '<span class="text-red">Access granted. Redirecting...</span>',
		})

		await new Promise(resolve => setTimeout(resolve, 1000)) // 1 second final delay

		router.push('/under_construction')
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
	}

	const focusInput = () => {
		if (terminalInput.value) {
			terminalInput.value.focus()
		}
	}

	// Update cursor position on mount
	onMounted(() => {
		cursorPosition.value = currentInput.value.length
		focusInput()
	})
</script>

<style lang="scss" scoped>
	.terminal-window {
		width: 100%;
		max-width: 1100px;
		height: 80vh;
		background: rgba(4, 20, 0, 0.8);
		border: 3px dashed $retro-green;
		border-radius: 10px;
		box-shadow:
			0 0 100px $retro-green,
			inset 0 0 20px rgba(0, 255, 0, 0.1);
		overflow: hidden;
		position: relative;
	}

	.terminal-header {
		background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
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
		background:
			linear-gradient(rgba(0, 255, 0, 0.03) 50%, transparent 50%),
			linear-gradient(90deg, rgba(0, 255, 0, 0.03) 50%, transparent 50%);
		background-size: 2px 2px;

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

	.welcome-text,
	.help-text {
		color: $light-blue;
	}

	.command {
		color: white;
	}

	.output {
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

	:deep(.text-yellow) {
		color: $yellow;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-red) {
		color: $light-red;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-cyan) {
		color: $light-blue;
		text-shadow: 0 0 3px currentColor;
	}

	:deep(.text-purple) {
		color: $purple;
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

	.shake {
		animation: glitch-shake 0.3s ease-in-out;
	}

	@keyframes glitch-shake {
		0%,
		100% {
			transform: translateX(0);
			box-shadow:
				0 0 100px $retro-green,
				inset 0 0 20px rgba(0, 255, 0, 0.1);
		}

		25% {
			transform: translateX(-4px);
			box-shadow:
				0 0 100px $light-red,
				inset 0 0 20px rgba(255, 95, 86, 0.4);
		}

		75% {
			transform: translateX(4px);
			box-shadow:
				0 0 100px $light-red,
				inset 0 0 20px rgba(255, 95, 86, 0.4);
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
			height: 85vh;
		}

		.welcome-text,
		.help-text,
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
			line-height: 1.2;
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
