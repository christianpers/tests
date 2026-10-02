(function(){

	var CameraInteractor = function(){};

	if (!window.NS)
		window.NS = {};
	
	window.NS.CameraInteractor = CameraInteractor;

	var p = CameraInteractor.prototype;

	p.init = function(camera, canvas){

		this.camera = camera;
		this.canvas = canvas;

		this.dragging = false;
		this.x = 0;
		this.y = 0;
		this.lastX = 0;
		this.lastY = 0;
		this.button = 0;
		this.ctrl = false;
		this.key = 0;
		
		this.MOTION_FACTOR = 10.0;
		this.dloc = 0;
		this.dstep = 0;

		this.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
		this.canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
		this.canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
	};

	p._onMouseUp = function(e){

		this.dragging = false;

	};

	p._onMouseDown = function(e){

		this.dragging = true;
	    this.x = e.clientX;
		this.y = e.clientY;
		this.button = e.button;
		var position = this.camera.getPosition();
		this.dstep = Math.max(position[0],position[1],position[2])/100;

	};

	p._onMouseMove = function(e){

		this.lastX = this.x;
		this.lastY = this.y;
		this.x = e.clientX;
	    this.y = e.clientY;
		
		if (!this.dragging) return;
		this.ctrl = e.ctrlKey;
		this.alt = e.altKey;
		var dx = this.x - this.lastX;
		var dy = this.y - this.lastY;
		
		if (this.button == 0) { 
			if(this.alt){
				this.dolly(dy);
			}
			else{ 
				this.rotate(dx,dy);
			}
		}	
	};


	p.rotate = function(dx, dy){

		var camera = this.camera;
		var canvas = this.canvas;
		
		var delta_elevation = -20.0 / canvas.height;
		var delta_azimuth   = -20.0 / canvas.width;
					
		var nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
		var nElevation = dy * delta_elevation * this.MOTION_FACTOR;
		
		camera.changeAzimuth(nAzimuth);
		camera.changeElevation(nElevation);

		// console.log('camera change: ')
	};

})();