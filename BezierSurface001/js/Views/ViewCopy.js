(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewCopy = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewCopy = ViewCopy;

	var p = ViewCopy.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];


		var size = 1;
		positions.push([-size, -size, 0]);
		positions.push([ size, -size, 0]);
		positions.push([ size,  size, 0]);
		positions.push([-size,  size, 0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);


		this.mesh = new Mesh();
		this.mesh.init(4, 6, gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);

	};

	p.render = function(texturePos, texture) {

		this.transforms.calculateModelView();
		// return;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureParticle", "uniform1i", 1);
		texturePos.bind(this.shader, 0);
		// texture.bind(1);
		// GL.draw(this.mesh);
		this.draw(this.mesh);
	};



})();