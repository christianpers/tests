// #ifdef GL_ES
// precision highp float;
// #endif

// uniform bool uWireframe;
// uniform vec4 uLightAmbient;
// uniform vec4 uLightDiffuse;
// uniform vec4 uLightSpecular;
// uniform vec4 uMaterialAmbient;
// uniform vec4 uMaterialDiffuse;
// uniform vec4 uMaterialSpecular;
// uniform float uShininess;       

// varying vec3 vNormal;
// varying vec3 vLightRay;
// varying vec3 vEyeVec;
// varying vec4 vFinalColor;

// varying highp vec2 vTextureCoord;

// uniform sampler2D uSampler;

// void main(void)
// {
// 	if(uWireframe){
// 		gl_FragColor = vec4(1.0,1.0,1.0,1.0);
// 	}
// 	else{
// 		gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

// 	}
// }

// fragment shader
uniform  sampler2D  uParticlesFBO;
uniform  vec2       uViewportSize;

void main( void ) {
  vec4 particleData = texture2D( uParticlesFBO,
                                 gl_FragCoord.xy / uViewportSize );
  particleData.x += 0.1;  // time
  particleData.y += 0.2;  // rotation
  particleData.z += 0.3;  // size
  particleData.w += 0.4;  // color
  gl_FragColor = particleData;
}