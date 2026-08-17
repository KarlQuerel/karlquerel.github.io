// Tiny math helpers shared by the scroll-scrubbed beats (hero, planet, flight).

export const clamp01 = v => Math.min(1, Math.max(0, v))

// Hermite ease between 0 and 1 — the one easing curve used for scrubbed motion.
export const smoothstep = t => t * t * (3 - 2 * t)
