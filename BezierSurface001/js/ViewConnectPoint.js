(function(){

	var ViewConnectPoint = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewConnectPoint = ViewConnectPoint;

	var p = ViewConnectPoint.prototype;

	p.init = function(el, clickCallback, callbackScope){

		this._el = el;

		this._callbackScope = callbackScope;
		this._clickCallback = clickCallback;

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

			

			this._clickCallback.call(this._callbackScope, this._selectedAxis, this._selectedSubband);
			this.hide();
		}

		return false;


	};


	p.reset = function(){

		this._selectedAxis = null;
		this._selectedSubband = null;
	};

	p.show = function(pos){

		this.reset();

		this._el.style.display = 'block';
		this._el.style.left = pos[0] + 'px';
		this._el.style.top = pos[1] + 'px';

		this.showing = true;
	};

	p.hide = function(){



		this._el.style.display = 'none';

		this.showing = false;

	};

})();