(function(){

	var Scene = function(){};

	if (!window.NS)
		window.NS = {};

	window.NS.Scene = Scene;

	var p = Scene.prototype;

	p.init = function(){

		this.objects = [];
	};

	p.getObject = function(alias){

		for(var i=0; i<this.objects.length; i++){
			if (alias == this.objects[i].alias) return this.objects[i];
		}
		return null;
	};

	p.loadObject = function(filename,alias,attributes){

		var request = new XMLHttpRequest();
		console.info('Requesting ' + filename);
		request.open("GET",filename);
	
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if(request.status == 404) {
					console.info(filename + ' does not exist');
				}
				else {
					var o = JSON.parse(request.responseText);
					o.alias = (alias==null)?'none':alias;
					o.remote = true;
					this.addObject(o,attributes);
				}
			}
		}
		request.send();
	};

	p.loadObjectByParts = function(path, alias, parts){

		for(var i = 1; i <= parts; i++){
			var partFilename =  path+''+i+'.json';
			var partAlias = alias+''+i;
			this.loadObject(partFilename,partAlias);
		}

	};

	p.addObject = function(object, attributes){

		 //initialize with defaults
		if (object.perVertexColor   === undefined)    {   object.perVertexColor   = false;            }
        if (object.wireframe        === undefined)    {   object.wireframe        = false;            }
        if (object.diffuse          === undefined)    {   object.diffuse          = [1.0,1.0,1.0,1.0];}
        if (object.ambient          === undefined)    {   object.ambient          = [0.1,0.1,0.1,1.0];}
        if (object.specular         === undefined)    {   object.specular         = [1.0,1.0,1.0,1.0];}
		
		//set attributes
	   for(var key in attributes){
			if(object.hasOwnProperty(key)) {object[key] = attributes[key];}
		}   

	
		var vertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
		  
		var normalBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
	
		var colorBufferObject;
	
		if (object.perVertexColor){
			colorBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors), gl.STATIC_DRAW);
			object.cbo = colorBufferObject;
		}
	
		var indexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
		
		object.vbo = vertexBufferObject;
		object.ibo = indexBufferObject;
		object.nbo = normalBufferObject;

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
	
		this.objects.push(object);
		
		if (object.remote){
			console.info(object.alias + ' has been added to the scene [Remote]');
		}
		else {
			console.info(object.alias + ' has been added to the scene [Local]');
		}
	};

})();