<template>
	<div class="life">
		<!-- no accent dot — reads as the header above the themed cards -->
		<section v-reveal class="life-card reveal-block is-left">
			<h2 class="life-card__title">ABOUT ME</h2>
			<p v-for="(line, i) in ABOUT_ME" :key="i" class="life-card__line">{{ line }}</p>
		</section>

		<section v-reveal class="life-card reveal-block is-right" data-section="dogs">
			<h2 class="life-card__title"><span class="life-card__dot" aria-hidden="true" />DOGS</h2>
			<p v-for="(line, i) in DOG_LINES" :key="i" class="life-card__line">{{ line }}</p>
			<div class="dogs">
				<!-- photo deck: offset cards peek out behind the frame to hint there's more;
				     click / tap shuffles to the next photo (works on touch, unlike hover) -->
				<figure v-for="dog in DOGS" :key="dog.name" class="dog">
					<button
						type="button"
						class="dog__stack"
						:aria-label="`Next photo of ${dog.name}`"
						@click="advance(dog)"
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
					<figcaption class="dog__name">{{ dog.name }}</figcaption>
				</figure>
			</div>
		</section>

		<section
			v-for="(section, i) in LIFE_SECTIONS"
			:key="section.id"
			v-reveal
			class="life-card reveal-block"
			:class="i % 2 === 0 ? 'is-left' : 'is-right'"
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
	import { ref } from 'vue'
	import { ABOUT_ME, DOG_LINES, DOGS, LIFE_SECTIONS } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'

	// One deck per dog: clicking the stack shows the next photo, looping.
	const activeIndexes = ref({})

	const activeIndex = dog => activeIndexes.value[dog.name] ?? 0

	function advance(dog) {
		activeIndexes.value = {
			...activeIndexes.value,
			[dog.name]: (activeIndex(dog) + 1) % dog.photos.length,
		}
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// zigzag rhythm borrowed from the work timeline (AboutWork.vue)
	$slide: 28px;
	// offset between the photo-deck cards peeking out behind each dog's frame
	$stack-step: 6px;

	.life {
		display: flex;
		flex-direction: column;
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

	// cards alternate sides down the column; right cards mirror their text
	.is-left {
		align-self: flex-start;
	}

	.is-right {
		align-self: flex-end;
		text-align: right;
	}

	// accent dot rides the outer edge on mirrored cards (like the work flag)
	.is-right .life-card__title {
		flex-direction: row-reverse;
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
		line-height: 1.35;
		letter-spacing: 0.02em;
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

	// slide in from the card's own side, like the work timeline
	.reveal-block {
		opacity: 0;
	}

	.is-left.reveal-block {
		transform: translateX(-$slide);
	}

	.is-right.reveal-block {
		transform: translateX($slide);
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
		// match is-left / is-right specificity or the side offset never clears
		.reveal-block,
		.is-left.reveal-block,
		.is-right.reveal-block {
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
