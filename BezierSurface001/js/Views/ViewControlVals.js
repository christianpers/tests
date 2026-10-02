(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewControlVals = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewControlVals = ViewControlVals;

	var p = ViewControlVals.prototype = new View();
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

		var index = 0;

		var detail = window.NS.params.detail;

		var totalDetail = detail * detail;

		var change = 1.0 / detail;

		var a = 1.0;
		var c = 1.0;
		for (var i=0;i<detail;i++){


			for (var j=0;j<detail;j++){

				c -= change;

				colors.push([a, c, 0.0]);
				
			}

			a -= change;
			c = 1.0;
		}

		var y = 1 - (2 / (detail * 2));
		var step = 2 / detail;

		for (var row=0;row<detail;row++){
			
			var x = -1 + (2 / (detail * 2));
			for (var col=0;col<detail;col++){

				positions.push([x, y, 0]);
				indices.push(index);
				coords.push([0,0]);
				// colors.push([.5, .5, .5]);


				x += step;
				index++;

			}

			y -= step;
		}
		
		// var currentRow = 0;
		// var currentCol = 0;
		// var size = 2 / detail;
		// for (var i=0;i<totalDetail;i++){
			
		// 	var tx = i % detail;
		// 	var ty = Math.floor(i/detail);
		// 	var ux = (tx / detail) * 2 - 1;
		// 	var uy = (ty / detail) * 2 - 0.95;

		// 	positions.push([ux + (1/detail), uy, 0]);
		// 	coords.push([0, 0]);
		// 	indices.push(index);
		
		// 	index++;
		// }

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(colors, "aVertexColor", 3);
	
	};
	

	p.render = function(texturePos, texture) {

		this.transforms.calculateModelView();

		// var mvMatrix = this.transforms.getMvMatrix();

		// mat4.rotate(mvMatrix, -.4*Math.PI, [1, 0, 0]);
        // mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
        // mat4.translate(mvMatrix, [-xPos, -yPos, -zPos]);
		// return;
		// debugger;
		this.shader.bind();
		// this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureParticle", "uniform1i", 1);
		// texturePos.bind(this.shader, 0);
		// texture.bind(1);
		this.draw(this.mesh);
	};



})();