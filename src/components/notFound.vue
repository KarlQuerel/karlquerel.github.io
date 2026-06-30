<template>
	<div class="content">
		<h1 ref="titleEl" class="not-found-title">
			<span>Page</span>
			<span>not</span>
			<span>found</span>
		</h1>
	</div>
</template>

<script setup>
	import { onMounted, onBeforeUnmount, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'

	// Zero-gravity float + cursor-fleeing physics. The title wanders along a
	// slowly turning drift vector and is shoved away whenever the pointer comes
	// near, always easing back toward its layout home so it never escapes view.
	const REPEL_RADIUS = 220 // px — how close the cursor must get to push the title
	const REPEL_STRENGTH = 2.6 // px/frame² peak shove right at the cursor
	const WANDER_STRENGTH = 0.12 // px/frame² idle drift force
	const WANDER_TURN = 0.03 // rad/frame — how fast the drift direction rotates
	const CENTER_PULL = 0.004 // spring constant easing the title home
	const FRICTION = 0.92 // fraction of velocity retained each frame
	const MAX_OFFSET = 0.42 // share of the half-viewport the title may roam
	const MAX_TILT = 12 // deg — cap on the velocity-based banking

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

	const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

	const step = () => {
		wanderAngle += WANDER_TURN
		let ax = Math.cos(wanderAngle) * WANDER_STRENGTH
		let ay = Math.sin(wanderAngle) * WANDER_STRENGTH

		// Flee the cursor: push along the vector from pointer to title centre.
		const dx = home.x + pos.x - pointer.x
		const dy = home.y + pos.y - pointer.y
		const dist = Math.hypot(dx, dy) || 1
		if (dist < REPEL_RADIUS) {
			const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
			ax += (dx / dist) * force
			ay += (dy / dist) * force
		}

		// Weak spring back to home keeps it floating around centre.
		ax -= pos.x * CENTER_PULL
		ay -= pos.y * CENTER_PULL

		vel.x = (vel.x + ax) * FRICTION
		vel.y = (vel.y + ay) * FRICTION

		const limitX = window.innerWidth * 0.5 * MAX_OFFSET
		const limitY = window.innerHeight * 0.5 * MAX_OFFSET
		pos.x = clamp(pos.x + vel.x, limitX)
		pos.y = clamp(pos.y + vel.y, limitY)

		const tilt = clamp(vel.x * 1.2, MAX_TILT)
		titleEl.value.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px) rotate(${tilt.toFixed(2)}deg)`

		rafId = requestAnimationFrame(step)
	}

	onMounted(() => {
		if (prefersReducedMotion()) return
		measureHome()
		window.addEventListener('pointermove', onPointerMove, { passive: true })
		window.addEventListener('resize', measureHome)
		rafId = requestAnimationFrame(step)
	})

	onBeforeUnmount(() => {
		if (rafId) cancelAnimationFrame(rafId)
		window.removeEventListener('pointermove', onPointerMove)
		window.removeEventListener('resize', measureHome)
	})
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
