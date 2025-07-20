import { ref } from 'vue'

export function useAssetPreloader() {
	const isLoading = ref(true)
	const loadingProgress = ref(0)
	const totalAssets = ref(0)
	const loadedAssets = ref(0)

	const criticalAssets = [
		'/assets/game/menu-background.gif',
		'/assets/game/tavern.gif',
		'/assets/game/menu.png',
	]

	const secondaryAssets = [
		'/assets/game/hole.gif',
		'/assets/game/dead.gif',
		'/assets/game/credits.gif',
		'/assets/game/castle.gif',
	]

	const loadAsset = assetPath => {
		return new Promise(resolve => {
			const img = new Image()

			img.onload = () => {
				loadedAssets.value++
				loadingProgress.value = Math.round((loadedAssets.value / totalAssets.value) * 100)
				resolve(assetPath)
			}

			img.onerror = () => {
				console.warn(`Failed to load asset: ${assetPath}`)
				loadedAssets.value++
				loadingProgress.value = Math.round((loadedAssets.value / totalAssets.value) * 100)
				resolve(assetPath)
			}

			img.src = assetPath
		})
	}

	const preloadAssets = async () => {
		isLoading.value = true
		loadingProgress.value = 0
		totalAssets.value = criticalAssets.length + secondaryAssets.length
		loadedAssets.value = 0

		try {
			await Promise.all(criticalAssets.map(loadAsset))

			await Promise.all(secondaryAssets.map(loadAsset))
		} catch (error) {
			console.error('Error preloading assets:', error)
		} finally {
			isLoading.value = false
		}
	}

	const getLoadingPercentage = () => {
		return loadingProgress.value
	}

	const isPreloadingComplete = () => {
		return !isLoading.value && loadedAssets.value === totalAssets.value
	}

	return {
		isLoading,
		loadingProgress,
		totalAssets,
		loadedAssets,
		preloadAssets,
		getLoadingPercentage,
		isPreloadingComplete,
	}
}
