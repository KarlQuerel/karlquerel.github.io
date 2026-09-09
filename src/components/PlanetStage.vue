<template>
	<!-- The world outside the window: one planet, camera-choreographed by scroll. Fixed to the viewport. -->
	<div class="stage" :style="stageStyle" aria-hidden="true">
		<!-- the faintest colour depth behind everything — space isn't pure black -->
		<div class="stage__nebula" />
		<div class="stage__planet" :style="planetStyle">
			<!-- in frame from the first pixel: at rest the camera has it sat in the Q's
			     porthole, which is the hole the departure then flies through -->
			<PixelPlanet
				:awake="visible"
				:spin="spin"
				:light-yaw="lightYaw"
				:cloud-thin="cloudThin"
			/>
		</div>
		<!-- The world as a point of light while it is too small to be a disc, on the camera's axis. -->
		<span class="stage__spark" :style="sparkStyle" />
		<!-- atmosphere on entry: haze rising from the horizon, in the planet's tint -->
		<div class="stage__haze" :style="hazeStyle" />
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { JOURNEY } from '@/constants/journey'
	import { PALETTE } from '@/constants/palette'
	import { PLANET } from '@/constants/planet'
	import { clamp01 } from '@/js/math'
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
	})

	// Under the deck by the dive: clouds thin as the camera's scale climbs, so terrain is never checkered.
	const cloudThin = computed(() => {
		const { from, to } = JOURNEY.cloudThin
		return clamp01((props.cam.scale - from) / (to - from))
	})

	// the haze borrows the planet's atmosphere colour, so the entry matches the limb
	const stageStyle = {
		'--atmosphere': PALETTE[PLANET.atmosphere].join(', '),
		'--depth': JOURNEY.parallax.planet,
		'--spark': `${JOURNEY.spark.size}px`,
		'--spark-shade': `rgb(${PALETTE[JOURNEY.spark.shade].join(',')})`,
	}

	// The dot hands over to the globe across a window of scale: full while the disc is pixels.
	const sparkStyle = computed(() => {
		const { fadeFrom, fadeTo } = JOURNEY.spark
		const lit = 1 - clamp01((props.cam.scale - fadeFrom) / (fadeTo - fadeFrom))
		return {
			transform: `translate3d(${props.cam.x.toFixed(2)}vw, ${props.cam.y.toFixed(2)}vh, 0)`,
			opacity: (lit * (props.cam.fade ?? 1)).toFixed(3),
			display: lit > 0 ? null : 'none',
		}
	})

	// Past the entry fade the globe is worth nothing to draw and nothing to composite.
	const visible = computed(() => (props.cam.fade ?? 1) > 0)

	const planetStyle = computed(() => ({
		// tilt banks the world into the turns; rotation pivots on the globe's centre
		transform: `translate3d(${props.cam.x.toFixed(2)}vw, ${props.cam.y.toFixed(2)}vh, 0) scale(${props.cam.scale.toFixed(3)}) rotate(${(props.cam.tilt ?? 0).toFixed(2)}deg)`,
		// the world recedes while a station is read (see CAMERA.fade)
		opacity: (props.cam.fade ?? 1).toFixed(3),
		// and once it has gone, its promoted canvas leaves the compositor with it
		display: visible.value ? null : 'none',
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

	// two barely-there colour fields, so the void has depth without reading as a background image
	.stage__nebula {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(60% 50% at 18% 28%, rgba(72, 62, 122, 0.1) 0%, transparent 70%),
			radial-gradient(55% 45% at 80% 74%, rgba(122, 64, 52, 0.09) 0%, transparent 70%);
	}

	// The keyframed camera owns `transform`; the cursor's lean rides `translate`, as every layer does.
	.stage__planet {
		position: absolute;
		inset: 0;
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
		will-change: transform;
	}

	// On the camera's axis, where the globe grows out of. A star is at infinity: it fades, never scales.
	.stage__spark {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 3;
		width: var(--spark);
		height: var(--spark);
		margin: calc(var(--spark) / -2) 0 0 calc(var(--spark) / -2);
		background: var(--spark-shade);
		translate: calc(var(--mx, 0) * var(--depth, 0) * 1px)
			calc(var(--my, 0) * var(--depth, 0) * 1px);
	}

	// Densest at the horizon over an opaque base, so altitude reads as darker air, never as holes.
	.stage__haze {
		position: absolute;
		inset: 0;
		background-color: $black;
		background-image: linear-gradient(
			to top,
			rgba(var(--atmosphere), 1) 0%,
			rgba(var(--atmosphere), 0.9) 40%,
			rgba(var(--atmosphere), 0.82) 100%
		);
	}
</style>
