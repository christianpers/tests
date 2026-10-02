(function(){

	var Scene = function(){};

	if (!window.NS.GL.Framework)
		window.NS.GL.Framework = {};

	window.NS.GL.Framework.Scene = Scene;

	var p = Scene.prototype;

	var gl = null;

	p.init = function(){

		this.canvas = document.getElementById('glNewbie');
		gl = this.canvas.getContext("webgl");

		window.NS.GL.glContext = gl;

		

		// gl.getExtension('OES_texture_float');

		// gl.clearDepth(100.0);
	    // gl.enable(gl.DEPTH_TEST);
	    // gl.depthFunc(gl.LEQUAL);

		var w = window.innerWidth;
		var h = window.innerHeight;

		var wrapper = document.getElementById('wrapper');
		wrapper.style.height = h + 'px';
		wrapper.style.width = w + 'px';

		this.canvas.width = w;
		this.canvas.height = h;

		this.canvas.style.height = h + 'px';
		this.canvas.style.width = w + 'px';

		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	    gl.enable(gl.DEPTH_TEST);
	    gl.enable(gl.CULL_FACE)
		gl.enable(gl.BLEND);
		gl.clearColor( 0, 0, 0, 1 );
		gl.clearDepth( 1 );
		this.depthTextureExt 	= gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
		this.floatTextureExt 	= gl.getExtension("OES_texture_float") // Or browser-appropriate prefix
		

		this._setCamera();

		var cameraInteractor = new window.NS.CameraInteractor();
		cameraInteractor.init(this.camera, this.canvas);

		// scene = new window.NS.Scene();
		// scene.init();

		

		


		var size = gl.getParameter(gl.SAMPLES);
		var antialias = gl.getContextAttributes().antialias;
		// console.log( "Sample size : ", size, antialias );

		

		console.log( "Extensions : ", this.depthTextureExt, this.floatTextureExt );

		// this.enableAlphaBlending();
		// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	
	};

	p._setCamera = function(){

		// this.camera 		= new CameraPersp();
		// this.camera.setPerspective(45, window.innerWidth/window.innerHeight, 5, 3000);
		// var eye = vec3.create([0, 0, 800]);
		// var center = vec3.create([0, 0, 0]);
		// var up = vec3.create([0, -1, 0]);
		// this.camera.lookAt(eye, center, up);
		// this.sceneRotation = new SceneRotation();
		// this.rotationFront = mat4.create();
		// mat4.identity(this.rotationFront);

		// this.cameraOtho 	= new Camera();

		// this.camera = new window.NS.Camera();
		// this.camera.init();
		// this.camera.goHome([0,.2,12]);
		// // camera.setFocus([0.0,0.0,0.0]);
		// this.camera.renderer = this.render.bind(this);
	};

	p._initTextures = function() {
		
	};


	p._initViews = function() {
		
	};


	p.loop = function() {
		this.update();
		this.render();
	};


	p.update = function() {

		// gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// this.transforms.updatePerspective();
		

		// gl.uniformMatrix4fv(renderProgram.uMVMatrix, false, transforms.getMvMatrix());
		// gl.uniformMatrix4fv(renderProgram.uPMatrix, false, transforms.getProjectionMatrix());
		

		// this.sceneRotation.update();
		// GL.setMatrices(this.camera);
		// GL.rotate(this.sceneRotation.matrix);
	};


	p.render = function() {
		
	};


	p.resize = function() {
		this.transforms.updatePerspective();
		// this.camera.setPerspective(45, window.innerWidth/window.innerHeight, 5, 3000);
	};

})();