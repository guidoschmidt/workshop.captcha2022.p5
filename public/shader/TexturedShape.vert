#ifdef GL_ES
precision mediump float;
#endif

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

attribute vec3 aPosition;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
