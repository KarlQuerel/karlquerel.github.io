// The orbital yard: the camera flies in along the line of docked ships and skims a ring.
export const SHIPYARD = {
	duration: 11,
	// fade up from black over this many seconds
	reveal: 1.2,
	// The flight, eased so it has mass: z travels the whole shot, while x and y close on the line
	// over the first part (`close`, as shares of the shot), so the pass skims the rim of the first
	// ship's ring (x 2.3 + 0.78) mid-shot and the rest of the line runs off ahead. Yard units.
	path: { x: [7.0, 3.85], y: [2.2, 1.3], z: [14.0, -1.6], close: [0.0, 0.62] },
	// the head turns further down the line as it goes, and banks into the pass: radians
	yaw: [0.0, 0.15],
	bank: 0.13,
	// After the pass the camera pulls back and climbs over `settle` (shares of the
	// shot), and lifts its gaze so the last frame runs the whole line: all ten read as ten, to the beacon.
	settle: [0.6, 1],
	pull: 7,
	rise: 2.4,
	tilt: 0.0,
	// how far (radians) the pointer turns the head
	lookYaw: 0.06,
	lookPitch: 0.04,
}
