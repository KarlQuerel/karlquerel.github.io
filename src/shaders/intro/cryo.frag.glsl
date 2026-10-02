// Shot 7: inside the cryo tube. uP = reach, grip, lid, frost; uQ.x = eyelid, uQ.y = the
// technician's walk across the catwalk, uQ.z its strides. The tube's crown is glazed: through it the bay, racks of
// other pods stacked on both walls, some already frosted and lit.
const vec3 K_PITCH = vec3(13.0, 15.0, 22.0)/255.0;
const vec3 K_SOOT = vec3(17.0, 21.0, 31.0)/255.0;
const vec3 K_IRON = vec3(24.0, 29.0, 42.0)/255.0;
const vec3 K_STEEL = vec3(31.0, 38.0, 53.0)/255.0;
const vec3 K_ZINC = vec3(40.0, 48.0, 66.0)/255.0;
const vec3 K_FROST = vec3(66.0, 79.0, 102.0)/255.0;
const vec3 K_RIME = vec3(96.0, 112.0, 140.0)/255.0;
const vec3 K_GRAPHITE = vec3(58.0, 64.0, 78.0)/255.0;
const vec3 K_GUN = vec3(88.0, 96.0, 112.0)/255.0;
const vec3 K_PEWTER = vec3(140.0, 148.0, 162.0)/255.0;
const vec3 K_BRUSHED = vec3(158.0, 166.0, 180.0)/255.0;
const vec3 K_SILVER = vec3(200.0, 206.0, 216.0)/255.0;
const vec3 K_GLOW = vec3(255.0, 231.0, 196.0)/255.0;
const vec3 K_EMBER = vec3(255.0, 189.0, 46.0)/255.0;
const vec3 K_STAR = vec3(1.0);

const float R = 0.62;         // the tube's radius
const float FAR = 3.4;        // the bulkhead at the foot of the tube
const float RIB = 0.9;        // ring spacing along the tube
const float RAIL_X = 0.40, RAIL_Y = -0.30, RAIL_R = 0.030;
const float GLAZE = 0.82;     // half-angle of the glazed crown, either side of straight up
const float RACK_X = 1.55;    // the bay's walls of stacked pods
const float BAY_TOP = 3.6;
const float WALK_Z = 3.6;     // the catwalk across the bay, and its height
const float WALK_Y = 0.6;

// the light strip along the crown of the tube, as seen from a point on its wall
vec3 stripDir(vec3 p){ return normalize(vec3(-p.x, R - 0.05 - p.y, 0.0)); }
const float STRIP_A = 1.5708 + GLAZE + 0.07;
float stripFall(vec3 p){ float d = length(vec2(p.x, R - 0.05 - p.y)); return 1.0/(1.0 + d*d*1.6); }

// the padded wall: quilted cells between metal ribs, lit by the strip
vec3 wall(vec3 p, vec3 n, vec3 rd){
  float a = atan(p.y, p.x);
  float rz = abs(mod(p.z, RIB) - RIB*0.5);
  float rib = step(rz, 0.055);
  // a cushion per cell: its height falls off to the seams, and tilts the normal toward them
  float ua = a/(PI/7.0), uz = (mod(p.z, RIB) - 0.055)/(RIB - 0.11);
  vec2 c = vec2(fract(ua), fract(uz*2.0))*2.0 - 1.0;
  float h = (1.0 - c.x*c.x)*(1.0 - c.y*c.y);
  vec3 ta = normalize(vec3(-p.y, p.x, 0.0));
  vec3 tz = vec3(0.0, 0.0, 1.0);
  vec3 nn = normalize(n - (ta*(-2.0*c.x*(1.0 - c.y*c.y)) + tz*(-2.0*c.y*(1.0 - c.x*c.x)))*0.35);
  vec3 L = stripDir(p);
  float lit = max(dot(nn, L), 0.0)*stripFall(p);
  // a dim return off the floor mat
  lit += max(dot(nn, vec3(0.0, -1.0, 0.0)), 0.0)*0.06 + 0.05;
  float seam = smoothstep(0.08, 0.0, min(1.0 - abs(c.x), 1.0 - abs(c.y)));
  float weave = 0.94 + 0.12*noise3(p*60.0);
  vec3 col;
  if (rib > 0.5){
    // brushed ring, a bevel toward its edges and a specular line off the strip
    float bevel = smoothstep(0.055, 0.03, rz);
    vec3 nr = normalize(n + vec3(0.0, 0.0, sign(mod(p.z, RIB) - RIB*0.5))*(1.0 - bevel)*0.8);
    float d = max(dot(nr, L), 0.0)*stripFall(p);
    float spec = pow(max(dot(reflect(rd, nr), L), 0.0), 18.0)*stripFall(p);
    col = mix(K_GRAPHITE, K_BRUSHED, d*1.4) + K_SILVER*spec*0.9;
    col *= 0.85 + 0.3*noise3(vec3(a*30.0, p.z*400.0, 0.0));
    // a status lamp at the crown of every ring
    if (abs(a - PI*0.5) < 0.05 && rz < 0.02) col = K_EMBER;
  } else {
    float v = lit*(0.55 + 0.45*h)*weave;
    col = v > 0.55 ? K_RIME : v > 0.34 ? K_FROST : v > 0.19 ? K_ZINC : v > 0.09 ? K_STEEL : K_IRON;
    col = mix(col, K_SOOT, seam*0.8);
    // the vitals panel, set into the padding at the left hand: three bars stepping, a blinking lamp
    if (abs(a - 2.9) < 0.15 && p.z > 1.48 && p.z < 2.12){
      vec2 u = vec2((p.z - 1.48)/0.64, 1.0 - (a - 2.75)/0.3);
      col = K_PITCH;
      if (u.x > 0.06 && u.x < 0.94 && u.y > 0.1 && u.y < 0.9){
        col = K_SOOT*1.2;
        float slot = floor((u.x - 0.06)/0.22);
        float inBar = step(0.25, fract((u.x - 0.06)/0.22))*step(slot, 2.0);
        float lvl = 0.25 + 0.55*hash11(slot*5.3 + floor(uTime*3.0 + slot));
        if (slot > 1.5) lvl = 0.8 - 0.6*uP.w;
        float bar = inBar*step(u.y, 0.15 + lvl*0.68)*step(0.15, u.y);
        col = mix(col, slot > 1.5 ? K_RIME : mix(K_RIME, K_SILVER, 0.6), bar);
        if (length(u - vec2(0.88, 0.8)) < 0.05) col = mix(K_SOOT, K_EMBER, step(0.5, fract(uTime*1.2)));
      }
    }
  }
  return col;
}

// the bay through the crown's glass: racks of pods on both walls, the ceiling's lamps, and a
// technician crossing the catwalk; p is where the ray leaves the tube
vec3 bay(vec3 p, vec3 rd){
  vec3 col = K_PITCH*0.6;
  float best = 1e9;
  if (rd.y > 0.0){
    float tc = (BAY_TOP - p.y)/rd.y;
    best = tc;
    vec3 q = p + rd*tc;
    float lamp = step(abs(fract(q.z*0.4) - 0.5), 0.07)*step(abs(q.x), 1.3);
    float beam = step(abs(fract(q.x*0.8) - 0.5), 0.04);
    col = mix(mix(K_IRON*0.7, K_SOOT, beam), mix(K_SILVER, K_STAR, 0.4)*0.9, lamp);
  }
  float sx = rd.x > 0.0 ? 1.0 : -1.0;
  float tw = (sx*RACK_X - p.x)/rd.x;
  if (abs(rd.x) > 0.001 && tw > 0.0 && tw < best){
    best = tw;
    vec3 q = p + rd*tw;
    vec2 g = vec2(q.z/1.1, (q.y + 1.4)/1.2);
    vec2 id = floor(g);
    vec2 f = (fract(g) - 0.5)*vec2(1.1, 1.2);
    float r = length(f);
    col = mix(K_GUN*0.55, K_GRAPHITE*0.5, step(0.56, abs(f.y)));
    if (r < 0.43){
      col = K_GUN*0.7;
      if (r < 0.35){
        // an occupied pod's end window: frost lit from inside; empty ones dark
        float h = hash12(id + sx*13.0);
        float frosted = fbm2(f*18.0 + id*7.0);
        col = h > 0.3 ? mix(K_RIME, K_STAR, frosted*0.8)*(0.7 + 0.4*smoothstep(0.35, 0.0, r)) : K_SOOT;
      }
      if (length(f - vec2(0.0, -0.39)) < 0.035) col = hash12(id + 3.0) > 0.85 ? K_EMBER : K_RIME*0.8;
    }
  }
  if (rd.z > 0.0){
    float tz = (WALK_Z - p.z)/rd.z;
    vec3 q = p + rd*tz;
    if (tz > 0.0 && tz < best){
      // the rail, its posts, the deck edge, and the technician walking along it on a stepped gait
      float rail = step(abs(q.y - (WALK_Y + 1.0)), 0.03) + step(abs(q.y - WALK_Y), 0.05);
      rail += step(abs(fract(q.x*1.6) - 0.5), 0.05)*step(WALK_Y, q.y)*step(q.y, WALK_Y + 1.0);
      // the technician walks the catwalk with a real gait, one stride per unit of uQ.z
      vec2 b = vec2(q.x - (-2.6 + uQ.y*5.2), q.y - WALK_Y);
      float fig = huWalker(b, fract(uQ.z));
      if (fig < 0.0){
        best = tz;
        col = K_PITCH + mix(K_RIME, K_SILVER, 0.5)*smoothstep(-0.03, 0.0, fig)*0.6;
      } else if (rail > 0.0 && abs(q.x) < RACK_X){
        best = tz;
        col = mix(K_PITCH, K_GUN*0.8, step(WALK_Y + 1.0, q.y));
      }
    }
  }
  return mix(col, K_SOOT*0.8, smoothstep(3.0, 14.0, best)*0.5);
}

// the rails: two bars along the tube at hand height, from just ahead of the face to the bulkhead
float rail(vec3 ro, vec3 rd, vec2 c, out vec3 n){
  vec2 o = ro.xy - c;
  float a = dot(rd.xy, rd.xy), b = dot(o, rd.xy), k = dot(o, o) - RAIL_R*RAIL_R;
  float h = b*b - a*k;
  n = vec3(0.0);
  if (h < 0.0) return -1.0;
  float t = (-b - sqrt(h))/a;
  vec3 p = ro + rd*t;
  if (t < 0.0 || p.z < 0.28 || p.z > FAR) return -1.0;
  n = normalize(vec3(p.xy - c, 0.0));
  return t;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);
  float A = uRes.x/uRes.y;
  float reach = uP.x, lid = uP.z, frost = uP.w;
  // the eye, a little below the axis, looking up the tube; the look turns the head a hair
  vec3 ro = vec3(0.0, -0.07, 0.0);
  vec3 rd = normalize(vec3(uv.x + uLook.x*0.05, uv.y - uLook.y*0.04, 1.05));

  // the tube wall, hit from inside: the far root
  float b = dot(ro.xy, rd.xy), a = dot(rd.xy, rd.xy);
  float t = (-b + sqrt(b*b - a*(dot(ro.xy, ro.xy) - R*R)))/a;
  vec3 p = ro + rd*t;
  vec3 col;
  if (p.z > FAR){
    // the bulkhead: a hatch of rings round a dim port
    t = (FAR - ro.z)/rd.z;
    p = ro + rd*t;
    float r = length(p.xy);
    float ring = smoothstep(0.02, 0.0, abs(fract(r*5.0) - 0.5) - 0.42);
    vec3 L = stripDir(p);
    col = mix(K_STEEL, K_GUN, ring)*(0.5 + 0.5*max(L.y, 0.0));
    col += K_GLOW*smoothstep(0.06, 0.0, r)*0.6;
  } else {
    vec3 n = -normalize(vec3(p.xy, 0.0));
    col = wall(p, n, rd);
    float ang = atan(p.y, p.x);
    float off = abs(ang - PI*0.5);
    float rz = abs(mod(p.z, RIB) - RIB*0.5);
    // the glazed crown: the bay beyond, through a cold tint and a streak of the strips
    if (off < GLAZE && rz > 0.055 && p.z < FAR - 0.25){
      col = bay(p, rd)*vec3(0.85, 0.93, 1.05) + K_STEEL*0.08;
      col += K_SILVER*0.12*smoothstep(0.02, 0.0, abs(off - GLAZE*0.55 - 0.03*sin(p.z*3.0)));
    }
    // the strips along both edges of the glass, and their bloom onto the padding
    float strip = smoothstep(0.05, 0.02, abs(off - GLAZE - 0.07));
    col = mix(col, K_GLOW, strip);
    col += K_GLOW*smoothstep(0.3, 0.04, abs(off - GLAZE - 0.07))*0.1;
  }
  // depth: the tube goes dark toward the foot
  col = mix(col, K_SOOT, smoothstep(0.6, FAR, t)*0.8);

  // the rails, composited by depth, with the strip's highlight along their tops
  for (int i = 0; i < 2; i++){
    float sx = i == 0 ? -1.0 : 1.0;
    vec3 n;
    float tr = rail(ro, rd, vec2(sx*RAIL_X, RAIL_Y), n);
    if (tr > 0.0 && tr < t){
      vec3 q = ro + rd*tr;
      vec3 L = stripDir(q);
      float d = max(dot(n, L), 0.0);
      float spec = pow(max(dot(reflect(rd, n), L), 0.0), 24.0);
      vec3 rc = d > 0.6 ? K_BRUSHED : d > 0.3 ? K_PEWTER : d > 0.1 ? K_GUN : K_GRAPHITE;
      rc += K_SILVER*spec*0.8;
      // brackets where the rail meets each ring
      float rz = abs(mod(q.z, RIB) - RIB*0.5);
      if (rz < 0.04) rc = K_GRAPHITE;
      col = mix(rc, K_SOOT, smoothstep(0.6, FAR, tr)*0.8);
      t = tr;
    }
  }

  // the hands, in front of everything in the tube
  vec4 hd = hands(uv);
  col = mix(col, hd.rgb, hd.a);

  // the canopy sliding down over the lens: tinted glass behind a metal leading edge and its seal
  float bow = 0.06*(1.0 - 4.0*uv.x*uv.x/(A*A));
  float edge = 0.58 - 1.20*lid - bow*lid;
  float glass = step(edge, uv.y);
  if (glass > 0.0){
    float over = uv.y - edge;
    // the glass: the tube through a cold tint, a streak of the strip light and the crown's
    // reflection sliding with the canopy
    vec3 g = col*0.72 + K_STEEL*0.16;
    float streak = smoothstep(0.06, 0.0, abs(uv.y - 0.36*uv.x - 0.20 + lid*0.9));
    streak += 0.7*smoothstep(0.018, 0.0, abs(uv.y - 0.36*uv.x - 0.29 + lid*0.9));
    streak += 0.5*smoothstep(0.03, 0.0, abs(over - 0.12 - 0.05*abs(uv.x)));
    g += K_SILVER*streak*0.3;
    // the leading edge: a brushed bar with a bright top line, and the dark seal under it
    float bar = smoothstep(0.036, 0.034, over);
    vec3 barCol = mix(K_GUN, K_BRUSHED, smoothstep(0.0, 0.034, over));
    barCol = mix(barCol, K_SILVER, smoothstep(0.004, 0.0, abs(over - 0.032)));
    if (abs(mod(uv.x + 0.1, 0.24) - 0.12) < 0.006 && abs(over - 0.018) < 0.006) barCol = K_GRAPHITE;
    g = mix(g, barCol, bar);
    g = mix(g, K_PITCH, smoothstep(0.048, 0.036, over)*(1.0 - bar));
    col = g;
  }

  // frost: crystals growing in from the frame's edges once the lid has sealed, thinning toward
  // the middle, where the strip's light still comes through
  if (frost > 0.0 && glass > 0.0){
    float edgeD = min(min(uv.x + A*0.5, A*0.5 - uv.x), min(uv.y + 0.5, 0.5 - uv.y));
    float cr = fbm2(uv*9.0 + 3.0)*0.55 + ridged(vec3(uv*15.0, 2.0))*0.45;
    float reachF = frost*0.46*(0.5 + 0.8*cr) - 0.03;
    if (edgeD < reachF){
      float dense = smoothstep(0.0, 0.3, reachF - edgeD)*(0.4 + 0.6*cr);
      // the crystals scatter the strip's light: brighter toward the crown
      float v = dense*(0.55 + 0.45*smoothstep(-0.5, 0.5, uv.y));
      vec3 fc = v > 0.5 ? K_SILVER : v > 0.3 ? K_RIME : K_FROST;
      col = mix(col, fc, clamp(0.2 + dense*0.55, 0.0, 0.75));
      // dendrites: six-armed crystals grown from a jittered grid, larger where the frost is older
      float px = 1.2/uRes.y;
      float den = 0.0;
      vec2 cellUV = uv/0.075;
      vec2 ci = floor(cellUV);
      for (int j = 0; j < 9; j++){
        vec2 id = ci + vec2(mod(float(j), 3.0) - 1.0, floor(float(j)/3.0) - 1.0);
        vec2 c = (id + 0.5 + (vec2(hash12(id), hash12(id + 7.1)) - 0.5)*0.8)*0.075;
        float cEdge = min(min(c.x + A*0.5, A*0.5 - c.x), min(c.y + 0.5, 0.5 - c.y));
        float Rr = clamp((reachF - cEdge)*0.9, 0.0, 0.06)*(0.55 + 0.7*hash12(id + 3.3));
        if (Rr <= 0.0) continue;
        vec2 q = uv - c;
        float r = length(q);
        if (r > Rr) continue;
        float an = atan(q.y, q.x) + hash12(id)*6.28;
        an = mod(an, PI/3.0) - PI/6.0;
        vec2 q2 = r*vec2(cos(an), abs(sin(an)));
        float arm = q2.y;
        float sp = Rr*(0.16 + 0.14*hash12(id + 5.5));
        float bx = mod(q2.x + hash12(id + 9.0)*sp, sp);
        float side = abs(dot(vec2(bx, q2.y), vec2(-0.866, 0.5)))*step(q2.y, (Rr - q2.x)*0.55);
        den = max(den, smoothstep(px*1.6, px*0.4, min(arm, side)));
      }
      col = mix(col, v > 0.35 ? K_STAR : K_SILVER, den*clamp(dense*1.4, 0.0, 1.0)*0.7);
      // sparkle: single cells catching the strip's light on a stepped clock
      vec2 sc = floor(frag/2.0);
      if (den > 0.6 && hash12(sc + floor(uTime*4.0)*1.7) > 0.993) col = K_STAR;
    }
  }

  // breath fogging the inside of the canopy, low in the frame, on a stepped breathing clock
  if (glass > 0.0){
    float bt = floor(uTime*6.0)/6.0;
    float cycle = fract(bt/3.2);
    float breath = smoothstep(0.0, 0.12, cycle)*smoothstep(0.7, 0.2, cycle);
    vec2 bq = (uv - vec2(0.0, -0.46))*vec2(0.85, 1.7);
    float fog = smoothstep(0.42, 0.0, length(bq))*(0.55 + 0.45*fbm2(uv*14.0 + bt));
    col = mix(col, K_SILVER*0.9, fog*breath*0.6*(1.0 - frost*0.4));
  }

  // the eyelids, shut on a three-step clock, curved like lids
  float e = floor(uQ.x*3.0 + 0.001)/3.0;
  float cx = 2.0*uv.x/A;
  if (uv.y > 0.5 - e*0.5 - e*0.18*cx*cx || uv.y < -0.5 + e*0.5 + e*0.18*cx*cx) col = vec3(0.0);

  gl_FragColor = vec4(finish(col, frag), 1.0);
}
