(function(){

	var Program = function(){};

	if (!window.NS)
		window.NS = {};
	
	window.NS.Program = Program;

	var p = Program.prototype;

	p.load = function(gl){

		var fragmentShader          = this._getShader(gl, "fragment-shader");
		var vertexShader            = this._getShader(gl, "vertex-shader");

		this.prg = gl.createProgram();
		gl.attachShader(this.prg, vertexShader);
		gl.attachShader(this.prg, fragmentShader);
		gl.linkProgram(this.prg);

		if (!gl.getProgramParameter(this.prg, gl.LINK_STATUS)) {
			alert("Could not initialise shaders");
		}

		gl.useProgram(this.prg);

		this.aVertexPosition  = gl.getAttribLocation(this.prg, "aVertexPosition");
		this.aVertexNormal    = gl.getAttribLocation(this.prg, "aVertexNormal");
	 	this.aVertexColor     = gl.getAttribLocation(this.prg, "aVertexColor");
	 	this.aVertexCenterPosition = gl.getAttribLocation(this.prg, "aVertexCenterPosition");
	 
		this.uPMatrix         = gl.getUniformLocation(this.prg, "uPMatrix");
	 	this.uMVMatrix        = gl.getUniformLocation(this.prg, "uMVMatrix");
		this.uNMatrix         = gl.getUniformLocation(this.prg, "uNMatrix");
	 
		this.uMaterialDiffuse  = gl.getUniformLocation(this.prg, "uMaterialDiffuse");
		this.uMaterialAmbient  = gl.getUniformLocation(this.prg, "uMaterialAmbient");
	 	this.uMaterialSpecular = gl.getUniformLocation(this.prg, "uMaterialSpecular");
	 	this.uLightAmbient     = gl.getUniformLocation(this.prg, "uLightAmbient");
		this.uLightDiffuse     = gl.getUniformLocation(this.prg, "uLightDiffuse");
		this.uLightSpecular    = gl.getUniformLocation(this.prg, "uLightSpecular");
		this.uLightPosition    = gl.getUniformLocation(this.prg, "uLightPosition");
		this.uShininess        = gl.getUniformLocation(this.prg, "uShininess");
		this.uUpdateLight      = gl.getUniformLocation(this.prg, "uUpdateLight");
		this.uWireframe        = gl.getUniformLocation(this.prg, "uWireframe");
		this.uPerVertexColor   = gl.getUniformLocation(this.prg, "uPerVertexColor");
		this.uTranslation	   = gl.getUniformLocation(this.prg, "uTranslation");
		this.uTranslate		   = gl.getUniformLocation(this.prg, "uTranslate");
	 	this.uRotate		   = gl.getUniformLocation(this.prg, "uRotate");
	 	this.uMovementMatrix   = gl.getUniformLocation(this.prg, "uMovementMatrix");


		gl.uniform3fv(this.uLightPosition,    [0, 120, 120]);
		gl.uniform4fv(this.uLightAmbient,      [0.20,0.20,0.20,1.0]);
		gl.uniform4fv(this.uLightDiffuse,      [1.0,1.0,1.0,1.0]);
		gl.uniform4fv(this.uLightSpecular,     [1.0,1.0,1.0,1.0]);
		gl.uniform1f(this.uShininess, 230.0);

	};

	p._getShader = function(gl, id){

		var script = document.getElementById(id);
		if (!script) {
		   return null;
		}

		var str = "";
		var k = script.firstChild;
		while (k) {
			if (k.nodeType == 3) {
				str += k.textContent;
			}
			k = k.nextSibling;
		}

		var shader;
		if (script.type == "x-shader/x-fragment") {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		} else if (script.type == "x-shader/x-vertex") {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			return null;
		}

		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;

	};


})();