// The title screen's runtime: the menu shot on one art canvas, the pointer's look over it, and when the camera
// has come to rest (`up`), for the name to rise.

import { ref } from 'vue'
import { FULLSCREEN_QUAD, staticBuffer } from '../js/gl.js'
import { menu } from '../js/intro/menu.js'
import { dropPainter } from '../js/intro/artWorker.js'
import { createIntroPass } from '../js/intro/introPass.js'
import { sky } from '../js/intro/sky.js'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'
import { useArtCanvas } from './useArtCanvas.js'
import { useWindowListener } from './useWindowListener.js'
import { MENU } from '../constants/intro/menu.js'

// the pointer's place on the shared uniform contract: nothing on the title reads it
const CENTRE = [0.5, 0.5]

export function useTitleScreen(canvasRef) {
	const still = prefersReducedMotion()
	const up = ref(still)
	// what the shot reads: the pointer's look, eased, and whether motion is reduced
	const io = { look: [0, 0], still }
	const look = { tx: 0, ty: 0 }
	let t = 0
	let gl = null
	let quad = null
	let pass = null

	async function build(glCtx, step) {
		gl = glCtx
		quad = staticBuffer(gl, FULLSCREEN_QUAD)
		await step('context')
		pass = createIntroPass(gl, quad, menu)
		sky.setup(gl)
		menu.setup(gl)
		// the painters' thread paints the art under the linking, at the grid the shot plays on
		const painting = menu.resize(gl, gridFor(menu.cellPx))
		pass.start()
		while (!pass.ready()) await step('programs', 0)
		pass.finish()
		await step('programs')
		await painting
		await step('art')
	}

	function frame(dt) {
		io.look[0] += (look.tx - io.look[0]) * MENU.look
		io.look[1] += (look.ty - io.look[1]) * MENU.look
		t += dt
		if (t >= MENU.entrance) up.value = true
		pass.draw(grid, { time: t, look: io.look, ptr: CENTRE, ...menu.params(t, io, gl, grid) })
		return true
	}

	const { supported, booting, bootProgress, bootCeiling, grid, gridFor } = useArtCanvas(
		canvasRef,
		{
			bootWeights: MENU.boot,
			cellPx: () => menu.cellPx,
			build,
			frame,
			resize: size => menu.resize(gl, size),
			release() {
				menu.release(gl)
				dropPainter()
				pass?.release()
				pass = null
				if (sky.texture) sky.release(gl)
				if (quad) gl.deleteBuffer(quad)
				quad = null
			},
		}
	)

	// the mouse over the frame slides the layers by their depth
	useWindowListener('pointermove', e => {
		if (e.pointerType !== 'mouse' || still) return
		look.tx = (e.clientX / window.innerWidth) * 2 - 1
		look.ty = (e.clientY / window.innerHeight) * 2 - 1
	})

	return { supported, booting, bootProgress, bootCeiling, up }
}
