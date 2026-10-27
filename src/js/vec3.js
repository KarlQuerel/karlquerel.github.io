// Plain-array vec3 helpers: arrays hand straight to gl.uniform3fv without a copy.

export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

export function norm(v) {
	const m = Math.hypot(v[0], v[1], v[2]) || 1
	return [v[0] / m, v[1] / m, v[2] / m]
}
