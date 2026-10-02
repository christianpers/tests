(function(){

	var ViewPlain = window.NS.GL.Views.ViewPlain;
	var ViewTunnel = window.NS.GL.Views.ViewTunnel;
	var Scene = window.NS.GL.Framework.Scene;
	var Texture = window.NS.GL.Framework.Texture;
	
	var random = function(min, max) { return min + Math.random() * (max - min); }

	var SceneMain = function(){};

	if (!window.NS)
		window.NS = {};

	window.NS.GL.SceneMain = SceneMain;

	var p = SceneMain.prototype = new Scene();
	var s = Scene.prototype;

	var gl = null;

	var permTexture = null;
	var simplexTexture = null;

	var grad3 = [[0,1,1],[0,1,-1],[0,-1,1],[0,-1,-1],
                   [1,0,1],[1,0,-1],[-1,0,1],[-1,0,-1],
                   [1,1,0],[1,-1,0],[-1,1,0],[-1,-1,0], // 12 cube edges
                   [1,0,-1],[-1,0,-1],[0,-1,1],[0,1,1]]; // 4 more to make 16

	var perm = [151,160,137,91,90,15,
	  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
	  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
	  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
	  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
	  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
	  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
	  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
	  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
	  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
	  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
	  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
	  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

	var simplex4 = [
	  [0,64,128,192],[0,64,192,128],[0,0,0,0],[0,128,192,64],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[64,128,192,0],
	  [0,128,64,192],[0,0,0,0],[0,192,64,128],[0,192,128,64],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[64,192,128,0],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [64,128,0,192],[0,0,0,0],[64,192,0,128],[0,0,0,0],
	  [0,0,0,0],[0,0,0,0],[128,192,0,64],[128,192,64,0],
	  [64,0,128,192],[64,0,192,128],[0,0,0,0],[0,0,0,0],
	  [0,0,0,0],[128,0,192,64],[0,0,0,0],[128,64,192,0],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [128,0,64,192],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [192,0,64,128],[192,0,128,64],[0,0,0,0],[192,64,128,0],
	  [128,64,0,192],[0,0,0,0],[0,0,0,0],[0,0,0,0],
	  [192,64,0,128],[0,0,0,0],[192,128,0,64],[192,128,64,0]
	];

	p.init = function(){

		s.init.call(this);

		gl = window.NS.GL.glContext;
		
		gl.disable(gl.DEPTH_TEST);

		var cameraInteractor = new window.NS.GL.Framework.CameraInteractor();
		cameraInteractor.init(this.camera, this.canvas);

		this._lastTimestamp = Date.now();
		this._duration = 4000;

		this._currentFrontTunnel = null;
		this._currentBehindTunnel = null;
		
		this._initTextures();
		this._initViews();

	};

	p._initTextures = function() {
		console.log( "Init Texture" );

	

		
		// PERM TEXTURE
		var pixels = new Uint8Array(256 * 256 * 4);
		
		permTexture = gl.createTexture(); // Generate a unique texture ID
		gl.bindTexture(gl.TEXTURE_2D, permTexture); // Bind the texture to texture unit 0

		// pixels = (char*)malloc( 256*256*4 );
		for(var i = 0; i<256; i++){
			for(var j = 0; j<256; j++) {
			  var offset = (i*256+j)*4;
			  var value = perm[(j+perm[i]) & 0xFF];
			  pixels[offset] = grad3[value & 0x0F][0] * 64 + 64;   // Gradient x
			  pixels[offset+1] = grad3[value & 0x0F][1] * 64 + 64; // Gradient y
			  pixels[offset+2] = grad3[value & 0x0F][2] * 64 + 64; // Gradient z
			  pixels[offset+3] = value;                     // Permuted index
			}
		}
		
		// GLFW texture loading functions won't work here - we need GL_NEAREST lookup.
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

		this._permTexture = new Texture();
		this._permTexture.init(permTexture, true);


	
		var test = new Uint8Array(64 * 1 * 4);
		// debugger;

		var index = 0;
		for (var i=0;i<simplex4.length;i++){
			for (var j=0;j<simplex4[i].length;j++){

				test[index] = simplex4[i][j];

				index++;
			}
		}


		// SIMPLEX TEXTURE
		// gl.activeTexture(gl.TEXTURE1); // Activate a different texture unit (unit 1)

		simplexTexture = gl.createTexture(); // Generate a unique texture ID
		gl.bindTexture(gl.TEXTURE_2D, simplexTexture); // Bind the texture to texture unit 1

		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 64, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, test );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

		this._simplexTexture = new Texture();
		this._simplexTexture.init(simplexTexture, true);

		// gl.activeTexture(gl.TEXTURE0); // Switch active texture unit back to 0 again

		this.testTexture = new Texture();
		this.testTexture.init(window.NS.texture);

		this.testTextureTwo = new Texture();
		this.testTextureTwo.init(window.NS.textureTwo);
		
	};

	p._initViews = function() {
		console.log( "Init Views" );

		this._vPlain = new ViewPlain();
		this._vPlain.init("shaders/plain.vert", "shaders/plain.frag");
		this._vPlain.transforms = this.transforms;

		this._vTunnel = new ViewTunnel();
		this._vTunnel.init("shaders/plain.vert", "shaders/plain.frag", true, this.testTexture);
		this._vTunnel.transforms = this.transforms;

		this._vTunnelTwo = new ViewTunnel();
		this._vTunnelTwo.init("shaders/plain.vert", "shaders/plain.frag", false, this.testTexture);
		this._vTunnelTwo.transforms = this.transforms;

		this._currentFrontTunnel = this._vTunnel;
		this._currentBehindTunnel = this._vTunnelTwo;

	};


	p.render = function() {

		// gl.disable(gl.DEPTH_TEST);
		// gl.enable(gl.BLEND);

		gl.clearColor( 0, 0, 0, 1 );
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		// gl.clearColor( 0.0, 0.0, 0.0, 1 );
		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		
		
		

		var now = Date.now();
		var diff = now - this._lastTimestamp;
		if (diff >= this._duration){
			this._lastTimestamp = now;

			diff = now - this._lastTimestamp;

			// debugger;
			
			if (this._vTunnel.isFront){
				this._currentFrontTunnel = this._vTunnelTwo;
				this._currentBehindTunnel = this._vTunnel;
				this._vTunnel.isFront = false;
				this._vTunnelTwo.isFront = true;
			}
			else{
				this._currentFrontTunnel = this._vTunnel;
				this._currentBehindTunnel = this._vTunnelTwo;
				this._vTunnel.isFront = true;
				this._vTunnelTwo.isFront = false;
			}
		}

		var zVal = (diff / this._duration) * 110;

		// console.log((diff / this._duration) * 110);

		var frontTunnelZ = zVal;
		var behindTunnelZ = zVal - 110;

		// console.log('frontZ : ',frontTunnelZ, ' behindZ : ',behindTunnelZ);


		this.transforms.updatePerspective(this.canvas.width, this.canvas.height);
		this.transforms.setCamera(this.camera);

		// this.camera.setPosition([0,0,-((diff / this._duration ) * 30 )]);

		// this._vPlain.render(this._permTexture, this._simplexTexture);

		this._currentFrontTunnel.render(this._permTexture, this._simplexTexture, frontTunnelZ);

		this._currentBehindTunnel.render(this._permTexture, this._simplexTexture, behindTunnelZ);
		

		

		
	};

	


})();