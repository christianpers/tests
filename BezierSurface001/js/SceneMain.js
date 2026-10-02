(function(){

	var ViewBezier = window.NS.GL.Views.ViewBezier;
	var ViewBezierTest = window.NS.GL.Views.ViewBezierTest;

	var ViewControlVals = window.NS.GL.Views.ViewControlVals;
	var ViewSave = window.NS.GL.Views.ViewSave;
	var ViewCopy = window.NS.GL.Views.ViewCopy;
	var ViewCalculate = window.NS.GL.Views.ViewCalculate;
	var ViewMap = window.NS.GL.Views.ViewMap;
	var ViewControlPoint = window.NS.GL.Views.ViewControlPoint;

	var ViewToggleUI = window.NS.GL.Views.ViewToggleUI;
	var ViewControlPointUI = window.NS.GL.Views.ViewControlPointUI;
	var SelectMenu = window.NS.GL.Views.SelectMenu;

	var Scene = window.NS.GL.Framework.Scene;
	var Framebuffer = window.NS.GL.Framework.Framebuffer;
	
	var random = function(min, max) { return min + Math.random() * (max - min); }

	var SceneMain = function(){};

	if (!window.NS)
		window.NS = {};

	window.NS.GL.SceneMain = SceneMain;

	var p = SceneMain.prototype = new Scene();
	var s = Scene.prototype;

	var gl = null;

	p.init = function(){

		s.init.call(this);

		this.hasSaved = false;

		gl = window.NS.GL.glContext;
		
		gl.disable(gl.DEPTH_TEST);

		this._cameraInteractor = new window.NS.GL.Framework.CameraInteractor();
		this._cameraInteractor.init(this.camera, this.canvas, this.onMouseDown, this.onMouseMove, this.onMouseUp, this);

		this.pointCoordsLength = window.NS.params.pointCoords.length;

		this._controlUIPoints = [];
		
		this._initTextures();
		this._initViews();

		this.currentMousePos = [];

		this.isMouseDown = false;
		window.NS.params.currentControlPoint = null;
	
		this.checkClick = false;

	};

	p.onUIActivate = function(pos, controlPoint){

		this._selectMenu.show(pos, controlPoint);
	};

	p.onUIDisable = function(controlPoint){

		this.onControlPointDisable(controlPoint);
	};

	p.onHideUI = function(){

		for (var i=0;i<this._vControlPoints.length;i++){
			this._vControlPoints[i].showing = false;
		}

		for (var i=0;i<this._controlUIPoints.length;i++){
			this._controlUIPoints[i].hide();
		}
	};

	p.onShowUI = function(){

		for (var i=0;i<this._vControlPoints.length;i++){
			this._vControlPoints[i].showing = true;
		}

		for (var i=0;i<this._controlUIPoints.length;i++){
			this._controlUIPoints[i].show();
		}

	};

	p.onControlPointSelected = function(controlPoint){

		if (controlPoint.connected) return;

		window.NS.params.currentControlPoint = controlPoint;
		window.NS.params.currentControlPoint.selected = true;	

		// if (this._cameraInteractor.altKeyIsDown){

		// 	console.log('show menu');

		// 	window.NS.params.currentControlPoint.selected = false;
			
		// 	this._cameraInteractor.disableMouseEvents();

		// }
	};

	p.onControlPointActivate = function(axis, subband, controlPoint){

		controlPoint.connected = true;
		controlPoint.connectedAxis = parseInt(axis.val);
		controlPoint.connectedSubband = parseInt(subband.val);




		// this._cameraInteractor.activateMouseEvents();
	};

	p.onControlPointDisable = function(controlPoint){

		controlPoint.connected = false;
		controlPoint.connectedSubband = -1;
		controlPoint.connectedAxis = -1;

		controlPoint._point.pos = controlPoint.lastPos.slice(0);
	};

	p.onMouseDown = function(e){

		// console.log('on mouse down', ' x: ', e.x, ' y: ',e.y);

		window.NS.params.currentControlPoint = null;

		this.currentMousePos = [e.clientX, window.innerHeight - e.clientY];
		this.current2dMousePos = [e.clientX, e.clientY];

		this.isMouseDown = true;

		this.checkClick = true;

		
	};

	p.onMouseMove = function(e, dx, dy){

		// if (this._vConnectPoint.showing) return;

		var cameraPos = this.camera.getPosition();

		var factor = Math.max( Math.max(cameraPos[0], cameraPos[1], cameraPos[2]) )/1000;

		var scaleX, scaleY;

		scaleX = vec3.create();
		scaleY = vec3.create();

		vec3.scale(this.camera._up,  -dy * factor, scaleY);
		vec3.scale(this.camera._right,  dx * factor, scaleX);

		vec3.add(window.NS.params.currentControlPoint._point.pos, scaleY);
        vec3.add(window.NS.params.currentControlPoint._point.pos, scaleX);

        window.NS.params.currentControlPoint.lastPos = window.NS.params.currentControlPoint._point.pos.slice(0);

	};

	p.onMouseUp = function(e){

		// console.log('on mouse up', ' x: ', e.x, ' y: ',e.y);

		if (window.NS.params.currentControlPoint){
			window.NS.params.currentControlPoint.selected = false;
		}


		
		this.isMouseDown = false;
		window.NS.params.currentControlPoint = null;
	};

	p._initTextures = function() {
		console.log( "Init Texture" );

		var size = window.NS.params.detail;

		this.fboCurrent = new Framebuffer();
		this.fboCurrent.init(size, size, gl.NEAREST, gl.NEAREST, gl.FLOAT);
		this.fboCurrent.id = 'fboCurrent';

		this.fboTarget = new Framebuffer();
		this.fboTarget.init(size, size, gl.NEAREST, gl.NEAREST, gl.FLOAT);
		this.fboTarget.id = 'fboTarget';

		this.fboControlVals = new Framebuffer();
		this.fboControlVals.init(size, size, gl.NEAREST, gl.NEAREST, gl.FLOAT);

		this.fboPicking = new Framebuffer();
		this.fboPicking.init(window.innerWidth, window.innerHeight, gl.NEAREST, gl.NEAREST, gl.UNSIGNED_BYTE);
		
	};

	p._initViews = function() {
		console.log( "Init Views" );

		this._vControlVals = new ViewControlVals();
		this._vControlVals.init("shaders/save.vert", "shaders/save.frag");
		this._vControlVals.transforms = this.transforms;

		this._vSave = new ViewSave();
		this._vSave.init("shaders/save.vert", "shaders/save.frag");
		this._vSave.transforms = this.transforms;

		this._vCopy = new ViewCopy();
		this._vCopy.init("shaders/copy.vert", "shaders/copy.frag");
		this._vCopy.transforms = this.transforms;

		this._vCal = new ViewCalculate();
		this._vCal.init("shaders/copy.vert", "shaders/cal.frag");
		this._vCal.transforms = this.transforms;

		this._vMap = new ViewMap();
		this._vMap.init("shaders/map.vert", "shaders/map.frag");
		this._vMap.transforms = this.transforms;

		this._selectMenu = new SelectMenu();
		this._selectMenu.init(document.getElementById('selectMenu'), this.onControlPointActivate, this);

		this._vControlPoints = [];
		for (var i=0;i<this.pointCoordsLength;i++){
			var controlPoint = new ViewControlPoint();
			controlPoint.init("shaders/controlPoint.vert", "shaders/controlPoint.frag", window.NS.params.pointCoords[i]);
			controlPoint.transforms = this.transforms;
		
			this._vControlPoints.push(controlPoint);

			var controlUIPoint = new ViewControlPointUI();
			controlUIPoint.init(document.getElementById('controlPointsUIWrapper'), controlPoint, this.onUIActivate, this.onUIDisable, this);

			this._controlUIPoints.push(controlUIPoint);
		}

		this._vToggleUI = new ViewToggleUI();
		this._vToggleUI.init(document.getElementById('toggleUI'), this.onShowUI, this.onHideUI, this);


		// this._vConnectPoint = new ViewConnectPoint();
		// this._vConnectPoint.init(document.getElementById('selectMenu'), this.onControlPointActivate, this);

	};

	p.update = function(){

		s.update.call(this);


		var controlPoint;
		for (var i=0;i<this._vControlPoints.length;i++){

			controlPoint = this._vControlPoints[i];

			if ( controlPoint.connected ){
				controlPoint._point.pos[controlPoint.connectedAxis] = controlPoint.lastPos[controlPoint.connectedAxis] + window.NS.params.audioData[controlPoint.connectedSubband];
			}
		}

		for (var i=0;i<this._controlUIPoints.length;i++){
			this._controlUIPoints[i].update();
		}

		// if (window.NS.params.audioData.length > 8){
		// 	this._vControlPoints[3]._point.pos[0] = this._vControlPoints[3].lastPos[0] + window.NS.params.audioData[8];
		// 	this._vControlPoints[8]._point.pos[2] = this._vControlPoints[8].lastPos[2] + window.NS.params.audioData[8];
		// }
	};

	p.render = function() {

		gl.disable(gl.DEPTH_TEST);
		gl.enable(gl.BLEND);

		if(!this.hasSaved) {
			console.log('create save fbo');
			this.fboCurrent.bind();
			// gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
			gl.clearColor( 0.35, 0.5, 0.5, 1 );
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.transforms.resetPerspective();
			this.transforms.setCamera(this.cameraOtho);
			

			this._vSave.render();
			this.fboCurrent.unbind();

			this.fboTarget.bind();
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.fboTarget.unbind();


			this.fboControlVals.bind();

			gl.viewport(0, 0, this.fboControlVals.width, this.fboControlVals.height);
			gl.clearColor( 0.35, 0.5, 0.5, 1 );
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			this._vControlVals.render();
			this.fboControlVals.unbind();

			

			
			gl.clearColor( 0, 0, 0, 1 );
			gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			// gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			this.hasSaved = true;
			
			// this._vCopy.render( this.fboControlVals.getTexture() );
			return;
		}

  		this.transforms.resetPerspective();
		this.transforms.setCamera(this.cameraOtho);

		gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
		

		this.fboTarget.bind();
		// console.log('target id: ',this.fboTarget.id, ' current id: ',this.fboCurrent.id);
		this._vCal.render( this.fboCurrent.getTexture(), this.fboControlVals.getTexture() );
		this.fboTarget.unbind();

		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		// gl.clearColor( 0.0, 0.0, 0.0, 1 );
		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		// this._vCopy.render( this.fboTarget.getTexture() );

		// this.swapFbos();
		// return;


		
		this.transforms.updatePerspective(this.canvas.width, this.canvas.height);
		this.transforms.setCamera(this.camera);

		this._vMap.render( this.fboTarget.getTexture() );

		for (var i=0;i<this.pointCoordsLength;i++){
			this._vControlPoints[i].render(false);
		}

		if (this.checkClick){
		
			gl.enable(gl.DEPTH_TEST);
			gl.disable(gl.BLEND);
			
			this.fboPicking.bind();

			for (var i=0;i<this.pointCoordsLength;i++){

				this._vControlPoints[i].render(true);
			}

			var pixels = new Uint8Array(1 * 1 * 4);

			gl.readPixels(this.currentMousePos[0], this.currentMousePos[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

			var id = Math.round( (pixels[0] / 255) * 100) / 100;

			// debugger;

			var controlPoint = this.getControlPointFromId(id);
			if (controlPoint){
			
				this.onControlPointSelected(controlPoint);
			}
			
		  	this.fboPicking.unbind();
			
			this.checkClick = false;
		
		}

		this.swapFbos();
		
	};

	p.getControlPointFromId = function(id){

		for (var i=0;i<this.pointCoordsLength;i++){
			if (this._vControlPoints[i].id == id){
				return this._vControlPoints[i];
			}
		}

		return null;
	};

	p.swapFbos = function() {
		
		var tmp = this.fboTarget;
		this.fboTarget = this.fboCurrent;
		this.fboCurrent = tmp;
	};

})();