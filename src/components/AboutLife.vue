<template>
	<div class="life">
		<!-- no accent dot — reads as the header above the themed cards -->
		<section v-reveal class="life-card reveal-block">
			<h2 class="life-card__title">ABOUT ME</h2>
			<p v-for="(line, i) in ABOUT_ME" :key="i" class="life-card__line">{{ line }}</p>
		</section>

		<section v-reveal class="life-card reveal-block" data-section="dogs">
			<h2 class="life-card__title"><span class="life-card__dot" aria-hidden="true" />DOGS</h2>
			<p v-for="(line, i) in DOG_LINES" :key="i" class="life-card__line">{{ line }}</p>
			<div class="dogs" @mouseenter="stopTimer" @mouseleave="startTimer">
				<!-- photo deck: offset cards peek out behind the frame to hint there's more;
				     photos auto-cycle (paused while hovered), click / tap skips ahead -->
				<figure v-for="dog in DOGS" :key="dog.name" class="dog">
					<button
						type="button"
						class="dog__stack"
						:aria-label="`Next photo of ${dog.name}`"
						@click="skip(dog)"
					>
						<img
							v-for="(photo, i) in dog.photos"
							:key="photo"
							:src="photo"
							:alt="i === activeIndex(dog) ? `Photo of ${dog.name}` : ''"
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
		</section>

		<section
			v-for="section in LIFE_SECTIONS"
			:key="section.id"
			v-reveal
			class="life-card reveal-block"
			:data-section="section.id"
		>
			<h2 class="life-card__title">
				<span class="life-card__dot" aria-hidden="true" />{{ section.title }}
			</h2>
			<p v-for="(line, i) in section.lines" :key="i" class="life-card__line">{{ line }}</p>
		</section>
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { DOG_DECK_INTERVAL_MS } from '@/constants/aboutLife'
	import { ABOUT_ME, DOG_LINES, DOGS, LIFE_SECTIONS } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'

	// One deck per dog: photos auto-cycle on a shared beat, looping. Hovering the
	// decks pauses the cycle; clicking skips ahead (and restarts the beat, so the
	// chosen photo gets a full stay). Reduced motion keeps the decks click-only.
	const activeIndexes = ref({})
	let deckTimer = null
	let autoCycles = false

	const activeIndex = dog => activeIndexes.value[dog.name] ?? 0

	function advance(dog) {
		activeIndexes.value = {
			...activeIndexes.value,
			[dog.name]: (activeIndex(dog) + 1) % dog.photos.length,
		}
	}

	function startTimer() {
		stopTimer()
		if (!autoCycles) return
		deckTimer = setInterval(() => DOGS.forEach(advance), DOG_DECK_INTERVAL_MS)
	}

	function stopTimer() {
		clearInterval(deckTimer)
	}

	function skip(dog) {
		advance(dog)
		startTimer()
	}

	onMounted(() => {
		autoCycles = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
		startTimer()
	})

	onBeforeUnmount(stopTimer)
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// how far a card travels on its slide-in
	$slide: 28px;
	// offset between the photo-deck cards peeking out behind each dog's frame
	$stack-step: 6px;

	.life {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: min(52rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	.life-card {
		width: min(34rem, 100%);
		padding: 1rem 1.1rem 1.2rem;
		// borderless: just the dark wash, no void frame (matches the work timeline)
		background: rgba(0, 0, 0, 0.7);
	}

	.life-card__title {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0 0 0.8rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 0.95rem);
		color: $yellow;
		text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
	}

	// Per-section accent marker — a small pixel square that colour-codes each card.
	.life-card__dot {
		width: 0.62em;
		height: 0.62em;
		flex: none;
		border-radius: 1px;
		background: $light-gray;
		box-shadow: 0 0 8px 1px rgba($light-gray, 0.5);
	}

	.life-card__line {
		margin: 0 0 0.6rem;
		// terminal font for prose: Press Start 2P stays on titles, VT323 (narrow,
		// so a size up) carries the reading text
		font-family: $font-terminal;
		font-size: clamp(1.1rem, 2.2vw, 1.25rem);
		line-height: 1.55;
		letter-spacing: 0.02em;
		// a `\n` in the copy breaks the line without opening a paragraph gap
		white-space: pre-line;
		// the global `p { text-align: center }` would otherwise centre it
		text-align: inherit;
		color: rgba(255, 255, 255, 0.88);
	}

	.life-card__line:last-child {
		margin-bottom: 0;
	}

	// per-section accents from the shared palette so LIFE stays in the site's system
	[data-section='dogs'] .life-card__dot {
		background: $light-red;
		box-shadow: 0 0 8px 1px rgba($light-red, 0.55);
	}

	[data-section='sports'] .life-card__dot {
		background: $phosphor-green;
		box-shadow: 0 0 8px 1px rgba($phosphor-green, 0.55);
	}

	[data-section='finance'] .life-card__dot {
		background: $mint;
		box-shadow: 0 0 8px 1px rgba($mint, 0.55);
	}

	[data-section='music'] .life-card__dot {
		background: $purple;
		box-shadow: 0 0 8px 1px rgba($purple, 0.6);
	}

	[data-section='games'] .life-card__dot {
		background: $light-blue;
		box-shadow: 0 0 8px 1px rgba($light-blue, 0.55);
	}

	.dogs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
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
		border-radius: $void-radius;
	}

	.dog::before {
		transform: translate($stack-step, $stack-step);
	}

	.dog::after {
		transform: translate($stack-step * 2, $stack-step * 2);
	}

	// the deck's top card: a void button so it reads as clickable, lifting off the
	// stack on hover like every other button on the site
	.dog__stack {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
		aspect-ratio: 1;
		box-sizing: border-box;
		padding: 0;
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.45));
	}

	// square photo crops fill the frame edge to edge (inset by the padding);
	// only the active frame shows, swapped with a stepped crossfade on each click
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
	}

	.dog__photo.is-active {
		opacity: 1;
	}

	.dog__name {
		// extra top room clears the deck cards sticking out below the frame
		margin-top: calc(0.55rem + #{$stack-step * 2});
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.6vw, 0.72rem);
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
	}

	// the years sit a step under the name — terminal font, caption warmth, so the
	// closed range and the open one read as a pair without shouting
	.dog__years {
		display: block;
		margin-top: 0.3rem;
		font-family: $font-terminal;
		font-size: clamp(0.9rem, 2vw, 1rem);
		letter-spacing: 0.04em;
		color: $text-caption;
	}

	// every card rises into place on the same beat
	.reveal-block {
		opacity: 0;
		transform: translateY($slide);
	}

	.reveal-block.is-visible {
		animation: life-in 0.4s steps(4, end) forwards;
	}

	@keyframes life-in {
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: $breakpoint-mobile) {
		.dogs {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal-block {
			opacity: 1;
			transform: none;
			animation: none;
		}

		// photo swaps become instant cuts
		.dog__photo {
			transition: none;
		}
	}
</style>
