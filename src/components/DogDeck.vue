<template>
	<!-- one dog's photo deck: photos auto-cycle while it's on screen and nobody is tabbed into it;
	     the pager shows how many there are. `loading` goes before `src`: Vue sets attributes in
	     template order, and a src set first fetches eagerly -->
	<figure ref="deckEl" class="dog" @focusin="onFocusIn" @focusout="onFocusOut">
		<button
			type="button"
			class="dog__frame"
			:aria-label="DOG_DECK_LABELS.next(dog.name)"
			@click="show(active + 1)"
		>
			<img
				v-for="(photo, i) in dog.photos"
				:key="photo"
				loading="lazy"
				decoding="async"
				:src="photo"
				:alt="i === active ? DOG_DECK_LABELS.photo(dog.name) : ''"
				:aria-hidden="i === active ? null : 'true'"
				class="dog__photo"
				:class="{ 'is-active': i === active }"
			/>
		</button>
		<div class="dog__pager">
			<button
				v-for="(photo, i) in dog.photos"
				:key="photo"
				type="button"
				class="dog__page"
				:aria-label="DOG_DECK_LABELS.page(dog.name, i + 1, dog.photos.length)"
				:aria-current="i === active ? 'true' : null"
				@click="show(i)"
			/>
		</div>
		<figcaption class="dog__name">
			{{ dog.name }}<span class="dog__years">{{ dog.years }}</span>
		</figcaption>
	</figure>
</template>

<script setup>
	import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { DOG_DECK_INTERVAL_MS } from '@/constants/aboutLife'
	import { DOG_DECK_LABELS, DOGS } from '@/data/aboutLife'

	const props = defineProps({
		// one entry of DOGS
		dog: { type: Object, required: true },
	})

	const active = ref(0)
	const deckEl = ref(null)
	// every deck rides one clock, offset by its place in DOGS, so two on screen never swap together
	const phase = (DOGS.indexOf(props.dog) / DOGS.length) * DOG_DECK_INTERVAL_MS

	// Every reason the beat holds; it runs only while none of them does.
	const holds = {
		focus: false,
		offscreen: true,
		hidden: document.visibilityState !== 'visible',
		parked: false,
	}
	let timer = 0
	let observer = null

	const running = () => !prefersReducedMotion() && !Object.values(holds).some(Boolean)

	// the wait to this deck's next beat, never under half a beat: a photo that just showed (picked,
	// or the deck just scrolled in) gets looked at, and an early timer can't double-step
	function untilBeat() {
		const wait = DOG_DECK_INTERVAL_MS - ((Date.now() - phase) % DOG_DECK_INTERVAL_MS)
		return wait < DOG_DECK_INTERVAL_MS / 2 ? wait + DOG_DECK_INTERVAL_MS : wait
	}

	function schedule() {
		clearTimeout(timer)
		timer = running() ? setTimeout(() => show(active.value + 1), untilBeat()) : 0
	}

	function show(index) {
		const count = props.dog.photos.length
		active.value = (index + count) % count
		schedule()
	}

	function hold(reason, on) {
		if (holds[reason] === on) return
		holds[reason] = on
		schedule()
	}

	// keyboard focus only: a click also focuses the button, and must not freeze the beat
	const onFocusIn = event => hold('focus', event.target.matches(':focus-visible'))
	// tabbing from the photo into its pager stays inside
	const onFocusOut = event => hold('focus', deckEl.value?.contains(event.relatedTarget) ?? false)
	const onVisibility = () => hold('hidden', document.visibilityState !== 'visible')

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
		clearTimeout(timer)
		observer?.disconnect()
		document.removeEventListener('visibilitychange', onVisibility)
	})
</script>

<style scoped lang="scss">
	@use 'sass:list';

	// pager squares: a pixel dot inside a thumb-sized hit area
	$page-dot: 6px;
	$page-hit: 1.1rem;
	// the frame: a staircase of $corner-steps cells cut into each corner, around a $ring-px ring
	$corner-step: 4px;
	$corner-steps: 3;
	$ring-px: 2px;

	// A clip-path polygon with a pixel staircase cut into each corner, traced clockwise from the
	// top-left corner's left edge; the other corners mirror it.
	@function stepped($step, $count) {
		$corner: list.append((), 0px ($count * $step), comma);
		@for $k from 0 through $count - 1 {
			$corner: list.append($corner, (($k + 1) * $step) (($count - $k) * $step), comma);
			$corner: list.append($corner, (($k + 1) * $step) (($count - $k - 1) * $step), comma);
		}
		$points: ();
		$last: list.length($corner);
		@each $x, $y in $corner {
			$points: list.append($points, $x $y, comma);
		}
		@for $i from $last through 1 {
			$p: list.nth($corner, $i);
			$points: list.append($points, calc(100% - #{list.nth($p, 1)}) list.nth($p, 2), comma);
		}
		@each $x, $y in $corner {
			$points: list.append($points, calc(100% - #{$x}) calc(100% - #{$y}), comma);
		}
		@for $i from $last through 1 {
			$p: list.nth($corner, $i);
			$points: list.append($points, list.nth($p, 1) calc(100% - #{list.nth($p, 2)}), comma);
		}
		@return polygon($points);
	}

	.dog {
		margin: 0;
	}

	// the photo button: a thin pixel ring with stepped corners, lifting a step on hover
	.dog__frame {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 1;
		box-sizing: border-box;
		padding: 0;
		border: 0;
		background: rgba($white, 0.25);
		clip-path: stepped($corner-step, $corner-steps);
		transition: transform 0.2s steps(2, end);

		&:hover,
		&:focus-visible {
			background: rgba($yellow, 0.6);
			transform: translateY(-2px);
		}
	}

	// opaque backing inside the ring, so a crossfade never shows the ring colour through the photos
	.dog__frame::before {
		content: '';
		position: absolute;
		inset: $ring-px;
		background: $black;
		clip-path: stepped($corner-step, $corner-steps);
	}

	// square crops fill the ring; only the active photo shows, stepped-crossfaded
	.dog__photo {
		position: absolute;
		inset: $ring-px;
		width: calc(100% - #{2 * $ring-px});
		height: calc(100% - #{2 * $ring-px});
		object-fit: cover;
		clip-path: stepped($corner-step, $corner-steps);
		opacity: 0;
		transition: opacity 0.35s steps(5, end);
	}

	.dog__photo.is-active {
		opacity: 1;
	}

	.dog__pager {
		display: flex;
		justify-content: center;
		margin-top: 0.35rem;
	}

	.dog__page {
		display: grid;
		place-items: center;
		width: $page-hit;
		height: $page-hit;
		padding: 0;
		border: 0;
		background: none;

		&::before {
			content: '';
			width: $page-dot;
			height: $page-dot;
			background: rgba($white, 0.22);
		}

		&:hover::before {
			background: rgba($white, 0.6);
		}

		&:focus-visible {
			outline: 2px solid $yellow;
			outline-offset: -2px;
		}
	}

	// the showing photo, in the gold the site marks "you are here" with
	.dog__page[aria-current='true']::before {
		background: $yellow;
		box-shadow: 0 0 6px 1px rgba($yellow, 0.55);
	}

	.dog__name {
		margin-top: 0.35rem;
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

	// photo swaps become instant cuts
	@media (prefers-reduced-motion: reduce) {
		.dog__photo {
			transition: none;
		}
	}
</style>
