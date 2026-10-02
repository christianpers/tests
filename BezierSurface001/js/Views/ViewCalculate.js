(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewCalculate = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewCalculate = ViewCalculate;

	var p = ViewCalculate.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;

		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];

		positions.push([-1,	-1,  0]);
		positions.push([ 1,	-1,  0]);
		positions.push([ 1,	 1,  0]);
		positions.push([-1,	 1,  0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);

	};

	p.normalizeCoords = function(){

		var clonedCoords = [];

		for (var i=0;i<window.NS.params.pointCoords.length;i++){

			clonedCoords.push(window.NS.params.pointCoords[i].pos.slice(0));
		}

		

		// var mergedArr = [];
		// for (var i=0;i<clonedCoords.length;i++){
		// 	for (var j=0;j<clonedCoords[i].length;j++){
		// 		mergedArr.push(clonedCoords[i][j]);
		// 	}
			
		// }

		// var max = Math.max.apply(null, mergedArr);
		// var min = Math.min.apply(null, mergedArr);

		var max = 1.0;
		var min = -1.0;

		var range = Math.abs(min - max);

		for (var i=0;i<clonedCoords.length;i++){
			for (var j=0;j<clonedCoords[i].length;j++){
				clonedCoords[i][j] += Math.abs(min);
				clonedCoords[i][j] = clonedCoords[i][j] / range;
			}
		}

		// debugger;

		return clonedCoords;
	};

	p.render = function(texture, textureControlVals) {
		this.transforms.calculateModelView();
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("textureControlVals", "uniform1i", 1);
		
		this.shader.uniform("detail", "uniform1i", window.NS.params.detail);

		var normalized = this.normalizeCoords();

		// console.log(normalized[0]);

		// debugger;


		this.shader.uniform("pointA", "uniform3fv", new Float32Array([normalized[0][0], normalized[0][1], normalized[0][2] ]) );
		this.shader.uniform("pointB", "uniform3fv", new Float32Array([normalized[1][0], normalized[1][1], normalized[1][2] ]) );
		this.shader.uniform("pointC", "uniform3fv", new Float32Array([normalized[2][0], normalized[2][1], normalized[2][2] ]) );
		this.shader.uniform("pointD", "uniform3fv", new Float32Array([normalized[3][0], normalized[3][1], normalized[3][2] ]) );
		
		this.shader.uniform("pointE", "uniform3fv", new Float32Array([normalized[4][0], normalized[4][1], normalized[4][2] ]) );
		this.shader.uniform("pointF", "uniform3fv", new Float32Array([normalized[5][0], normalized[5][1], normalized[5][2] ]) );
		this.shader.uniform("pointG", "uniform3fv", new Float32Array([normalized[6][0], normalized[6][1], normalized[6][2] ]) );
		this.shader.uniform("pointH", "uniform3fv", new Float32Array([normalized[7][0], normalized[7][1], normalized[7][2] ]) );
		
		this.shader.uniform("pointI", "uniform3fv", new Float32Array([normalized[8][0], normalized[8][1], normalized[8][2] ]) );
		this.shader.uniform("pointJ", "uniform3fv", new Float32Array([normalized[9][0], normalized[9][1], normalized[9][2] ]) );
		this.shader.uniform("pointK", "uniform3fv", new Float32Array([normalized[10][0], normalized[10][1], normalized[10][2] ]) );
		this.shader.uniform("pointL", "uniform3fv", new Float32Array([normalized[11][0], normalized[11][1], normalized[11][2] ]) );
		
		this.shader.uniform("pointM", "uniform3fv", new Float32Array([normalized[12][0], normalized[12][1], normalized[12][2] ]) );
		this.shader.uniform("pointN", "uniform3fv", new Float32Array([normalized[13][0], normalized[13][1], normalized[13][2] ]) );
		this.shader.uniform("pointO", "uniform3fv", new Float32Array([normalized[14][0], normalized[14][1], normalized[14][2] ]) );
		this.shader.uniform("pointP", "uniform3fv", new Float32Array([normalized[15][0], normalized[15][1], normalized[15][2] ]) );

		texture.bind(this.shader, 0);
		textureControlVals.bind(this.shader, 1, true);
		// textureForce.bind(this.shader, 1, true);
	
		this.draw(this.mesh);
	};



})();