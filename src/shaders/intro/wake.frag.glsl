// Shots 9 to 11: eyes open on the inside of a frosted lid, the world too close behind it; the
// wipe; then the crash. uP = approach, frost, eyelid, alert pulse. uQ = crash, jolt, glare, tilt.
// uMask is the glass, 1 where it is still frosted. The hands go over the glass: the wipe is done
// from inside the pod.

const float FOCAL = 1.8;                                  // 58 degrees end to end, like the lab
const vec3 SUN = vec3(-0.62, 0.50, -0.55);                // normalised in main
const float R = 1.0;

// CANDIDATE 09, band colours low -> high: teal deeps, shoal, olive scrub, ochre plains, salt heights
vec3 bands(float n, float sea){
  vec3 c1 = vec3(6.0, 34.0, 44.0)/255.0;
  vec3 c2 = vec3(18.0, 78.0, 88.0)/255.0;
  vec3 c3 = vec3(88.0, 108.0, 42.0)/255.0;
  vec3 c4 = vec3(168.0, 138.0, 62.0)/255.0;
  vec3 c5 = vec3(226.0, 212.0, 160.0)/255.0;
  vec3 col = mix(c1, c2, smoothstep(sea-0.17, sea-0.05, n));
  col = mix(col, c3, smoothstep(sea-0.014, sea+0.014, n));
  col = mix(col, c4, smoothstep(sea+0.045, sea+0.105, n));
  col = mix(col, c5, smoothstep(sea+0.15, sea+0.215, n));
  return col;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);
  float aspect = uRes.x/uRes.y;
  vec3 sun = normalize(SUN);

  // the crash tilts the world, not the helmet: the hands and lids stay on the untilted frame
  float ct = cos(uQ.w), st = sin(uQ.w);
  vec2 wuv = vec2(uv.x*ct - uv.y*st, uv.x*st + uv.y*ct);
  // a shallow look: the head turns a hair with the pointer (uLook.y is down the screen)
  vec2 look = vec2(uLook.x, -uLook.y)*0.018;
  vec3 rd = normalize(vec3(wuv.x + look.x, wuv.y + look.y, FOCAL));
  vec3 ro = vec3(0.0);

  // The world sits low and right, its limb across the frame, and it keeps coming.
  float dist = mix(1.62, 1.28, uP.x) - uQ.y*0.30;
  vec3 c = vec3(0.38*aspect, -0.86, dist);

  // the glass: 1 frosted. Sampled on the grid, so an erased block keeps its hard edge.
  float mask = uP.y > 0.0 ? texture2D(uMask, frag/uRes).r*uP.y : 0.0;
  // behind thick frost only the shape and its light show, so the terrain's detail is skipped there
  float fine = 1.0 - step(0.5, mask);

  vec3 col = stars(rd)*0.75;

  vec3 oc = ro - c;
  float b = dot(oc, rd);
  float c2 = dot(oc, oc) - R*R;
  float h = b*b - c2;
  // the air past the limb, lit from the sun's side
  float dperp = sqrt(max(dot(oc, oc) - b*b, 0.0));
  vec3 airCol = vec3(0.30, 0.62, 0.66);
  if (h < 0.0){
    vec3 cp = normalize((ro + rd*max(-b, 0.0)) - c);
    float lit = 0.25 + 0.75*max(dot(cp, sun), 0.0);
    col += airCol*smoothstep(R*1.10, R, dperp)*lit*0.9;
  } else {
    float t = -b - sqrt(h);
    vec3 p = ro + rd*t;
    vec3 n = normalize(p - c);

    // the world turns slowly under fixed light
    float s = uTime*0.006 + 2.4, cs = cos(s), ss = sin(s);
    vec3 sp = vec3(n.x*cs + n.z*ss, n.y, -n.x*ss + n.z*cs);

    float sea = 0.47;
    float alt = length(ro - c)/R - 1.0;
    float near = smoothstep(6.0, 0.05, alt)*fine;
    float close = smoothstep(0.90, 0.04, alt);
    float e = fbm(sp*3.2) + (fbm3(sp*11.0) - 0.5)*0.11;
    float dFreq = mix(17.0, 78.0, close);
    if (near > 0.0){
      e += (fbm3(sp*dFreq) - 0.5)*0.16*near;
      e += (ridged(sp*dFreq*3.0) - 0.5)*0.062*near*near;
      e += (fbm3(sp*dFreq*6.6) - 0.5)*0.022*near*near;
    }
    vec3 base = bands(e, sea);

    // relief from the elevation gradient: a smooth sphere this close gives itself away
    if (near > 0.0){
      vec3 t1 = normalize(cross(n, vec3(0.0, 1.0, 0.001)));
      vec3 t2 = cross(n, t1);
      float hh = 0.1/dFreq;
      float ea = fbm3((sp + t1*hh)*dFreq) - fbm3((sp - t1*hh)*dFreq);
      float eb = fbm3((sp + t2*hh)*dFreq) - fbm3((sp - t2*hh)*dFreq);
      n = normalize(n - (t1*ea + t2*eb)*mix(3.0, 1.7, close)*near);
    }

    float ndl = dot(n, sun);
    float day = max(ndl, 0.0);
    float shade = 0.09 + 0.91*day;

    // the cloud shell, drifting ahead of the ground
    vec3 cq = vec3(sp.x*cs + 4.1, sp.y, sp.z)*3.1 + vec3(s*0.35, 0.0, 0.0);
    float cn = fbm3(cq)*0.70 + fbm3(cq*4.7)*0.30;
    float ca = smoothstep(0.52, 0.66, cn)*0.82;
    base = mix(base, vec3(0.90, 0.92, 0.90), ca);
    shade += ca*day*0.10;

    // the sun off open water
    if (e < sea && ca < 0.3){
      vec3 hv = normalize(sun - rd);
      base += vec3(0.92, 1.0, 0.88)*pow(max(dot(n, hv), 0.0), 90.0)*0.55;
    }
    vec3 lit = base*shade;

    // the air: forward-scattering rim, warm at the terminator
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    float term = smoothstep(0.35, 0.0, abs(ndl));
    vec3 atmo = mix(airCol, vec3(1.0, 0.66, 0.34), term);
    lit += atmo*rim*(0.20 + 0.80*day);
    col = lit;
  }

  // The frost. Feathers of folded noise, stretched two ways and warped by a coarser field, at a
  // scale set by the frame's short side so a phone grows the same crystals. Thick and white toward
  // the frame's edge, thin in the middle where the light gets through: the picture behind is
  // scattered, so its shape and its glow survive and nothing else.
  if (mask > 0.0){
    vec2 q = frag/min(uRes.x, uRes.y)*6.0;
    vec2 w = q + (vec2(fbm2(q*1.1), fbm2(q*1.1 + 7.3)) - 0.5)*1.6;
    float vein = 1.0 - abs(2.0*noise2(w*vec2(2.2, 5.5)) - 1.0);
    vein *= vein;
    float vein2 = 1.0 - abs(2.0*noise2(w*vec2(6.0, 2.4) + 4.0) - 1.0);
    vein2 = vein2*vein2*vein2;
    float fern = fbm2(w*2.4);
    float grain = fbm2(q*13.0 + 9.0);
    float crystal = clamp(vein*0.45 + vein2*0.40 + fern*0.35 + grain*0.25 - 0.28, 0.0, 1.0);
    float edge = smoothstep(0.08, 0.62, length(uv*vec2(0.80, 1.30)));
    float thick = clamp(mix(0.42, 0.97, edge) + 0.28*(fern - 0.5), 0.0, 1.0);
    vec3 behind = mix(col, vec3(0.80, 0.86, 0.92), 0.35);
    vec3 rime = vec3(96.0, 112.0, 140.0)/255.0;
    vec3 silver = vec3(200.0, 206.0, 216.0)/255.0;
    vec3 ice = mix(mix(rime, silver, 0.35), vec3(0.97, 0.98, 1.0), crystal);
    // a few crystals catch the light outright, and not the same ones for long
    float spark = step(0.996, hash12(floor(frag/2.0) + floor(uTime*1.5)*7.0))*step(0.45, crystal);
    ice = mix(ice, vec3(1.0), spark);
    col = mix(col, mix(behind, ice, thick), mask);
  }

  // the alert: the visor's red pulse round the edge, under the hands, which are inside the helmet
  float vig = smoothstep(0.30, 0.95, length(uv*vec2(0.80, 1.25)));
  col += vec3(0.50, 0.06, 0.03)*vig*uP.w;

  vec4 hd = hands(uv);
  col = mix(col, hd.rgb, hd.a);

  // impact glare
  col = mix(col, vec3(1.0, 0.95, 0.85), uQ.z);

  // the lids: two black bars, open in three steps
  float open = floor(uP.z*3.0 + 0.001)/3.0;
  if (abs(uv.y) > 0.5*open) col = vec3(0.0);

  gl_FragColor = vec4(finish(col, frag), 1.0);
}
