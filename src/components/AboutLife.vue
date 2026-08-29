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
	// mat between a section image and its void frame
	$media-mat: 5px;

	.life {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(64rem, 94vw);
		margin: 0 auto;
		text-align: left;
	}

	// One screen per section. The slot carries the height and the card floats in the
	// middle of it, so the dark wash still hugs its own copy instead of ballooning
	// into a viewport-tall panel — and the sections can be wildly different heights
	// (DOGS runs past a screen, MUSIC is a fifth of one) without any of them sharing
	// the frame with a neighbour. vh, not dvh: a dvh that resizes as a phone's URL bar
	// slides would re-fire the journey's ResizeObserver and re-measure the camera.
	//
	// The height alone carries the rhythm — deliberately no scroll-snap. Snapping these
	// measured ~500px of scroll dragged backwards across one wheel run: every tick ends
	// a gesture, so the snap re-settles against the reader's hand. The camera is scrubbed
	// off scroll position here, so that tug is not just a scroll artefact, it is the
	// whole scene stuttering with it.
	.life-slot {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 100vh;
		// keeps a card off the fixed corner chrome; inside the 100vh for every card
		// that fits, so those still centre on the frame exactly as they would without it
		padding-block: $chrome-clearance;
	}

	// The first chapter opens the station: it hangs just under the heading instead
	// of centring in its own viewport, or the station opens on half a screen of
	// empty space before anything is said. Below it the chapter rhythm resumes -
	// and that whitespace is owed: the route's first zigzag crossing turns in it.
	.life-slot:first-child {
		min-height: 0;
		padding-block: 0 34vh;
	}

	.life-card {
		// flow-root, not block: contains the floated art so it can't spill past the wash
		display: flow-root;
		// wide column, but the prose below scales with it so the measure stays ~75ch
		width: min(50rem, 92vw);
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
		// terminal font for prose: Press Start 2P stays on titles, Departure Mono
		// carries the reading text
		font-family: $font-terminal;
		// stepped, not fluid: the face is crisp only on its 11px grid, so a clamp
		// would spend most widths antialiased. 22px puts ~54ch on the desktop column.
		font-size: $type-prose;
		line-height: 1.55;
		// no tracking: the face is monospaced and already spaced, and an em-based
		// value would land on half-pixels and undo the size choice above.
		// A `\n` in the copy breaks the line without opening a paragraph gap.
		white-space: pre-line;
		// the global `p { text-align: center }` would otherwise centre it
		text-align: inherit;
		color: rgba(255, 255, 255, 0.88);
	}

	.life-card__line:last-child {
		margin-bottom: 0;
	}

	// The way into the card. Departure Mono is crisp only at 11px and 22px, so a lede
	// cannot be sized up without going soft — the hierarchy comes from a brighter white,
	// the section's own accent as a margin rule, and the extra air under it instead.
	.life-card__lede {
		position: relative;
		margin-bottom: 1.3rem;
		padding-left: 0.9rem;
		color: $white;
	}

	// the accent again, as a rule rather than a dot — colouring the sentence itself
	// would put a whole line of prose in $purple on black, which is unreadable
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
	// Framed like the dog photos: the art carries its own dark backdrop, so without
	// the void border its rectangle reads as an accident rather than a picture.
	.life-card__media {
		// <picture> is inline by default, so width would be ignored once the float drops
		display: block;
		float: right;
		width: min(15rem, 34%);
		margin: 0.2rem 0 0.6rem 1.4rem;
		// the art is near-black, so it needs a lighter mat between it and the border —
		// without one the void hairline sits darker than the art and vanishes
		padding: $media-mat;
		@include void-panel(rgba(255, 255, 255, 0.06));
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

	// the deck spans the text column, so the photos and the prose share one edge.
	// Its own top margin reads as a section break, not another paragraph gap.
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
		font-size: px8(1);
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
		// Where the pixel grid loses. Departure Mono is crisp only at 11px and 22px:
		// 22px leaves ~23ch on a phone, and 11px has an 8px cap — smaller than the
		// VT323 it replaced, on the very axis this font was chosen for. 16px is
		// off-grid (33% antialiased at DPR3) but is the comfortable reading size, and
		// body prose is where softness shows least and legibility matters most.
		// Titles, labels and chrome stay on-grid.
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
		// Flex order moves it one slot down without touching the DOM order the
		// desktop float depends on. Scoped by :has, so cards without art stay block
		// — ordering an unscoped .dogs deck would jump it above the prose.
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
