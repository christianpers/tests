(function(){

	var View = window.NS.GL.Framework.View;
	var Mesh = window.NS.GL.Framework.Mesh;

	var ViewCalculate = function(){};

	if (!window.NS.GL.Framework.Views)
		window.NS.GL.Framework.Views = {};

	window.NS.GL.Framework.Views.ViewCalculate = ViewCalculate;

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

	p.render = function(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		// this.shader.uniform("textureForce", "uniform1i", 1);
		// this.shader.uniform("time", "uniform1f", this.count++ * .001);

		this.shader.uniform("bandEnergyOne", "uniform1f", params.audioData[0]);
		this.shader.uniform("bandEnergyTwo", "uniform1f", params.audioData[1]);
		this.shader.uniform("bandEnergyThree", "uniform1f", params.audioData[2]);
		this.shader.uniform("bandEnergyFour", "uniform1f", params.audioData[3]);
		this.shader.uniform("bandEnergyFive", "uniform1f", params.audioData[4]);
		this.shader.uniform("bandEnergySix", "uniform1f", params.audioData[5]);
		this.shader.uniform("bandEnergySeven", "uniform1f", params.audioData[6]);
		this.shader.uniform("bandEnergyEight", "uniform1f", params.audioData[7]);
		this.shader.uniform("bandEnergyNine", "uniform1f", params.audioData[8]);
		this.shader.uniform("bandEnergyTen", "uniform1f", params.audioData[9]);


		// this.shader.uniform("velOffset", "uniform1f", params.velOffset);
		// this.shader.uniform("accOffset", "uniform1f", params.accOffset);
		// this.shader.uniform("posOffset", "uniform1f", params.posOffset);
		texture.bind(this.shader, 0);
		// textureForce.bind(this.shader, 1, true);
		// GL.draw(this.mesh);
		this.draw(this.mesh);
	};



})();