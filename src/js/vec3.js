// Plain-array vec3 helpers for the flyby camera. Arrays rather than objects so
// they hand straight to gl.uniform3fv without a copy.

export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k]
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a, b) => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
]

export function norm(v) {
	const m = Math.hypot(v[0], v[1], v[2]) || 1
	return [v[0] / m, v[1] / m, v[2] / m]
}

export const lerp = (a, b, t) => a + (b - a) * t

// Rotate a toward b by u of the angle between them. A linear blend cancels to
// nothing when they point opposite ways; a rotation stays well defined.
export function slerp(a, b, u) {
	const ang = Math.acos(Math.max(-1, Math.min(1, dot(a, b))))
	if (ang < 1e-4) return b
	if (ang > Math.PI - 1e-3) return a // exactly opposed: no unique way round
	const s = Math.sin(ang)
	return add(mul(a, Math.sin((1 - u) * ang) / s), mul(b, Math.sin(u * ang) / s))
}
