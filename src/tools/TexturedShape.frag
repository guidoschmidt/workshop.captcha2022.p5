#ifdef GL_ES
precision mediump float;
#endif

uniform bool u_has_texture;
uniform float u_angle;
uniform vec2 u_offset;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform sampler2D u_texture;

mat2 rotate2D(in float a) {
  return mat2(cos(a), -sin(a),
              sin(a), cos(a));
}


void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  st -= vec2(0.5);
  st -= vec2(u_offset.x, -u_offset.y) / u_resolution * 0.5;
  st *= rotate2D(u_angle);
  st += vec2(0.5);

  st = clamp(fract(st), 0.0, 1.0);
  vec3 color = vec3(1.0);
  if (u_has_texture) {
    color = texture2D(u_texture, st).rgb;
  }
  gl_FragColor = vec4(color * u_color, 1.0);
}
