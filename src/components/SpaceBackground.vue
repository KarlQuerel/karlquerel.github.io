<template>
	<!-- fixed backdrop: drifting parallax pixel-star planes + occasional shooting star. Decorative -->
	<div class="space-bg" aria-hidden="true">
		<canvas ref="canvasEl" class="space-bg__stars" />
		<div
			v-for="star in shootingStars"
			:key="star.id"
			class="shooting-star"
			:style="star.style"
			@animationend="removeStar(star.id)"
		/>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useBackdropCover } from '@/composables/useBackdropCover'
	import { useBackdropWarp } from '@/composables/useBackdropWarp'
	import { leanOf } from '@/composables/usePointerParallax'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { STAR_LAYERS, SHOOTING_STAR } from '@/constants/starfield'
	import { FINE_POINTER_QUERY, MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'
	import { randIn } from '@/js/math'
	import { createStarfield } from '@/js/starfield'

	function pick(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}

	const still = prefersReducedMotion()

	// scroll parallax is desktop-only: full-rate redraws during scroll were the phone lag
	const scrollParallax = window.matchMedia(FINE_POINTER_QUERY).matches

	// phones skip the faintest far plane
	const layerSpecs = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
		? STAR_LAYERS.slice(1)
		: STAR_LAYERS

	const canvasEl = ref(null)
	let field = null
	let lean = { x: 0, y: 0 }
	// read in the scroll event: inside a frame, after the journey's style writes, it forces a layout
	let scrollY = window.scrollY
	const warp = useBackdropWarp()

	// halt the drift when the page is hidden, or the entry veil has covered the sky
	const covered = useBackdropCover()
	const hidden = ref(false)
	const paused = computed(() => hidden.value || covered.value)
	const onVisibility = () => {
		hidden.value = document.visibilityState !== 'visible'
	}

	// The drift's clock stops while paused, so the sky resumes where it was rather than jumping on.
	let clockBase = 0
	let runningSince = performance.now()
	const driftSeconds = () =>
		(clockBase + (paused.value ? 0 : performance.now() - runningSince)) / 1000

	watch(paused, now => {
		if (now) {
			clockBase += performance.now() - runningSince
			stopDrift()
		} else {
			runningSince = performance.now()
			startDrift()
		}
	})

	function draw() {
		if (!field || covered.value) return
		field.draw({
			t: still ? 0 : driftSeconds(),
			lean,
			scrollY: scrollParallax && !still ? scrollY : 0,
			warp: scrollParallax && !still ? warp.value : 0,
		})
	}
	const drawSoon = useRafThrottle(draw)

	// The idle drift ticks at the fastest plane's one-pixel hop: nothing moves in between.
	let driftTimer = 0
	function startDrift() {
		if (still || driftTimer || !field) return
		const tick = () => {
			drawSoon()
			driftTimer = window.setTimeout(tick, field.hopSeconds() * 500)
		}
		tick()
	}
	function stopDrift() {
		window.clearTimeout(driftTimer)
		driftTimer = 0
	}

	useWindowListener(
		'resize',
		useRafThrottle(() => {
			field?.resize()
			draw()
		})
	)

	// covered, the comets would sit behind a paused sky and never end; the first rides a short fuse
	const { items: shootingStars, remove: removeStar } = useSkySpawner({
		gapMs: SHOOTING_STAR.gapMs,
		firstGapMs: SHOOTING_STAR.firstMs,
		active: () => !covered.value,
		make: () => ({
			style: {
				'--y': `${randIn(SHOOTING_STAR.y)}%`,
				'--x': `${randIn(SHOOTING_STAR.x)}%`,
				'--angle': `${randIn(SHOOTING_STAR.angle)}deg`,
				'--len': `${randIn(SHOOTING_STAR.len)}px`,
				'--travel': `${randIn(SHOOTING_STAR.travel)}vw`,
				'--dur': `${randIn(SHOOTING_STAR.dur)}s`,
				'--peak': randIn(SHOOTING_STAR.peak).toFixed(2),
				'--tint': pick(SHOOTING_STAR.tints),
			},
		}),
	})

	// no cursor on touch, and their drag-scrolls fire pointermove mid-scroll
	if (scrollParallax && !still) {
		useWindowListener('pointermove', event => {
			lean = leanOf(event)
			drawSoon()
		})
		useWindowListener('scroll', () => {
			scrollY = window.scrollY
			drawSoon()
		})
		// the warp rides scroll, so it stays off wherever scroll parallax does; it changes in the glide's
		// own frame, so it draws there rather than a frame later
		watch(warp, draw)
	}

	onMounted(() => {
		field = createStarfield(canvasEl.value, layerSpecs)
		draw()
		if (!still) document.addEventListener('visibilitychange', onVisibility)
		if (!paused.value) startDrift()
	})

	onBeforeUnmount(() => {
		stopDrift()
		document.removeEventListener('visibilitychange', onVisibility)
	})
</script>

<style scoped lang="scss">
	// pinned behind all content via negative z-index — no per-page wrapper needed
	.space-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	// one device pixel per canvas pixel: the stars are placed on the screen's own grid
	.space-bg__stars {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	// comet: pixel head (::after) + fading streak, rotated to its travel angle
	.shooting-star {
		position: absolute;
		top: var(--y);
		left: var(--x);
		width: var(--len);
		height: 2px;
		color: var(--tint);
		background: linear-gradient(to left, currentColor, transparent);
		opacity: 0;
		transform: rotate(var(--angle));
		transform-origin: center;
		image-rendering: pixelated;
		animation: shootingStar var(--dur) linear forwards;
	}

	.shooting-star::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 3px;
		height: 3px;
		margin-top: -1px;
		background: currentColor;
	}

	@keyframes shootingStar {
		0% {
			transform: rotate(var(--angle)) translateX(0);
			opacity: 0;
		}
		12% {
			opacity: var(--peak);
		}
		85% {
			opacity: var(--peak);
		}
		100% {
			transform: rotate(var(--angle)) translateX(var(--travel));
			opacity: 0;
		}
	}
</style>
