<template>
	<!-- The line being typed: prompt, the mirror the reader sees (text split round an inline block
	     cursor, then the ghost suggestion) and the transparent textarea over it that only captures keys.
	     Self-contained so any page with a shell, the game included, can mount one. -->
	<div class="terminal-line current-line">
		<TerminalPrompt />
		<div class="input-container">
			<div class="input-mirror" aria-hidden="true">
				<span>{{ inputBeforeCursor }}</span
				><span class="custom-cursor">{{ cursorChar }}</span
				><span>{{ inputAfterCursor }}</span
				><span class="input-ghost">{{ ghostTail }}</span>
			</div>
			<textarea
				ref="field"
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
</template>

<script setup>
	import { useTemplateRef, watch } from 'vue'
	import { useTerminalInput } from '@/composables/terminal/useTerminalInput'
	import TerminalPrompt from './TerminalPrompt.vue'

	const props = defineProps({
		// the shell's recall list (useCommandHistory)
		history: { type: Object, required: true },
		// what Tab and the ghost complete from: { commandNames, scriptNames, themeNames, fsComplete }
		completionSources: { type: Object, required: true },
	})
	// submit(line) on Enter, clear on Ctrl+L, interrupt(line) on Ctrl+C, input(line) as the text changes
	const emit = defineEmits(['submit', 'clear', 'interrupt', 'input'])

	const field = useTemplateRef('field')
	const {
		currentInput,
		inputBeforeCursor,
		inputAfterCursor,
		cursorChar,
		ghostTail,
		handleKeyDown,
		updateCursorPosition,
	} = useTerminalInput({
		history: props.history,
		executeCommand: line => emit('submit', line),
		completionSources: props.completionSources,
		onClear: () => emit('clear'),
		onInterrupt: line => emit('interrupt', line),
	})
	watch(currentInput, line => emit('input', line))

	defineExpose({ focus: () => field.value?.focus() })
</script>
