<template>
	<nav
		id="site-navbar"
		class="site-chrome-bar site-chrome-bar--floating"
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

	// Summoned by <NavToggle> on every page as a fixed overlay (no reflow of the
	// content behind it), so it always renders in its floating form.
	const { enabled, toggle } = useAmbientAudio()
</script>
