(function(){



	var SelectMenu = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.SelectMenu = SelectMenu;

	var p = SelectMenu.prototype;

	p.init = function(el, callback, scope){

		this._el = el;

		this._callbackScope = scope;
		this._clickCallback = callback;

		this.showing = false;

		this._axisWrapper = this._el.querySelector('.axis');
		var axisOptions = this._axisWrapper.querySelectorAll('.axisItem');

		this._subbandWrapper = this._el.querySelector('.subband');
		var subbandOptions = this._subbandWrapper.querySelectorAll('.subbandItem');

		this._axisOptions = this.getOptions(axisOptions);
		this._subbandOptions = this.getOptions(subbandOptions);



		this.reset();

	};

	p.getOptions = function(els){

		var arr = [];

		for (var i=0;i<els.length;i++){

			var obj = {};
			obj.el = els[i];
			obj.val = els[i].getAttribute('data-idx');
			var selectLayer = obj.el.querySelector('.selectLayer');
			selectLayer.addEventListener('click', this._onOptionClick.bind(this));

			arr[obj.val] = obj;
			
		}

		return arr;
	};

	p._onOptionClick = function(e){

		console.log('on option click');

		e.preventDefault();
		e.stopPropagation();

		
		var type = e.target.parentNode.getAttribute('data-type');

		if (!type) return;

		if (type == 'axis'){

			var obj = this._axisOptions[e.target.parentNode.getAttribute('data-idx')];

			this._selectedAxis = obj;
		}
		else{
			var obj = this._subbandOptions[e.target.parentNode.getAttribute('data-idx')];

			this._selectedSubband = obj;
		}

		

		if (this._selectedAxis !== null && this._selectedSubband !== null){

			

			this._clickCallback.call(this._callbackScope, this._selectedAxis, this._selectedSubband, this.currentControlPoint);
			this.hide();
		}

		return false;


	};


	p.reset = function(){

		this._selectedAxis = null;
		this._selectedSubband = null;
		this.currentControlPoint = null;
	};

	p.show = function(pos, controlPoint){

		this.reset();

		this.currentControlPoint = controlPoint;

		this._el.style.display = 'block';
		this._el.style.left = pos[0] + 'px';
		this._el.style.top = pos[1] + 'px';

		this.showing = true;
	};

	p.hide = function(){

		this.reset();

		this._el.style.display = 'none';

		this.showing = false;

	};

})();