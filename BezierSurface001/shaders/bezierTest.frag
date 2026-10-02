precision mediump float;

// varying vec2 vTextureCoord;

void main(void) {
    // gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor = vec4(0.9, 0.1, 0.1, 1.0);

 //    if(any(lessThan(vBC, vec3(0.02)))){
 //    	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	// }
	// else{
	//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	// }
}