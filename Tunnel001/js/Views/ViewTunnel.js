(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewTunnel = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewTunnel = ViewTunnel;

	var p = ViewTunnel.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath, isFront, texture){

		gl = window.NS.GL.glContext;
		
		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [];
		// var normals = [];
		// var tempVertex = [];

		var data = this.generateGeometry();

		this._counter = 0;
		this._duration = 10000;
		this._lastTimestamp = Date.now();

		this.isFront = isFront;
		this.textureShow = texture;

		// debugger;

		// for (var i=0;i<data.i.length;i += 3){
		// 	var p1 = data.v[data.i[i]];
		// 	var p2 = data.v[data.i[i+1]];
		// 	var p3 = data.v[data.i[i+2]];

		// 	var u = [ (p2[0] - p1[0]), (p2[1] - p1[1]), (p2[2] - p1[2]) ];
		// 	var v = [ (p3[0] - p1[0]), (p3[1] - p1[1]), (p3[2] - p1[2]) ];

		// 	var n0 = u[1] * v[2] - u[2] * v[1];
		// 	var n1 = u[2] * v[0] - u[0] * v[2];
		// 	var n2 = u[0] * v[1] - u[1] * v[0];

		// 	// normals.push([n0, n1, n2]);
		// }

		var normals = window.calculateNormals(data.t, data.i);

		// debugger;


		this.mesh = new Mesh();
		this.mesh.init(data.v.length, data.i.length, gl.TRIANGLES);
		this.mesh.bufferVertex(data.v);
		this.mesh.bufferTexCoords(data.u);
		this.mesh.bufferIndices(data.i);
		this.mesh.bufferData(normals, "aVertexNormal", 3);

	};

	p.generateGeometry = function(){

		var vertices = [];
		var indices = [];
		var uvs = [];
		var colors = [];
		var tempVertex = [];


		
		var radius = 9;
		var currentRadius = radius;
		var segments = 20;
		var spacing = 3;
		var numRings = 40;
		var index = 0;
		
		for(var ring=0; ring<numRings; ring++)
		{
			for(var segment=0; segment<segments; segment++)
			{
				var degrees = (360/segments) * segment;
				var radians = (Math.PI/180) * degrees;
				var x = Math.cos(radians) * currentRadius;
				var y = Math.sin(radians) * currentRadius;
				var z = (ring * -spacing );

				vertices.push([x, y, z]);
				tempVertex.push(x,y,z);
				if(segment < (segments-1)/ 2)
					uvs.push([(1.0/(segments))*segment*2, (1.0/4)*ring]);
				else
					uvs.push([2.0-((1.0/(segments))*segment*2), (1.0/4)*ring]);
					
				var color = 1.0-((1.0/(numRings-1))*ring);
				colors.push([color, color, color, 1.0]);

				if(ring<numRings-1) {
					if(segment < segments-1) {
						indices.push(index, index + segments + 1, index + segments);
						indices.push(index, index+1, index + segments + 1);
					} else {
						indices.push(index, index + 1, index + segments);
						indices.push(index, index - segments + 1, index + 1);
					}
				}

				index++;
			}
			// currentRadius -= ;
		}


		return {'v':vertices, 'i':indices, 'u':uvs, 't':tempVertex};
	};

	

	

	p.render = function(permTexture, simplexTexture, zPos) {

		this.transforms.calculateModelView();

		// var mvMatrix = this.transforms.getMvMatrix();

		// mat4.rotate(mvMatrix, -.4*Math.PI, [1, 0, 0]);
        // mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
     

		//debugger;

		var now = Date.now();
		var diff = now - this._lastTimestamp;
		if (diff >= this._duration){
			this._lastTimestamp = now;
		}



	
		this.shader.bind();
		this.shader.uniform("time", "uniform1f", now);
		this.shader.uniform("permTexture", "uniform1i", 0);
		this.shader.uniform("simplexTexture", "uniform1i", 1);
		this.shader.uniform("testTexture", "uniform1i", 2);
		this.shader.uniform("testVar", "uniform1f", diff);
		this.shader.uniform("audioEnergy", "uniform1f", window.NS.params.audioData[3]);


		// console.log(Date.now());

		var nMatrix = mat4.create();
		var mvMatrix = this.transforms.getMvMatrix();
		mat4.translate(mvMatrix, [0, 0, zPos]);
		
		mat4.set(mvMatrix, nMatrix);
        mat4.inverse(nMatrix);
        mat4.transpose(nMatrix);

		this.shader.uniform("uNMatrix", "uniformMatrix4fv", nMatrix);

		this.shader.uniform("uLightPosition", "uniform3fv", new Float32Array([0.0,0.0,-30.0]) );
		this.shader.uniform("uLightAmbient", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );
		this.shader.uniform("uLightDiffuse", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );
		this.shader.uniform("uLightSpecular", "uniform4fv", new Float32Array([1.0, 1.0, 1.0, 1.0]) );

		this.shader.uniform("uMaterialAmbient", "uniform4fv", new Float32Array([0.1, 0.1, 0.1, 1.0]));
		this.shader.uniform("uMaterialDiffuse", "uniform4fv", new Float32Array([0.5, 0.8, 0.1, 1.0]));
		this.shader.uniform("uMaterialSpecular", "uniform4fv", new Float32Array([0.6, 0.6, 0.6, 1.0]));
		this.shader.uniform("uShininess", "uniform1f", 100.0);

		
		
		permTexture.bind(this.shader, 0);
		
		simplexTexture.bind(this.shader, 1);

		this.textureShow.bind(this.shader, 2);
		this.draw(this.mesh);
	};



})();