precision mediump float;
uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;
uniform float u_scale;
uniform float u_speed;
uniform int   u_followMouse;

float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}

float square(vec2 P, float size)
{
    return max(abs(P.x), abs(P.y)) - size/(1.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    uv=fract(uv*1.0);
    uv= uv*2.0-1.0;

    //定義框
    float squareUV =  square(uv, 0.362);    
    float glowSquare = glow(squareUV, 0.668, 0.080);  //第一種寫法 by thickness/pow(dist, strength)
    //float glowSquare= exp(-20.0*squareUV)+exp(-200.0*squareUV); //第二種寫法 by exp(-scale*dist)
    fragColor = vec4(vec3(squareUV),1.0);
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}


/*
// Author:CMH
// Title:GlowSquare

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float glow(float d, float str, float thickness){
    return thickness / pow(d, str);
}

float square(vec2 P, float size)
{
    return max(abs(P.x), abs(P.y)) - size/(1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    uv=fract(uv*1.0);
    uv= uv*2.0-1.0;

    //定義框
    float squareUV =  square(uv, 0.362);    
    float glowSquare = glow(squareUV, 0.668, 0.080);  //第一種寫法 by thickness/pow(dist, strength)
    //float glowSquare= exp(-20.0*squareUV)+exp(-200.0*squareUV); //第二種寫法 by exp(-scale*dist)
    gl_FragColor = vec4(vec3(squareUV),1.0);
}

*/
