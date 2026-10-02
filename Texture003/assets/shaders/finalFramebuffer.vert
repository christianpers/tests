// attribute vec3 aVertexPosition;
// attribute vec3 aVertexNormal;
// attribute vec4 aVertexColor;
// attribute vec2 aTextureCoord;

// uniform mat4 uMVMatrix;
// uniform mat4 uPMatrix;


// varying highp vec2 vTextureCoord;


// void main(void) {
	
//  	//Transformed vertex position
// 	 vec3 vecPosition = aVertexPosition;

// 	 // vec4 movementMatrixTemp = uMovementMatrix * vec4(vecPosition, 1.0);
// 	 vec4 vertex = uMVMatrix * vec4(vecPosition, 1.0);
	 
// 	 //Final vertex position
// 	 gl_Position = uPMatrix * vertex;
// 	 vTextureCoord = aTextureCoord;

// }

// uniform  sampler2D  uParticlesFBO;

// attribute  vec2  aParticleUVs;
// attribute  vec2  aParticleSpacePositions;

// varying  vec3  vColor;

// void main(void)
// {
//   vec4 particleData = texture2D( uParticlesFBO, aParticleUVs );
//   vec4 particlePosition;

//   // ...do something with the particle data...

//   gl_Position = uPMatrix * uMVMatrix * vec4( particlePosition, 1.0 );
// }

attribute vec4 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D mParticleTex;

void main()
{
    vec2 particleSampleCoords = aVertexPosition.xy;
    vec4 particlePos = texture2D(mParticleTex, particleSampleCoords);
    gl_Position = uPMatrix * uMVMatrix * particlePos;
    gl_PointSize = 10.0;
}