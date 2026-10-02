#ifdef GL_ES
precision highp float;
#endif

uniform bool uWireframe;
uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;
uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;
uniform float uShininess;       

varying vec3 vNormal;
varying vec3 vLightRay;
varying vec3 vEyeVec;
varying vec4 vFinalColor;

varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void)
{
	
	gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

}

// varying vec3 vColor;

// void main( void ) {
//     gl_FragColor = vec4( vColor, 1.0 );
// }