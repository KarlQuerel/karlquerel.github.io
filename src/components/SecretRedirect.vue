<template><div>Redirecting...</div></template>

<script setup>
	import { onMounted } from 'vue'
	import { RICKROLL_URL } from '@/constants/redirects'

	onMounted(() => {
		window.location.href = RICKROLL_URL
	})
</script>
