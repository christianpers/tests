(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewMap = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewMap = ViewMap;

	var p = ViewMap.prototype = new View();
	var s = View.prototype;

	var gl = null;

	var random = function(min, max) { return min + Math.random() * (max - min); }

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;
		
		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [];
		var colors = [];


		this.pointCoords = window.NS.params.pointCoords;

		var detail = window.NS.params.detail;
		var change = 1.0 / detail;

		var nrPoints = detail * detail;
		
		for (var i=0;i<nrPoints;i++){

			positions.push([0, 0, 0]);
			
			var tx = i % detail;
			var ty = Math.floor(i / detail);
			var ux = tx / detail;
			var uy = ty / detail;

			coords.push([ux, uy]);
			
			indices.push(i);

			// console.log('ux: ',ux, ' uy: ',uy);
			
		}

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);

		// this.mesh.bufferData(colors, "aVertexColor", 3);
	
	};	

	p.render = function(texturePos, texture) {

		this.transforms.calculateModelView();

		// var mvMatrix = this.transforms.getMvMatrix();

		// mat4.rotate(mvMatrix, -.4*Math.PI, [1, 0, 0]);
        // mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
        // mat4.translate(mvMatrix, [-xPos, -yPos, -zPos]);
		// return;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureParticle", "uniform1i", 1);
		texturePos.bind(this.shader, 0);
		// texture.bind(1);
		this.draw(this.mesh);
	};



})();