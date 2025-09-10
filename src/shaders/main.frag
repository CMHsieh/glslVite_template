precision mediump float;
uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;
uniform float u_scale;
uniform float u_speed;
uniform int   u_followMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec2 center = u_followMouse == 1 ? iMouse / iResolution.xy : vec2(0.5, 0.5);
  uv = uv - center;
  float t = iTime * u_speed;
  float d = length(uv) * u_scale;
  float v = 0.5 + 0.5 * sin(10.0 * d - t*6.28318);
  vec3 col = mix(vec3(0.05, 0.25, 0.45), vec3(0.95, 0.85, 0.55), v);
  fragColor = vec4(col, 1.0);
}
void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
