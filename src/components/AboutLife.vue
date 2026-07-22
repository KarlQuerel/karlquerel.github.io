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
				<figure
					v-for="dog in DOGS"
					:key="dog.name"
					class="dog"
					@mouseenter="startSlideshow(dog)"
					@mouseleave="stopSlideshow(dog)"
				>
					<div class="dog__frame">
						<!-- pixelate: chunky low-res at rest, crisp photo resolves in on hover -->
						<template v-if="dog.effect === 'pixelate'">
							<img
								:src="dog.photoLo"
								alt=""
								aria-hidden="true"
								class="dog__photo dog__photo--lo"
								loading="lazy"
								decoding="async"
							/>
							<img
								:src="dog.photo"
								:alt="`Photo of ${dog.name}`"
								class="dog__photo dog__photo--hi"
								loading="lazy"
								decoding="async"
							/>
						</template>

						<!-- slideshow: frames cycle while hovered; slide 0 is the resting frame -->
						<template v-else-if="dog.effect === 'slideshow'">
							<img
								v-for="(slide, i) in dog.slides"
								:key="slide"
								:src="slide"
								:alt="i === 0 ? `Photo of ${dog.name}` : ''"
								:aria-hidden="i === 0 ? null : 'true'"
								class="dog__photo dog__slide"
								:class="{ 'is-active': i === activeSlide(dog) }"
								loading="lazy"
								decoding="async"
							/>
						</template>
					</div>
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
			<p v-for="(line, i) in section.lines" :key="i" class="life-card__line">
				{{ line }}
			</p>

			<router-link v-if="section.link" :to="section.link.to" class="life-link">
				{{ section.link.label }}
				<span class="life-link__arrow" aria-hidden="true"><i /><i /></span>
			</router-link>
		</section>
	</div>
</template>

<script setup>
	import { ref, onBeforeUnmount } from 'vue'
	import { ABOUT_ME, DOG_LINES, DOGS, LIFE_SECTIONS, SLIDE_INTERVAL_MS } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'
	import { prefersReducedMotion } from '@/composables/usePrefersReducedMotion'
	import { FINE_POINTER_QUERY } from '@/constants/viewport'

	// Yako-style hover slideshow: advance the visible frame on a timer while hovered.
	// Pointer devices only, never under reduced motion (mirrors the pixelate reveal) —
	// touch / reduced-motion just keep the resting frame 0.
	const slideAnimatable =
		typeof window !== 'undefined' &&
		window.matchMedia(FINE_POINTER_QUERY).matches &&
		!prefersReducedMotion()

	const activeSlides = ref({})
	let slideTimer = 0

	const activeSlide = dog => activeSlides.value[dog.name] ?? 0

	function startSlideshow(dog) {
		if (!slideAnimatable || dog.effect !== 'slideshow') return
		window.clearInterval(slideTimer)
		slideTimer = window.setInterval(() => {
			activeSlides.value = {
				...activeSlides.value,
				[dog.name]: (activeSlide(dog) + 1) % dog.slides.length,
			}
		}, SLIDE_INTERVAL_MS)
	}

	function stopSlideshow(dog) {
		if (dog.effect !== 'slideshow') return
		window.clearInterval(slideTimer)
		activeSlides.value = { ...activeSlides.value, [dog.name]: 0 }
	}

	onBeforeUnmount(() => window.clearInterval(slideTimer))
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// zigzag rhythm borrowed from the work timeline (AboutWork.vue)
	$slide: 28px;

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
		@include void-panel(rgba(0, 0, 0, 0.7));
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
		font-size: clamp(0.8rem, 1.8vw, 0.95rem);
		line-height: 1.6;
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
		margin: 0;
	}

	.dog__frame {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.45);
		border: $void-border;
		border-radius: $void-radius;
	}

	// cutout photos (transparent bg): contain shows the whole dog on the dark frame.
	// two layers stacked: crisp `--hi` under the low-res `--lo` that pixelates at rest.
	.dog__photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		object-fit: contain;
		padding: 0.6rem;
	}

	.dog__photo--lo {
		opacity: 0;
		image-rendering: pixelated;
	}

	// slideshow frames stack like the pixelate layers; only the active frame shows.
	// the shared `.dog__photo` transition (hover block) crossfades each swap.
	.dog__slide {
		opacity: 0;
	}

	.dog__slide.is-active {
		opacity: 1;
	}

	.dog__name {
		margin-top: 0.55rem;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.6vw, 0.72rem);
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
	}

	// De-pixelate reveal — pointer devices only, and never when reduced motion is asked.
	// Touch / reduced-motion keep the always-crisp base state (photo + name visible).
	@media (hover: hover) and (prefers-reduced-motion: no-preference) {
		.dog__photo {
			transition: opacity 0.35s steps(5, end);
		}

		// rest: pixelated on top, crisp hidden, name hidden
		.dog__photo--lo {
			opacity: 1;
		}

		.dog__photo--hi {
			opacity: 0;
		}

		.dog__name {
			opacity: 0;
			transition: opacity 0.35s steps(5, end);
		}

		// hover / keyboard focus: crisp photo and name resolve in
		.dog:hover .dog__photo--hi,
		.dog:focus-within .dog__photo--hi {
			opacity: 1;
		}

		.dog:hover .dog__photo--lo,
		.dog:focus-within .dog__photo--lo {
			opacity: 0;
		}

		.dog:hover .dog__name,
		.dog:focus-within .dog__name {
			opacity: 1;
		}
	}

	.life-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 1rem;
		padding: 0.5rem 0.9rem;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.5vw, 0.62rem);
		letter-spacing: 1px;
		text-decoration: none;
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.5));
	}

	// mirror of the "back" cue — twin triangles stepping right on hover
	.life-link__arrow {
		display: inline-flex;
		gap: 0.15em;
		flex: none;
		transition: transform 0.2s steps(3, end);
	}

	.life-link__arrow i {
		width: 0;
		height: 0;
		border-top: 0.42em solid transparent;
		border-bottom: 0.42em solid transparent;
		border-left: 0.42em solid currentColor;
	}

	.life-link:hover .life-link__arrow,
	.life-link:focus-visible .life-link__arrow {
		transform: translateX(3px);
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
	}
</style>
