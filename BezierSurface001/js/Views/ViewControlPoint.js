(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewControlPoint = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewControlPoint = ViewControlPoint;

	var p = ViewControlPoint.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath, point){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);

		this._point = point;
		var diffuseR = Math.round( (point.id / 255) * 100) / 100;
		this._diffuse = [diffuseR, 1.0, 1.0, 1.0];

		this.lastPos = point.pos.slice(0);

		this.connectedAxis = -1;
		this.connectedSubband = -1;

		this._color = [1.0, point.id/10, 1.0, 1.0];

		this.showing = true;

		this.id = diffuseR;

		this.selected = false;
		this.connected = false;

		var positions = [];
		var coords = [];
		var indices = [ 0,1,2,0,2,3,
						3,2,4,3,4,5,
						5,4,6,5,6,7,
						0,3,7,7,3,5,
						7,6,1,7,1,0,
						1,6,4,1,4,2
					];


		var size = .02;
	

		positions.push([-size, size, size]);
		positions.push([-size, -size, size]);
		positions.push([size, -size, size]);
		positions.push([size, size, size]);
		positions.push([size, -size, -size]);
		positions.push([size, size, -size]);
		positions.push([-size, -size, -size ]);
		positions.push([-size, size, -size]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);
		coords.push([0, 1]);
		coords.push([0, 1]);
		coords.push([0, 1]);
		coords.push([0, 1]);

		
		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);

	};

	p.render = function(drawColorMap) {

		if (!this.showing) return;

		this.transforms.calculateModelView();

		var mvMatrix = this.transforms.getMvMatrix();

		// debugger;

  		var x = this._point.pos[0];
		var y = this._point.pos[1];
		var z = this._point.pos[2];

		
		this._color = this._point.color.slice(0);



		// console.log(this._point.pos);
  		
       	mat4.translate(mvMatrix, [x, y, z]);
		
		this.shader.bind();
	
		this.shader.uniform("uDrawColourMap", "uniform1i", drawColorMap ? 1 : 0);
		this.shader.uniform("uDiffuseColor", "uniform4fv", new Float32Array(this._diffuse) );
		this.shader.uniform("uColor", "uniform3fv", new Float32Array(this._color));
		
		this.draw(this.mesh);
	};



})();