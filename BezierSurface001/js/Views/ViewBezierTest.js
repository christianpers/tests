(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Mesh;

	var ViewBezierTest = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewBezierTest = ViewBezierTest;

	var p = ViewBezierTest.prototype = new View();
	var s = View.prototype;

	var gl = null;

	p.init = function(vertPath, fragPath){

		gl = window.NS.GL.glContext;
		
		s.init.call(this, vertPath, fragPath);

		var positions = [];
		var coords = [];
		var indices = [];

		var pointA = {x: -2.0, y: 2.0, z: 1.0};
		var pointB = {x: -1.0, y: 2.0, z: 1.0};
		var pointC = {x: 1.0, y: 1.0, z: 2.0};
		var pointD = {x: 2.0, y: 2.0, z: 1.0};
		
		var pointE = {x: -2.0, y: 1.0, z: 1.0};
		var pointF = {x: -1.0, y: 1.0, z: 1.0};
		var pointG = {x: 1.0, y: 1.0, z: 1.0};
		var pointH = {x: 2.0, y: 1.0, z: 1.0};
		
		var pointI = {x: -2.0, y: -1.0, z: 1.0};
		var pointJ = {x: -1.0, y: -1.0, z: 1.0};
		var pointK = {x: 1.0, y: -1.0, z: -1.0};
		var pointL = {x: 2.0, y: -1.0, z: 1.0};
		
		var pointM = {x: -2.0, y: -2.0, z: 1.0};
		var pointN = {x: -1.0, y: -2.0, z: 1.0};
		var pointO = {x: 1.0, y: -2.0, z: 1.0};
		var pointP = {x: 2.0, y: -2.0, z: 1.0};

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


		var totalDetail = detail * detail;
		
		var tempPositions = [];
		
		for (var i=0;i<detail;i++){


			for (var j=0;j<detail;j++){

				c -= change;

				var point = this.getPoint(i, j, a, c);
				// this.points.push(point);


				tempPositions.push([point.x, point.y, point.z]);

				
			}

			a -= change;
			c = 1.0;
		}

		var tempIndices = [];
		
		var borderWidth = 0.01;
		var indicesCounter = 0;
		for (var i=0;i<tempPositions.length;i++){

			// debugger;

			var topLeft = i;
			var topRight = i+1;
			var bottomLeft = i+detail;
			var bottomRight = topRight+detail;

			var countI = i+1;
			
			if ( countI % detail == 0 ) {
				var topLeftPoint = tempPositions[topLeft];
				var bottomLeftPoint = tempPositions[bottomLeft];
				if (!bottomLeftPoint) continue;

				var topLeftRightPoint = [ topLeftPoint[0]+borderWidth, topLeftPoint[1], topLeftPoint[2] ];

				var bottomLeftRightPoint = [ bottomLeftPoint[0]+borderWidth, bottomLeftPoint[1], bottomLeftPoint[2] ];

				positions.push(topLeftPoint, topLeftRightPoint, bottomLeftPoint, bottomLeftRightPoint);

				tempIndices.push([indicesCounter, indicesCounter+1, indicesCounter+2, indicesCounter+2, indicesCounter+3, indicesCounter+1]);
				indicesCounter += 4;

			}else if(countI > (totalDetail - detail)){
				var topRightPoint = tempPositions[topRight];
			
				var topLeftPoint = tempPositions[topLeft];

				var topLeftLowerPoint = [ topLeftPoint[0], topLeftPoint[1]-borderWidth, topLeftPoint[2] ];
				var topRightLowerPoint = [ topRightPoint[0], topRightPoint[1]-borderWidth, topRightPoint[2] ];

				positions.push(topLeftPoint, topLeftLowerPoint, topRightPoint, topRightLowerPoint);

				tempIndices.push([indicesCounter, indicesCounter+1, indicesCounter+2, indicesCounter+2, indicesCounter+3, indicesCounter+1]);
				indicesCounter += 4;


			}else{
				var topLeftPoint = tempPositions[topLeft];
				var topRightPoint = tempPositions[topRight];
				var bottomLeftPoint = tempPositions[bottomLeft];
				var bottomRightPoint = tempPositions[bottomRight];

				var topLeftLowerPoint = [ topLeftPoint[0], topLeftPoint[1]-borderWidth, topLeftPoint[2] ];
				var topLeftRightPoint = [ topLeftPoint[0]+borderWidth, topLeftPoint[1], topLeftPoint[2] ];

				var topRightLowerPoint = [ topRightPoint[0], topRightPoint[1]-borderWidth, topRightPoint[2] ];
				var topRightLeftPoint = [ topRightPoint[0]+borderWidth, topRightPoint[1], topRightPoint[2] ];

				var bottomLeftRightPoint = [ bottomLeftPoint[0]+borderWidth, bottomLeftPoint[1], bottomLeftPoint[2] ];

				positions.push(topLeftPoint, topLeftLowerPoint, topLeftRightPoint, topRightPoint, topRightLowerPoint, topRightLeftPoint, bottomLeftPoint, bottomRightPoint, bottomLeftRightPoint);

				//vertical lines
				tempIndices.push([indicesCounter, indicesCounter+1, indicesCounter+3, indicesCounter+3, indicesCounter+4, indicesCounter+1]);
				
				//horizontal lines

				tempIndices.push([indicesCounter, indicesCounter+2, indicesCounter+6, indicesCounter+6, indicesCounter+8, indicesCounter+2]);
				indicesCounter += 9;
			}
			

			
			
		}

		indices = [].concat.apply([], tempIndices);		

		this.mesh = new Mesh();
		this.mesh.init(positions.length, indices.length, gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		// this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		// this.mesh.bufferData(extra, "barycentric", 3);

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