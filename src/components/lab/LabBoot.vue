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
					<g id="boot-body">
						<rect
							v-for="px in PIXELS"
							:key="px.k"
							:x="px.x"
							:y="px.y"
							width="1"
							height="1"
						/>
					</g>
					<clipPath id="boot-fill">
						<rect x="0" :y="ROWS - rows" :width="COLS" :height="rows" />
					</clipPath>
					<clipPath id="boot-edge">
						<rect x="0" :y="ROWS - rows" :width="COLS" :height="rows ? 1 : 0" />
					</clipPath>
				</defs>
				<g class="boot__rim">
					<rect
						v-for="px in OUTLINE"
						:key="px.k"
						:x="px.x"
						:y="px.y"
						width="1"
						height="1"
					/>
				</g>
				<use class="boot__ink" href="#boot-body" />
				<use class="boot__lit" clip-path="url(#boot-fill)" href="#boot-body" />
				<use class="boot__edge" clip-path="url(#boot-edge)" href="#boot-body" />
			</svg>
		</div>
		<p class="boot__pct">{{ pct }}%</p>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { BOOT_EASE_TAU, BOOT_MIN_SHOW, BOOT_SWEEP } from '@/constants/flyby'

	const props = defineProps({
		// what has genuinely completed, 0..1
		progress: { type: Number, required: true },
		// what it will reach when the step currently in flight lands
		ceiling: { type: Number, required: true },
		done: { type: Boolean, required: true },
	})

	// The K from the favicon - the site's logo, pixel for pixel. Not an image: the loader
	// is the first thing on screen and cannot wait for an asset to arrive before it has a
	// logo.
	const K_GRID = [
		'##.....##',
		'##....##.',
		'##...##..',
		'##..##...',
		'##.##....',
		'####.....',
		'##.##....',
		'##..##...',
		'##...##..',
		'##....##.',
		'##.....##',
	]
	const ROWS = K_GRID.length
	const COLS = K_GRID[0].length
	// resolved once: the template only places them
	const PIXELS = K_GRID.flatMap((row, y) =>
		[...row].flatMap((c, x) => (c === '#' ? [{ x, y, k: `${x},${y}` }] : []))
	)
	// the favicon's dark contour, derived rather than copied: every empty cell that
	// touches the body, corners included
	const NEAR = [-1, 0, 1]
	const inBody = (x, y) => K_GRID[y]?.[x] === '#'
	const OUTLINE = []
	for (let y = -1; y <= ROWS; y++) {
		for (let x = -1; x <= COLS; x++) {
			if (inBody(x, y)) continue
			if (NEAR.some(dy => NEAR.some(dx => inBody(x + dx, y + dy))))
				OUTLINE.push({ x, y, k: `${x},${y}` })
		}
	}
	// one cell of padding all round, where the contour lives
	const VIEW_BOX = `-1 -1 ${COLS + 2} ${ROWS + 2}`

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
	const rows = computed(() => Math.floor(Math.min(1, display.value) * ROWS))

	function tick(t) {
		const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60
		last = t
		if (props.done) {
			// The boot itself is usually quicker than the cover's guaranteed stay, so spend
			// that stay sweeping the fill home rather than teleporting to 100 and parking.
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
		// the same ground the scene under it paints over, so uncovering it is not a scene
		// change: the flight's by default, or whatever the host names in --boot-ground
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

	// Starlight behind the mark, coming up with the fill. The one soft thing on the page,
	// and it is doing what a glow does rather than drawing a shape - so no hard edge.
	.boot__glow {
		position: absolute;
		width: 300%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba($yellow, 0.42) 0%, rgba($yellow, 0) 64%);
		transition: opacity 0.3s linear;
	}

	.boot__mark {
		position: relative;
		// the old 9-column width scaled up for the contour's two extra columns
		width: clamp(96px, 19.5vw, 160px);
		height: auto;
		// adjacent rects otherwise show hairline seams where they meet
		shape-rendering: crispEdges;
	}

	// the favicon's dark rim, so the mark reads as the logo and not just a letter
	.boot__rim {
		fill: $flyby-void;
	}

	.boot__ink {
		fill: rgba($flyby-ink, 0.2);
	}

	.boot__lit {
		fill: $yellow;
	}

	// the row being written blinks like a cursor: two held frames, no fade
	.boot__edge {
		fill: $white;
		animation: boot-blink 0.9s step-end infinite;
	}

	// full brightness the instant it is full, then the cover goes
	.boot--full .boot__lit {
		fill: $white;
	}

	.boot--full .boot__edge {
		animation: none;
	}

	@keyframes boot-blink {
		50% {
			opacity: 0;
		}
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

		.boot__edge {
			animation: none;
		}
	}
</style>
