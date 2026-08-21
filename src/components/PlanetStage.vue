<template>
	<!-- The world outside the window: one planet, camera-choreographed by scroll.
	     Fixed to the viewport; the keyframed transform (position + scale) and the
	     scroll-driven spin carry the whole journey's depth. Decorative. -->
	<div class="stage" :style="stageStyle" aria-hidden="true">
		<!-- the faintest colour depth behind everything — space isn't pure black -->
		<div class="stage__nebula" />
		<div class="stage__planet" :style="planetStyle">
			<!-- reveal is the camera's own channel: 0 through the departure, so the
			     planet is not drawn at all until it comes up out of the corridor -->
			<PixelPlanet :reveal="cam.reveal ?? 1" :spin="spin" :light-yaw="lightYaw" />
		</div>
		<!-- atmosphere on entry: haze rising from the horizon, in the planet's tint -->
		<div class="stage__haze" :style="hazeStyle" />
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { JOURNEY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { PLANET } from '@/constants/planet'
	import PixelPlanet from './PixelPlanet.vue'

	const props = defineProps({
		// planet centre offset from the viewport centre (vw / vh), globe scale, and
		// `reveal` — whether it is in the frame at all yet
		cam: { type: Object, required: true },
		// longitude in radians — scroll owns it
		spin: { type: Number, default: 0 },
		// sun yaw in radians — the terminator advances as the journey orbits
		lightYaw: { type: Number, default: 0 },
		// 0 → vacuum, 1 → full entry haze
		haze: { type: Number, default: 0 },
	})

	// the haze borrows the planet's atmosphere colour out of the shared palette, so the
	// entry matches the limb; the globe takes its share of the cursor's lean, published
	// on the journey root
	const stageStyle = {
		'--atmosphere': PALETTE[PLANET.atmosphere].join(', '),
		'--depth': JOURNEY.parallax.planet,
	}

	const planetStyle = computed(() => ({
		// tilt banks the world into the turns; rotation pivots on the globe's centre
		transform: `translate3d(${props.cam.x.toFixed(2)}vw, ${props.cam.y.toFixed(2)}vh, 0) scale(${props.cam.scale.toFixed(3)}) rotate(${(props.cam.tilt ?? 0).toFixed(2)}deg)`,
		// the world recedes while a station is read (see CAMERA.fade)
		opacity: (props.cam.fade ?? 1).toFixed(3),
	}))

	const hazeStyle = computed(() => ({
		opacity: props.haze.toFixed(3),
		// out in space: drop the layer entirely
		display: props.haze > 0 ? null : 'none',
	}))
</script>

<style scoped lang="scss">
	// behind everything on the journey (stations sit at z 1+); over the starfield (-1)
	.stage {
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	// two barely-there colour fields, cool up-left and dust down-right, so the
	// void has depth without ever reading as a background image
	.stage__nebula {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(60% 50% at 18% 28%, rgba(72, 62, 122, 0.1) 0%, transparent 70%),
			radial-gradient(55% 45% at 80% 74%, rgba(122, 64, 52, 0.09) 0%, transparent 70%);
	}

	// The keyframed camera owns `transform`; the cursor's lean rides `translate`, the
	// same contract every other layer in the scene follows. A world answers least of
	// the things in front of you, so its depth is small (see JOURNEY.parallax).
	.stage__planet {
		position: absolute;
		inset: 0;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		will-change: transform;
	}

	// densest at the horizon, gone by mid-sky
	.stage__haze {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(var(--atmosphere), 0.55) 0%,
			rgba(var(--atmosphere), 0.3) 30%,
			rgba(var(--atmosphere), 0) 62%
		);
	}
</style>
