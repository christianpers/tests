precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
attribute vec2 aTextureCoord;
attribute vec3 aTest;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec3 vColor;
varying vec3 vTest;

void main(void) {
	gl_PointSize = 1.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = aVertexColor;
    // vTest = aTest;
}