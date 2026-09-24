<template>
	<div
		v-if="!gone"
		class="boot"
		:class="{ 'boot--out': leaving }"
		role="status"
		aria-label="Loading"
		@transitionend="finish"
	>
		<div class="boot__stage">
			<div class="boot__glow" :style="glowStyle" aria-hidden="true" />
			<BootMark :fill="display" :full="full" />
		</div>
		<p class="boot__pct" aria-hidden="true">{{ pct }}%</p>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { MAX_FRAME_DT, FIRST_FRAME_DT } from '@/constants/artGrid'
	import {
		BOOT_EASE_TAU,
		BOOT_GLOW,
		BOOT_LEAVE_FALLBACK_MS,
		BOOT_MIN_SHOW,
		BOOT_SWEEP,
	} from '@/constants/boot'
	import BootMark from './BootMark.vue'

	const props = defineProps({
		// what has genuinely completed, 0..1
		progress: { type: Number, required: true },
		// what it will reach when the step currently in flight lands
		ceiling: { type: Number, required: true },
		done: { type: Boolean, required: true },
	})

	// the cover has finished leaving and is drawing nothing: the host can unmount it
	const emit = defineEmits(['gone'])

	const leaving = ref(false)
	const gone = ref(false)
	const full = ref(false)
	const display = ref(0)
	let shownAt = 0
	let timer = 0
	let raf = 0
	let last = 0

	const pct = computed(() => Math.min(100, Math.round(display.value * 100)))
	const glowStyle = computed(() => ({ opacity: BOOT_GLOW.rest + display.value * BOOT_GLOW.gain }))

	function tick(t) {
		const dt = last ? Math.min(MAX_FRAME_DT, (t - last) / 1000) : FIRST_FRAME_DT
		last = t
		if (props.done) {
			// The boot usually beats the cover's guaranteed stay, so spend it sweeping the fill home.
			display.value = prefersReducedMotion()
				? 1
				: Math.min(1, display.value + dt / BOOT_SWEEP)
			if (display.value === 1 && !full.value) {
				full.value = true
				timer = window.setTimeout(
					leave,
					Math.max(0, BOOT_MIN_SHOW - (performance.now() - shownAt))
				)
			}
		} else {
			display.value += (props.ceiling - display.value) * (1 - Math.exp(-dt / BOOT_EASE_TAU))
			// never show less than has actually completed
			if (display.value < props.progress) display.value = props.progress
		}
		raf = requestAnimationFrame(tick)
	}

	// The cover is spent, and the clock has to stop with it: this is mounted for the life of the page.
	function dismiss() {
		gone.value = true
		cancelAnimationFrame(raf)
		raf = 0
		emit('gone')
	}

	function finish() {
		if (leaving.value) dismiss()
	}

	function leave() {
		// a fade nobody asked for is still motion; reduced motion just cuts
		if (prefersReducedMotion()) {
			dismiss()
			return
		}
		leaving.value = true
		timer = window.setTimeout(finish, BOOT_LEAVE_FALLBACK_MS)
	}

	onMounted(() => {
		shownAt = performance.now()
		raf = requestAnimationFrame(tick)
	})

	onBeforeUnmount(() => {
		window.clearTimeout(timer)
		cancelAnimationFrame(raf)
	})
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	.boot {
		position: fixed;
		inset: 0;
		z-index: 6;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.2rem;
		// the same ground the scene under it paints, so uncovering it is not a scene change
		background: var(--boot-ground, #{$flyby-ground});
		font-family: $font-pixel;
		// stepped, because this one runs on its own clock rather than the reader's hand
		transition: opacity 0.32s steps(4, end);
	}

	.boot--out {
		opacity: 0;
		pointer-events: none;
	}

	.boot__stage {
		position: relative;
		display: grid;
		place-items: center;
	}

	// Starlight behind the mark. The one soft thing on the page, so it has no hard edge.
	.boot__glow {
		position: absolute;
		width: 300%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba($yellow, 0.42) 0%, rgba($yellow, 0) 64%);
		transition: opacity 0.3s linear;
	}

	.boot__pct {
		font-size: 16px;
		letter-spacing: 3px;
		color: $flyby-ink;
		@include flyby-shadow;
	}

	@media (prefers-reduced-motion: reduce) {
		.boot,
		.boot__glow {
			transition: none;
		}
	}
</style>
