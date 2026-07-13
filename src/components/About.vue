<template>
	<div class="content about">
		<header class="about-head">
			<p v-if="activeTab" :key="activeTab" class="about-intro about-lead">
				{{ ABOUT_INTRO[activeTab] }}
			</p>
			<p v-else class="about-intro about-lead about-greeting">
				<span class="about-greeting__line">{{ ABOUT_INTRO.greetingLine1 }}</span>
				<span class="about-greeting__line">
					{{ ABOUT_INTRO.greetingLead
					}}<span class="about-name">{{ ABOUT_INTRO.greetingName }}</span>
				</span>
			</p>
		</header>

		<div v-if="!activeTab" class="about-hub" role="group" aria-label="Choose a section">
			<button
				v-for="tab in TABS"
				:key="tab.id"
				class="portal"
				type="button"
				@click="selectTab(tab.id)"
			>
				<span class="portal__icon">
					<img :src="tab.image" alt="" class="portal__img" />
				</span>
				<span class="portal__label">{{ tab.label }}</span>
			</button>
		</div>

		<template v-else>
			<!-- Sits above the intro (order: -1) and sticks to the top while a long
			     panel scrolls, so "back" stays reachable. -->
			<button class="about-back" type="button" @click="goToHub">
				<span class="about-back__icon" aria-hidden="true"><i /><i /></span>
				Back
			</button>

			<component :is="activeComponent" :key="activeTab" class="about-panel" />
		</template>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_INTRO } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'
	import AboutWorkTest from './AboutWorkTest.vue'

	// Tab state lives in the URL (?tab=work|life|test-work) so it survives refresh
	// and is shareable.
	const TABS = [
		{ id: 'work', label: 'WORK', image: '/assets/about/briefcase.png', component: AboutWork },
		{
			id: 'life',
			label: 'LIFE',
			image: '/assets/about/ps1-controller.png',
			component: AboutLife,
		},
		// Throwaway tab to preview the zigzag timeline layout against real data.
		{
			id: 'test-work',
			label: 'TEST',
			image: '/assets/about/briefcase.png',
			component: AboutWorkTest,
		},
	]

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => {
		const tab = route.query.tab
		return TABS.some(t => t.id === tab) ? tab : null
	})
	const activeComponent = computed(
		() => TABS.find(tab => tab.id === activeTab.value)?.component ?? null
	)

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: { tab: id } })
	}

	// Clear the tab query to return to the hub (greeting + section portals).
	function goToHub() {
		router.push({ query: {} })
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	$portal-radius: 4rem;
	// WORK/LIFE labels sit a step below the greeting (which uses the shared
	// $heading-pixel-size) so the heading stays dominant over the button labels.
	$portal-label-size: clamp(0.85rem, 2.1vw, 1.1rem);

	.about {
		min-height: 100dvh;
		gap: 2rem;
		padding: 3.6rem 1rem 4rem;
	}

	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
		background: radial-gradient(
			120% 130% at 50% 50%,
			rgba(0, 0, 0, 0.72) 0%,
			rgba(0, 0, 0, 0.45) 55%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.95rem, 2.2vw, 1.15rem);
		line-height: 1.75;
		text-align: center;
		color: $white;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

	// The name pops in the site yellow against the white greeting.
	.about-name {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.45);
	}

	// Bigger two-line hub greeting; each line is a block so they stack without a <br>.
	.about-greeting {
		font-size: $heading-pixel-size;
		line-height: 1.5;
		text-transform: uppercase;
	}

	.about-greeting__line {
		display: block;
	}

	.about-lead {
		color: $white;
		animation: intro-swap 0.35s steps(4, end) both;
	}

	@keyframes intro-swap {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.about-hub {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2.25rem;
		width: min(42rem, 94vw);
		// Extra top margin (on top of the row gap) opens up the greeting → portals gap.
		margin: 2.5rem auto 0;
		padding: 0.5rem;
	}

	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		padding: 0.9rem 1.4rem;
		@include void-button(
			$bg: radial-gradient(
					125% 125% at 50% 38%,
					rgba(0, 0, 0, 0.55) 0%,
					rgba(0, 0, 0, 0.18) 68%,
					rgba(0, 0, 0, 0) 100%
				)
		);
	}

	// Separate rule so it overrides the mixin's radius without trailing it.
	.portal {
		border-radius: $portal-radius;
	}

	// Borderless: cancel the mixin's hover frame/lift so feedback lives on the icon + label.
	.portal,
	.portal:hover,
	.portal:focus-visible,
	.portal:active {
		border-color: transparent;
		box-shadow: none;
		transform: none;
	}

	.portal__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5.5rem;
		height: auto;
		transition:
			transform 0.35s ease,
			filter 0.35s ease;
	}

	.portal__img {
		width: 5.5rem;
		height: auto;
		display: block;
	}

	.portal:hover .portal__icon,
	.portal:focus-visible .portal__icon {
		transform: scale(1.09) translateY(-5px);
		filter: drop-shadow(0 0 10px rgba($yellow, 0.8)) drop-shadow(0 0 24px rgba($yellow, 0.4));
		animation: icon-bloom 1.8s ease-in-out infinite;
	}

	@keyframes icon-bloom {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba($yellow, 0.55))
				drop-shadow(0 0 18px rgba($yellow, 0.28));
		}
		50% {
			filter: drop-shadow(0 0 13px rgba($yellow, 0.9))
				drop-shadow(0 0 30px rgba($yellow, 0.5));
		}
	}

	.portal__label {
		font-family: $font-pixel;
		font-size: $portal-label-size;
		letter-spacing: 1px;
		color: $text-interactive;
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease;
	}

	.portal:hover .portal__label,
	.portal:focus-visible .portal__label {
		color: $yellow;
		text-shadow: 0 0 12px rgba($yellow, 0.6);
	}

	// Return-to-hub control: hoisted above the intro (order: -1), centred, and sticky
	// so it stays reachable while a long panel scrolls. Pinned at 5.5rem — below the
	// star toggle AND its "MENU" hint, which own top-centre — so they never overlap.
	// z 30 keeps it under the nav overlay (40) and star (50) so opening the menu covers it.
	.about-back {
		order: -1;
		align-self: center;
		position: sticky;
		top: 5.5rem;
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: $font-pixel;
		font-size: clamp(0.7rem, 2.2vw, 1rem);
		letter-spacing: 1px;
		text-transform: uppercase;
		padding: 0.5rem 0.9rem;
		// Keep it legible over whatever panel content scrolls behind it.
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		// Framed chip: the shared void frame over a slightly more solid dark fill, so
		// it reads as a distinct, tappable control against the scrolling panel.
		@include void-button($lift: -2px, $bg: rgba(0, 0, 0, 0.55));
	}

	// Arcade "rewind": twin pixel triangles (sized in em so they scale with the label)
	// that step left on hover.
	.about-back__icon {
		display: inline-flex;
		gap: 0.15em;
		flex: none;
		transition: transform 0.2s steps(3, end);
	}

	.about-back__icon i {
		width: 0;
		height: 0;
		border-top: 0.42em solid transparent;
		border-bottom: 0.42em solid transparent;
		border-right: 0.42em solid currentColor;
	}

	.about-back:hover .about-back__icon,
	.about-back:focus-visible .about-back__icon {
		transform: translateX(-3px);
	}

	@media (max-width: $breakpoint-mobile) {
		.about-hub {
			flex-direction: column;
			align-items: center;
		}
	}

	// Reduced-motion: drop the icon scale + pulse; the static glow + yellow hover label still read.
	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}

		.portal:hover .portal__icon,
		.portal:focus-visible .portal__icon {
			transform: none;
			animation: none;
		}
	}
</style>
