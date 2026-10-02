// Shot 8, the crossing: a navigational chart of the Hermes fleet. Sol at the root of a fan of
// ten routes; each ship a marker creeping out along its line as the days run, a trail behind it;
// the lost ones flare out and their routes die red. Yours burns ember.
// uP.x: lost ships, one word of 10 bits (ship i at bit i-1). uP.yzw: where each lost ship stopped,
// 0..63 in six bits, four ships to a word. uQ: latest lost ship, seconds since
// it went, crossing progress 0..1, reveal. uH: Sol's uv, then the chart's x and y spans.
// The chart constants mirror BOARD.chart in constants/intro/board.js: keep them in step.
const float SPREAD = 0.8;
const float NEAR = 0.36;
const float FAR = 1.0;
const float ANGLE_STEP = 0.6180339887498949;
const float REACH_STEP = 0.7548776662466927;
const float PROG_MAX = 0.86;
const float FLASH_STEPS = 6.0;
const float FLASH_FOR = 0.8;
const float YOURS = 8.0;
// the fleet: INTRO_BOARD.ships in data/gameIntro.js, a loop bound here, so both must change together
const int SHIPS = 10;

const vec3 VOID  = vec3(10.0, 8.0, 14.0)/255.0;
const vec3 IRON  = vec3(24.0, 29.0, 42.0)/255.0;
const vec3 ZINC  = vec3(40.0, 48.0, 66.0)/255.0;
const vec3 FROST = vec3(66.0, 79.0, 102.0)/255.0;
const vec3 RIME  = vec3(96.0, 112.0, 140.0)/255.0;
const vec3 RUST  = vec3(84.0, 46.0, 44.0)/255.0;
const vec3 BRICK = vec3(141.0, 68.0, 51.0)/255.0;
const vec3 CLAY  = vec3(158.0, 76.0, 54.0)/255.0;
const vec3 AMBER = vec3(190.0, 108.0, 70.0)/255.0;
const vec3 EMBER = vec3(255.0, 189.0, 46.0)/255.0;
const vec3 GLOW  = vec3(255.0, 231.0, 196.0)/255.0;
const vec3 STAR  = vec3(1.0);

bool portrait(){ return uRes.x < uRes.y; }

// ship i's point `r` out along angle `a`, in frame uv: the same frame chartPoint() builds in JS
vec2 chartPoint(float r, float a){
  vec2 uv = vec2(r*cos(a), r*sin(a));
  return portrait() ? uH.xy + vec2(uv.y*uH.z, uv.x*uH.w) : uH.xy + vec2(uv.x*uH.z, uv.y*uH.w);
}
// frame uv back into chart space, Sol at the origin
vec2 toChart(vec2 p){
  vec2 d = p - uH.xy;
  return portrait() ? vec2(d.y/uH.w, d.x/uH.z) : vec2(d.x/uH.z, d.y/uH.w);
}
float reachOf(float i){ return NEAR + (FAR - NEAR)*sqrt(fract(i*REACH_STEP)); }
float angleOf(float i){ return (fract(i*ANGLE_STEP)*2.0 - 1.0)*SPREAD; }

// bit i-1 of the packed lost word; the half added before the divide absorbs any exp2 slop
float lostBit(float i){ return mod(floor((uP.x + 0.5)/exp2(i - 1.0)), 2.0); }
// how far ship i got before it went dark
float stopOf(float i){
  float slot = i - 1.0;
  float word = floor(slot/4.0);
  float v = word < 0.5 ? uP.y : word < 1.5 ? uP.z : uP.w;
  return mod(floor((v + 0.5)/exp2((slot - word*4.0)*6.0)), 64.0)/63.0;
}

// a crisp line one art pixel wide: distance in pixels -> coverage
float line(float dpx){ return smoothstep(1.0, 0.35, dpx); }

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frameUV(frag);
  float px = 1.0/uRes.y;
  // the chart hangs a little in front of the stars: they lean less than it does
  vec2 lean = vec2(uLook.x, -uLook.y);
  vec3 rd = normalize(vec3(uv + lean*0.012, 1.5));
  vec3 col = stars(rd)*0.55 + VOID*0.6;
  vec2 p = uv + lean*0.02;

  // a faint plotting grid, dimmer away from the chart
  vec2 c = toChart(p);
  float inChart = smoothstep(1.2, 0.7, length(c))*smoothstep(SPREAD + 0.5, SPREAD, abs(atan(c.y, c.x)));
  vec2 g = abs(fract(p/0.08 + 0.5) - 0.5)*0.08/px;
  col = mix(col, IRON*1.3, line(min(g.x, g.y))*0.22*inChart);

  // range rings, dashed, labelled by the DOM
  float cr = length(c);
  float span = min(uH.z, uH.w);
  float ca = atan(c.y, c.x);
  for (int k = 1; k <= 4; k++){
    float R = float(k)*0.25;
    float d = abs(cr - R)*span/px;
    float dash = step(0.45, fract(ca*R*38.0));
    // only the arc across the fan: a whole ellipse reads as an orbit, not a range
    float arc = smoothstep(SPREAD + 0.25, SPREAD + 0.05, abs(ca));
    col = mix(col, ZINC*1.4, line(d)*dash*arc*0.8);
  }
  // the fan's edges
  for (int k = 0; k < 2; k++){
    float a = k == 0 ? -SPREAD : SPREAD;
    float d = abs(dot(c, vec2(-sin(a), cos(a))))*span/px;
    float along = dot(c, vec2(cos(a), sin(a)));
    col = mix(col, ZINC, line(d)*step(0.0, along)*step(along, 1.05)*step(0.5, fract(along*30.0))*0.6);
  }

  // a slow sweep out of Sol: routes it crosses brighten, like a plot being refreshed
  float sa = mod(uTime*0.35, 2.0*SPREAD + 0.8) - SPREAD - 0.4;
  float sweep = smoothstep(0.12, 0.0, abs(ca - sa))*step(cr, 1.1);
  col += FROST*sweep*0.18;

  float days = uQ.z;
  float latest = uQ.x;
  float since = uQ.y;
  float flashStep = floor(since/FLASH_FOR*FLASH_STEPS);
  float flashing = step(since, FLASH_FOR);

  vec2 sol = uH.xy;
  for (int n = 1; n <= SHIPS; n++){
    float i = float(n);
    float r = reachOf(i);
    float a = angleOf(i);
    vec2 dst = chartPoint(r, a);
    float lost = lostBit(i);
    bool yours = abs(i - YOURS) < 0.5;
    float prog = lost > 0.5 ? stopOf(i) : min(1.0, days*PROG_MAX*FAR/r);
    vec2 ship = mix(sol, dst, prog);

    // the route: flown stretch solid, the rest dotted
    vec2 ba = dst - sol;
    float h = clamp(dot(p - sol, ba)/dot(ba, ba), 0.0, 1.0);
    float dpx = length(p - sol - ba*h)/px;
    float lenPx = length(ba)/px;
    if (dpx < 7.0){
      float dotted = step(0.5, fract(h*lenPx/3.0));
      float flown = step(h, prog);
      vec3 routeC = yours ? EMBER : lost > 0.5 ? BRICK : mix(ZINC, RIME, flown);
      float w = flown > 0.5 ? (yours ? 1.0 : 0.7) : dotted*(yours ? 0.6 : 0.4);
      if (lost > 0.5) w *= 0.7;
      // ten lines can each afford two pixels of stroke where they have been flown
      float stroke = flown > 0.5 ? line(dpx - 0.5) : line(dpx);
      col = mix(col, routeC, stroke*w);
      // the trail: the flown line glows hottest right behind the marker, fading back toward Sol
      if (lost < 0.5 && flown > 0.5){
        float behind = (prog - h)*lenPx;
        float trail = exp(-behind/26.0)*smoothstep(6.0, 0.0, dpx);
        col += (yours ? EMBER : FROST*1.6)*trail*0.45;
      }
    }

    // the destination: a star waiting at the end of the line
    float dd = length(p - dst)/px;
    vec3 destC = lost > 0.5 ? BRICK*0.8 : yours ? GLOW : RIME;
    vec2 dq = abs(p - dst)/px;
    // a small cross, the way a chart marks a star it has a name for
    float mark = max(smoothstep(1.4, 0.5, dd), step(min(dq.x, dq.y), 0.5)*step(max(dq.x, dq.y), 2.5));
    col = mix(col, destC, mark*(lost > 0.5 ? 0.55 : 0.95));

    // the ship's marker; a lost one flashes out where it stopped, then is gone
    float sd = length(p - ship)/px;
    bool isLatest = abs(i - latest) < 0.5;
    if (lost < 0.5){
      vec3 shipC = yours ? EMBER : STAR;
      col = mix(col, shipC, smoothstep(yours ? 2.2 : 1.4, yours ? 1.0 : 0.5, sd));
      if (yours){
        // a ring that breathes on a stepped clock: the one light that is yours
        float pulse = floor(fract(uTime*0.8)*4.0)/4.0;
        float ringR = 4.0 + pulse*5.0;
        col = mix(col, EMBER, line(abs(sd - ringR))*(1.0 - pulse)*0.9);
      }
      // an engine glow round every live marker
      col += (yours ? EMBER : RIME)*exp(-sd/3.0)*0.35;
    } else if (isLatest && flashing > 0.5){
      // the loss: a white flare, then a red shock ring opening out on the stepped clock
      float on = mod(flashStep, 2.0) < 0.5 ? 1.0 : 0.0;
      float ringR = 2.0 + flashStep*2.5;
      col = mix(col, flashStep < 1.5 ? GLOW : CLAY, on*smoothstep(3.0, 0.8, sd));
      col = mix(col, BRICK, line(abs(sd - ringR))*(1.0 - flashStep/FLASH_STEPS));
    } else {
      // where it went dark: a cold red cross on the line
      vec2 xq = abs(p - ship)/px;
      col = mix(col, RUST*1.4, step(abs(xq.x - xq.y), 0.6)*step(xq.x, 2.5));
    }
  }

  // Sol: swollen, red, the root of every line
  float sd = length(p - sol);
  float solR = 0.022;
  float limb = sd/solR;
  vec3 solC = mix(GLOW, EMBER, smoothstep(0.0, 0.5, limb));
  solC = mix(solC, AMBER, smoothstep(0.5, 0.85, limb));
  solC = mix(solC, CLAY, smoothstep(0.85, 1.0, limb));
  col = mix(col, solC, step(limb, 1.0));
  col += CLAY*exp(-max(limb - 1.0, 0.0)*1.6)*step(1.0, limb)*0.55;
  col += BRICK*exp(-sd*9.0)*0.25;

  col *= uQ.w;
  gl_FragColor = vec4(finish(col, frag), 1.0);
}
