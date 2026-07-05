<template>
	<nav
		id="site-navbar"
		class="site-chrome-bar"
		:class="floating ? 'site-chrome-bar--floating' : 'site-chrome-bar--sticky-top'"
		aria-label="Main navigation"
	>
		<div class="site-chrome-links">
			<router-link
				v-for="link in NAVBAR_LINKS"
				:key="link.to"
				:to="link.to"
				class="site-chrome-link"
				>{{ link.label }}</router-link
			>
			<button
				type="button"
				class="site-chrome-audio"
				:class="{ 'is-off': !enabled }"
				:aria-pressed="enabled"
				:aria-label="enabled ? 'Mute ambient music' : 'Play ambient music'"
				:title="enabled ? 'Mute ambient music' : 'Play ambient music'"
				data-no-spark
				@click="toggle"
			>
				<span aria-hidden="true">♪</span>
			</button>
		</div>
	</nav>
</template>

<script setup>
	import { NAVBAR_LINKS } from '@/constants/navigation'
	import { useAmbientAudio } from '../composables/useAmbientAudio'

	// The homepage summons the bar as a fixed overlay (no reflow of the hero);
	// every other page keeps it sticky in normal flow.
	defineProps({ floating: { type: Boolean, default: false } })

	const { enabled, toggle } = useAmbientAudio()
</script>
