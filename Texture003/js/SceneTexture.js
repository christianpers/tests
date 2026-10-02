(function(){

	var ViewSave = window.NS.GL.Framework.Views.ViewSave;
	var ViewMap = window.NS.GL.Framework.Views.ViewMap;
	var ViewCopy = window.NS.GL.Framework.Views.ViewCopy;
	var ViewForce = window.NS.GL.Framework.Views.ViewForce;
	var ViewCalculate = window.NS.GL.Framework.Views.ViewCalculate;
	// var ViewTest = window.NS.GL.Framework.Views.ViewTest;
	// var ViewFramebuffer = window.NS.GL.Framework.Views.ViewFramebuffer;
	var Framebuffer = window.NS.GL.Framework.Framebuffer;
	// var Texture = window.NS.GL.Framework.Texture;
	var Scene = window.NS.GL.Framework.Scene;

	var random = function(min, max) { return min + Math.random() * (max - min); }


	var SceneTexture = function(){};

	if (!window.NS.GL.Framework)
		window.NS.GL.Framework = {};

	window.NS.GL.Framework.SceneTexture = SceneTexture;

	var p = SceneTexture.prototype = new Scene();
	var s = Scene.prototype;

	var gl = null;

	p.init = function(){

		s.init.call(this);

		gl = window.NS.GL.glContext;
		
		gl.disable(gl.DEPTH_TEST);

		this.transforms = new window.NS.SceneTransforms();
		this.transforms.init(this.canvas);

		var cameraInteractor = new window.NS.CameraInteractor();
		cameraInteractor.init(this.camera, this.canvas);
		
		this.hasSaved = false;

		this.createParticles();

		this._initTextures();
		this._initViews();


	};

	p.createParticles = function(){

		var numParticles = params.sqrtParticles * params.sqrtParticles;
		console.log( "Total : ", numParticles );

		this.particles = [];
		// var range = 1;
		// var nrRows = 10;
		// var nrCols = 3;
		// var particlesEachPile = numParticles / (nrRows * nrCols);


		// var margin = .01
		// var size = (1/nrRows) - margin*2;
		// console.log('size: ',size);
		// var currentRowStep = 0;
		// var currentColStep = 0.5;



		// for (var row=0;row<nrRows;row++){

		// 	for (var col=0;col<nrCols;col++){

		// 		console.log('row step start : ',currentRowStep, ' row step end: ', currentRowStep + size, ' col start: ',currentColStep, ' col end: ',currentColStep+size);

		// 		for (var particle=0;particle<particlesEachPile;particle++){
					
		// 			var x = random(currentRowStep, currentRowStep + size);
		// 			var y = random(.2,.3);
		// 			var z = random(currentColStep, currentColStep + size);

		// 			this.particles.push({x:x, y:y, z:z-0.25});
		// 		}

		// 		currentColStep += margin * 2 + size;
			
		// 	}
		// 	// console.log('currentRowStep: ',currentRowStep, ' step: ',step);

		// 	currentColStep = 0.5;
		// 	currentRowStep += margin*2 + size;



		// }

		for(var i=0; i<numParticles; i++) {
			var x = Math.random();
			var y = random(.49, .51);
			var z = random(.3, .7);

			this.particles.push({x:x, y:y, z:z});
		}	
	};

	

	
	

	p._setCamera = function(){

		this.camera = new window.NS.Camera();
		this.camera.init();

		this.cameraOtho = new window.NS.Camera();
		this.cameraOtho.init('front');

		this.camera.goHome([0,0,8]);
		// camera.setFocus([0.0,0.0,0.0]);
		// this.camera.renderer = this.render.bind(this);
	};

	


	p._initTextures = function() {
		console.log( "Init Texture" );
	
		this.fboCurrent = new Framebuffer();
		this.fboCurrent.init(params.sqrtParticles*2.0, params.sqrtParticles, gl.NEAREST, gl.NEAREST);
		this.fboCurrent.id = 'fboCurrent';

		this.fboTarget = new Framebuffer();
		this.fboTarget.init(params.sqrtParticles*2.0, params.sqrtParticles, gl.NEAREST, gl.NEAREST);
		this.fboTarget.id = 'fboTarget';

		this.fboForce = new Framebuffer();
		this.fboForce.init(256, 256, gl.NEAREST, gl.NEAREST);

		// this.fboForce = new Framebuffer(256, 256, gl.NEAREST, gl.NEAREST);
	};

	p._initViews = function() {
		console.log( "Init Views" );

		// this._vForce = new ViewForce();
		// this._vForce.init("assets/shaders/copy.vert", "assets/shaders/force.frag");
		// this._vForce.transforms = this.transforms;

		this._vCopyForce = new ViewCopy();
		this._vCopyForce.init("assets/shaders/copy.vert", "assets/shaders/copyFlip.frag");
		this._vCopyForce.transforms = this.transforms;

		this._vSave = new ViewSave();
		this._vSave.init(this.particles, "assets/shaders/save.vert", "assets/shaders/save.frag");
		this._vSave.transforms = this.transforms;

		this._vCopy = new ViewCopy();
		this._vCopy.init("assets/shaders/copy.vert", "assets/shaders/copy.frag");
		this._vCopy.transforms = this.transforms;

		this._vCal = new ViewCalculate();
		this._vCal.init("assets/shaders/copy.vert", "assets/shaders/cal.frag");
		this._vCal.transforms = this.transforms;

		this._vMap = new ViewMap();
		this._vMap.init(this.particles, "assets/shaders/map.vert", "assets/shaders/map.frag");
		this._vMap.transforms = this.transforms;

	};


	var tempCounter = 0;
	p.render = function() {

		if(!this.hasSaved) {
			console.log('create save fbo');
			this.fboCurrent.bind();
			// gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
			gl.clearColor( 0.35, 0.5, 0.5, 1 );
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.transforms.resetPerspective();
			this.transforms.setCamera(this.cameraOtho);
			// GL.setMatrices(this.cameraOtho);
			// GL.rotate(this.rotationFront);


			this._vSave.render();
			this.fboCurrent.unbind();

			this.fboTarget.bind();
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.fboTarget.unbind();

			// this.fboForce.bind();
			// gl.viewport(0, 0, this.fboForce.width, this.fboForce.height);
			// gl.clearColor( 0.5, 0.5, 0.5, 1 );
			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			// this.fboForce.unbind();


			gl.clearColor( 0, 0, 0, 1 );
			gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.hasSaved = true;
			// return;

			// this._vCopy.render( this.fboCurrent.getTexture() );
			return;
		}


		// GL.setMatrices(this.cameraOtho);
		// GL.rotate(this.rotationFront);

		// this.transforms.updatePerspective(this.canvas.width, this.canvas.height);
  //       this.camera.setPosition([0,0,3]);

  		this.transforms.resetPerspective();
		this.transforms.setCamera(this.cameraOtho)

		// gl.viewport(0, 0, this.fboForce.width, this.fboForce.height);
		// this.fboForce.bind();
		// this._vForce.render();
		// this.fboForce.unbind();

		gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
		

		this.fboTarget.bind();
		// console.log('target id: ',this.fboTarget.id, ' current id: ',this.fboCurrent.id);
		this._vCal.render( this.fboCurrent.getTexture() );
		this.fboTarget.unbind();

		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		// gl.clearColor( 0.0, 0.0, 0.0, 1 );
		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		

		// this._vCopy.render( this.fboTarget.getTexture() );
		// this._vCopyForce.render( this.fboForce.getTexture() )
		
		
		// if(params.showForceMap)	this._vCopyForce.render( this.fboForce.getTexture() );
		// if(params.showMap)	this._vCopy.render( this.fboTarget.getTexture() );
		// GL.setMatrices(this.camera);
		// GL.rotate(this.sceneRotation.matrix);
		// this._vMap.render(this.fboTarget.getTexture(), this.texDot);



		this.transforms.updatePerspective(this.canvas.width, this.canvas.height);
		this.transforms.setCamera(this.camera);

		this._vMap.render( this.fboTarget.getTexture() );

		this.swapFbos();


		
	};

	p.swapFbos = function() {
		
		var tmp = this.fboTarget;
		this.fboTarget = this.fboCurrent;
		this.fboCurrent = tmp;
	};


})();