<template>
	<!-- The plated name with a line under it, leaning with the cursor as the nearest layer (the page sets
	     --mx/--my): the name rises and fades in once `shown`, then the line the same way. The line is a
	     title screen's start prompt or a typed status. Once `leaving`, the prompt blinks out and the
	     name comes apart. -->
	<div
		class="title-card"
		:class="{ 'title-card--in': shown }"
		:style="cardStyle"
		@transitionend.self="onIn"
	>
		<!-- mounted with the rise: its glint repaints the canvas, which would cost the frames before it -->
		<PlatingWordmark
			v-if="shown"
			:build="false"
			:cell-max="cellMax"
			:span="span"
			:strip="leaving ? L.strip : null"
			lit
			@stripped="emit('stripped')"
		/>
		<p
			v-if="prompt"
			class="title-card__line title-card__prompt"
			:class="{ 'title-card__line--in': named, 'title-card__prompt--go': leaving }"
		>
			{{ prompt }}
		</p>
		<TypedReadout
			v-else
			class="title-card__line"
			:class="{ 'title-card__line--in': named }"
			:line="line"
			:typed="false"
			pixel
		/>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { GAME_HOLDING } from '@/constants/game'
	import PlatingWordmark from './PlatingWordmark.vue'
	import TypedReadout from './TypedReadout.vue'

	const props = defineProps({
		shown: { type: Boolean, default: false },
		// the title screen's start prompt; without one, `line` is typed under the name
		prompt: { type: String, default: '' },
		line: { type: Object, default: null },
		// the title is being left for the game
		leaving: { type: Boolean, default: false },
		// the most CSS px a cell of the name may take on this page, and the share of the width it may span
		// (unset, the plating's own)
		cellMax: { type: Number, default: GAME_HOLDING.title.cellMax },
		span: { type: Number, default: 0 },
	})
	// `in`: the name is in place; `stripped`: it has come apart, its last spark out
	const emit = defineEmits(['in', 'stripped'])

	const L = GAME_HOLDING.leave
	const { title: T, status: S } = GAME_HOLDING.rise
	const cardStyle = {
		'--depth': GAME_HOLDING.title.depth,
		'--title-ms': `${T.ms}ms`,
		'--title-delay': `${T.delayMs}ms`,
		'--title-from': `${T.from * 100}vh`,
		'--status-ms': `${S.ms}ms`,
		'--status-delay': `${S.delayMs}ms`,
		'--status-from': `${S.from * 100}vh`,
		'--blink-ms': `${L.blinkMs}ms`,
		'--blinks': L.blinks,
	}

	const named = ref(false)
	function arrive() {
		named.value = true
		emit('in')
	}
	const onIn = event => event.propertyName === 'transform' && arrive()
	// no transition runs under reduced motion, so nothing would end one
	watch(
		() => props.shown,
		on => on && prefersReducedMotion() && arrive(),
		{ immediate: true }
	)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.title-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		opacity: 0;
		transform: translateY(var(--title-from));
		transition:
			opacity var(--title-ms) linear var(--title-delay),
			transform var(--title-ms) $ease-settle var(--title-delay);
		@include lean;
	}

	.title-card--in {
		opacity: 1;
		transform: none;
	}

	// the line rises after the name the same way
	.title-card__line {
		opacity: 0;
		transform: translateY(var(--status-from));
		transition:
			opacity var(--status-ms) linear var(--status-delay),
			transform var(--status-ms) $ease-settle var(--status-delay);
	}

	.title-card__line--in {
		opacity: 1;
		transform: none;
	}

	// a title screen's prompt; blinks on visibility, the rise owns opacity
	.title-card__prompt {
		margin: 1.5rem 0 0;
		font-family: $font-pixel;
		font-size: $type-title;
		letter-spacing: 2 * $font-pixel-unit;
		text-align: center;
		color: $light-gray;
		animation: title-prompt 1.2s step-end infinite;
	}

	@keyframes title-prompt {
		50% {
			visibility: hidden;
		}
	}

	// pressed: a few fast blinks, then gone
	.title-card__prompt--go {
		animation: title-go var(--blink-ms) step-end var(--blinks) forwards;
	}

	@keyframes title-go {
		50%,
		100% {
			visibility: hidden;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.title-card,
		.title-card__line {
			transition: none;
		}

		.title-card__prompt {
			animation: none;
		}
	}
</style>
