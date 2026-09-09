// Tiny math helpers shared by the scroll-scrubbed beats (hero, planet, flight).

export const clamp01 = v => Math.min(1, Math.max(0, v))

// a roll inside a [lo, hi] range — the shape every tunable range in the constants takes
export const randIn = ([lo, hi]) => lo + Math.random() * (hi - lo)

// Hermite ease between 0 and 1 — the one easing curve used for scrubbed motion.
export const smoothstep = t => t * t * (3 - 2 * t)

// 0 -> 1 across [rise, full], holds, back to 0 by [fall] — the window the scroll-driven fields ride.
export function riseFall(t, rise, full, fall) {
	const up = clamp01((t - rise) / (full - rise))
	const down = clamp01((fall - t) / (fall - full))
	return Math.min(up, down)
}

// Monotone cubic (Fritsch-Carlson) slopes, limited so the curve can never overshoot its own knots.
export function monotoneSlopes(xs, ys) {
	const n = xs.length
	const m = new Array(n).fill(0)
	if (n < 2) return m
	// secants between consecutive knots, measured against the real gap since the spacing is uneven
	const d = new Array(n - 1)
	for (let i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i] || 1)
	m[0] = d[0]
	m[n - 1] = d[n - 2]
	for (let i = 1; i < n - 1; i++) {
		// a turn in the data is a real stop: zero the slope rather than rounding it off
		m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2
	}
	for (let i = 0; i < n - 1; i++) {
		if (d[i] === 0) {
			m[i] = 0
			m[i + 1] = 0
			continue
		}
		const a = m[i] / d[i]
		const b = m[i + 1] / d[i]
		const s = a * a + b * b
		// outside the monotonicity circle the pair is pulled back onto it
		if (s > 9) {
			const k = 3 / Math.sqrt(s)
			m[i] = k * a * d[i]
			m[i + 1] = k * b * d[i]
		}
	}
	return m
}

// Cubic Hermite across one knot interval of width `h`, at local t (0..1).
export function hermite(y0, y1, m0, m1, h, t) {
	const t2 = t * t
	const t3 = t2 * t
	return (
		(2 * t3 - 3 * t2 + 1) * y0 +
		(t3 - 2 * t2 + t) * h * m0 +
		(-2 * t3 + 3 * t2) * y1 +
		(t3 - t2) * h * m1
	)
}
