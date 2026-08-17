<template>
	<!-- The world outside the window: one planet, camera-choreographed by scroll.
	     Fixed to the viewport; the keyframed transform (position + scale) and the
	     scroll-driven spin carry the whole journey's depth. Decorative. -->
	<div class="stage" :style="stageStyle" aria-hidden="true">
		<!-- the faintest colour depth behind everything — space isn't pure black -->
		<div class="stage__nebula" />
		<div class="stage__planet" :style="planetStyle">
			<PixelPlanet :reveal="cam.fade > 0 ? 1 : 0" :spin="spin" :light-yaw="lightYaw" />
		</div>
		<!-- the near field: asteroids and sister worlds crossing at their own
		     depths — each draws once; only its transform rides the scroll -->
		<div v-for="(d, i) in drifters" :key="i" class="stage__drifter" :style="d.style">
			<PixelPlanet
				v-if="d.kind === 'planet'"
				:reveal="1"
				:spin="d.spin"
				:palette="PALETTES[d.palette]"
			/>
			<PixelAsteroid v-else :size="d.size" />
		</div>
		<!-- atmosphere on entry: haze rising from the horizon, in the planet's tint -->
		<div class="stage__haze" :style="hazeStyle" />
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { ICE_PALETTE, MOON_PALETTE, PLANET } from '@/constants/planet'
	import PixelAsteroid from './PixelAsteroid.vue'
	import PixelPlanet from './PixelPlanet.vue'

	const props = defineProps({
		// planet centre offset from the viewport centre (vw / vh) and globe scale
		cam: { type: Object, required: true },
		// longitude in radians — scroll owns it
		spin: { type: Number, default: 0 },
		// sun yaw in radians — the terminator advances as the journey orbits
		lightYaw: { type: Number, default: 0 },
		// 0 → vacuum, 1 → full entry haze
		haze: { type: Number, default: 0 },
		// bodies currently crossing the frame ({ kind, style, … }), see DRIFTERS
		drifters: { type: Array, default: () => [] },
	})

	// palette registry for the planet-kind drifters
	const PALETTES = { moon: MOON_PALETTE, ice: ICE_PALETTE }

	// the haze borrows the planet's atmosphere colour, so entry matches the limb
	const stageStyle = { '--atmosphere': PLANET.atmosphere.join(', ') }

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

	.stage__planet {
		position: absolute;
		inset: 0;
		will-change: transform;
	}

	// in front of the planet, behind the page — the near layers of the parallax
	.stage__drifter {
		position: absolute;
		inset: 0;
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
