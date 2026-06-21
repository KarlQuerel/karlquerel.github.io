<template>
	<span class="terminal-prompt">
		<span class="prompt-user">{{ PROMPT.user }}@{{ PROMPT.host }}</span
		><span class="prompt-sep">:</span><span class="prompt-path">{{ PROMPT.path }}</span
		><span class="prompt-symbol">{{ PROMPT.symbol }}</span>
	</span>
</template>

<script setup>
	import { PROMPT } from '@/constants/terminal'
</script>

<style lang="scss" scoped>
	.terminal-prompt {
		margin-right: 0.5ch;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.prompt-user {
		color: var(--phosphor);
	}

	.prompt-sep {
		color: $light-gray;
	}

	.prompt-path {
		color: $light-blue;
	}

	.prompt-symbol {
		color: $light-gray;
		margin-left: 0.25ch;
	}

	// On phones the full user@host eats the line and pushes typed commands into
	// early wraps; collapse to ~$ so the input keeps room (still reads as a shell).
	@media (max-width: #{$breakpoint-mobile}) {
		.prompt-user,
		.prompt-sep {
			display: none;
		}
	}
</style>
