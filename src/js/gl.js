// WebGL1 plumbing shared by every art-grid renderer. Nothing here knows about a scene.

// Two triangles over clip space, and the same pair in 0..1 for a quad that carries its own UVs.
export const FULLSCREEN_QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
export const UNIT_QUAD = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1])
export const QUAD_VERTICES = 6

// Throws on a compile or link failure so the caller can fall back instead of drawing black.
export function createProgram(gl, vertexSrc, fragmentSrc) {
	const program = gl.createProgram()
	for (const [type, src] of [
		[gl.VERTEX_SHADER, vertexSrc],
		[gl.FRAGMENT_SHADER, fragmentSrc],
	]) {
		const shader = gl.createShader(type)
		gl.shaderSource(shader, src)
		gl.compileShader(shader)
		const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
		const log = gl.getShaderInfoLog(shader)
		gl.attachShader(program, shader)
		gl.deleteShader(shader)
		if (!ok) {
			gl.deleteProgram(program)
			throw new Error(`shader compile failed: ${log}`)
		}
	}
	gl.linkProgram(program)
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const log = gl.getProgramInfoLog(program)
		gl.deleteProgram(program)
		throw new Error(`program link failed: ${log}`)
	}
	return program
}

// Keyed by name with any `[0]` dropped, so an array uniform reads like a scalar one.
export const uniformLocations = (gl, program, names) =>
	Object.fromEntries(names.map(n => [n.replace('[0]', ''), gl.getUniformLocation(program, n)]))

export function staticBuffer(gl, data) {
	const buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
	return buffer
}

export function bindAttribute(gl, buffer, location, size) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.enableVertexAttribArray(location)
	gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
}

// Browsers cap live contexts per tab, and a dropped canvas otherwise keeps its one.
export const loseContext = gl => gl.getExtension('WEBGL_lose_context')?.loseContext()
