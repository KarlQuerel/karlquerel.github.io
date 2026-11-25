<template>
	<!-- The game's loader on the site's boot clock (BootCover), the site keeping its K: HERMES-8 running the checks
	     of the screen that is loading, each line up once its share of the boot starts and read once it lands, the
	     sync bar under them. -->
	<BootCover :progress="progress" :ceiling="ceiling" :done="done" @gone="emit('gone')">
		<template #default="{ fill }">
			<div class="checks" :style="checksStyle" aria-hidden="true">
				<div class="checks__head">{{ GAME_BOOT.head }}</div>
				<div
					v-for="([system, reading], i) in rows"
					:key="system"
					class="checks__row"
					:class="{ 'checks__row--wait': fill * rows.length < i }"
				>
					<span>{{ system }}</span>
					<span class="checks__lead" />
					<span v-if="fill * rows.length >= i + 1" class="checks__reading">{{
						reading
					}}</span>
					<span v-else class="checks__cursor" />
				</div>
				<div class="checks__row">
					<span>{{ GAME_BOOT.sync }}</span>
					<span class="checks__bar">
						<i
							v-for="n in GAME_BOOT_LOOK.cells"
							:key="n"
							class="checks__cell"
							:class="{ 'checks__cell--on': n <= fill * GAME_BOOT_LOOK.cells }"
						/>
					</span>
				</div>
			</div>
		</template>
	</BootCover>
</template>

<script setup>
	import { computed } from 'vue'
	import BootCover from '@/components/BootCover.vue'
	import { GAME_BOOT_LOOK } from '@/constants/game/boot'
	import { GAME_BOOT } from '@/data/gameIntro'

	const props = defineProps({
		progress: { type: Number, required: true },
		ceiling: { type: Number, required: true },
		done: { type: Boolean, required: true },
		// whose checks run: a key of GAME_BOOT.checks
		screen: { type: String, required: true },
	})

	// the cover has faded out and drawn its last
	const emit = defineEmits(['gone'])

	const rows = computed(() => GAME_BOOT.checks[props.screen])
	const checksStyle = { '--blink-s': `${GAME_BOOT_LOOK.blinkS}s` }
</script>

<style scoped lang="scss">
	@use '@/styles/flyby' as *;

	// the terminal's voice, a ship's console rather than the site's mark
	.checks {
		width: min(88vw, 30rem);
		// #app centres its text
		text-align: left;
		font-family: $font-terminal;
		font-size: $type-prose;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: $flyby-ink;
		@include flyby-shadow;
	}

	.checks__head {
		margin-bottom: 1.2em;
		color: $yellow;
	}

	.checks__row {
		display: flex;
		align-items: center;
		gap: 0.6em;
		line-height: 1.8;
	}

	// a check not started yet keeps its line, so the panel never shifts
	.checks__row--wait {
		visibility: hidden;
	}

	// square dots, one pixel art step apart
	.checks__lead {
		flex: 1;
		height: 2px;
		background: linear-gradient(90deg, currentColor 50%, transparent 0) 0 0 / 6px 2px repeat-x;
		opacity: 0.45;
	}

	.checks__reading {
		color: $yellow;
	}

	.checks__cursor {
		width: 0.6em;
		height: 1em;
		background: currentColor;
		animation: blink var(--blink-s) steps(1, end) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.checks__bar {
		flex: 1;
		display: flex;
		gap: 3px;
	}

	.checks__cell {
		flex: 1;
		height: 0.8em;
		border: 2px solid currentColor;
		opacity: 0.45;
	}

	.checks__cell--on {
		background: $yellow;
		border-color: $yellow;
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.checks__cursor {
			animation: none;
		}
	}
</style>
