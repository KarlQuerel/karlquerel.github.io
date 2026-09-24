<template>
	<!-- fixed backdrop: drifting parallax pixel-star layers + occasional shooting star. Decorative -->
	<div
		class="space-bg"
		:class="{ 'is-paused': paused }"
		:style="parallaxStyle"
		aria-hidden="true"
	>
		<div
			v-for="layer in starLayers"
			:key="layer.id"
			:ref="el => el && (layerEls[layer.id] = el)"
			class="star-layer"
			:style="layer.style"
		/>
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
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useBackdropCover } from '@/composables/useBackdropCover'
	import { leanOf } from '@/composables/usePointerParallax'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { useWindowListener } from '@/composables/useWindowListener'
	import {
		STAR_COLORS,
		STAR_LAYERS,
		STAR_LAYER_PAD,
		STAR_SIZE_JITTER,
		STAR_TILE_MAX_DPR,
		SCROLL_PARALLAX,
		SHOOTING_STAR,
		DRIFT_STEP_DEVICE_PX,
	} from '@/constants/starfield'
	import { FINE_POINTER_QUERY, MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'
	import { randIn } from '@/js/math'

	function pick(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}

	// #rrggbb + 0..1 alpha → #rrggbbaa so each dot carries its own opacity
	function withAlpha(hex, alpha) {
		return (
			hex +
			Math.round(alpha * 255)
				.toString(16)
				.padStart(2, '0')
		)
	}

	const dpr = Math.min(window.devicePixelRatio || 1, STAR_TILE_MAX_DPR)

	// paint the tile's dots once into a bitmap: eviction then costs one blit, not dozens of gradients
	function rasterizeTile(layer) {
		const [w, h] = layer.tile
		const canvas = document.createElement('canvas')
		canvas.width = w * dpr
		canvas.height = h * dpr
		const ctx = canvas.getContext('2d')
		ctx.scale(dpr, dpr)
		for (let i = 0; i < layer.count; i++) {
			ctx.fillStyle = withAlpha(pick(STAR_COLORS), randIn(layer.alpha))
			ctx.beginPath()
			ctx.arc(
				randIn([0, w]),
				randIn([0, h]),
				(layer.size * randIn(STAR_SIZE_JITTER)) / 2,
				0,
				Math.PI * 2
			)
			ctx.fill()
		}
		return canvas.toDataURL()
	}

	// scroll parallax is desktop-only: full-rate recomposits during scroll were the phone lag
	const scrollParallax = window.matchMedia(FINE_POINTER_QUERY).matches

	// one parallax plane: its pre-rendered dot tile + drift vars
	function buildLayer(layer, id) {
		const [w, h] = layer.tile
		// bleed only the two trailing edges (leading never uncovers); pad covers the mouse parallax.
		const [dirX, dirY] = layer.dir
		const pad = layer.depth + STAR_LAYER_PAD
		return {
			id,
			style: {
				backgroundImage: `url(${rasterizeTile(layer)})`,
				backgroundSize: `${w}px ${h}px`,
				'--bleed-top': `${(dirY > 0 ? h : 0) + pad}px`,
				'--bleed-right': `${(dirX < 0 ? w : 0) + pad}px`,
				'--bleed-bottom': `${(dirY < 0 || scrollParallax ? h : 0) + pad}px`,
				'--bleed-left': `${(dirX > 0 ? w : 0) + pad}px`,
				// drift exactly one tile so the loop is seamless; sign sets direction
				'--drift-x': `${dirX * w}px`,
				'--drift-y': `${dirY * h}px`,
				'--dur': `${layer.duration}s`,
				// one step per device pixel of travel: reads as continuous motion, yet skips ~9 frames in 10
				'--drift-steps': Math.max(
					1,
					Math.round((Math.hypot(w, h) * dpr) / DRIFT_STEP_DEVICE_PX)
				),
				'--depth': layer.depth,
			},
		}
	}

	// phones skip the faintest far plane — one fewer full-screen composited layer
	const layerSpecs = window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
		? STAR_LAYERS.slice(1)
		: STAR_LAYERS
	// Generated once per visit → no two loads share the same sky.
	const starLayers = layerSpecs.map((layer, i) => buildLayer(layer, i))
	const layerEls = []

	// Streaming the planes past at depth-scaled rates as the page scrolls — the "camera travelling" cue.
	const onScrollParallax = useRafThrottle(() => {
		const y = window.scrollY
		layerSpecs.forEach((spec, i) => {
			const el = layerEls[i]
			if (!el) return
			const offset = Math.round((y * SCROLL_PARALLAX * spec.depth) % spec.tile[1])
			el.style.setProperty('--sy', `${-offset}px`)
		})
	})

	const pointer = ref({ x: 0, y: 0 })
	const parallaxStyle = computed(() => ({ '--mx': pointer.value.x, '--my': pointer.value.y }))

	const onPointerMove = useRafThrottle(event => (pointer.value = leanOf(event)))

	// halt the drift loops when the page is hidden, or the entry veil has covered the sky
	const covered = useBackdropCover()
	const hidden = ref(false)
	const paused = computed(() => hidden.value || covered.value)
	const onVisibility = () => {
		hidden.value = document.visibilityState !== 'visible'
	}

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

	const still = prefersReducedMotion()
	// no cursor on touch, and their drag-scrolls fire pointermove, restyling every star layer mid-scroll
	if (scrollParallax && !still) {
		useWindowListener('pointermove', onPointerMove)
		useWindowListener('scroll', onScrollParallax)
	}

	onMounted(() => {
		if (!still) document.addEventListener('visibilitychange', onVisibility)
	})

	onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVisibility))
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

	// drift runs on transform, mouse parallax on the separate translate, so they never collide
	.star-layer {
		position: absolute;
		inset: calc(var(--bleed-top) * -1) calc(var(--bleed-right) * -1)
			calc(var(--bleed-bottom) * -1) calc(var(--bleed-left) * -1);
		background-repeat: repeat;
		translate: calc(var(--mx, 0) * var(--depth) * 1px)
			calc(var(--my, 0) * var(--depth) * 1px + var(--sy, 0px));
		// no will-change: the animation promotes the layer while it runs; a permanent hint keeps it resident
		animation: starDrift var(--dur) linear infinite;
		// Default (phones): hops of one device pixel. The identical frames between cost nothing.
		animation-timing-function: steps(var(--drift-steps, 600), end);
	}

	// Desktop can afford a full-rate composited transform; phones keep the stepped hops.
	@media (hover: hover) and (pointer: fine) {
		.star-layer {
			animation-timing-function: linear;
		}
	}

	.is-paused .star-layer {
		animation-play-state: paused;
	}

	@keyframes starDrift {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(var(--drift-x), var(--drift-y), 0);
		}
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

	@media (prefers-reduced-motion: reduce) {
		.star-layer {
			animation: none;
			translate: none;
			transform: none;
		}
	}
</style>
