(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Framework.Mesh;

	var ViewMap = function(){};

	if (!window.NS.GL.Framework.Views)
		window.NS.GL.Framework.Views = {};

	window.NS.GL.Framework.Views.ViewMap = ViewMap;

	var p = ViewMap.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(particles, vertPath, fragPath){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);

		this.particles = particles;

		var positions = [];
		var coords = [];
		var indices = [];
		var extra = [];

		var numParticles = params.sqrtParticles;

		for(var i=0; i<this.particles.length; i++) {
			positions.push([0, 0, 0]);

			var tx = i % numParticles;
			var ty = Math.floor(i/numParticles);
			var ux = tx / numParticles;
			var uy = ty / numParticles;

			// positions.push([ux, uy, 0]);
			coords.push([ux, uy]);
			indices.push(i);
			extra.push([Math.random() * 3 + .1, Math.random() * .9 + .1, 0])
		}

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(extra, "aExtra", 3);

	};

	p.render = function(texturePos, texture) {
		// return;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureParticle", "uniform1i", 1);
		// texturePos.bind(this.shader, 0);
		texturePos.bind(this.shader, 0);
		// GL.draw(this.mesh);
		this.draw(this.mesh);
	};



})();