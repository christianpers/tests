(function(){

	var SceneTransforms = function(){};

	if (!window.NS)
		window.NS = {};

	window.NS.SceneTransforms = SceneTransforms;

	var p = SceneTransforms.prototype;

	SceneTransforms.FIELD_OF_VIEW = 45;

	p.init = function(canvas){

		this._stack = [];
		// this._camera = c;
		this._canvas = canvas;
		this._mvMatrix    = mat4.create();    // The Model-View matrix
		this._pMatrix     = mat4.create();    // The projection matrix
		this._nMatrix     = mat4.create();    // The normal matrix
		// this.cMatrix     = mat4.create();    // The camera matrix

		mat4.identity(this._pMatrix);
	};

	p.setCamera = function(c){

		this._camera = c;
	};

	p.calculateModelView = function(){

		this._mvMatrix = this._camera.getViewTransform();	
	};

	p.calculateNormal = function(){

		mat4.identity(this._nMatrix);
		mat4.set(this._mvMatrix, this._nMatrix);
		mat4.inverse(this._nMatrix);
		mat4.transpose(this._nMatrix);
	};

	p.calculatePerspective = function(){

		mat4.identity(this._pMatrix);
		mat4.perspective(SceneTransforms.FIELD_OF_VIEW, this._canvas.width / this._canvas.height, 0.1, 1000, this._pMatrix);
	};

	p.updatePerspective = function(w, h){

		mat4.perspective(SceneTransforms.FIELD_OF_VIEW, w / h, 0.1, 1000, this._pMatrix);	
	};

	p.resetPerspective = function(){

		mat4.identity(this._pMatrix);
	};


	p.setMatrixUniforms = function(){

		this.calculateNormal();
			
	};

	p.getMvMatrix = function(){

		return this._mvMatrix;	
	};

	p.getProjectionMatrix = function(){

		return this._pMatrix;	
	};

	p.getNormalMatrix = function(){

		return this._nMatrix;	
	};

	p.pop = function(){

		if(this._stack.length == 0) return;
		this._mvMatrix = this._stack.pop();

	};

	p.push = function(){

		var memento = mat4.create();
		mat4.set(this._mvMatrix, memento);
		this._stack.push(memento);

	};

})();