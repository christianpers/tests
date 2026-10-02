precision mediump float;
precision mediump int;

uniform int uDrawColourMap;
uniform vec4 uDiffuseColor;
uniform vec3 uColor;

void main(void) {

	if (uDrawColourMap == 1) {
	    gl_FragColor = uDiffuseColor;
	    return;
	}
    gl_FragColor = vec4(uColor, 1.0);
}