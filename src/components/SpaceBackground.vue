<template>
	<!-- Shared fixed backdrop behind every page: several
	     randomly generated pixel-star layers that drift diagonally at different
	     speeds and shift under the cursor for parallax depth, plus the occasional
	     pixel shooting star streaking across. Purely decorative. -->
	<div class="space-bg" :style="parallaxStyle" aria-hidden="true">
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

	function rand(min, max) {
		return min + Math.random() * (max - min)
	}

	function pick(arr) {
		return arr[Math.floor(Math.random() * arr.length)]
	}

	// hex (#rrggbb) + 0..1 alpha → #rrggbbaa, so each generated dot can carry its
	// own opacity without a separate rgba() parse step.
	function withAlpha(hex, alpha) {
		return (
			hex +
			Math.round(alpha * 255)
				.toString(16)
				.padStart(2, '0')
		)
	}

	// Build one parallax plane: a tile of randomly placed, randomly tinted dots
	// rendered as stacked radial-gradients, plus the CSS vars its drift needs.
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
		return {
			id,
			style: {
				backgroundImage: dots.join(','),
				backgroundSize: `${w}px ${h}px`,
				// Inset one full tile so the element can translate a whole tile and
				// still cover the viewport; the background stays seamless across it.
				'--bleed-x': `${w}px`,
				'--bleed-y': `${h}px`,
				// Drift exactly one tile so the transform loop is seamless; sign sets
				// direction.
				'--drift-x': `${layer.dir[0] * w}px`,
				'--drift-y': `${layer.dir[1] * h}px`,
				'--dur': `${layer.duration}s`,
				'--depth': layer.depth,
			},
		}
	}

	// Generated once per visit → no two loads share the same sky.
	const starLayers = STAR_LAYERS.map((layer, i) => buildLayer(layer, i))

	// Pointer parallax: each axis normalised to -1..1 and negated so the layers
	// drift against the cursor (the classic look-around-the-scene illusion). Read
	// by the layers via `--depth` in a CSS calc, so moving the mouse only patches
	// the container's two vars — the layers themselves never re-render.
	const pointer = ref({ x: 0, y: 0 })
	const parallaxStyle = computed(() => ({ '--mx': pointer.value.x, '--my': pointer.value.y }))

	const onPointerMove = useRafThrottle(event => {
		pointer.value = {
			x: -((event.clientX / window.innerWidth - 0.5) * 2),
			y: -((event.clientY / window.innerHeight - 0.5) * 2),
		}
	})

	const shootingStars = ref([])
	let nextId = 0
	let timer = 0

	function spawnStar() {
		// Skip while the tab is hidden — paused CSS animations never fire
		// `animationend`, so the elements would otherwise pile up off-screen.
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
		window.addEventListener('pointermove', onPointerMove, { passive: true })
		scheduleNext()
	})

	onBeforeUnmount(() => {
		window.clearTimeout(timer)
		window.removeEventListener('pointermove', onPointerMove)
	})
</script>

<style scoped lang="scss">
	// Full-viewport layer pinned behind all content (negative z-index keeps it
	// under the navbar/footer/main without needing a per-page wrapper).
	.space-bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	// One generated parallax plane. Drift runs on `transform` (GPU-composited, no
	// per-frame repaint) while mouse parallax uses the independent `translate`
	// property so the two never collide. `--mx`/`--my` (-1..1) come from the
	// container; `--depth` scales them per layer into a pixel offset.
	.star-layer {
		position: absolute;
		inset: calc(var(--bleed-y) * -1) calc(var(--bleed-x) * -1);
		background-repeat: repeat;
		translate: calc(var(--mx, 0) * var(--depth) * 1px) calc(var(--my, 0) * var(--depth) * 1px);
		animation: starDrift var(--dur) linear infinite;
		will-change: transform;
	}

	@keyframes starDrift {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(var(--drift-x), var(--drift-y), 0);
		}
	}

	// A comet: a crisp pixel head (::after) trailing a fading streak (background
	// gradient), rotated to its travel angle and flung across the viewport once.
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
