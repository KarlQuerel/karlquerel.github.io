<template>
	<div class="life">
		<!-- no accent dot — reads as the header above the themed cards -->
		<section v-reveal class="life-card reveal-block">
			<h2 class="life-card__title">ABOUT ME</h2>
			<p v-for="(line, i) in ABOUT_ME" :key="i" class="life-card__line">{{ line }}</p>
		</section>

		<section v-reveal class="life-card reveal-block" data-section="dogs">
			<h2 class="life-card__title"><span class="life-card__dot" aria-hidden="true" />DOGS</h2>
			<div class="dogs">
				<figure v-for="dog in DOGS" :key="dog.name" class="dog">
					<div class="dog__frame">
						<img
							:src="dog.photo"
							:alt="`Photo of ${dog.name}`"
							class="dog__photo"
							loading="lazy"
							decoding="async"
						/>
					</div>
					<figcaption class="dog__name">{{ dog.name }}</figcaption>
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
			<p v-for="(line, i) in section.lines" :key="i" class="life-card__line">
				{{ line }}
			</p>

			<ul v-if="section.tags" class="tags">
				<li v-for="tag in section.tags" :key="tag" class="tags__item">{{ tag }}</li>
			</ul>

			<router-link v-if="section.link" :to="section.link.to" class="life-link">
				{{ section.link.label }}
				<span class="life-link__arrow" aria-hidden="true"><i /><i /></span>
			</router-link>
		</section>
	</div>
</template>

<script setup>
	import { ABOUT_ME, DOGS, LIFE_SECTIONS } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	.life {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: min(40rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	.life-card {
		padding: 1rem 1.1rem 1.2rem;
		@include void-panel(rgba(0, 0, 0, 0.7));
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
		text-align: left;
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
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.45);
		border: $void-border;
		border-radius: $void-radius;
	}

	// cutout photos (transparent bg): contain shows the whole dog on the dark frame
	.dog__photo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: 0.6rem;
		display: block;
	}

	.dog__name {
		margin-top: 0.55rem;
		font-family: $font-pixel;
		font-size: clamp(0.55rem, 1.6vw, 0.72rem);
		text-align: center;
		color: rgba(255, 255, 255, 0.85);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0.9rem 0 0;
		padding: 0;
		list-style: none;
	}

	.tags__item {
		padding: 0.32rem 0.6rem;
		font-family: $font-pixel;
		font-size: clamp(0.42rem, 1.2vw, 0.55rem);
		letter-spacing: 0.5px;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(0, 0, 0, 0.4);
		border: $void-border;
		border-radius: $void-radius;
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

	.reveal-block {
		opacity: 0;
		transform: translateY(12px);
	}

	.reveal-block.is-visible {
		animation: life-in 0.4s steps(4, end) forwards;
	}

	@keyframes life-in {
		to {
			opacity: 1;
			transform: translateY(0);
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
	}
</style>
