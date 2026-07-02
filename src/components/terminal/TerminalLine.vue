<template>
	<div class="terminal-line">
		<!-- Echoed command: prompt + what the user typed -->
		<template v-if="line.type === 'command'">
			<TerminalPrompt />
			<span class="command">{{ line.content }}</span>
		</template>

		<!-- Image output (e.g. the yako gif), shown static and centered -->
		<div v-else-if="line.image" class="terminal-image-container">
			<img :src="line.image" :alt="line.alt || 'Terminal image'" class="terminal-image" />
		</div>

		<!-- Typed output: empty target the parent fills via TypeIt -->
		<span v-else-if="animatable" ref="target" :class="line.type" />

		<!-- Static link line -->
		<span v-else-if="line.link" :class="line.type">
			{{ line.prefix }}
			<a :href="line.link" target="_blank" class="terminal-link">{{ line.linkText }}</a>
		</span>

		<!-- Static HTML output -->
		<!-- eslint-disable-next-line vue/no-v-html -->
		<span v-else-if="line.html" :class="line.type" v-html="line.content" />

		<!-- Static plain text -->
		<span v-else :class="line.type">{{ line.content }}</span>
	</div>
</template>

<script setup>
	import { computed, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
	import TerminalPrompt from './TerminalPrompt.vue'

	const props = defineProps({
		line: { type: Object, required: true },
		index: { type: Number, required: true },
	})

	const emit = defineEmits(['register', 'unregister'])

	// Typed lines are text that the parent animates character-by-character.
	// Images carry their own animation, so they are never typed.
	const animatable = computed(
		() =>
			(props.line.type === 'typewriter' || props.line.type === 'output') && !props.line.image
	)

	const target = useTemplateRef('target')

	onMounted(() => {
		if (animatable.value && target.value) {
			emit('register', props.index, target.value)
		}
	})

	onBeforeUnmount(() => {
		if (animatable.value) {
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
		color: #cfd2cf;
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
