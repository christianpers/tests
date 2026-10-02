(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Framework.Mesh;

	var ViewFramebuffer = function(){};

	if (!window.NS.GL.Framework.Views)
		window.NS.GL.Framework.Views = {};

	window.NS.GL.Framework.Views.ViewFramebuffer = ViewFramebuffer;

	var p = ViewFramebuffer.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);



		this.vertices = [-1.0, -1.0, 0.0,
				1.0, -1.0, 0.0,
				1.0, 1.0, 0.0,
				-1.0, 1.0, 0.0];
		this.indices = [0,1,2, 0,3,2];

		this.textureCoords = [0.0,  0.0,
				    1.0,  0.0,
				    1.0,  1.0,
				    0.0,  1.0];


		this.mesh = new Mesh();
		this.mesh.init(this.vertices.length, this.indices.length, gl.TRIANGLES);
		this.mesh.bufferVertex(this.vertices);
		// this.mesh.bufferTexCoords(this.textureCoords);
		this.mesh.bufferIndices(this.indices);
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