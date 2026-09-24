<template>
	<div>{{ REDIRECT_NOTICE }}</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { REDIRECT_NOTICE, RICKROLL_URL } from '@/constants/redirects'

	onMounted(() => {
		window.location.href = RICKROLL_URL
	})
</script>
