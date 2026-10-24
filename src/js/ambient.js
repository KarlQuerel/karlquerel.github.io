// The title screen's music: one track looped, fetched only once sound is wanted. Two copies take turns
// and the end of each pass crossfades into the start of the next, so the loop has no seam (an MP3's
// own `loop` leaves a gap). Fades run through gains, which work where a media element's volume is
// fixed (iOS).

export function createAmbient({ src, volume, fadeInMs, fadeOutMs, crossfadeMs }) {
	const ctx = new AudioContext()
	const level = ctx.createGain()
	level.gain.value = 0
	level.connect(ctx.destination)

	const decks = [1, 0].map(start => {
		const audio = new Audio()
		// the first pass buffers as soon as the music is wanted, so it is ready by the first click; the
		// second is fetched at the seam, from the cache by then
		audio.preload = start ? 'auto' : 'none'
		audio.src = src
		const gain = ctx.createGain()
		gain.gain.value = start
		ctx.createMediaElementSource(audio).connect(gain).connect(level)
		return { audio, gain }
	})
	let live = 0
	const overlap = crossfadeMs / 1000

	// near the end of a pass, the other copy starts from the top and the two trade places
	function turn() {
		const out = decks[live]
		const left = out.audio.duration - out.audio.currentTime
		if (!(left <= overlap)) return
		live = 1 - live
		const next = decks[live]
		const at = ctx.currentTime
		next.audio.currentTime = 0
		next.gain.gain.setValueAtTime(0, at)
		next.gain.gain.linearRampToValueAtTime(1, at + left)
		out.gain.gain.setValueAtTime(1, at)
		out.gain.gain.linearRampToValueAtTime(0, at + left)
		next.audio.play().catch(() => {})
	}
	decks.forEach(deck =>
		deck.audio.addEventListener('timeupdate', () => deck === decks[live] && turn())
	)

	// a time constant a third of the fade, so it has all but arrived by the end
	const fade = (to, ms) => level.gain.setTargetAtTime(to, ctx.currentTime, ms / 3000)
	// the tracks stop once faded out, unless played again meanwhile
	let hush = 0

	return {
		// resolves false when the browser still holds sound back for a gesture
		play() {
			clearTimeout(hush)
			ctx.resume()
			fade(volume, fadeInMs)
			return decks[live].audio.play().then(
				() => true,
				() => false
			)
		},
		get playing() {
			return !decks[live].audio.paused && ctx.state === 'running'
		},
		pause() {
			fade(0, fadeOutMs)
			clearTimeout(hush)
			hush = setTimeout(() => decks.forEach(({ audio }) => audio.pause()), fadeOutMs)
		},
		close() {
			clearTimeout(hush)
			decks.forEach(({ audio }) => {
				audio.pause()
				audio.removeAttribute('src')
			})
			ctx.close()
		},
	}
}
