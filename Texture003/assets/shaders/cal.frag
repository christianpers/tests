precision highp float;







varying vec2 vTextureCoord;
uniform sampler2D texture;


uniform float bandEnergyOne;
uniform float bandEnergyTwo;
uniform float bandEnergyThree;
uniform float bandEnergyFour;
uniform float bandEnergyFive;
uniform float bandEnergySix;
uniform float bandEnergySeven;
uniform float bandEnergyEight;
uniform float bandEnergyNine;
uniform float bandEnergyTen;

#define	PI 	3.14;


void main(void) {

	float bandEnergy[10];
	bandEnergy[0] = bandEnergyOne;
	bandEnergy[1] = bandEnergyTwo;
	bandEnergy[2] = bandEnergyThree;
	bandEnergy[3] = bandEnergyFour;
	bandEnergy[4] = bandEnergyFive;
	bandEnergy[5] = bandEnergySix;
	bandEnergy[6] = bandEnergySeven;
	bandEnergy[7] = bandEnergyEight;
	bandEnergy[8] = bandEnergyNine;
	bandEnergy[9] = bandEnergyTen;
	
	
	
	float rowSize = 1.0/512.0;
	float colSize = 1.0/512.0;

	vec4 color;
	if(vTextureCoord.x < .5) {		//	POSITION
		// vec2 coordVel 		= vec2(vTextureCoord.x + .5, vTextureCoord.y);
		vec3 position = texture2D(texture, vTextureCoord).rgb;

		float normalized = vTextureCoord.x / .5;
		float index = normalized * 10.0;

		vec2 historyCoord = vec2(.5 + (colSize * index), rowSize * index);
		vec3 historyEnergy = texture2D(texture, historyCoord).rgb;

		float xSectionStart = 0.0;
		float xSectionEnd = .25;

		// if (position.r >= 0.0 && position.r <= .25){

		float xPos = position.r;
		// if (xPos >= .5){
		// 	xPos -= 1.0;
		// }

		float freq = bandEnergy[ 2 ] * 300.0;
		float amp = .01;
		float timeVar = xPos;
		float yVal = amp * cos(freq * timeVar * 2.0 * 3.14);
		position.g = yVal + .5;
		// }
		
		position.b -= 0.005;
		if (position.b <= 0.0){
			position.b = 1.0;
		}

		color = vec4(position, 1.0);
		
	}else{

		color = vec4(0.5,0.5,0.5, 1.0);
		for (int i=0;i<10;++i){
			float currentRow = float(i) * rowSize;
			float currentRowNext = currentRow + rowSize;
			if (vTextureCoord.y >= currentRow && vTextureCoord.y <= currentRowNext){

				for (int x=0;x<10;++x){
					float currentCol = float(x) * colSize;
					float currentColNext = currentCol + colSize;
					if (vTextureCoord.x >= currentCol + 0.5 && vTextureCoord.x <= currentColNext + 0.5){

						if (x == 0){
							color.r = bandEnergy[i];
							color.g = bandEnergy[i];
							color.b = bandEnergy[i];
						}else{
							vec2 prevCoordPos = vec2(vTextureCoord.x - colSize, vTextureCoord.y);
							vec3 prevAudioEnergy = texture2D(texture, prevCoordPos).rgb;
							color = vec4(prevAudioEnergy, 1.0);
						}
						
						break;
					}
				}

				break;
			}
		}
		
		
			 
				
	}

	gl_FragColor = color;
}