export async function playSound(src, volume = 1) {
	try {
		const audio = new Audio(src)
		audio.volume = volume
		await audio.play()
	} catch (error) {
		console.error('Error playing sound:', error)
	}
}
