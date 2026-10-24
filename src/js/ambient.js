// The title screen's music: a short loop decoded whole and played by the audio engine itself, so it
// wraps on the exact sample (a media element leaves a gap at every pass). Fetched as soon as the music
// is wanted; faded in and out through a gain.

// the first of `sources` ({ src, type }) this browser can decode
const playable = sources => {
	const probe = new Audio()
	return (sources.find(({ type }) => probe.canPlayType(type)) ?? sources.at(-1)).src
}

export function createAmbient({ sources, volume, fadeInMs, fadeOutMs }) {
	const ctx = new AudioContext()
	const level = ctx.createGain()
	level.gain.value = 0
	level.connect(ctx.destination)

	// the loop starts the moment it is decoded, into a gain that may still be at zero
	const ready = fetch(playable(sources))
		.then(response => response.arrayBuffer())
		.then(bytes => ctx.decodeAudioData(bytes))
		.then(buffer => {
			const loop = ctx.createBufferSource()
			loop.buffer = buffer
			loop.loop = true
			loop.connect(level)
			loop.start()
		})
		.catch(() => {})

	// A straight ramp over `ms` from `delayMs` on, the way the title fades, so the two arrive together.
	// Whatever was still scheduled gives way, so a pause is never overtaken by an earlier fade-in.
	const fade = (to, ms, delayMs = 0) => {
		const from = ctx.currentTime + delayMs / 1000
		level.gain.cancelScheduledValues(ctx.currentTime)
		level.gain.setValueAtTime(level.gain.value, from)
		level.gain.linearRampToValueAtTime(to, from + ms / 1000)
	}
	let wanted = false
	// the engine sleeps once faded out, unless played again meanwhile
	let hush = 0

	return {
		// Up to `share` of the volume over `ms`, from `delayMs` on; by default all the way, quickly.
		// Resolves false while the browser still holds sound back for a gesture.
		play({ share = 1, ms = fadeInMs, delayMs = 0 } = {}) {
			wanted = true
			clearTimeout(hush)
			return ctx
				.resume()
				.then(() => fade(volume * share, ms, delayMs))
				.then(() => ready)
				.then(() => ctx.state === 'running')
		},
		get playing() {
			return wanted && ctx.state === 'running'
		},
		pause() {
			wanted = false
			fade(0, fadeOutMs)
			clearTimeout(hush)
			hush = setTimeout(() => ctx.suspend(), fadeOutMs)
		},
		close() {
			clearTimeout(hush)
			ctx.close()
		},
	}
}
