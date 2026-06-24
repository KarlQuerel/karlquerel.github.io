<template>
	<header class="site-header-animation">
		<img
			:key="headerGifCycleKey"
			class="site-header-animation-gif"
			:style="headerGifStyle"
			:src="activeHeaderGif"
			alt="Yako animation walking across the screen"
			@animationend="onHeaderGifAnimationEnd"
		/>
		<template
			v-for="headerGif in HEADER_GIF_SEQUENCE"
			:key="`header-gif-preload-${headerGif.kind}`"
		>
			<img class="sr-only-preload" alt="" :src="headerGif.src" />
		</template>
	</header>
</template>

<script setup>
	import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
	import { useRafThrottle } from '@/composables/useRafThrottle'

	const HEADER_GIF_SEQUENCE = [
		{ src: '/assets/img/Yako_Animations/Run.gif', direction: 'ltr', kind: 'run' },
		{ src: '/assets/img/Yako_Animations/Walk.gif', direction: 'rtl', kind: 'walk' },
	]
	const RUNNING_TO_WALKING_PAUSE_MS = 1200
	const WALKING_TO_RUNNING_PAUSE_MS = 1200
	const RUNNING_SPEED_PX_PER_SEC = 196
	const WALKING_SPEED_PX_PER_SEC = 156

	const activeHeaderGif = ref(HEADER_GIF_SEQUENCE[0].src)
	const activeHeaderGifDirection = ref(HEADER_GIF_SEQUENCE[0].direction)
	const activeHeaderGifKind = ref(HEADER_GIF_SEQUENCE[0].kind)
	const activeHeaderGifDurationMs = ref(11000)
	const headerGifCycleKey = ref(0)
	const viewportWidthPx = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)

	const headerGifStyle = computed(() => {
		const isRightToLeft = activeHeaderGifDirection.value === 'rtl'
		const baseWidth = getHeaderGifBaseWidthPx()
		const ltrFromPx = -Math.ceil((baseWidth * 2) / 2)
		const ltrToPx = Math.ceil(viewportWidthPx.value)
		return {
			'--header-gif-duration': `${activeHeaderGifDurationMs.value}ms`,
			'--header-gif-from': `${isRightToLeft ? ltrToPx : ltrFromPx}px`,
			'--header-gif-to': `${isRightToLeft ? ltrFromPx : ltrToPx}px`,
			'--header-gif-flip': isRightToLeft ? '-1' : '1',
		}
	})

	let headerGifSequenceIndex = 0
	let headerGifPauseTimeout = 0

	function clamp(min, preferred, max) {
		return Math.min(max, Math.max(min, preferred))
	}

	function getHeaderGifBaseWidthPx() {
		if (viewportWidthPx.value <= 640) {
			return clamp(96, viewportWidthPx.value * 0.3, 150)
		}
		return clamp(120, viewportWidthPx.value * 0.2, 220)
	}

	function getHeaderGifTravelDistancePx() {
		const baseWidth = getHeaderGifBaseWidthPx()
		return viewportWidthPx.value + baseWidth
	}

	function getHeaderGifDurationMs(kind) {
		const isWalking = kind === 'walk'
		const rawSpeedPxPerSec = isWalking ? WALKING_SPEED_PX_PER_SEC : RUNNING_SPEED_PX_PER_SEC
		// Scale speed down on small viewports so the dog doesn't zip across mobile screens
		const viewportFactor = Math.min(1, viewportWidthPx.value / 1280)
		const speedPxPerSec = rawSpeedPxPerSec * Math.max(0.45, viewportFactor)
		const distancePx = getHeaderGifTravelDistancePx()
		return Math.round((distancePx / speedPxPerSec) * 1000)
	}

	function startHeaderGifCycle() {
		const sequenceItem = HEADER_GIF_SEQUENCE[headerGifSequenceIndex] ?? HEADER_GIF_SEQUENCE[0]
		activeHeaderGif.value = sequenceItem.src
		activeHeaderGifDirection.value = sequenceItem.direction
		activeHeaderGifKind.value = sequenceItem.kind
		activeHeaderGifDurationMs.value = getHeaderGifDurationMs(sequenceItem.kind)
		headerGifCycleKey.value += 1
	}

	function scheduleNextHeaderGifCycle() {
		if (headerGifPauseTimeout) {
			window.clearTimeout(headerGifPauseTimeout)
			headerGifPauseTimeout = 0
		}
		const pauseMs =
			activeHeaderGifKind.value === 'walk'
				? WALKING_TO_RUNNING_PAUSE_MS
				: RUNNING_TO_WALKING_PAUSE_MS
		headerGifPauseTimeout = window.setTimeout(() => {
			headerGifPauseTimeout = 0
			startHeaderGifCycle()
		}, pauseMs)
	}

	function onHeaderGifAnimationEnd() {
		headerGifSequenceIndex = (headerGifSequenceIndex + 1) % HEADER_GIF_SEQUENCE.length
		scheduleNextHeaderGifCycle()
	}

	const onResize = useRafThrottle(() => {
		viewportWidthPx.value = window.innerWidth
	})

	onMounted(() => {
		viewportWidthPx.value = window.innerWidth
		headerGifSequenceIndex = 0
		startHeaderGifCycle()
		window.addEventListener('resize', onResize, { passive: true })
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', onResize)
		if (headerGifPauseTimeout) window.clearTimeout(headerGifPauseTimeout)
	})
</script>

<style lang="scss" scoped>
	.site-header-animation {
		position: relative;
		width: 100%;
		min-height: clamp(72px, 10vw, 104px);
		overflow: hidden;
		// Solid backdrop so the dog walks on black, not over the starfield.
		background: $black;
	}

	.site-header-animation-gif {
		display: inline-block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: clamp(120px, 20vw, 220px);
		height: auto;
		image-rendering: pixelated;
		transform-origin: bottom center;
		transform: translateX(var(--header-gif-from)) scaleX(var(--header-gif-flip, 1));
		animation: siteHeaderWalkAcross var(--header-gif-duration, 18000ms) linear 1 both;
		pointer-events: none;
		z-index: 2;
	}

	@keyframes siteHeaderWalkAcross {
		0% {
			transform: translateX(var(--header-gif-from)) scaleX(var(--header-gif-flip, 1));
		}
		100% {
			transform: translateX(var(--header-gif-to)) scaleX(var(--header-gif-flip, 1));
		}
	}

	.sr-only-preload {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: #{$breakpoint-mobile}) {
		.site-header-animation {
			min-height: clamp(58px, 18vw, 84px);
		}

		.site-header-animation-gif {
			width: clamp(96px, 30vw, 150px);
		}
	}
</style>
