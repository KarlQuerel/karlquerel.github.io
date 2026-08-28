<template>
	<div
		v-if="!gone"
		class="boot"
		:class="{ 'boot--out': leaving, 'boot--full': full }"
		role="status"
		:aria-label="`Loading, ${pct} percent`"
		@transitionend="finish"
	>
		<div class="boot__stage">
			<div
				class="boot__glow"
				:style="{ opacity: 0.15 + display * 0.55 }"
				aria-hidden="true"
			/>
			<svg class="boot__mark" :viewBox="VIEW_BOX" aria-hidden="true">
				<defs>
					<clipPath id="boot-fill">
						<rect x="0" :y="GRID - rows" :width="GRID" :height="rows" />
					</clipPath>
				</defs>
				<g class="boot__ink">
					<rect
						v-for="px in PIXELS"
						:key="px.k"
						:x="px.x"
						:y="px.y"
						width="1"
						height="1"
					/>
				</g>
				<g class="boot__lit" clip-path="url(#boot-fill)">
					<rect
						v-for="px in PIXELS"
						:key="px.k"
						:x="px.x"
						:y="px.y"
						width="1"
						height="1"
					/>
				</g>
			</svg>
		</div>
		<p class="boot__pct">{{ pct }}%</p>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { BOOT_EASE_TAU, BOOT_MIN_SHOW } from '@/constants/flyby'

	const props = defineProps({
		// what has genuinely completed, 0..1
		progress: { type: Number, required: true },
		// what it will reach when the step currently in flight lands
		ceiling: { type: Number, required: true },
		done: { type: Boolean, required: true },
	})

	// The Q from the name, drawn on the same 8x8 grid Press Start 2P is designed on. Not
	// the font's own glyph: the loader is the first thing on screen and cannot wait for a
	// webfont to arrive before it has a logo. Its counter is the hole the flight threads.
	const Q_GRID = [
		'..######..',
		'.##....##.',
		'##......##',
		'##......##',
		'##......##',
		'##......##',
		'##......##',
		'.##....##.',
		'..######..',
		'.......###',
	]
	const GRID = Q_GRID.length
	// resolved once: the template only places them
	const PIXELS = Q_GRID.flatMap((row, y) =>
		[...row].flatMap((c, x) => (c === '#' ? [{ x, y, k: `${x},${y}` }] : []))
	)
	const VIEW_BOX = `0 0 ${GRID} ${GRID}`

	const leaving = ref(false)
	const gone = ref(false)
	const full = ref(false)
	const display = ref(0)
	let shownAt = 0
	let timer = 0
	let raf = 0
	let last = 0

	const pct = computed(() => Math.min(100, Math.round(display.value * 100)))
	// The fill quantises to the mark's own rows, so it climbs a pixel row at a time rather
	// than sliding. Floor, so the top row only lands on a true 100.
	const rows = computed(() => Math.floor(Math.min(1, display.value) * GRID))

	function tick(t) {
		const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60
		last = t
		const target = props.done ? 1 : props.ceiling
		display.value += (target - display.value) * (1 - Math.exp(-dt / BOOT_EASE_TAU))
		// never show less than has actually completed
		if (display.value < props.progress) display.value = props.progress
		raf = requestAnimationFrame(tick)
	}

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
			// land on a true 100 and hold the mark full for a beat before uncovering
			display.value = 1
			full.value = true
			timer = window.setTimeout(
				leave,
				Math.max(0, BOOT_MIN_SHOW - (performance.now() - shownAt))
			)
		}
	)

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
		// the same ground the flight paints over, so uncovering it is not a scene change
		background: $flyby-ground;
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

	// Starlight behind the mark, coming up with the fill. The one soft thing on the page,
	// and it is doing what a glow does rather than drawing a shape - so no hard edge.
	.boot__glow {
		position: absolute;
		width: 300%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba($flyby-hot, 0.42) 0%, rgba($flyby-hot, 0) 64%);
		transition: opacity 0.3s linear;
	}

	.boot__mark {
		position: relative;
		width: clamp(78px, 16vw, 132px);
		height: auto;
		// adjacent rects otherwise show hairline seams where they meet
		shape-rendering: crispEdges;
	}

	.boot__ink {
		fill: rgba($flyby-ink, 0.2);
	}

	.boot__lit {
		fill: $flyby-hot;
	}

	// full brightness the instant it is full, then the cover goes
	.boot--full .boot__lit {
		fill: $white;
	}

	.boot__pct {
		font-size: 16px;
		letter-spacing: 3px;
		color: $flyby-ink;
		text-shadow:
			2px 2px 0 $black,
			$flyby-outline;
	}

	@media (prefers-reduced-motion: reduce) {
		.boot,
		.boot__glow {
			transition: none;
		}
	}
</style>
