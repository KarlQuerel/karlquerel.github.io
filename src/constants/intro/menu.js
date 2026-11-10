// Shot 0, the title screen: the earth shot's own picture, so pressing a key just sets its camera moving.
// The camera comes down from the stars and rests where the earth shot's tilt sets off (EARTH.rest): the
// scene rises from `from` frame heights below over `entrance` seconds, every layer by its depth, the
// Moon first and slowly, and the name rises once the camera rests. The name spans no more than `span` of
// the frame's width (the holding screen's cell cap on top), so it stays clear of the Moon.
export const MENU = { entrance: 3.5, from: 1.4, span: 0.6 }
