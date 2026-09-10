<template>
	<div class="life">
		<!-- no accent dot — reads as the header above the themed cards -->
		<div class="life-slot">
			<section v-reveal class="life-card reveal-block">
				<h2 class="life-card__title">ABOUT ME</h2>
				<p
					v-for="(line, i) in ABOUT_ME"
					:key="i"
					class="life-card__line"
					:class="{ 'life-card__lede': i === 0 }"
				>
					{{ line }}
				</p>
			</section>
		</div>

		<div class="life-slot">
			<section v-reveal class="life-card reveal-block" data-section="dogs">
				<h2 class="life-card__title">
					<span class="life-card__dot" aria-hidden="true" />DOGS
				</h2>
				<p
					v-for="(line, i) in DOG_LINES"
					:key="i"
					class="life-card__line"
					:class="{ 'life-card__lede': i === 0 }"
				>
					{{ line }}
				</p>
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
		</div>

		<div v-for="section in LIFE_SECTIONS" :key="section.id" class="life-slot">
			<section v-reveal class="life-card reveal-block" :data-section="section.id">
				<h2 class="life-card__title">
					<span class="life-card__dot" aria-hidden="true" />{{ section.title }}
				</h2>
				<template v-for="(line, i) in section.lines" :key="i">
					<picture v-if="section.media?.beforeLine === i" class="life-card__media">
						<source
							:srcset="section.media.still"
							media="(prefers-reduced-motion: reduce)"
						/>
						<img
							:src="section.media.src"
							:alt="section.media.alt"
							loading="lazy"
							decoding="async"
						/>
					</picture>
					<p class="life-card__line" :class="{ 'life-card__lede': i === 0 }">
						{{ line }}
					</p>
				</template>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { DOG_DECK_INTERVAL_MS } from '@/constants/aboutLife'
	import { ABOUT_ME, DOG_LINES, DOGS, LIFE_SECTIONS } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'

	// One deck per dog: photos cycle on a shared beat. Hover pauses, click skips and restarts the beat.
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
	// the one gap between cards, fixed so the rhythm is even; the route's crossing needs ~192px to turn
	$life-gap: 14rem;
	// offset between the photo-deck cards peeking out behind each dog's frame
	$stack-step: 6px;
	// mat between a section image and its void frame

	.life {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(64rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	// Slots hug their cards and one fixed gap carries the rhythm, equal whatever the cards' heights.
	.life-slot {
		display: grid;
		place-items: center;
		width: 100%;
	}

	.life-slot:not(:last-child) {
		margin-bottom: $life-gap;
	}

	.life-card {
		// flow-root, not block: contains the floated art so it can't spill past the card's box
		display: flow-root;
		// wide column, but the prose below scales with it so the measure stays ~75ch
		width: min(50rem, 92vw);
		padding: 1rem 1.1rem 1.2rem;
	}

	.life-card__title {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0 0 0.8rem;
		font-family: $font-pixel;
		// tracks the prose cap, so the pixel title keeps its weight over bigger body text
		font-size: px8(2);
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
		// terminal font for prose: Press Start 2P stays on titles, Departure Mono carries reading text
		font-family: $font-terminal;
		// stepped, not fluid: the face is crisp only on its 11px grid, so a clamp would antialias.
		font-size: $type-prose;
		line-height: 1.55;
		// no tracking: the face is already spaced, and an em value would land on half-pixels
		white-space: pre-line;
		// the global `p { text-align: center }` would otherwise centre it
		text-align: inherit;
		color: rgba(255, 255, 255, 0.88);
		// A black keyline in px (this face is crisp only on its 11px grid), for where the lit limb crosses.
		@include pixel-keyline($unit: 1px, $halo: 6px);
	}

	.life-card__line:last-child {
		margin-bottom: 0;
	}

	// Departure Mono is crisp only at 11px and 22px, so hierarchy comes from colour and air, not size.
	.life-card__lede {
		position: relative;
		margin-bottom: 1.3rem;
		padding-left: 0.9rem;
		color: $white;
	}

	// the accent as a rule, not a dot: a whole line of prose in $purple on black is unreadable
	.life-card__lede::before {
		content: '';
		position: absolute;
		top: 0.2em;
		bottom: 0.2em;
		left: 0;
		width: 3px;
		background: $light-gray;
		box-shadow: 0 0 8px 1px rgba($light-gray, 0.5);
	}

	// section art floated into the prose, so the paragraphs after it wrap alongside.
	.life-card__media {
		// <picture> is inline by default, so width would be ignored once the float drops
		display: block;
		float: right;
		width: min(15rem, 34%);
		margin: 0.2rem 0 0.6rem 1.4rem;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 30px;
		// the art fills the frame edge to edge, so the curve has to clip it
		overflow: hidden;
	}

	.life-card__media img {
		display: block;
		width: 100%;
		height: auto;
		// pixel art: never let the browser smooth it when it scales
		image-rendering: pixelated;
	}

	// per-section accents from the shared palette so LIFE stays in the site's system
	[data-section='dogs'] .life-card__dot,
	[data-section='dogs'] .life-card__lede::before {
		background: $light-red;
		box-shadow: 0 0 8px 1px rgba($light-red, 0.55);
	}

	[data-section='sports'] .life-card__dot,
	[data-section='sports'] .life-card__lede::before {
		background: $phosphor-green;
		box-shadow: 0 0 8px 1px rgba($phosphor-green, 0.55);
	}

	[data-section='music'] .life-card__dot,
	[data-section='music'] .life-card__lede::before {
		background: $purple;
		box-shadow: 0 0 8px 1px rgba($purple, 0.6);
	}

	[data-section='games'] .life-card__dot,
	[data-section='games'] .life-card__lede::before {
		background: $light-blue;
		box-shadow: 0 0 8px 1px rgba($light-blue, 0.55);
	}

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
		// Where the pixel grid loses: 16px is off-grid but is the comfortable reading size, and prose is
		// where softness shows least and legibility matters most.
		.life-card__line {
			font-size: $type-prose-md;
		}

		.dogs {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		// too narrow to wrap text beside it — drop the float and centre the art
		.life-card__media {
			float: none;
			width: min(13rem, 60%);
			margin: 0 auto 1rem;
		}

		// Stacked, the art would split the opener from the paragraph it illustrates.
		.life-card:has(.life-card__media) {
			display: flex;
			flex-direction: column;

			.life-card__line {
				order: 3;
			}

			// the opener stays put; the paragraph right after the art trades with it
			.life-card__line:first-of-type {
				order: 0;
			}

			.life-card__media + .life-card__line {
				order: 1;
			}

			.life-card__media {
				order: 2;
			}
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
