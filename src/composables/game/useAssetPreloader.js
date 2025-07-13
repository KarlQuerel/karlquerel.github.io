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

	const landscapeAssets = [
		'/assets/game/landscape/city-looped.gif',
		'/assets/game/landscape/ruins.gif',
		'/assets/game/landscape/city.gif',
		'/assets/game/landscape/water.gif',
		'/assets/game/landscape/sunset3.gif',
		'/assets/game/landscape/sunset2.gif',
		'/assets/game/landscape/sunset1.gif',
		'/assets/game/landscape/smoke.gif',
		'/assets/game/landscape/mountains1.gif',
		'/assets/game/landscape/forest1.gif',
		'/assets/game/landscape/snowy-mountains.gif',
		'/assets/game/landscape/mountains2.gif',
		'/assets/game/landscape/forest.gif',
		'/assets/game/landscape/fields.gif',
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
			console.log('Loading critical assets...')
			await Promise.all(criticalAssets.map(loadAsset))

			console.log('Loading secondary assets...')
			await Promise.all(secondaryAssets.map(loadAsset))

			console.log('All critical and secondary assets preloaded successfully')
		} catch (error) {
			console.error('Error preloading assets:', error)
		} finally {
			isLoading.value = false
		}
	}

	const loadLandscapeAssets = async () => {
		console.log('Loading landscape assets...')
		await Promise.all(landscapeAssets.map(loadAsset))
		console.log('Landscape assets loaded')
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
		loadLandscapeAssets,
		getLoadingPercentage,
		isPreloadingComplete,
	}
}
