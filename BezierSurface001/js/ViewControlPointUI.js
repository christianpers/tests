(function(){

	var ViewControlPointUI = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewControlPointUI = ViewControlPointUI;

	var p = ViewControlPointUI.prototype;

	p.init = function(parentEl, controlPoint, activateCallback, disableCallback, scope){

		this._parentEl = parentEl;
		this._controlPoint = controlPoint;
		this._activateCallback = activateCallback;
		this._disableCallback = disableCallback;
		this._callbackScope = scope;

		this._isActivateShowing = true;
	
		this._el = document.createElement('div');
		this._el.className = 'controlPointItem';

		var colorEl = document.createElement('div');
		colorEl.className = 'pointColor';
		var r = this._controlPoint._point.color[0] * 255;
		var g = this._controlPoint._point.color[1] * 255;
		var b = this._controlPoint._point.color[2] * 255;

		colorEl.style.backgroundColor = "rgba("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+",1.0)";

		this._activateEl = document.createElement('a');
		this._activateEl.className = 'status';
		this._activateEl.innerHTML = 'Activate';

		this._disableEl = document.createElement('a');
		this._disableEl.className = 'status';
		this._disableEl.style.display = 'none';
		this._disableEl.innerHTML = 'Disable';

		this._el.appendChild(colorEl);

		this._el.appendChild(this._activateEl);
		this._el.appendChild(this._disableEl);

	

		this._activateEl.addEventListener('click', this._onActivateClick.bind(this));
		this._disableEl.addEventListener('click', this._onDisableClick.bind(this));

		this._parentEl.appendChild(this._el);

	};

	p.show = function(){

		this._el.style.display = 'block';
	};

	p.hide = function(){

		this._el.style.display = 'none';
	};


	p._onActivateClick = function(e){

		e.preventDefault();
		e.stopPropagation();

		this._activateCallback.call(this._callbackScope, [this._el.clientWidth, this._el.offsetTop], this._controlPoint);


	};

	p._onDisableClick = function(e){

		e.preventDefault();
		e.stopPropagation();

		this._disableCallback.call(this._callbackScope, this._controlPoint);
	};

	p.update = function(){

		if (this._controlPoint.connected){
			if (this._isActivateShowing){
				this._activateEl.style.display = 'none';
				this._disableEl.style.display = 'block';
				this._isActivateShowing = false;
			}
			
		}else{
			if (!this._isActivateShowing){
				this._disableEl.style.display = 'none';
				this._activateEl.style.display = 'block';
				this._isActivateShowing = true;
			}
			
		}
	};	

})();