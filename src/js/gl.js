// WebGL1 plumbing shared by every art-grid renderer. Nothing here knows about a scene.

// Two triangles over clip space.
export const FULLSCREEN_QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
export const QUAD_VERTICES = 6

// Starts a compile and link and hands back the wait on it. Where the driver links in the background
// (KHR_parallel_shader_compile) ready() polls it without blocking; without that it is true at once
// and finish() blocks instead. finish() returns the linked program, or throws on a compile or link
// failure so the caller can fall back instead of drawing black.
export function compileProgram(gl, vertexSrc, fragmentSrc) {
	const program = gl.createProgram()
	for (const [type, src] of [
		[gl.VERTEX_SHADER, vertexSrc],
		[gl.FRAGMENT_SHADER, fragmentSrc],
	]) {
		const shader = gl.createShader(type)
		gl.shaderSource(shader, src)
		gl.compileShader(shader)
		gl.attachShader(program, shader)
		gl.deleteShader(shader)
	}
	gl.linkProgram(program)
	const parallel = gl.getExtension('KHR_parallel_shader_compile')
	return {
		ready: () => !parallel || gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR),
		finish() {
			if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
			const logs = (gl.getAttachedShaders(program) ?? []).map(s => gl.getShaderInfoLog(s))
			const log = [...logs, gl.getProgramInfoLog(program)].filter(Boolean).join('\n')
			gl.deleteProgram(program)
			throw new Error(`program failed: ${log}`)
		},
	}
}

// the same, waited for on the spot
export const createProgram = (gl, vertexSrc, fragmentSrc) =>
	compileProgram(gl, vertexSrc, fragmentSrc).finish()

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

// A texture read cell for cell: nearest on both filters, clamped, so an art grid samples exactly.
export function pixelTexture(gl) {
	const tex = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, tex)
	for (const [k, v] of [
		[gl.TEXTURE_MIN_FILTER, gl.NEAREST],
		[gl.TEXTURE_MAG_FILTER, gl.NEAREST],
		[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
		[gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE],
	])
		gl.texParameteri(gl.TEXTURE_2D, k, v)
	return tex
}

// A texture on the art grid to draw into, and its framebuffer. Leaves the frame unbound.
export function renderTarget(gl, width, height) {
	const tex = pixelTexture(gl)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
	const fbo = gl.createFramebuffer()
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
	gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	return { tex, fbo }
}

// Browsers cap live contexts per tab, and a dropped canvas otherwise keeps its one.
export const loseContext = gl => gl.getExtension('WEBGL_lose_context')?.loseContext()
