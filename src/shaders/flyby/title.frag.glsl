precision highp float;
varying vec2 vUV;
uniform sampler2D uTex;
uniform float uFade;
void main(){
  vec4 t = texture2D(uTex, vUV);
  if (t.a < 0.02) discard;
  gl_FragColor = vec4(t.rgb, t.a)*uFade;   // premultiplied: colour fades with alpha
}
