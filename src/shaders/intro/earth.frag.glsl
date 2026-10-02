// Shot 2: the dying Earth as flat layers. The globe and the Moon are painted once (js/intro/earthArt.js)
// into the atlas on uMask; this pass only slides them, each by its depth and always by whole cells.
// The sun is drawn here, in its own cell coordinates, so its rings and dither travel with it. As the
// pan carries the globe down and away, the sun climbs out from behind its limb: a red ring of air,
// the diamond ring, then the corona.
// uP.xy = the pan in cells (x right, y down); uH.xy = the planet and Moon sides.

__LAYOUT__

vec4 atlas(vec2 texel){ return texture2D(uMask, (texel + 0.5)/vec2(uH.x + uH.y, max(uH.x, uH.y))); }
// a sprite of side `size` stored at `origin`, its top left on screen at `tl`
vec4 sprite(vec2 cell, vec2 tl, vec2 origin, float size){
  vec2 l = cell - tl;
  if (l.x < 0.0 || l.y < 0.0 || l.x >= size || l.y >= size) return vec4(0.0);
  return atlas(origin + l);
}

void main(){
  vec2 cell = screenCell();
  vec2 pan = uP.xy;
  float side = min(uRes.x, uRes.y);
  vec3 col = skyLayer(cell, pan, 1.0);

  // --- the sun, measured in its own cells (sunRings in layers.glsl)
  vec2 pc = place(PLANET_AT, pan, PLANET_DEPTH);
  float pr = uH.x*DISC;
  vec2 sc = place(SUN_AT, pan, SUN_DEPTH);
  float sr = SUN_R*side;
  // how far the sun has cleared the limb, in sun radii: under -1 it is fully behind the globe
  float clearance = (length(sc - pc) - pr)/sr;
  col = sunRings(col, cell - sc, sr, smoothstep(-1.0, 1.0, clearance));

  // --- the Moon, a nearer layer than the stars and a farther one than the globe
  vec2 mc = place(MOON_AT, pan, MOON_DEPTH);
  vec4 m = sprite(cell, mc - uH.y*0.5, vec2(uH.x, 0.0), uH.y);
  if (m.a > 0.5) col = m.rgb;

  // --- the globe, its atmosphere's stepped shell laid over whatever is behind it
  vec4 p = sprite(cell, pc - uH.x*0.5, vec2(0.0), uH.x);
  col = mix(col, p.rgb, p.a);

  // --- the diamond ring: the moment the sun breaks the limb, spokes from the point it breaks at
  float bead = exp(-clearance*clearance*2.0);
  if (bead > 0.05){
    vec2 bp = floor(pc + normalize(sc - pc)*pr + 0.5);
    vec2 b = cell - bp;
    float r = length(b);
    float L = sr*(0.6 + 3.5*bead);
    for (int k = 0; k < 3; k++){
      float ang = float(k)*PI/3.0 + 0.35;
      float off = abs(b.x*sin(ang) - b.y*cos(ang));
      if (off < 0.6 && r < L) col = fire(0.95*bead*(1.0 - r/L) + 0.1, b);
    }
    if (r < sr*0.35*bead) col = GLOW;
  }

  gl_FragColor = vec4(col, 1.0);
}
