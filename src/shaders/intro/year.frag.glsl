// Shot 1: black, then the shared starfield rising star by star behind the card, drifting to rest on the
// earth shot's opening pan so the two fields are one across the cut. uP.xy = the pan, uP.z = the rise.
void main(){
  gl_FragColor = vec4(skyLayer(screenCell(), uP.xy, smoothstep(0.0, 1.0, uP.z)), 1.0);
}
