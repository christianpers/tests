(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewBezier = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewBezier = ViewBezier;

	var p = ViewBezier.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;
		
		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [];

		var pointA = {x: -2.0, y: 2.0, z: 1.0};
		var pointB = {x: -1.0, y: 3.0, z: -1.0};
		var pointC = {x: 1.0, y: 3.0, z: 1.0};
		var pointD = {x: 2.0, y: 2.0, z: -1.0};
		
		var pointE = {x: -1.5, y: 1.0, z: 1.0};
		var pointF = {x: -0.5, y: 1.5, z: -1.0};
		var pointG = {x: 1.5, y: 1.5, z: 1.0};
		var pointH = {x: 2.5, y: 1.0, z: -1.0};
		
		var pointI = {x: -2.5, y: -1.0, z: 1.0};
		var pointJ = {x: -1.5, y: -0.5, z: -1.0};
		var pointK = {x: 0.5, y: -0.5, z: 1.0};
		var pointL = {x: 1.5, y: -1.0, z: -1.0};
		
		var pointM = {x: -2.0, y: -2.0, z: 1.0};
		var pointN = {x: -1.0, y: -1.0, z: -1.0};
		var pointO = {x: 1.0, y: -1.0, z: 1.0};
		var pointP = {x: 2.0, y: -2.0, z: -1.0};

		this.pointCoords = [
							pointA, 
							pointB, 
							pointC, 
							pointD, 
							pointE, 
							pointF, 
							pointG, 
							pointH, 
							pointI,
							pointJ,
							pointK,
							pointL,
							pointM,
							pointN,
							pointO,
							pointP
						];

		// for (var i=0;i<this.pointCoords.length;i++){

		// 	positions.push([this.pointCoords[i].x, this.pointCoords[i].y, this.pointCoords[i].z]);

		// 	indices.push(i);
		// }

		var detail = 20;
		var change = 1.0 / detail;

		var a = 1.0;
		var c = 1.0;

		var indicesCounter = 0;
		
		for (var i=0;i<detail;i++){

			for (var j=0;j<detail;j++){

				c -= change;

				var point = this.getPoint(i, j, a, c);
				// this.points.push(point);

				positions.push([point.x, point.y, point.z]);
				
				indices.push(indicesCounter);
				indicesCounter++;
			}



			a -= change;
			c = 1.0;
		}

		// for (var i=0;i<pointCoords.length;i++){


		// }

		

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.POINTS);
		this.mesh.bufferVertex(positions);
		// this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);

	};

	p.getPoint = function(index, innerIndex, a, c){

		var b = 1 - a;
		var d = 1 - c;
		var n = 3;

		var xVal = 0;
		var yVal = 0;
		var zVal = 0;
		
		xVal = this.calcCoords('x', a, b, c, d, n);
		yVal = this.calcCoords('y', a, b, c, d, n);
		zVal = this.calcCoords('z', a, b, c, d, n);

		return {x: xVal, y: yVal, z: zVal};

	};

	p.calcCoords = function(type, a, b, c, d, n){

		// FORMULA
		// Ax·a³·c³       + Bx·3·a³·c²·d
  //      + Cx·3·a³·c·d²   + Dx·a³·d³
  //      + Ex·3·a²·b·c³   + Fx·9·a²·b·c²·d
  //      + Gx·9·a²·b·c·d² + Hx·3·a²·b·d³
  //      + Ix·3·a·b²·c³   + Jx·9·a·b²·c²·d
  //      + Kx·9·a·b²·c·d² + Lx·3·a·b²·d³
  //      + Mx·b³·c³       + Nx·3·b³·c²·d
  //      + Ox·3·b³·c·d²   + Px·b³·d³

		// Ax·a³·c³
		var aVal = this.pointCoords[0][type] * Math.pow(a, n) * Math.pow(c, n);
		
		// Bx·3·a³·c²·d
		var bVal = this.pointCoords[1][type] * n * Math.pow(a, n) * Math.pow(c, n-1) * d;
		
		// Cx·3·a³·c·d²
		var cVal = this.pointCoords[2][type] * n * Math.pow(a, n) * c * Math.pow(d, n-1);
		
		// Dx·a³·d³
		var dVal = this.pointCoords[3][type] * Math.pow(a, n) * Math.pow(d, n);

		// Ex·3·a²·b·c³
		var eVal = this.pointCoords[4][type] * n * Math.pow(a, n-1) * b * Math.pow(c, n);

		// Fx·9·a²·b·c²·d
		var fVal = this.pointCoords[5][type] * 9 * Math.pow(a, n-1) * b * Math.pow(c, n-1) * d;

		// Gx·9·a²·b·c·d²
		var gVal = this.pointCoords[6][type] * 9 * Math.pow(a, n-1) * b * c * Math.pow(d, n-1);

		// Hx·3·a²·b·d³
		var hVal = this.pointCoords[7][type] * n * Math.pow(a, n-1) * b * Math.pow(d, n);

		// Ix·3·a·b²·c³
		var iVal = this.pointCoords[8][type] * n * a * Math.pow(b, n-1) * Math.pow(c, n);

		// Jx·9·a·b²·c²·d
		var jVal = this.pointCoords[9][type] * 9 * a * Math.pow(b, n-1) * Math.pow(c, n-1) * d;

		// Kx·9·a·b²·c·d²
		var kVal = this.pointCoords[10][type] * 9 * a * Math.pow(b, n-1) * c * Math.pow(d, n-1);

		// Lx·3·a·b²·d³
		var lVal = this.pointCoords[11][type] * n * a * Math.pow(b, n-1) * Math.pow(d, n);

		// Mx·b³·c³
		var mVal = this.pointCoords[12][type] * Math.pow(b, n) * Math.pow(c, n);

		// Nx·3·b³·c²·d
		var nVal = this.pointCoords[13][type] * n * Math.pow(b, n) * Math.pow(c, n-1) * d;

		// Ox·3·b³·c·d²
		var oVal = this.pointCoords[14][type] * n * Math.pow(b, n) * c * Math.pow(d, n-1);

		// Px·b³·d³
		var pVal = this.pointCoords[15][type] * Math.pow(b, n) * Math.pow(d, n);

		return aVal + bVal + cVal + dVal + eVal + fVal + gVal + hVal + iVal + jVal + kVal + lVal + mVal + nVal + oVal + pVal;
	
	};

	

	p.render = function(texturePos, texture) {

		this.transforms.calculateModelView();

		var mvMatrix = this.transforms.getMvMatrix();

		// mat4.rotate(mvMatrix, -.4*Math.PI, [1, 0, 0]);
        // mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
        // mat4.translate(mvMatrix, [-xPos, -yPos, -zPos]);
		// return;
		this.shader.bind();
		// this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureParticle", "uniform1i", 1);
		// texturePos.bind(this.shader, 0);
		// texture.bind(1);
		this.draw(this.mesh);
	};



})();