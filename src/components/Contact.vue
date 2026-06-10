<template>
	<div class="contact-page">
		<template v-for="src in PRELOAD_GIF_SRCS" :key="`preload-${src}`">
			<img class="sr-only-preload" alt="" :src="src" />
		</template>
		<div class="content">
			<div class="nes-container is-dark is-rounded contact-panel">
				<h1 class="contact-heading">Contact</h1>
				<img
					class="contact-idle"
					:src="IDLE_GIF_SRC"
					alt="Yako idle"
					width="128"
					height="128"
				/>
				<ul class="contact-links">
					<li v-for="row in CONTACT_ROWS" :key="row.key" class="contact-row">
						<img
							class="contact-row-anim"
							:src="row.gifSrc"
							:alt="''"
							width="96"
							height="96"
						/>
						<a
							class="contact-link nes-btn"
							:class="row.btnClass"
							:href="row.href"
							:target="row.blank ? '_blank' : undefined"
							:rel="row.blank ? 'noopener noreferrer' : undefined"
						>
							{{ row.label }}
						</a>
					</li>
				</ul>
			</div>
			<router-link to="/" class="back-home nes-btn is-primary">Home</router-link>
		</div>
	</div>
</template>

<script setup>
	const IDLE_GIF_SRC = '/assets/img/Yako_Animations/Idle.gif'
	const LIE_DOWN_GIF_SRC = '/assets/img/Yako_Animations/Lie_down.gif'
	const PLAY_GIF_SRC = '/assets/img/Yako_Animations/Play.gif'

	const PRELOAD_GIF_SRCS = [IDLE_GIF_SRC, LIE_DOWN_GIF_SRC, PLAY_GIF_SRC]

	const CONTACT_ROWS = [
		{
			key: 'email',
			label: 'Email',
			href: 'mailto:karlquerel@gmail.com',
			btnClass: 'is-success',
			gifSrc: LIE_DOWN_GIF_SRC,
			blank: false,
		},
		{
			key: 'github',
			label: 'GitHub',
			href: 'https://github.com/KarlQuerel',
			btnClass: '',
			gifSrc: PLAY_GIF_SRC,
			blank: true,
		},
		{
			key: 'linkedin',
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/karlquerel',
			btnClass: 'is-warning',
			gifSrc: LIE_DOWN_GIF_SRC,
			blank: true,
		},
	]
</script>

<style lang="scss" scoped>
	.contact-page {
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}

	.contact-panel {
		max-width: min(36rem, 96vw);
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5) !important;
		border: 0.1vh solid $retro-green !important;
		border-radius: 20px !important;
		padding: 1.25rem 1.5rem 1.5rem !important;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.contact-heading {
		margin: 0;
		font-size: clamp(1rem, 3vw, 1.35rem);
		letter-spacing: 0.08em;
		color: $white;
	}

	.contact-idle {
		display: block;
		width: min(160px, 40vw);
		height: auto;
		image-rendering: pixelated;
		flex-shrink: 0;
	}

	.contact-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.85rem;
		width: 100%;
	}

	.contact-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: clamp(0.5rem, 3vw, 1rem);
		width: 100%;
	}

	.contact-row-anim {
		display: block;
		width: clamp(56px, 14vw, 96px);
		height: auto;
		image-rendering: pixelated;
		flex-shrink: 0;
		pointer-events: none;
	}

	.contact-link {
		min-width: 11rem;
		flex: 0 1 auto;
		text-decoration: none;
		justify-content: center;
	}

	.back-home {
		margin-top: 1.25rem;
		text-decoration: none;
		font-size: 0.75rem;
	}

	.sr-only-preload {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
