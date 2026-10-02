(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewPlain = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewPlain = ViewPlain;

	var p = ViewPlain.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;
		
		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [];

		var tempPositions = [];

		// var size = .5;
		// positions.push([-size, -size, 0]);
		// positions.push([ size, -size, 0]);
		// positions.push([ size,  size, 0]);
		// positions.push([-size,  size, 0]);

		var size = 1;
		var nrCols = 40;
		var nrRows = 40;
		var currentZ = 8;
		var currentY = 0;
		var currentX = - (nrCols / 2) * size;
		
		var y = -1;
		var index = 0;

		for (var i=0;i<nrRows;i++){
			for (var j=0;j<nrCols;j++){

				var leftX = currentX;
				var rightX = leftX + size;
				var topZ = currentZ - 1;
				var bottomZ = currentZ;

			

				// topleft
				positions.push([leftX, y, topZ]);
				tempPositions.push(leftX, y, topZ);
				// topRight
				positions.push([rightX, y, topZ]);
				tempPositions.push(rightX, y, topZ);
				// bottomLeft
				positions.push([leftX, y, bottomZ]);
				tempPositions.push(leftX, y, bottomZ);
				// bottomRight
				positions.push([rightX, y, bottomZ]);
				tempPositions.push(rightX, y, bottomZ);

				indices.push(index+2, index, index+1, index+3, index+2, index+1);

				index += 4;
				currentX += size;
			}

			currentX = -(nrCols /2 )* size;

			currentZ -= 1;

		}

		var normals = window.calculateNormals(tempPositions, indices);

		
	

		this.mesh = new Mesh();
		this.mesh.textureUsed = true;
		this.mesh.init(positions.length, indices.length, gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		// this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(normals, "aVertexNormal", 3);


	};

	

	p.render = function(permTexture, simplexTexture) {

		this.transforms.calculateModelView();

		var nMatrix = mat4.create();
		var mvMatrix = this.transforms.getMvMatrix();
		mat4.set(mvMatrix, nMatrix);
        mat4.inverse(nMatrix);
        mat4.transpose(nMatrix);

		this.shader.bind();
		this.shader.uniform("time", "uniform1f", Date.now());
		this.shader.uniform("permTexture", "uniform1i", 0);
		this.shader.uniform("simplexTexture", "uniform1i", 1);
		this.shader.uniform("uNMatrix", "uniformMatrix4fv", nMatrix);

		this.shader.uniform("uLightPosition", "uniform3fv", new Float32Array([0.0,-10.0,5.0]) );
		this.shader.uniform("uLightAmbient", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );
		this.shader.uniform("uLightDiffuse", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );
		this.shader.uniform("uLightSpecular", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );

		this.shader.uniform("uMaterialAmbient", "uniform4fv", new Float32Array([0.1, 0.1, 0.1, 1.0]));
		this.shader.uniform("uMaterialDiffuse", "uniform4fv", new Float32Array([0.5, 0.8, 0.1, 1.0]));
		this.shader.uniform("uMaterialSpecular", "uniform4fv", new Float32Array([0.6, 0.6, 0.6, 1.0]));
		this.shader.uniform("uShininess", "uniform1f", 100.0);

		//Light uniforms
		// gl.uniform3fv(this.shader.prg.uLightPosition,[4.5,3.0,15.0]);        
		// gl.uniform4f(this.shader.prg.uLightAmbient ,1.0,1.0,1.0,1.0);
		// gl.uniform4f(prg.uLightDiffuse,1.0,1.0,1.0,1.0);
		// gl.uniform4f(prg.uLightSpecular,1.0,1.0,1.0,1.0);

		// //Object Uniforms
		// gl.uniform4f(prg.uMaterialAmbient, 0.1,0.1,0.1,1.0);
		// gl.uniform4f(prg.uMaterialDiffuse, 0.5,0.8,0.1,1.0);
		// gl.uniform4f(prg.uMaterialSpecular, 0.6,0.6,0.6,1.0);
		// gl.uniform1f(prg.uShininess, 200.0);

		
		permTexture.bind(this.shader, 0);
		
		simplexTexture.bind(this.shader, 1);

		this.draw(this.mesh);
	};



})();