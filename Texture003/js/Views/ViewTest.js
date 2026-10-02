(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Framework.Mesh;
	var MeshParticles = window.NS.GL.Framework.MeshParticles;

	var ViewTest = function(){};

	if (!window.NS.GL.Framework.Views)
		window.NS.GL.Framework.Views = {};

	window.NS.GL.Framework.Views.ViewTest = ViewTest;

	var p = ViewTest.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(particles, vertPath, fragPath){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);
		
		var positions = [];
		var colors = [];
		var coords = [];
		var indices = [];
		var size = 2;
		var index = 0;

		// var numParticles = params.sqrtParticles;

		// for(var i=0; i<particles.length; i++) {
		// 	var p = particles[i];

		// 	var tx = i % numParticles;
		// 	var ty = Math.floor(i/numParticles);
		// 	var ux = tx / numParticles;
		// 	var uy = ty / numParticles;

		// 	ux -= 1.0;
		// 	// ux = (ux-.5) * 2.0;
		// 	uy = (uy-.5) * 2.0;

		// 	// console.log( ux, uy );

		// 	positions.push([ux, uy, 0]);
		// 	coords.push([0, 0]);
		// 	indices.push(index);
		// 	colors.push([p.x, p.y, p.z]);

		// 	index++;
		// }


		this.mesh = new MeshParticles();
		this.mesh.init(positions.length, indices.length, gl.POINTS);
		this.mesh.bufferVertex(particles);
		// this.mesh.bufferTexCoords(coords);
		// this.mesh.bufferIndices(indices);
		// this.mesh.bufferData(colors, "aVertexColor", 3);

	};

	p.render = function() {
		this.shader.bind();

		this.shader.uniform('mParticleTex','uniform1i',0);
		// texture.bind(0);
		// GL.draw(this.mesh);

		// gl.uniformMatrix4fv(this.shader.prg.uMovementMatrix, false, jsSquare.getMovement());
		// gl.uniform4fv(program.uMaterialDiffuse, jsSquare.color);

		this.draw(this.mesh);
		// window.NS.GL.global.setShader(this.shader);
		// window.NS.GL.global.draw(this.mesh);
	};



})();