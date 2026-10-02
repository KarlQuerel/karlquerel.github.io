// Shot 3: the sun. Its centre is off the frame's left edge, so the frame holds its limb, and the
// inner planets on their orbits across it. The limb swells toward them: each heats as it nears, flashes
// as it goes under. The prominences and the ejection stand off the limb, all in cells from the centre.
// uP.x = radius in cells, uP.y = the ejection 0..1; uQ.xy = the sky's pan, uQ.z = the star's clock,
// uQ.w = its age; uH.x = the corona's reach.

__LAYOUT__

vec2 C;
float R, T;

// a planet's orbit: a dotted ring round the sun through its x, one dot every four cells
vec3 orbit(vec3 col, float d, float ang, float x){
  float o = floor(x*uRes.x + 0.5) - C.x;
  return abs(d - o) < 0.5 && mod(floor(ang*o), 4.0) < 1.0 ? ASH : col;
}

// A planet on the line at x (share of the width), radius pr cells, lit from the sun on its left.
// Its orbit is a dotted ring round the sun; as the limb nears, its lit face heats to ember; under the
// limb it is gone, after a flash.
vec3 planet(vec3 col, vec2 cell, float x, float pr, vec3 lit, vec3 dark){
  vec2 pc = vec2(floor(x*uRes.x + 0.5), C.y);
  float dist = pc.x - C.x;
  float gap = dist - R;
  vec2 q = cell - pc;
  float d = length(q);
  if (gap < 0.0){
    // swallowed: a burst of plasma off the limb where it went under, for FLASH cells of swell
    float k = -gap/FLASH;
    if (k < 1.0){
      float spoke = min(abs(q.x), abs(q.y));
      float reach = pr*(4.0 + 8.0*k);
      float core = pr*(1.2 + 2.5*k);
      if (d < core*(1.0 - k)) return STAR;
      if (d < core && bayer4(q) < 1.0 - k) return GLOW;
      if (spoke < 1.0 && d < reach*(1.0 - 0.5*k)) return d < reach*0.4 ? STAR : GLOW;
    }
    return col;
  }
  if (d >= pr) return col;
  float heat = 1.0 - clamp(gap/HEAT, 0.0, 1.0);
  // lit on the sun's side, its terminator a hard step, scorched as the limb closes
  bool day = q.x < pr*0.25;
  if (!day) return heat > 0.6 ? RUST : dark;
  if (heat > 0.75) return bayer4(q) < 0.5 ? GLOW : EMBER;
  if (heat > 0.4) return bayer4(q) < 0.5 ? EMBER : lit;
  return lit;
}

// A prominence: an arch of plasma standing off the limb, `da` radians from its foot, at height h (radii).
float arch(float da, float h, float w, float hm, float seed, float t){
  if (da > w) return 0.0;
  float u = da/w;
  // the arch leans and wanders: no prominence is a clean parabola
  float bend = (fbm3(vec3(u*3.0 + seed, 0.0, t*0.12 + seed)) - 0.5)*0.35;
  float top = hm*(1.0 - u*u)*(1.0 + bend);
  float thick = 0.006 + 0.014*(1.0 - u*u);
  float spine = step(abs(h - top), 0.004);
  float sheath = step(abs(h - top), thick)*step(0.45, fbm3(vec3(da*40.0 + seed, h*70.0, t*0.35 + seed)));
  return max(spine, sheath*0.6)*step(h, hm + 0.02);
}

void main(){
  vec2 cell = screenCell();
  R = uP.x;
  T = uQ.z;
  float age = uQ.w;
  vec2 span = starSpan(age);
  C = floor(SUN_AT*uRes + 0.5);
  vec2 q = cell - C;
  float d = length(q);
  float ang = atan(q.y, q.x);
  float x = (d - R)/R;

  vec3 col = skyLayer(cell, uQ.xy, 1.0);
__ORBITS__
  col = star(col, q, R, age, T, uH.x);

  // the prominences along the limb in frame, standing a few percent of a radius off it
  if (d >= R){
    float prom = 0.0;
    for (int i = 0; i < 4; i++){
      float fi = float(i);
      float foot = (fi - 1.5)*0.16 + 0.02*sin(T*0.2 + fi);
      float da = abs(ang - foot);
      float hm = 0.035 + 0.02*sin(T*0.35 + fi*2.0) + 0.015*age;
      prom = max(prom, arch(da, x, 0.06 + 0.02*fi, hm, fi*7.0, T));
    }
    if (prom > 0.0) col = starStep(span.x + 1.2 + 1.5*prom, q);
  }

__PLANETS__

  // The ejection: a loop of plasma torn off the limb toward Earth, swelling as it leaves, in strands.
  float ej = uP.y;
  if (ej > 0.0 && ej < 1.0){
    vec2 edir = normalize(vec2(1.0, -0.06));
    vec2 eq = q - edir*R*(1.0 + ej*0.28);
    float er = R*(0.02 + ej*0.16);
    float ed = length(eq);
    float ea = atan(eq.y, eq.x);
    bool front = dot(eq/max(ed, 1e-4), edir) > -0.15;
    bool fibre = fbm3(vec3(ea*7.0, ed/R*30.0, T*0.6)) > 0.52;
    // two threads of the shell, never a clean ring
    bool shell = abs(ed - er*(1.0 + 0.08*sin(ea*9.0 + T))) < max(1.0, er*0.05);
    bool inner = abs(ed - er*0.72) < max(1.0, er*0.035) && fbm3(vec3(ea*11.0, 4.0, T*0.8)) > 0.6;
    // it thins as it goes, cell by cell in the Bayer order
    float fade = (1.0 - ej)*smoothstep(0.0, 0.06, ej);
    if (front && fibre && (shell || inner) && bayer4(q) < fade*1.6)
      col = starStep(span.x + (shell ? 2.4 : 1.4), q);
  }

  gl_FragColor = vec4(col, 1.0);
}
