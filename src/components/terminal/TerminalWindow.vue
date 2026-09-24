<template>
	<div class="terminal-window" data-nosnippet :style="{ '--phosphor': phosphor }">
		<div class="terminal-header">
			<div class="terminal-buttons" aria-hidden="true">
				<div class="btn red" />
				<div class="btn yellow" />
				<div class="btn green" />
			</div>
			<div class="terminal-title">{{ title }}</div>
		</div>

		<div ref="body" class="terminal-body" @click="emit('bodyClick')">
			<slot />
		</div>

		<slot name="overlay" />
	</div>
</template>

<script setup>
	import { useTemplateRef } from 'vue'

	// Presentational CRT window: chrome, scrollable body and the phosphor colour, no shell logic.
	defineProps({
		title: { type: String, required: true },
		// unset falls back to the stylesheet's green
		phosphor: { type: String, default: undefined },
	})
	const emit = defineEmits(['bodyClick'])

	defineExpose({ body: useTemplateRef('body') })
</script>

<!-- unscoped on purpose: typed output is raw HTML that scoped styles can't reach -->
<style lang="scss">
	@use '@/styles/terminal';
</style>
