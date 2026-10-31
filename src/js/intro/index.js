// The storyboard in order (GAME_STORY.md section 4), then act I's opener. Every shot is a module of
// one shape:
//   key, frag (+ chunks), duration in s (0 waits on ready(t, io)), card { at, text },
//   marks { name: seconds } the overlays key off, params(t, io, gl, grid) -> { p, q, r, s, h, b, mask }
//   (b: a vec4 array for the shot's own uB), choice(clock, marks, choices) -> { key, options },
//   hint(clock, marks, choices) -> a line under the picture, cellPx (its own pixel size), pov (first
//   person: cards read high, clear of the hands), walk (the player walks it: a click takes the mouse
//   for looking), act (act I opens here: SKIP INTRO lands on it), shake (the frame shakes until the
//   `black` mark), end (the game rests here, the run's checkpoint cleared), checkpoint (reaching it is
//   saved: a refresh resumes here), caption(t, io) -> the voice's line, ready(t, io) -> true
//   or the key of the shot to go to, enter(io), setup(gl), resize(gl, grid), release(gl).
//   The acts after the intro live in js/game/.
import { year } from './year.js'
import { earth } from './earth.js'
import { sun } from './sun.js'
import { fields } from './fields.js'
import { chamber } from './chamber.js'
import { shipyard } from './shipyard.js'
import { corridor } from './corridor.js'
import { cryo } from './cryo.js'
import { board } from './board.js'
import { wake } from './wake.js'
import { crash } from './crash.js'
import { title } from './title.js'
import { wreck } from './wreck.js'
import { descent } from '../game/descent.js'
import { worldTitle } from '../game/worldTitle.js'
import { surface } from '../game/surface.js'
import { ENDING_SHOTS } from '../game/endings.js'

export const INTRO_SHOTS = [
	year,
	earth,
	sun,
	fields,
	chamber,
	shipyard,
	corridor,
	cryo,
	board,
	wake,
	crash,
	title,
	wreck,
	descent,
	worldTitle,
	surface,
	...ENDING_SHOTS,
]
