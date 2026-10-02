precision mediump float;
precision mediump int;

attribute vec3 aVertexNormal;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aDiffuse;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;


void main(void) {
	// gl_PointSize = 10.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    // vTextureCoord = aTextureCoord;
    // vColor = aVertexColor;
    
}