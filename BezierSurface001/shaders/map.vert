precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aExtra;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D texture;

varying float toDiscard;
varying float alpha;

void main(void) {
	vec3 pos = aVertexPosition;
	vec4 color = texture2D(texture, aTextureCoord);
	float range = 2.0;
	pos = color.rgb - vec3(0.0);
	// alpha = (1.0 - abs(pos.x/.5) ) * aExtra.y;
	// pos = pos * range - 2.0;
	pos.x = pos.x * range - 1.0;
	pos.y = pos.y * range - 1.0;
	pos.z = pos.z * range - 1.0;

	// pos.x = 0.0;
	// pos.y = 0.0;
	// pos.z = 0.0;

	// float x = colorVals.r * range - 2.0;


	// pos.x = x;
	// pos.y = 0.0;
	// pos.z = 0.0;

	// map color values to vertex coords
	// .5 * 4 - 2
	// color val * range - 2

	// toDiscard = aTextureCoord.x;

	gl_PointSize = 3.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    // gl_PointSize = aExtra.x;
}