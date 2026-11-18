// The title screen, on the Earth picture (constants/intro/earth.js). The camera comes down from the stars and
// rests at EARTH.rest: the scene rises from `from` frame heights below over `entrance` seconds, every layer by its
// depth, the Moon first and slowly, and the name rises once the camera rests. The name spans no more than `span`
// of the frame's width (the holding screen's cell cap on top), so it stays clear of the Moon. The pointer's look
// closes `look` of its distance a frame. The loader's weights (`boot`): the program links while the art paints on
// its own thread, then the first frame.
export const MENU = {
	entrance: 3.5,
	from: 1.4,
	span: 0.6,
	look: 0.06,
	boot: { context: 0.05, programs: 0.7, art: 0.1, frame: 0.15 },
}
