<template>
	<div class="content">
		<HomeChip />
		<h1 ref="titleEl" class="not-found-title">
			<span v-for="word in NOT_FOUND_WORDS" :key="word">{{ word }}</span>
		</h1>
	</div>
</template>

<script setup>
	import { onMounted, onBeforeUnmount, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { useRafThrottle } from '@/composables/useRafThrottle'
	import { useWindowListener } from '@/composables/useWindowListener'
	import { NOT_FOUND_FLOAT as F, NOT_FOUND_WORDS } from '@/constants/notFound'
	import { clamp } from '@/js/math'
	import HomeChip from './HomeChip.vue'

	const titleEl = ref(null)

	let rafId = 0
	let home = { x: 0, y: 0 }
	const pos = { x: 0, y: 0 }
	const vel = { x: 0, y: 0 }
	let wanderAngle = Math.random() * Math.PI * 2
	const pointer = { x: -Infinity, y: -Infinity }

	const measureHome = () => {
		const el = titleEl.value
		if (!el) return
		const rect = el.getBoundingClientRect()
		// Subtract the live transform so home stays the true layout centre.
		home = {
			x: rect.left + rect.width / 2 - pos.x,
			y: rect.top + rect.height / 2 - pos.y,
		}
	}

	const onPointerMove = e => {
		pointer.x = e.clientX
		pointer.y = e.clientY
	}

	const within = (value, limit) => clamp(value, -limit, limit)

	const step = () => {
		wanderAngle += F.wanderTurn
		let ax = Math.cos(wanderAngle) * F.wanderStrength
		let ay = Math.sin(wanderAngle) * F.wanderStrength

		// Flee the cursor: push along the vector from pointer to title centre.
		const dx = home.x + pos.x - pointer.x
		const dy = home.y + pos.y - pointer.y
		const dist = Math.hypot(dx, dy) || 1
		if (dist < F.repelRadius) {
			const force = (1 - dist / F.repelRadius) * F.repelStrength
			ax += (dx / dist) * force
			ay += (dy / dist) * force
		}

		// Weak spring back to home keeps it floating around centre.
		ax -= pos.x * F.centerPull
		ay -= pos.y * F.centerPull

		vel.x = (vel.x + ax) * F.friction
		vel.y = (vel.y + ay) * F.friction

		pos.x = within(pos.x + vel.x, window.innerWidth * 0.5 * F.maxOffset)
		pos.y = within(pos.y + vel.y, window.innerHeight * 0.5 * F.maxOffset)

		const tilt = within(vel.x * F.tiltPerSpeed, F.maxTilt)
		titleEl.value.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px) rotate(${tilt.toFixed(2)}deg)`

		rafId = requestAnimationFrame(step)
	}

	if (!prefersReducedMotion()) {
		useWindowListener('pointermove', onPointerMove)
		useWindowListener('resize', useRafThrottle(measureHome))
	}

	onMounted(() => {
		if (prefersReducedMotion()) return
		measureHome()
		rafId = requestAnimationFrame(step)
	})

	onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<style lang="scss" scoped>
	.not-found-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		font-size: 1.5rem;
		line-height: 1.1;
		color: $white;
		text-transform: uppercase;
		margin: 0;
		will-change: transform;
	}
</style>
