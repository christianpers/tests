precision highp float;


attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

//control points
uniform vec3 pointA;
uniform vec3 pointB;
uniform vec3 pointC;
uniform vec3 pointD;

uniform vec3 pointE;
uniform vec3 pointF;
uniform vec3 pointG;
uniform vec3 pointH;

uniform vec3 pointI;
uniform vec3 pointJ;
uniform vec3 pointK;
uniform vec3 pointL;

uniform vec3 pointM;
uniform vec3 pointN;
uniform vec3 pointO;
uniform vec3 pointP;

//bezier vars
uniform int detail;

float calcPoint(int idx, float a, float b, float c, float d, float n){

	float aVal = pointA[idx] * pow(a, n) * pow(c, n);
	
	float bVal = pointB[idx] * n * pow(a, n) * pow(c, n-1.0) * d;

	float cVal = pointC[idx] * n * pow(a, n) * c * pow(d, n-1.0);

	float dVal = pointD[idx] * pow(a, n) * pow(d, n);

	
	float eVal = pointE[idx] * n * pow(a, n-1.0) * b * pow(c, n);

	float fVal = pointF[idx] * 9.0 * pow(a, n-1.0) * b * pow(c, n-1.0) * d;

	float gVal = pointG[idx] * 9.0 * pow(a, n-1.0) * b * c * pow(d, n-1.0);

	float hVal = pointH[idx] * n * pow(a, n-1.0) * b * pow(d, n);

	
	float iVal = pointI[idx] * n * a * pow(b, n-1.0) * pow(c, n);

	float jVal = pointJ[idx] * 9.0 * a * pow(b, n-1.0) * pow(c, n-1.0) * d;

	float kVal = pointK[idx] * 9.0 * a * pow(b, n-1.0) * c * pow(d, n-1.0);

	float lVal = pointL[idx] * n * a * pow(b, n-1.0) * pow(d, n);

	
	float mVal = pointM[idx] * pow(b, n) * pow(c, n);

	float nVal = pointN[idx] * n * pow(b, n) * pow(c, n-1.0) * d;

	float oVal = pointO[idx] * n * pow(b, n) * c * pow(c, n-1.0);

	float pVal = pointP[idx] * pow(b, n) * pow(d, n);

	return aVal + bVal + cVal + dVal + eVal + fVal + gVal + hVal + iVal + jVal + kVal + lVal + mVal + nVal + oVal + pVal;

}


// vec3 getPoint(float a, float c){

// 	// vec3 ret;

// 	float n = 3.0;

// 	float b = 1.0 - a;
// 	float d = 1.0 - c;

// 	float xVal = calcPoint(0, a, b, c, d, n);
// 	float yVal = calcPoint(1, a, b, c, d, n);
// 	float zVal = calcPoint(2, a, b ,c, d, n);

// 	// ret = vec3(xVal, yVal, zVal);

// 	return vec3(xVal, yVal, zVal);
// }

// vec3 tempPositions[20 * 20];

// float change = 1.0 / float(detail);

// float a = 1.0;
// float c = 1.0;
// for (int i=0;i<20;i++){

// 	for (int j=0;j<20;j++){

// 		c -= change;

// 		vec3 point = getPoint(a, c);

// 	}
// }





void main(void) {
	// gl_PointSize = 4.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    // vTextureCoord = aTextureCoord;
}