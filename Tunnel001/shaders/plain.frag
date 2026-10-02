precision mediump float;
precision mediump int;
// varying vec2 vTextureCoord;

uniform mat4 uNMatrix;

uniform sampler2D permTexture;
uniform sampler2D simplexTexture;
uniform sampler2D testTexture;
uniform float time;
uniform float testVar;
uniform float audioEnergy;

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
varying vec2 vTextureCoord;

varying vec3 vViewPosition;

#define ONE 0.00390625
#define ONEHALF 0.001953125

/*
 * 3D simplex noise. Comparable in speed to classic noise, better looking.
 */
float snoise(vec3 P){

	// The skewing and unskewing factors are much simpler for the 3D case
	#define F3 0.333333333333
	#define G3 0.166666666667

  // Skew the (x,y,z) space to determine which cell of 6 simplices we're in
	float s = (P.x + P.y + P.z) * F3; // Factor for 3D skewing
	vec3 Pi = floor(P + s);
	float t = (Pi.x + Pi.y + Pi.z) * G3;
	vec3 P0 = Pi - t; // Unskew the cell origin back to (x,y,z) space
	Pi = Pi * ONE + ONEHALF; // Integer part, scaled and offset for texture lookup

	vec3 Pf0 = P - P0;  // The x,y distances from the cell origin

  // // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
  // // To find out which of the six possible tetrahedra we're in, we need to
  // // determine the magnitude ordering of x, y and z components of Pf0.
  // // The method below is explained briefly in the C code. It uses a small
  // // 1D texture as a lookup table. The table is designed to work for both
  // // 3D and 4D noise, so only 8 (only 6, actually) of the 64 indices are
  // // used here.
	float c1 = (Pf0.x > Pf0.y) ? 0.5078125 : 0.0078125; // 1/2 + 1/128
	float c2 = (Pf0.x > Pf0.z) ? 0.25 : 0.0;
	float c3 = (Pf0.y > Pf0.z) ? 0.125 : 0.0;
	float sindex = c1 + c2 + c3;
 	vec3 offsets = texture2D(simplexTexture, vec2(sindex, 0)).rgb;
	vec3 o1 = step(0.375, offsets);
	vec3 o2 = step(0.125, offsets);

  // Noise contribution from simplex origin
  float perm0 = texture2D(permTexture, Pi.xy).a;
  vec3  grad0 = texture2D(permTexture, vec2(perm0, Pi.z)).rgb * 4.0 - 1.0;
  float t0 = 0.6 - dot(Pf0, Pf0);
  float n0;
  if (t0 < 0.0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * dot(grad0, Pf0);
  }

  // Noise contribution from second corner
  vec3 Pf1 = Pf0 - o1 + G3;
  float perm1 = texture2D(permTexture, Pi.xy + o1.xy*ONE).a;
  vec3  grad1 = texture2D(permTexture, vec2(perm1, Pi.z + o1.z*ONE)).rgb * 4.0 - 1.0;
  float t1 = 0.6 - dot(Pf1, Pf1);
  float n1;
  if (t1 < 0.0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * dot(grad1, Pf1);
  }
  
  // Noise contribution from third corner
  vec3 Pf2 = Pf0 - o2 + 2.0 * G3;
  float perm2 = texture2D(permTexture, Pi.xy + o2.xy*ONE).a;
  vec3  grad2 = texture2D(permTexture, vec2(perm2, Pi.z + o2.z*ONE)).rgb * 4.0 - 1.0;
  float t2 = 0.6 - dot(Pf2, Pf2);
  float n2;
  if (t2 < 0.0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * dot(grad2, Pf2);
  }
  
  // Noise contribution from last corner
  vec3 Pf3 = Pf0 - vec3(1.0-3.0*G3);
  float perm3 = texture2D(permTexture, Pi.xy + vec2(ONE, ONE)).a;
  vec3  grad3 = texture2D(permTexture, vec2(perm3, Pi.z + ONE)).rgb * 4.0 - 1.0;
  float t3 = 0.6 - dot(Pf3, Pf3);
  float n3;
  if(t3 < 0.0) n3 = 0.0;
  else {
    t3 *= t3;
    n3 = t3 * t3 * dot(grad3, Pf3);
  }

  // Sum up and scale the result to cover the range [-1,1]
  return 32.0 * (n0 + n1 + n2 + n3);
}


void main(void) {

    #extension GL_OES_standard_derivatives : enable

    vec3 normal  = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));

    // directional light

   // directional light

        const vec3 lightCol1 = vec3( 0.0, 0.0, 0.0 );
        const vec3 lightDir1 = vec3( -1.0, 0.0, 0.0 );
        const float intensity1 = 1.0;

        vec4 lDirection1 = uNMatrix * vec4( lightDir1, 0.0 );
        vec3 lightVec1 = normalize( lDirection1.xyz );

        // point light

        const vec3 lightPos2 = vec3( 0.0, 0.0, 2000.0 );
        const vec3 lightCol2 = vec3( 1.0, 0.5, 0.2 );
        const float maxDistance2 = 2000.0;
        const float intensity2 = 1.5;

        vec4 lPosition = uNMatrix * vec4( lightPos2, 1.0 );
        vec3 lVector = lPosition.xyz + vViewPosition.xyz;

        vec3 lightVec2 = normalize( lVector );
        float lDistance2 = 1.0 - min( ( length( lVector ) / maxDistance2 ), 1.0 );

        // point light

        const vec3 lightPos3 = vec3( 0.0, 0.0, -20.0 );
        const vec3 lightCol3 = vec3(0.0, 1.0, 1.0 );
        float maxDistance3 = audioEnergy * 20.0;
        const float intensity3 = 1.5;

        vec4 lPosition3 = uNMatrix * vec4( lightPos3, 1.0 );
        vec3 lVector3 = lPosition3.xyz + vViewPosition.xyz;

        vec3 lightVec3 = normalize( lVector3 );
        float lDistance3 = 1.0 - min( ( length( lVector3 ) / maxDistance3 ), 1.0 );

        //

        float diffuse1 = intensity1 * max( dot( normal, lightVec1 ), 0.0 );
        float diffuse2 = intensity2 * max( dot( normal, lightVec2 ), 0.0 ) * lDistance2;
        float diffuse3 = intensity2 * max( dot( normal, lightVec3 ), 0.0 ) * lDistance3;

        vec3 color = texture2D(testTexture, vec2(vTextureCoord.s, vTextureCoord.t )).rgb;

        gl_FragColor = vec4(diffuse2 * vec3(.5,.5,.5) + diffuse3 * vec3(.5,1,audioEnergy), 1.0 );
        // gl_FragColor = vec4( diffuse1 * lightCol1 + diffuse2 * lightCol2 + diffuse3 * lightCol3, 1.0 );
    // gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    // float n = snoise(vec3(2.0 * v_texCoord3D.xyz * (2.0 + sin(0.5 * time))));

    // float diffuse = max(0., dot(vNormal, cLight));
    // gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
    // gl_FragColor = vec4((vNormal+1.)/2., 1.);
    // gl_FragColor = vec4(0.5, 0.2, 0.5, 1.0);

  	// gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0) * vec4(0.1 + 0.5 * vec3(n, n, n), 1.0);

    // calc the dot product and clamp
    // 0 -> 1 rather than -1 -> 1
    // vec3 light = vec3(0.0, 0.0, -80.0);

    // // ensure it's normalized
    // light = normalize(light);

    // // calculate the dot product of
    // // the light to the vertex normal
    // float dProd = max(0.0,
    //                   dot(vNormal, light));

    // feed into our frag colour
    // gl_FragColor = vec4(dProd, // R
    //                   dProd, // G
    //                   dProd, // B
    //                   1.0);  // A
    
    // vec3 L = normalize(vLightRay);
    // vec3 N = normalize(vNormal);

    // //Lambert's cosine law
    // float lambertTerm = dot(N,-L);
    
    // //Ambient Term  
    // vec4 Ia = uLightAmbient * uMaterialAmbient;

    // //Diffuse Term
    // vec4 Id = vec4(0.0,0.0,0.0,1.0);

    // //Specular Term
    // vec4 Is = vec4(0.0,0.0,0.0,1.0);

    // if(lambertTerm > 0.0)
    // {
    //     Id = uLightDiffuse * uMaterialDiffuse * lambertTerm; 
    //     vec3 E = normalize(vEyeVec);
    //     vec3 R = reflect(L, N);
    //     float specular = pow( max(dot(R, E), 0.0), uShininess);
    //     Is = uLightSpecular * uMaterialSpecular * specular;
    // }

    // //Final color
    // vec4 finalColor = Ia + Id + Is;
    // finalColor.a = 1.0;

    // gl_FragColor = finalColor;

   
}