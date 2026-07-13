<template>
	<!-- fixed backdrop: drifting parallax pixel-star layers + occasional shooting star. Decorative -->
	<div
		class="space-bg"
		:class="{ 'is-paused': paused }"
		:style="parallaxStyle"
		aria-hidden="true"
	>
		<div v-for="layer in starLayers" :key="layer.id" class="star-layer" :style="layer.style" />
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
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import {
		STAR_COLORS,
		STAR_LAYERS,
		STAR_SIZE_JITTER,
		SHOOTING_STAR,
	} from '@/constants/starfield'
	import { MOBILE_VIEWPORT_QUERY } from '@/constants/viewport'

	function rand(min, max) {
		return min + Math.random() * (max - min)
	}

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

	// one parallax plane: a tile of random dots as stacked radial-gradients + its drift vars
	function buildLayer(layer, id) {
		const [w, h] = layer.tile
		const dots = []
		for (let i = 0; i < layer.count; i++) {
			const x = rand(0, w).toFixed(1)
			const y = rand(0, h).toFixed(1)
			const size = (layer.size * rand(...STAR_SIZE_JITTER)).toFixed(2)
			const color = withAlpha(pick(STAR_COLORS), rand(...layer.alpha))
			dots.push(
				`radial-gradient(${size}px ${size}px at ${x}px ${y}px, ${color} 99%, transparent 100%)`
			)
		}
		// bleed only the two trailing edges (leading never uncovers); pad covers the mouse parallax
		const [dirX, dirY] = layer.dir
		const pad = layer.depth + 8
		return {
			id,
			style: {
				backgroundImage: dots.join(','),
				backgroundSize: `${w}px ${h}px`,
				'--bleed-top': `${(dirY > 0 ? h : 0) + pad}px`,
				'--bleed-right': `${(dirX < 0 ? w : 0) + pad}px`,
				'--bleed-bottom': `${(dirY < 0 ? h : 0) + pad}px`,
				'--bleed-left': `${(dirX > 0 ? w : 0) + pad}px`,
				// drift exactly one tile so the loop is seamless; sign sets direction
				'--drift-x': `${dirX * w}px`,
				'--drift-y': `${dirY * h}px`,
				'--dur': `${layer.duration}s`,
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

	// axes normalised to -1..1 and negated so layers drift against the cursor via --depth
	const pointer = ref({ x: 0, y: 0 })
	const parallaxStyle = computed(() => ({ '--mx': pointer.value.x, '--my': pointer.value.y }))

	const onPointerMove = useRafThrottle(event => {
		pointer.value = {
			x: -((event.clientX / window.innerWidth - 0.5) * 2),
			y: -((event.clientY / window.innerHeight - 0.5) * 2),
		}
	})

	// halt the drift loops whenever the page isn't visible
	const paused = ref(false)
	const onVisibility = () => {
		paused.value = document.visibilityState !== 'visible'
	}

	const shootingStars = ref([])
	let nextId = 0
	let timer = 0

	function spawnStar() {
		// skip while hidden — paused animations never fire animationend, so comets pile up
		if (document.visibilityState === 'visible') {
			shootingStars.value.push({
				id: nextId++,
				style: {
					'--y': `${rand(...SHOOTING_STAR.y)}%`,
					'--x': `${rand(...SHOOTING_STAR.x)}%`,
					'--angle': `${rand(...SHOOTING_STAR.angle)}deg`,
					'--len': `${rand(...SHOOTING_STAR.len)}px`,
					'--travel': `${rand(...SHOOTING_STAR.travel)}vw`,
					'--dur': `${rand(...SHOOTING_STAR.dur)}s`,
					'--peak': rand(...SHOOTING_STAR.peak).toFixed(2),
					'--tint': pick(SHOOTING_STAR.tints),
				},
			})
		}
		scheduleNext()
	}

	function scheduleNext() {
		timer = window.setTimeout(spawnStar, rand(...SHOOTING_STAR.gapMs))
	}

	function removeStar(id) {
		shootingStars.value = shootingStars.value.filter(star => star.id !== id)
	}

	onMounted(() => {
		if (prefersReducedMotion()) return
		document.addEventListener('visibilitychange', onVisibility)
		window.addEventListener('pointermove', onPointerMove, { passive: true })
		scheduleNext()
	})

	onBeforeUnmount(() => {
		window.clearTimeout(timer)
		document.removeEventListener('visibilitychange', onVisibility)
		window.removeEventListener('pointermove', onPointerMove)
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

	// drift runs on transform, mouse parallax on the separate translate, so they never collide
	.star-layer {
		position: absolute;
		inset: calc(var(--bleed-top) * -1) calc(var(--bleed-right) * -1)
			calc(var(--bleed-bottom) * -1) calc(var(--bleed-left) * -1);
		background-repeat: repeat;
		translate: calc(var(--mx, 0) * var(--depth) * 1px) calc(var(--my, 0) * var(--depth) * 1px);
		animation: starDrift var(--dur) linear infinite;
		will-change: transform;
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
