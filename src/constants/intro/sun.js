// Shot 3, THE SUN HAS BEEN GROWING RELENTLESSLY. One take on from the earth shot: the camera pushes in
// on the sun until its limb fills the frame, the globe and the Moon flying out past the lens. Positions
// on the sun are in its radii from its centre (x right, y down); sizes are shares of the frame's short
// side; times in seconds.
export const SUN = {
	duration: 10.5,
	cardAt: 1.2,
	// the point the camera closes on, just over the sun's upper limb, and how many times the sun
	// has grown by the close (it opens at the earth shot's EARTH.star.radius)
	focus: [0.12, -1.07],
	zoom: 30,
	// how fast each layer flies out from the focus as the camera closes in: its distance grows as the
	// sun's size to this power, so the nearer the layer the faster it goes past
	flow: { sky: 0.35, moon: 1.1, globe: 1.28 },
	// its age (star()'s scale, 0 white to 1 a red giant) runs from the earth shot's to this
	age: 0.7,
	redden: [0.4, 9.4],
	// the heat (star() in layers.glsl: the granules' contrast, the light flooding the dark) comes up
	// over this share of the push, so the cut from the earth shot shows nothing new
	heat: [0.05, 0.45],
}
