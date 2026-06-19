<template>
	<div class="life">
		<!-- Home base: a little spot in the world where Yako lives. -->
		<section v-reveal class="life-home reveal-block" aria-label="Home base">
			<img class="life-home__house" :src="HOME_SCENE.house" alt="" aria-hidden="true" />
			<img class="life-home__yako" :src="HOME_SCENE.yako" alt="Yako the dog" />
			<img class="life-home__fire" :src="HOME_SCENE.campfire" alt="" aria-hidden="true" />
			<span class="life-home__sign">HOME BASE</span>
		</section>

		<!-- About me -->
		<section v-reveal class="life-card reveal-block">
			<h2 class="life-card__title">ABOUT ME</h2>
			<p v-for="(line, i) in ABOUT_ME" :key="i" class="life-card__line">{{ line }}</p>
		</section>

		<!-- Dog gallery -->
		<section v-reveal class="life-card reveal-block">
			<h2 class="life-card__title">THE DOGS</h2>
			<div class="dog-grid">
				<figure v-for="(photo, i) in DOG_GALLERY" :key="i" class="dog-frame">
					<img
						class="dog-frame__img"
						:class="{ 'is-photo': !photo.placeholder }"
						:src="photo.src"
						:alt="photo.caption"
					/>
					<figcaption class="dog-frame__cap">{{ photo.caption }}</figcaption>
				</figure>
			</div>
			<p class="life-note">Placeholder shots of Yako — swap in your own photos anytime.</p>
		</section>
	</div>
</template>

<script setup>
	import { ABOUT_ME, HOME_SCENE, DOG_GALLERY } from '@/data/aboutLife'
	import { reveal as vReveal } from '@/directives/reveal'
</script>

<style scoped lang="scss">
	.life {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: min(40rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	/***	HOME BASE SCENE		***/
	.life-home {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 1.25rem;
		min-height: 8rem;
		padding-bottom: 0.5rem;
	}

	.life-home img {
		image-rendering: pixelated;
		height: auto;
	}

	.life-home__house {
		width: clamp(96px, 22vw, 140px);
	}

	.life-home__yako {
		width: clamp(64px, 16vw, 92px);
	}

	.life-home__fire {
		width: clamp(48px, 12vw, 70px);
	}

	// Little wooden name plate under the scene.
	.life-home__sign {
		position: absolute;
		bottom: -0.4rem;
		font-family: $font-pixel;
		font-size: clamp(0.5rem, 1.4vw, 0.65rem);
		color: $black;
		background: $yellow;
		padding: 0.3rem 0.6rem;
		box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.4);
	}

	/***	CARDS		***/
	.life-card {
		padding: 1rem 1.1rem 1.2rem;
		background: rgba(0, 0, 0, 0.7);
		border: 4px solid $yellow;
		box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.5);
	}

	.life-card__title {
		margin: 0 0 0.8rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 0.95rem);
		color: $yellow;
		text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
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

	/***	DOG GALLERY		***/
	.dog-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.dog-frame {
		margin: 0;
		padding: 0.5rem 0.5rem 0;
		background: $cream;
		border: 3px solid $black;
		box-shadow: 4px 4px 0 0 rgba(0, 0, 0, 0.45);
	}

	.dog-frame__img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		background: rgba(0, 0, 0, 0.75);
		// Placeholder sprites are pixel art — keep them crisp and whole.
		object-fit: contain;
		image-rendering: pixelated;
	}

	// Real photos: fill the frame and render smoothly.
	.dog-frame__img.is-photo {
		object-fit: cover;
		image-rendering: auto;
	}

	.dog-frame__cap {
		padding: 0.4rem 0 0.5rem;
		font-family: $font-pixel;
		font-size: clamp(0.45rem, 1.2vw, 0.55rem);
		text-align: center;
		color: $black;
	}

	.life-note {
		margin: 0.9rem 0 0;
		font-size: clamp(0.7rem, 1.5vw, 0.8rem);
		color: rgba(255, 255, 255, 0.6);
	}

	/***	REVEAL		***/
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
		.dog-grid {
			grid-template-columns: 1fr;
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
