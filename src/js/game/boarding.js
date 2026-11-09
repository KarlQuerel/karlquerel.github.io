// Who may walk /game: a mouse is a guess at a keyboard, a key pressed on the holding screen proves one.

import { FINE_POINTER_QUERY } from '../../constants/viewport.js'

// in memory only: a reload asks for the key again, one press
let keyed = false

export const hasFinePointer = () => window.matchMedia(FINE_POINTER_QUERY).matches

export const mayBoard = () => keyed || hasFinePointer()

export const board = () => {
	keyed = true
}
