<template>
	<div
		class="exercise"
		:class="{ 'is-open': isOpen }"
		:data-muscle="exercise.muscle"
		role="button"
		tabindex="0"
		:aria-expanded="String(isOpen)"
		@click="$emit('toggle')"
		@keydown="$emit('keydown', $event)"
	>
		<div class="exercise-row">
			<div class="exercise-name">
				<span v-if="exercise.step" class="superset-step">{{ exercise.step }}</span>
				{{ exercise.name }}
			</div>
			<div class="badges" :class="{ 'badges--warmup': hasWarmupBadge }">
				<span
					v-for="(badge, index) in exercise.badges"
					:key="`${badge.class}-${index}`"
					class="badge"
					:class="badge.class"
				>
					{{ formatBadge(badge) }}
				</span>
			</div>
		</div>
		<p v-for="(line, index) in exercise.meta" :key="index" class="meta">
			- <strong>{{ line.strong }}:</strong> {{ line.text }}
		</p>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { badgeLabel as formatBadge } from '@/data/sportLabels'

	const props = defineProps({
		exercise: {
			type: Object,
			required: true,
		},
		isOpen: {
			type: Boolean,
			default: false,
		},
	})

	defineEmits(['toggle', 'keydown'])

	const hasWarmupBadge = computed(() => props.exercise.badges.some(b => b.class === 'warm-up'))
</script>
