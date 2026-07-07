<template>
	<div class="content about">
		<header class="about-head">
			<p :key="activeTab ?? 'hub'" class="about-intro about-lead">
				{{ activeTab ? ABOUT_INTRO[activeTab] : ABOUT_INTRO.greeting }}
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
				<i class="nes-icon is-large" :class="ABOUT_HUB[tab.id].icon" aria-hidden="true" />
				<span class="portal__label">{{ tab.label }}</span>
				<span class="portal__blurb">{{ ABOUT_HUB[tab.id].blurb }}</span>
			</button>
		</div>

		<template v-else>
			<nav class="about-tabs" role="tablist" aria-label="About sections">
				<button
					v-for="tab in TABS"
					:key="tab.id"
					class="about-tab"
					:class="{ 'is-active': tab.id === activeTab }"
					type="button"
					role="tab"
					:aria-selected="tab.id === activeTab"
					@click="selectTab(tab.id)"
				>
					{{ tab.label }}
				</button>
			</nav>

			<component :is="activeComponent" :key="activeTab" class="about-panel" />
		</template>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ABOUT_INTRO, ABOUT_HUB } from '@/data/about'
	import AboutWork from './AboutWork.vue'
	import AboutLife from './AboutLife.vue'

	// The active path lives in the URL (?tab=work | ?tab=life) so it is shareable
	// and survives refresh / back-button. No tab param → the neutral landing hub.
	const TABS = [
		{ id: 'work', label: 'WORK', component: AboutWork },
		{ id: 'life', label: 'LIFE', component: AboutLife },
	]

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => {
		const tab = route.query.tab
		return tab === 'work' || tab === 'life' ? tab : null
	})
	const activeComponent = computed(
		() => TABS.find(tab => tab.id === activeTab.value)?.component ?? null
	)

	function selectTab(id) {
		if (id === activeTab.value) return
		router.push({ query: { tab: id } })
	}
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as *;

	// Backdrop (the drifting starfield) is the shared <SpaceBackground> layer.
	// Every page is immersive now — no in-flow header or navbar to subtract — so
	// fill the whole viewport and let .content's justify-content:center centre the
	// panels; taller tabs (WORK / LIFE) overflow this floor and scroll.
	.about {
		min-height: 100dvh;
		gap: 2rem;
		padding: 3.6rem 1rem 4rem;
	}

	// The greeting sits in the same "window onto the void" frame as the buttons —
	// a hairline edge and a translucent fill just dark enough to stay legible.
	.about-head {
		max-width: min(46rem, 94vw);
		margin: 0 auto;
		padding: 1.5rem 1.5rem 1.75rem;
		@include void-panel(rgba(0, 0, 0, 0.55));
	}

	.about-intro {
		max-width: 42ch;
		margin: 0.5rem auto 0;
		font-size: clamp(0.85rem, 2vw, 1rem);
		line-height: 1.65;
		text-align: center;
		color: rgba(255, 255, 255, 0.9);
	}

	.about-intro:first-child {
		margin-top: 0;
	}

	// Re-mounts on every path change (keyed) so the stepped 8-bit fade replays
	// as the copy swaps hub → WORK → LIFE.
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

	// Wide gutters between the portals so the starfield reads as open void
	// rather than a packed grid — the emptiness is doing the work.
	.about-hub {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2.25rem;
		width: min(42rem, 94vw);
		margin: 0 auto;
		padding: 0.5rem;
	}

	// A window onto the void: shared void-button chrome (hairline frame, warm
	// yellow bloom + weightless lift on hover) over a centre that darkens for
	// legibility then fades to nothing at the edges, letting the stars through.
	.portal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		padding: 2.75rem 1.5rem;
		@include void-button(
			$bg: radial-gradient(
					125% 125% at 50% 38%,
					rgba(0, 0, 0, 0.55) 0%,
					rgba(0, 0, 0, 0.18) 68%,
					rgba(0, 0, 0, 0) 100%
				)
		);
	}

	.portal .nes-icon {
		transition: filter 0.4s ease;
	}

	.portal:hover .nes-icon,
	.portal:focus-visible .nes-icon {
		filter: drop-shadow(0 0 8px rgba($yellow, 0.5));
	}

	.portal__label {
		font-family: $font-pixel;
		font-size: clamp(0.75rem, 2.4vw, 1rem);
		letter-spacing: 1px;
		color: $yellow;
		transition: text-shadow 0.4s ease;
	}

	// The label flares like a distant star as you approach.
	.portal:hover .portal__label,
	.portal:focus-visible .portal__label {
		text-shadow: 0 0 12px rgba($yellow, 0.55);
	}

	.portal__blurb {
		max-width: 22ch;
		font-size: clamp(0.72rem, 1.7vw, 0.85rem);
		line-height: 1.55;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
	}

	.about-tabs {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
	}

	// Tabs echo the portals — near-invisible frames that only glow when active
	// or hovered, so nothing weighs down the void.
	.about-tab {
		font-family: $font-pixel;
		font-size: clamp(0.6rem, 1.8vw, 0.8rem);
		letter-spacing: 1px;
		padding: 0.7rem 1.4rem;
		@include void-button($lift: -2px);
	}

	.about-tab.is-active {
		color: $yellow;
		background: rgba($yellow, 0.06);
		border-color: rgba($yellow, 0.5);
		box-shadow:
			0 0 20px rgba($yellow, 0.15),
			0 0 0 1px rgba($yellow, 0.3) inset;
		text-shadow: 0 0 10px rgba($yellow, 0.4);
	}

	@media (max-width: $breakpoint-mobile) {
		.about-hub {
			grid-template-columns: 1fr;
		}
	}

	// The void-button lift already respects reduced-motion (see the mixin); only
	// the intro fade needs disabling here.
	@media (prefers-reduced-motion: reduce) {
		.about-lead {
			animation: none;
		}
	}
</style>
