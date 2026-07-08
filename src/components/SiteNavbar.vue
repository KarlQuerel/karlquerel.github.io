<template>
	<!-- Summoned by <NavToggle>: a dismissible full-screen overlay. The dim
	     backdrop covers the immersive page (which reserves no headroom for a top
	     strip), so the menu never collides with page content. Dismiss via the star
	     toggle, a backdrop click, Escape, or picking a link. -->
	<div
		id="site-navbar"
		ref="overlay"
		class="site-nav-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Site menu"
		@click.self="emitClose"
	>
		<nav class="site-nav-overlay__panel" aria-label="Main navigation">
			<div class="site-chrome-links">
				<router-link
					v-for="link in NAVBAR_LINKS"
					:key="link.to"
					:to="link.to"
					class="site-chrome-link"
					@click="emitClose"
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
	</div>
</template>

<script setup>
	import { onBeforeUnmount, onMounted, ref } from 'vue'
	import { NAVBAR_LINKS } from '@/constants/navigation'
	import { useAmbientAudio } from '../composables/useAmbientAudio'

	const emit = defineEmits(['close'])
	const { enabled, toggle } = useAmbientAudio()

	const overlay = ref(null)
	let previouslyFocused = null
	let previousOverflow = ''

	const emitClose = () => emit('close')

	const focusableItems = () =>
		overlay.value
			? Array.from(overlay.value.querySelectorAll('a[href], button:not([disabled])')).filter(
					el => el.offsetParent !== null
				)
			: []

	// Modal keyboard contract: Escape closes, Tab is trapped inside the menu.
	const onKeydown = e => {
		if (e.key === 'Escape') {
			e.preventDefault()
			emitClose()
			return
		}
		if (e.key !== 'Tab') return
		const items = focusableItems()
		if (!items.length) return
		const first = items[0]
		const last = items[items.length - 1]
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault()
			last.focus()
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault()
			first.focus()
		}
	}

	onMounted(() => {
		previouslyFocused = document.activeElement
		previousOverflow = document.documentElement.style.overflow
		document.documentElement.style.overflow = 'hidden'
		document.addEventListener('keydown', onKeydown)
		focusableItems()[0]?.focus()
	})

	onBeforeUnmount(() => {
		document.removeEventListener('keydown', onKeydown)
		document.documentElement.style.overflow = previousOverflow
		// Hand focus back to whatever opened the menu (the star toggle).
		if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
	})
</script>
