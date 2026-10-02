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

attribute  vec2  aSimulationDataXYs;

void main(void) {
  gl_Position = vec4( aSimulationDataXYUVs.x,
                      aSimulationDataXYUVs.y,
                      1.0, 1.0 );
}

