// Shot 3: one take on from the earth shot. The camera pushes in on a point under the sun's upper limb:
// every layer flies out from that point, the nearer the faster, so the sun swells while the globe and
// the Moon go past the lens and the stars spread, and its light floods more of the dark the nearer it
// gets; the take ends inside the limb. Nothing is scaled: sprites slide.
// uP.xy = the earth shot's pan, uP.z = the star's clock, uP.w = its age; uQ.x = the push 0..1,
// uQ.z = the heat (star() in layers.glsl); uH as earthLayers.glsl.

__LAYOUT__

// set once in main(): the focus, and how many times the sun has grown
vec2 Z;
float G;

// where a layer that sat at p0 at the cut is now, flying out from the focus as G to its flow
vec2 fly(vec2 p0, float flow){ return floor(Z + (p0 - Z)*pow(G, flow) + 0.5); }

void main(){
  vec2 cell = screenCell();
  vec2 pan = uP.xy;
  float art = uH.z;
  G = exp(ZOOM_LN*uQ.x);
  vec2 sc0 = place(SUN_AT, pan, SUN_DEPTH);
  float r0 = SUN_R*min(uRes.x, uRes.y);
  Z = floor(sc0 + FOCUS*r0 + 0.5);

  vec3 col = skyView(cell, pan, 1.0, art, Z, pow(G, FLOW.x));
  // the heat comes up with the push, so the cut from the earth shot shows nothing new
  STAR_HEAT = uQ.z;
  col = star(col, cell, fly(sc0, 1.0), r0*G, uP.w, uP.z, 1.0);
  float what;
  col = earthLayers(col, cell, fly(place(PLANET_AT, pan, PLANET_DEPTH), FLOW.z),
    fly(place(MOON_AT, pan, MOON_DEPTH), FLOW.y), what);
  gl_FragColor = vec4(col, 1.0);
}
