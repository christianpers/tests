precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform sampler2D textureControlVals;


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



uniform int detail;
// #define	PI 	3.14;



float calcPointX(float a, float c){

	float n = 3.0;
	float b = 1.0 - a;
	float d = 1.0 - c;



	float aVal = pointA[0] * pow(a, n) * pow(c, n);
	
	float bVal = pointB[0] * n * pow(a, n) * pow(c, n-1.0) * d;

	float cVal = pointC[0] * n * pow(a, n) * c * pow(d, n-1.0);

	float dVal = pointD[0] * pow(a, n) * pow(d, n);

	
	float eVal = pointE[0] * n * pow(a, n-1.0) * b * pow(c, n);

	float fVal = pointF[0] * 9.0 * pow(a, n-1.0) * b * pow(c, n-1.0) * d;

	float gVal = pointG[0] * 9.0 * pow(a, n-1.0) * b * c * pow(d, n-1.0);

	float hVal = pointH[0] * n * pow(a, n-1.0) * b * pow(d, n);

	
	float iVal = pointI[0] * n * a * pow(b, n-1.0) * pow(c, n);

	float jVal = pointJ[0] * 9.0 * a * pow(b, n-1.0) * pow(c, n-1.0) * d;

	float kVal = pointK[0] * 9.0 * a * pow(b, n-1.0) * c * pow(d, n-1.0);

	float lVal = pointL[0] * n * a * pow(b, n-1.0) * pow(d, n);

	
	float mVal = pointM[0] * pow(b, n) * pow(c, n);

	float nVal = pointN[0] * n * pow(b, n) * pow(c, n-1.0) * d;

	float oVal = pointO[0] * n * pow(b, n) * c * pow(d, n-1.0);

	float pVal = pointP[0] * pow(b, n) * pow(d, n);

	return aVal + bVal + cVal + dVal + eVal + fVal + gVal + hVal + iVal + jVal + kVal + lVal + mVal + nVal + oVal + pVal;

}

float calcPointY(float a, float c){

	float n = 3.0;
	float b = 1.0 - a;
	float d = 1.0 - c;



	float aVal = pointA[1] * pow(a, n) * pow(c, n);
	
	float bVal = pointB[1] * n * pow(a, n) * pow(c, n-1.0) * d;

	float cVal = pointC[1] * n * pow(a, n) * c * pow(d, n-1.0);

	float dVal = pointD[1] * pow(a, n) * pow(d, n);

	
	float eVal = pointE[1] * n * pow(a, n-1.0) * b * pow(c, n);

	float fVal = pointF[1] * 9.0 * pow(a, n-1.0) * b * pow(c, n-1.0) * d;

	float gVal = pointG[1] * 9.0 * pow(a, n-1.0) * b * c * pow(d, n-1.0);

	float hVal = pointH[1] * n * pow(a, n-1.0) * b * pow(d, n);

	
	float iVal = pointI[1] * n * a * pow(b, n-1.0) * pow(c, n);

	float jVal = pointJ[1] * 9.0 * a * pow(b, n-1.0) * pow(c, n-1.0) * d;

	float kVal = pointK[1] * 9.0 * a * pow(b, n-1.0) * c * pow(d, n-1.0);

	float lVal = pointL[1] * n * a * pow(b, n-1.0) * pow(d, n);

	
	float mVal = pointM[1] * pow(b, n) * pow(c, n);

	float nVal = pointN[1] * n * pow(b, n) * pow(c, n-1.0) * d;

	float oVal = pointO[1] * n * pow(b, n) * c * pow(d, n-1.0);

	float pVal = pointP[1] * pow(b, n) * pow(d, n);

	return aVal + bVal + cVal + dVal + eVal + fVal + gVal + hVal + iVal + jVal + kVal + lVal + mVal + nVal + oVal + pVal;

}

float calcPointZ(float a, float c){

	float n = 3.0;
	float b = 1.0 - a;
	float d = 1.0 - c;



	float aVal = pointA[2] * pow(a, n) * pow(c, n);
	
	float bVal = pointB[2] * n * pow(a, n) * pow(c, n-1.0) * d;

	float cVal = pointC[2] * n * pow(a, n) * c * pow(d, n-1.0);

	float dVal = pointD[2] * pow(a, n) * pow(d, n);

	
	float eVal = pointE[2] * n * pow(a, n-1.0) * b * pow(c, n);

	float fVal = pointF[2] * 9.0 * pow(a, n-1.0) * b * pow(c, n-1.0) * d;

	float gVal = pointG[2] * 9.0 * pow(a, n-1.0) * b * c * pow(d, n-1.0);

	float hVal = pointH[2] * n * pow(a, n-1.0) * b * pow(d, n);

	
	float iVal = pointI[2] * n * a * pow(b, n-1.0) * pow(c, n);

	float jVal = pointJ[2] * 9.0 * a * pow(b, n-1.0) * pow(c, n-1.0) * d;

	float kVal = pointK[2] * 9.0 * a * pow(b, n-1.0) * c * pow(d, n-1.0);

	float lVal = pointL[2] * n * a * pow(b, n-1.0) * pow(d, n);

	
	float mVal = pointM[2] * pow(b, n) * pow(c, n);

	float nVal = pointN[2] * n * pow(b, n) * pow(c, n-1.0) * d;

	float oVal = pointO[2] * n * pow(b, n) * c * pow(d, n-1.0);

	float pVal = pointP[2] * pow(b, n) * pow(d, n);

	return aVal + bVal + cVal + dVal + eVal + fVal + gVal + hVal + iVal + jVal + kVal + lVal + mVal + nVal + oVal + pVal;

}



void main(void) {



	vec4 color;
	// if(vTextureCoord.x < .5) {		//	POSITION
		// vec2 coordVel 		= vec2(vTextureCoord.x + .5, vTextureCoord.y);
		vec4 position = texture2D(texture, vTextureCoord).rgba;

		vec2 controlVals = texture2D(textureControlVals, vTextureCoord).rg;

		// float normalizedX = vTextureCoord.x / .5;
		// float indexX = normalizedX * float(detail);

		// float change = 1.0 / float(detail);

		// float size = 1.0 / float(detail);

		float a = controlVals.r;
		float c = controlVals.g;

		float x = calcPointX(a, c);
		float y = calcPointY(a, c);
		float z = calcPointZ(a, c);

		position.r = x;
		position.g = y;
		position.b = z;
		position.a = 1.0;

		color = vec4(position);
		
	// }else{
		// color = vec4(0.5,0.5,0.5, 1.0);

		
	// }

	gl_FragColor = color;
}