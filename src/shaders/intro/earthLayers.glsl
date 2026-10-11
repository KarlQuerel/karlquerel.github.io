// The dying Earth's painted layers, the globe and the Moon, read out of the atlas on uMask
// (js/intro/earthArt.js). The earth shot slides them; the sun shot flies past them.
// uH.xy = the planet and Moon sides in art pixels, uH.z = canvas pixels per art pixel. The ground is
// painted solid, the air round the globe at AIR_ALPHA, so a shot can tell the two apart.

vec4 atlas(vec2 texel){ return texture2D(uMask, (texel + 0.5)/vec2(uH.x + uH.y, max(uH.x, uH.y))); }
// a sprite of side `size` art pixels stored at `origin`, its top left on screen at `tl`
vec4 sprite(vec2 cell, vec2 tl, vec2 origin, float size){
  vec2 l = floor((cell - tl)/uH.z);
  if (l.x < 0.0 || l.y < 0.0 || l.x >= size || l.y >= size) return vec4(0.0);
  return atlas(origin + l);
}
// the Moon centred on mc, then the globe on pc with its air over what is behind; `what` is what the
// cell landed on: 0 the sky or the Moon, 1 the globe's air, 2 its ground
vec3 earthLayers(vec3 col, vec2 cell, vec2 pc, vec2 mc, out float what){
  what = 0.0;
  vec4 m = sprite(cell, mc - uH.y*0.5*uH.z, vec2(uH.x, 0.0), uH.y);
  if (m.a > 0.5) col = m.rgb;
  vec4 p = sprite(cell, pc - uH.x*0.5*uH.z, vec2(0.0), uH.x);
  if (p.a > 0.5){
    col = p.rgb;
    what = p.a > (AIR_ALPHA + 1.0)*0.5 ? 2.0 : 1.0;
  }
  return col;
}
