<template>
	<div class="terminal-container">
		<h1 class="sr-only">{{ PAGE_HEADING }}</h1>
		<HomeChip />
		<TerminalWindow
			ref="terminalWindow"
			:title="WINDOW_TITLE"
			:phosphor="phosphor"
			@body-click="focusInput"
		>
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
			<div v-if="isSpinning" class="terminal-line">
				<span class="text-green" aria-hidden="true">{{ spinnerFrame }}</span>
			</div>

			<TerminalInput
				v-if="showInputPrompt && !isTyping && !isSpinning"
				ref="terminalInput"
				:history="history"
				:completion-sources="completionSources"
				@submit="executeCommand"
				@clear="clear"
				@interrupt="interrupt"
				@input="scrollToBottom"
			/>

			<template #overlay>
				<TerminalMatrix v-if="showMatrix" :color="phosphor" @close="onMatrixClose" />
			</template>
		</TerminalWindow>

		<div class="sr-only" aria-live="polite">
			<p v-for="announcement in announcements" :key="announcement.id">
				{{ announcement.text }}
			</p>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, nextTick, useTemplateRef } from 'vue'
	import { useTerminalCommands } from '@/composables/terminal/useTerminalCommands'
	import { useCommandHistory } from '@/composables/terminal/useCommandHistory'
	import { useTerminalTypewriter } from '@/composables/terminal/useTerminalTypewriter'
	import { useTerminalTheme } from '@/composables/terminal/useTerminalTheme'
	import { useVisitTracker } from '@/composables/terminal/useVisitTracker'
	import HomeChip from './HomeChip.vue'
	import TerminalWindow from './terminal/TerminalWindow.vue'
	import TerminalInput from './terminal/TerminalInput.vue'
	import TerminalLine from './terminal/TerminalLine.vue'
	import TerminalPrompt from './terminal/TerminalPrompt.vue'
	import TerminalMatrix from './terminal/TerminalMatrix.vue'
	import { WINDOW_TITLE, BANNER_MOTD, PAGE_HEADING } from '@/constants/terminal'

	const now = new Date()
	const motd = [
		...BANNER_MOTD,
		`Last login: ${now.toDateString()} ${now.toLocaleTimeString()} on ttys000`,
	].join('\n')

	const terminalWindow = useTemplateRef('terminalWindow')
	const terminalInput = useTemplateRef('terminalInput')
	const showMatrix = ref(false)

	const focusInput = () => terminalInput.value?.focus()

	const scrollToBottom = () => {
		nextTick(() => {
			const body = terminalWindow.value?.body
			if (body) body.scrollTop = body.scrollHeight
		})
	}

	const { phosphor, themeNames, themeName, setTheme } = useTerminalTheme()
	const { trackVisit, trackCommand, loadVisitStats } = useVisitTracker()
	const history = useCommandHistory()

	const {
		commandNames,
		scriptNames,
		terminalHistory,
		isSpinning,
		spinnerFrame,
		executeCommand,
		clear,
		interrupt,
		fsComplete,
	} = useTerminalCommands({
		loadVisitStats,
		setTheme,
		themeNames,
		getThemeName: () => themeName.value,
		getHistory: () => history.entries.value,
		onMatrix: () => {
			showMatrix.value = true
		},
		onCommand: trackCommand,
	})

	const completionSources = { commandNames, scriptNames, themeNames, fsComplete }

	const {
		welcomeTextRef,
		showInputPrompt,
		isTyping,
		announcements,
		typeWelcome,
		registerLine,
		unregisterLine,
	} = useTerminalTypewriter({
		lines: terminalHistory,
		onProgress: scrollToBottom,
		onIdle: focusInput,
	})

	const onMatrixClose = () => {
		showMatrix.value = false
		nextTick(focusInput)
	}

	onMounted(() => {
		trackVisit()
		typeWelcome()
	})
</script>

<style scoped lang="scss">
	.terminal-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		// nudge down so the fixed star toggle clears the title bar on short viewports
		padding-top: 1.6rem;
	}

	@media (max-width: #{$breakpoint-mobile}) {
		.terminal-container {
			padding-top: 6rem;
			padding-bottom: 1rem;
		}
	}
</style>
