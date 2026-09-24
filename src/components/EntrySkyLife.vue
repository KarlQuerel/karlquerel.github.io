<template>
	<!-- the arrival's sky traffic: a few stars breathing, and the odd meteor or flock crossing -->
	<div class="entry__sky-life" :style="lifeStyle">
		<span
			v-for="(tw, i) in twinklers"
			:key="i"
			class="entry__twinkle"
			:style="twinkleStyle(tw)"
		/>
		<span
			v-for="m in meteors"
			:key="`m${m.id}`"
			class="entry__meteor"
			:style="m.style"
			@animationend="removeMeteor(m.id)"
		/>
		<div
			v-for="fl in flocks"
			:key="`f${fl.id}`"
			class="entry__flock"
			:style="fl.style"
			@animationend="removeFlock(fl.id)"
		>
			<span v-for="(b, i) in fl.birds" :key="i" class="entry__bird" :style="birdStyle(b)" />
		</div>
	</div>
</template>

<script setup>
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
	import { useSkySpawner } from '@/composables/useSkySpawner'
	import { ENTRY } from '@/constants/journey'
	import { paletteRgb } from '@/constants/palette'
	import { drawBirdSheet, seedTwinklers } from '@/js/entrySprites'
	import { randIn, randInt } from '@/js/math'

	const props = defineProps({
		// the first stars' opacity: the whole layer shows, and spawns, only while it is up
		fade: { type: Number, default: 0 },
		// the visit's weather seed, shared with the rest of the arrival
		seed: { type: Number, required: true },
	})

	const twinklers = ref([])
	const birdSheet = ref('')

	const lifeStyle = computed(() => ({
		opacity: props.fade.toFixed(3),
		display: props.fade > 0 ? null : 'none',
	}))

	const tint = names => paletteRgb(names[Math.floor(Math.random() * names.length)])

	// Both streams roll every value per spawn. The spawner owns the gap, tab skip and self-removal.
	const { items: meteors, remove: removeMeteor } = useSkySpawner({
		gapMs: ENTRY.meteor.gapMs,
		active: () => props.fade > 0,
		make: () => {
			const m = ENTRY.meteor
			return {
				style: {
					'--y': `${randIn(m.y).toFixed(1)}%`,
					'--x': `${randIn(m.x).toFixed(1)}%`,
					'--angle': `${randIn(m.angle).toFixed(1)}deg`,
					'--len': `${Math.round(randIn(m.len))}px`,
					'--travel': `${randIn(m.travelVw).toFixed(1)}vw`,
					'--dur': `${Math.round(randIn(m.durMs))}ms`,
					'--peak': randIn(m.peak).toFixed(2),
					'--tint': tint(m.tints),
				},
			}
		},
	})

	// A flock: one container crossing the frame, with its birds strung out inside it.
	const { items: flocks, remove: removeFlock } = useSkySpawner({
		gapMs: ENTRY.flock.gapMs,
		// Only while the sky layer shows (hidden, spawns never end and pile up) and one flock at a time.
		active: () => props.fade > 0 && flocks.value.length === 0,
		make: () => {
			const f = ENTRY.flock
			const bird = ENTRY.bird
			const scale = randInt(f.scale)
			const flap = Math.round(randIn(f.flapMs))
			const sheet = bird.frames.length * bird.w * scale
			const rightward = Math.random() < 0.5
			return {
				style: {
					'--y': `${randIn(f.y).toFixed(1)}%`,
					'--from': `${rightward ? f.enterVw.rightward : f.enterVw.leftward}vw`,
					'--travel': `${(randIn(f.travelVw) * (rightward ? 1 : -1)).toFixed(1)}vw`,
					'--drift': `${randIn(f.driftVh).toFixed(1)}vh`,
					'--dur': `${Math.round(randIn(f.durMs))}ms`,
					'--peak': randIn(f.peak).toFixed(2),
				},
				// Positions are counted in sprite cells and scaled once, so the flock shares one pixel grid.
				birds: (() => {
					let x = 0
					return Array.from({ length: randInt(f.count) }, () => {
						const at = {
							left: x * scale,
							top: randInt(f.jitterCells) * scale,
							w: bird.w * scale,
							h: bird.h * scale,
							sheet,
							flap,
							// its own phase, so the wingbeats never line up
							delay: Math.round(Math.random() * flap),
						}
						// wingtip to wingtip: the bird's own width, then clear air
						x += bird.w + randInt(f.gapCells)
						return at
					})
				})(),
			}
		},
	})

	function birdStyle(b) {
		return {
			left: `${b.left}px`,
			top: `${b.top}px`,
			width: `${b.w}px`,
			height: `${b.h}px`,
			backgroundImage: `url(${birdSheet.value})`,
			backgroundSize: `${b.sheet}px ${b.h}px`,
			animationDuration: `${b.flap}ms`,
			animationDelay: `-${b.delay}ms`,
			'--sheet': `-${b.sheet}px`,
			'--frames': ENTRY.bird.frames.length,
		}
	}

	// Negative delays, so they are already mid-cycle rather than all lighting together.
	function twinkleStyle(tw) {
		return {
			left: `${tw.left.toFixed(2)}%`,
			top: `${tw.top.toFixed(2)}vh`,
			background: tw.colour,
			animationDuration: `${ENTRY.stars.twinkle.periodMs}ms`,
			animationDelay: `-${Math.round(tw.delay)}ms`,
		}
	}

	// cut a frame after mount, with the rest of the arrival's sprites
	let deferred = 0
	onMounted(() => {
		deferred = requestAnimationFrame(() => {
			twinklers.value = seedTwinklers(props.seed)
			birdSheet.value = drawBirdSheet()
		})
	})

	onBeforeUnmount(() => cancelAnimationFrame(deferred))
</script>

<style scoped lang="scss">
	.entry__sky-life {
		position: absolute;
		inset: 0;
	}

	// Meteor: pixel head plus a fading streak, rotated onto its travel angle.
	.entry__meteor {
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
		animation: entry-meteor var(--dur) linear forwards;
	}

	.entry__meteor::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 3px;
		height: 3px;
		margin-top: -1px;
		background: currentColor;
	}

	@keyframes entry-meteor {
		0% {
			transform: rotate(var(--angle)) translateX(0);
			opacity: 0;
		}
		14% {
			opacity: var(--peak);
		}
		82% {
			opacity: var(--peak);
		}
		100% {
			transform: rotate(var(--angle)) translateX(var(--travel));
			opacity: 0;
		}
	}

	// Self-running motion, so it is stepped; three steps reads as a blink rather than a fade.
	.entry__twinkle {
		position: absolute;
		width: 2px;
		height: 2px;
		animation-name: entry-twinkle;
		animation-timing-function: steps(3, end);
		animation-iteration-count: infinite;
	}

	@keyframes entry-twinkle {
		0%,
		55% {
			opacity: 1;
		}
		70%,
		100% {
			opacity: 0.2;
		}
	}

	// A flock crosses as one container; the birds are strung out inside it.
	.entry__flock {
		position: absolute;
		top: var(--y);
		left: var(--from);
		opacity: 0;
		animation: entry-flock var(--dur) linear forwards;
	}

	@keyframes entry-flock {
		0% {
			transform: translate3d(0, 0, 0);
			opacity: 0;
		}
		10% {
			opacity: var(--peak);
		}
		88% {
			opacity: var(--peak);
		}
		100% {
			transform: translate3d(var(--travel), var(--drift), 0);
			opacity: 0;
		}
	}

	// Wingbeats are on their own clock, so they are stepped by background-position.
	.entry__bird {
		position: absolute;
		background-repeat: no-repeat;
		image-rendering: pixelated;
		animation-name: entry-flap;
		// the step count is the sprite's frame count, so the sheet stays the only place that knows it
		animation-timing-function: steps(var(--frames), end);
		animation-iteration-count: infinite;
	}

	@keyframes entry-flap {
		from {
			background-position: 0 0;
		}
		to {
			background-position: var(--sheet) 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.entry__twinkle,
		.entry__meteor,
		.entry__flock,
		.entry__bird {
			animation: none;
		}
	}
</style>
