// Shot 2: the dying Earth as flat layers. The globe and the Moon are painted once (earthLayers.glsl);
// this pass only slides them, each by its depth and by whole canvas pixels, so an art pixel (uH.z
// canvas pixels) glides rather than jumps. The sun is drawn here at the canvas's full resolution
// (star() in layers.glsl). As the pan carries the globe down and away, the sun climbs out from behind
// its limb: its glow round the limb first, like a dawn, then the diamond ring, then the disc.
// uP.xy = the pan (x right, y down), uP.z = the star's clock; uQ.y = how far the sun is still held
// back (1 through the tilt, when it would stand in open sky, easing to 0 as the globe covers it);
// uQ.z = how much of the starfield has yet to rise, uQ.w = 1 while every layer is held back (both the
// year shot's); uH.xy = the planet and Moon sides in art pixels, uH.z = canvas pixels per art pixel.

void main(){
  vec2 cell = screenCell();
  vec2 pan = uP.xy;
  float side = min(uRes.x, uRes.y);
  float art = uH.z;
  vec3 col = skyLayer(cell, pan, 1.0 - uQ.z, art);

  if (uQ.w > 0.5) { gl_FragColor = vec4(col, 1.0); return; }

  // --- the sun, its corona widening as it clears the limb
  vec2 pc = place(PLANET_AT, pan, PLANET_DEPTH);
  float pr = uH.x*DISC*art;
  vec2 sc = place(SUN_AT, pan, SUN_DEPTH);
  float sr = SUN_R*side;
  // how far the sun has cleared the limb, in sun radii: under -1 it is fully behind the globe
  float clearance = (length(sc - pc) - pr)/sr;
  // held back, it shows only once the globe has it covered, its glow coming up round the limb
  float held = uQ.y;
  if (held < 0.5 || clearance < -1.0)
    col = star(col, cell, sc, sr, SUN_AGE, uP.z, smoothstep(-2.5, 0.5, clearance)*(1.0 - held));

  // --- the Moon, a nearer layer than the stars and a farther one than the globe, then the globe
  float what;
  col = earthLayers(col, cell, pc, place(MOON_AT, pan, MOON_DEPTH), what);

  // --- the diamond ring: the moment the sun breaks the limb, the air lit through round the point it
  // breaks at and a glare on it, dithered out across its whole width so it reads as light, not rings
  float bead = exp(-clearance*clearance*2.0)*(1.0 - held);
  if (bead < 0.03) { gl_FragColor = vec4(col, 1.0); return; }
  vec2 bp = floor(pc + normalize(sc - pc)*pr + 0.5);
  float rb = length(cell - bp);
  bool open = what < 1.5;
  if (what > 0.5 && open){
    float lift = bead*exp(-rb/(sr*1.6))*3.2;
    if (lift > 2.5) col = GLOW; else if (lift > 1.5) col = SAND; else if (lift > 0.5) col = HAZE;
  }
  // white at the heart, then glow, sand, and a rust dither into the dark; only its heart burns over
  // the ground
  float lvl = 4.4*bead*exp(-rb/(sr*0.5)) - 0.4;
  float i = floor(lvl) + step(bayer8(cell), fract(lvl));
  if (i > 2.5 || (open && i > 0.5)) col = i > 2.5 ? STAR : i > 1.5 ? GLOW : SAND;
  else if (open && lvl > -0.4 && bayer8(cell) < (lvl + 0.4)*1.2) col = RUST;
  gl_FragColor = vec4(col, 1.0);
}
