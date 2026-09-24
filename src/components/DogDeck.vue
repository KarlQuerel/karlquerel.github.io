<template>
	<!-- photo deck: offset cards peek out behind each frame to hint there's more; photos
	     auto-cycle while the deck is on screen and nobody is pointing or tabbed into it -->
	<div
		ref="deckEl"
		class="dogs"
		@pointerenter="onPointer($event, true)"
		@pointerleave="onPointer($event, false)"
		@focusin="onFocusIn"
		@focusout="onFocusOut"
	>
		<figure v-for="dog in DOGS" :key="dog.name" class="dog">
			<button
				type="button"
				class="dog__stack"
				:aria-label="DOG_DECK_LABELS.next(dog.name)"
				@click="skip(dog)"
			>
				<img
					v-for="(photo, i) in dog.photos"
					:key="photo"
					:src="photo"
					:alt="i === activeIndex(dog) ? DOG_DECK_LABELS.photo(dog.name) : ''"
					:aria-hidden="i === activeIndex(dog) ? null : 'true'"
					class="dog__photo"
					:class="{ 'is-active': i === activeIndex(dog) }"
					loading="lazy"
					decoding="async"
				/>
			</button>
			<figcaption class="dog__name">
				{{ dog.name }}<span class="dog__years">{{ dog.years }}</span>
			</figcaption>
		</figure>
	</div>
</template>

<script setup>
	import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { DOG_DECK_INTERVAL_MS } from '@/constants/aboutLife'
	import { DOG_DECK_LABELS, DOGS } from '@/data/aboutLife'

	// One deck per dog: photos cycle on a shared beat. Click skips and restarts the beat.
	const activeIndexes = ref({})
	const activeIndex = dog => activeIndexes.value[dog.name] ?? 0
	const deckEl = ref(null)

	// Every reason the beat holds; it runs only while none of them does.
	const holds = {
		hover: false,
		focus: false,
		offscreen: true,
		hidden: document.visibilityState !== 'visible',
		parked: false,
	}
	let timer = 0
	let observer = null

	function advance(dog) {
		activeIndexes.value = {
			...activeIndexes.value,
			[dog.name]: (activeIndex(dog) + 1) % dog.photos.length,
		}
	}

	const running = () => !prefersReducedMotion() && !Object.values(holds).some(Boolean)

	function restart() {
		clearInterval(timer)
		timer = running() ? setInterval(() => DOGS.forEach(advance), DOG_DECK_INTERVAL_MS) : 0
	}

	function hold(reason, on) {
		if (holds[reason] === on) return
		holds[reason] = on
		restart()
	}

	// a tap is no hover: touch pointers never leave, so they would hold the beat for good
	const onPointer = (event, on) => event.pointerType === 'mouse' && hold('hover', on)
	// keyboard focus only: a click also focuses the button, and must not freeze the beat
	const onFocusIn = event => hold('focus', event.target.matches(':focus-visible'))
	// tabbing between the two decks' buttons stays inside
	const onFocusOut = event => hold('focus', deckEl.value?.contains(event.relatedTarget) ?? false)
	const onVisibility = () => hold('hidden', document.visibilityState !== 'visible')

	function skip(dog) {
		advance(dog)
		restart()
	}

	onMounted(() => {
		document.addEventListener('visibilitychange', onVisibility)
		if (typeof IntersectionObserver === 'undefined') {
			hold('offscreen', false)
			return
		}
		observer = new IntersectionObserver(entries =>
			hold('offscreen', !entries.at(-1).isIntersecting)
		)
		observer.observe(deckEl.value)
	})

	onActivated(() => hold('parked', false))
	onDeactivated(() => hold('parked', true))

	onBeforeUnmount(() => {
		clearInterval(timer)
		observer?.disconnect()
		document.removeEventListener('visibilitychange', onVisibility)
	})
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// offset between the photo-deck cards peeking out behind each dog's frame
	$stack-step: 6px;

	// the deck spans the text column, so photos and prose share one edge; its top margin is a break
	.dogs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1.6rem;
	}

	.dog {
		position: relative;
		margin: 0;
	}

	// two offset cards peek out under the frame — the "there's more photos" cue
	.dog::before,
	.dog::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		aspect-ratio: 1;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.45);
		border: $void-border;
		border-radius: 30px;
	}

	.dog::before {
		transform: translate($stack-step, $stack-step);
	}

	.dog::after {
		transform: translate($stack-step * 2, $stack-step * 2);
	}

	// the deck's top card: a void button, lifting off the stack on hover like every other button
	.dog__stack {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
		aspect-ratio: 1;
		box-sizing: border-box;
		padding: 0;
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.45));

		// after the mixin's nested rules, so it needs the wrap to stay a plain declaration
		& {
			border-radius: 30px;
		}
	}

	// square crops fill the frame edge to edge; only the active frame shows, stepped-crossfaded
	.dog__photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		object-fit: cover;
		padding: 0.6rem;
		opacity: 0;
		transition: opacity 0.35s steps(5, end);
		border-radius: 30px;
	}

	.dog__photo.is-active {
		opacity: 1;
	}

	.dog__name {
		// extra top room clears the deck cards sticking out below the frame
		margin-top: calc(0.55rem + #{$stack-step * 2});
		font-family: $font-pixel;
		font-size: px8(1);
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
	}

	// the years sit a step under the name, so the closed range and the open one read as a pair
	.dog__years {
		display: block;
		margin-top: 0.3rem;
		font-family: $font-terminal;
		font-size: $type-prose-sm;
		color: $text-caption;
	}

	@media (max-width: $breakpoint-mobile) {
		.dogs {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
	}

	// photo swaps become instant cuts
	@media (prefers-reduced-motion: reduce) {
		.dog__photo {
			transition: none;
		}
	}
</style>
