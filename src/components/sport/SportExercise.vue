<template>
	<div class="exercise" :data-muscle="exercise.muscle">
		<div class="exercise-row">
			<div class="exercise-name">
				<span v-if="exercise.step" class="superset-step">{{ exercise.step }}</span>
				{{ exercise.name }}
			</div>
			<div class="badges">
				<span
					v-for="(badge, index) in exercise.badges"
					:key="`${badge.class}-${index}`"
					class="badge"
					:class="badge.class"
				>
					{{ badgeLabel(badge) }}
				</span>
			</div>
		</div>
		<dl v-if="exercise.meta.length" class="meta-list">
			<template v-for="(line, index) in exercise.meta" :key="index">
				<dt class="meta-term">{{ line.strong }}</dt>
				<dd class="meta-text">{{ line.text }}</dd>
			</template>
		</dl>
	</div>
</template>

<script setup>
	import { badgeLabel } from '@/data/sportLabels'

	defineProps({
		exercise: {
			type: Object,
			required: true,
		},
	})
</script>
