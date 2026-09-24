<template>
	<div class="terminal-line">
		<template v-if="line.type === 'command'">
			<TerminalPrompt />
			<span class="command">{{ line.content }}</span>
		</template>

		<div v-else-if="line.image" class="terminal-image-container">
			<img :src="line.image" :alt="line.alt || 'Terminal image'" class="terminal-image" />
		</div>

		<!-- empty target the typewriter fills -->
		<span v-else ref="target" :class="line.type" />
	</div>
</template>

<script setup>
	import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
	import TerminalPrompt from './TerminalPrompt.vue'

	const props = defineProps({
		line: { type: Object, required: true },
		index: { type: Number, required: true },
	})

	const emit = defineEmits(['register', 'unregister'])

	const target = useTemplateRef('target')

	onMounted(() => {
		if (target.value) {
			emit('register', props.index, target.value)
		}
	})

	onBeforeUnmount(() => {
		if (target.value) {
			emit('unregister', props.index)
		}
	})
</script>

<style lang="scss" scoped>
	// Base .terminal-line geometry is global (see _terminal.scss).
	.command {
		color: $white;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.output,
	.typewriter {
		color: $terminal-text;
		white-space: pre-wrap;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.terminal-image-container {
		// No extra vertical space — the gif sits like any other terminal line.
		margin: 0;
		text-align: center;
	}

	.terminal-image {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		// Pixel-art sprite (48x19, cropped flush): keep edges crisp when scaled.
		height: 48px;
		width: auto;
		image-rendering: pixelated;
	}
</style>
