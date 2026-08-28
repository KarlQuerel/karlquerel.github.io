<template>
	<div
		v-if="shown && !gone"
		class="boot"
		:class="{ 'boot--out': leaving }"
		role="status"
		@transitionend="finish"
	>
		<p class="boot__head">PREFLIGHT</p>
		<ul class="boot__list">
			<li v-for="entry in log" :key="entry.label" class="boot__row">
				<span class="boot__label">{{ entry.label }}</span>
				<span class="boot__leader" aria-hidden="true" />
				<span class="boot__ms">{{ entry.ms }}ms</span>
			</li>
			<li v-if="pending" class="boot__row boot__row--live">
				<span class="boot__label">{{ pending }}</span>
				<span class="boot__cursor" aria-hidden="true" />
			</li>
		</ul>
		<p class="boot__total">{{ total }}ms</p>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { BOOT_MIN_SHOW, BOOT_SHOW_AFTER, BOOT_STEPS } from '@/constants/flyby'

	const props = defineProps({
		// [{ label, ms }] in the order the boot actually completed them
		log: { type: Array, required: true },
		done: { type: Boolean, required: true },
	})

	const ORDER = Object.values(BOOT_STEPS)

	// Never flash: not rendered at all until the boot has been slow enough to be worth
	// explaining, then kept long enough to be read rather than blinking out mid-word. A
	// boot that beats BOOT_SHOW_AFTER shows nothing, which is the right answer - the
	// reader did not wait, so there is nothing to apologise for.
	const shown = ref(false)
	const leaving = ref(false)
	const gone = ref(false)
	let shownAt = 0
	let timer = 0

	const pending = computed(() => (props.done ? null : (ORDER[props.log.length] ?? null)))
	const total = computed(() => props.log.reduce((sum, e) => sum + e.ms, 0))

	function finish() {
		if (leaving.value) gone.value = true
	}

	function leave() {
		// a fade nobody asked for is still motion; reduced motion just cuts
		if (prefersReducedMotion()) {
			gone.value = true
			return
		}
		leaving.value = true
		// transitionend is the real signal, but never let a missed event strand the cover
		timer = window.setTimeout(finish, 1000)
	}

	watch(
		() => props.done,
		isDone => {
			if (!isDone) return
			window.clearTimeout(timer)
			// it never appeared, so there is nothing to take away
			if (!shown.value) {
				gone.value = true
				return
			}
			timer = window.setTimeout(
				leave,
				Math.max(0, BOOT_MIN_SHOW - (performance.now() - shownAt))
			)
		}
	)

	onMounted(() => {
		timer = window.setTimeout(() => {
			if (props.done) return
			shown.value = true
			shownAt = performance.now()
		}, BOOT_SHOW_AFTER)
	})

	onBeforeUnmount(() => window.clearTimeout(timer))
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
		gap: 18px;
		// the same ground the flight paints over, so uncovering it is not a scene change
		background: $flyby-ground;
		color: $flyby-dim;
		font-family: $font-pixel;
		font-size: 8px;
		line-height: 1.8;
		// stepped, because this one runs on its own clock rather than the reader's hand
		transition: opacity 0.32s steps(4, end);
	}

	.boot--out {
		opacity: 0;
		pointer-events: none;
	}

	// font-size explicitly, on both of these: they are <p>, and the global `p, h1` rule in
	// _layout.scss sizes every paragraph on the site, which a class rule that only sets
	// colour will not override.
	.boot__head {
		font-size: 11px;
		color: $flyby-hot;
		letter-spacing: 4px;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
	}

	.boot__list {
		list-style: none;
		width: min(24rem, 78vw);
		margin: 0;
		padding: 0;
	}

	.boot__row {
		display: flex;
		align-items: baseline;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
	}

	.boot__label {
		white-space: nowrap;
	}

	// pixel dot leader: 2px marks on a 6px pitch, so it reads as a dotted rule drawn on
	// the same grid as everything else rather than as a hairline
	.boot__leader {
		flex: 1;
		align-self: flex-end;
		height: 2px;
		margin: 0 8px 3px;
		background-image: linear-gradient(90deg, $flyby-faint 0 2px, transparent 2px 6px);
		background-size: 6px 2px;
		background-repeat: repeat-x;
	}

	.boot__ms {
		color: $flyby-ink;
		white-space: nowrap;
	}

	.boot__row--live .boot__label {
		color: $flyby-ink;
	}

	.boot__cursor {
		width: 6px;
		height: 8px;
		margin-left: 8px;
		background: $flyby-hot;
		animation: boot-blink 0.9s steps(2, end) infinite;
	}

	.boot__total {
		font-size: 8px;
		color: $flyby-faint;
		text-shadow: 2px 2px 0 $black;
	}

	@keyframes boot-blink {
		0%,
		50% {
			opacity: 1;
		}
		50.01%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot {
			transition: none;
		}
		.boot__cursor {
			animation: none;
		}
	}
</style>
