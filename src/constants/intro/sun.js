// Shot 3, THE SUN HAS BEEN GROWING RELENTLESSLY. The sun's centre sits off the left of the frame, so
// only its limb shows; the inner planets stand on their orbits across the frame and the limb swells
// toward them, swallowing Mercury, then Venus, stopping short of a scorched Earth. Positions are shares
// of the frame (x of its width, y of its height, from the top left); times in seconds.
export const SUN = {
	duration: 10.5,
	cardAt: 1.2,
	cellPx: 2,
	// the sun's centre, off the frame's left edge
	at: [-0.3, 0.56],
	// where its limb crosses the planets' line, young and giant
	limb: { young: 0.1, giant: 0.72 },
	// the swell runs between these; it ages from the earth shot's star to `age`
	swell: [0.6, 8.6],
	age: 1,
	// it comes in `surges`, each this much faster than the mean at its peak (under 1, so it never shrinks);
	// the corona puffs out by `puff` with each
	surges: 3,
	surge: 0.7,
	puff: 0.6,
	// the planets on the line: x, radius (cells), and their lit and dark colours. Each heats as the limb
	// comes within `heat` of it (cells) and flashes over `flash` cells as it goes under.
	planets: [
		{ x: 0.3, r: 6, lit: 'stone', dark: 'ash' },
		{ x: 0.5, r: 10, lit: 'sand', dark: 'clay' },
		{ x: 0.86, r: 11, lit: 'rime', dark: 'iron' },
	],
	heat: 50,
	flash: 14,
	// the coronal mass ejection leaves the limb toward Earth over this span
	ejection: [8.2, 10.4],
	// the sky keeps sliding left the way the earth shot's camera went: frame heights at depth 1
	drift: -0.15,
}
