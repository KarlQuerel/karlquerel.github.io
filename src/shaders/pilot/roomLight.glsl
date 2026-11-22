// A room's own light, for the ship's rooms built for themselves: lines of light (each a segment, glowing all
// round or toward RL_FACE, wrapping RL_WRAP round past its side), a faint fill, and a gloss that throws each line back. Colours are the palette's
// sRGB values unconverted, as in the corridor. Three's world frame. RL_* comes from roomLight.js: the room's
// RL_SEGMENTS lines (RL_A to RL_B, RL_COLOR at its power times uRlGain, RL_FACE, RL_WRAP), RL_FILL, RL_SOFT and RL_SHEEN; and RL_METAL, the hue a
// lit colour turns to as its brightness climbs through RL_NEUTRAL, as the palette turns from the night's cold blues
// to bare metal: a bright blue would otherwise land between them, on the sky's violets.

varying vec3 vRlWorld;
uniform float uRlGain[RL_SEGMENTS];

// the glow of a line seen from a point facing n, its ends L0 and L1 away: the exact sum of n.L/|L|^3 along the
// part of it over the point's horizon, eased RL_SOFT near the line
float rlLine(vec3 n, vec3 L0, vec3 L1){
  float d0 = dot(n, L0), d1 = dot(n, L1);
  if (d0 <= 0.0 && d1 <= 0.0) return 0.0;
  if (d0 < 0.0) L0 += (L1 - L0)*(d0/(d0 - d1));
  else if (d1 < 0.0) L1 += (L0 - L1)*(d1/(d1 - d0));
  float l0 = max(length(L0), 1e-4), l1 = max(length(L1), 1e-4);
  return length(L1 - L0)*(dot(n, L0)/l0 + dot(n, L1)/l1)/(l0*l1 + dot(L0, L1) + RL_SOFT);
}

// the point on a to b nearest p, and nearest the ray from p along r
vec3 rlNearPoint(vec3 p, vec3 a, vec3 b){
  vec3 ab = b - a;
  return a + ab*clamp(dot(p - a, ab)/dot(ab, ab), 0.0, 1.0);
}
vec3 rlNearRay(vec3 p, vec3 r, vec3 a, vec3 b){
  vec3 ab = b - a, w = a - p;
  float br = dot(ab, r);
  return a + ab*clamp((br*dot(r, w) - dot(ab, w))/max(dot(ab, ab) - br*br, 1e-5), 0.0, 1.0);
}
// how much of a line's light leaves toward d: all round, or ahead of its face, `wrap` of it still reaching past its
// side and none behind
float rlFacing(vec3 face, float wrap, vec3 d){
  return dot(face, face) > 0.0 ? clamp((dot(normalize(d), face) + wrap)/(1.0 + wrap), 0.0, 1.0) : 1.0;
}

// p and n a surface's point and normal, base its colour, emit its own light, gloss 0 (matte) to 1 (a mirror)
vec3 roomLight(vec3 p, vec3 n, vec3 base, vec3 emit, float gloss){
  vec3 r = reflect(normalize(p - cameraPosition), n);
  float shine = exp2(2.0 + 9.0*gloss);
  vec3 col = base*RL_FILL;
  for (int i = 0; i < RL_SEGMENTS; i++){
    vec3 a = RL_A[i], b = RL_B[i], face = RL_FACE[i], tint = RL_COLOR[i]*uRlGain[i];
    // glass only throws the light back: lit from behind, it would veil what lies through it
    #ifndef RL_GLASS
    col += base*tint*rlLine(n, a - p, b - p)*rlFacing(face, RL_WRAP[i], p - rlNearPoint(p, a, b));
    #endif
    vec3 h = rlNearRay(p, r, a, b) - p;
    float d2 = dot(h, h);
    h *= inversesqrt(d2);
    col += tint*RL_SHEEN*gloss*gloss*pow(max(dot(r, h), 0.0), shine)*rlFacing(face, RL_WRAP[i], -h)/(1.0 + d2);
  }
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  return mix(col, luma*RL_METAL, smoothstep(RL_NEUTRAL.x, RL_NEUTRAL.y, luma)) + emit;
}
