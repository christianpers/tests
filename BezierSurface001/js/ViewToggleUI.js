(function(){

	

	var ViewToggleUI = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewToggleUI = ViewToggleUI;

	var p = ViewToggleUI.prototype;

	p.init = function(el, activateCallback, disableCallback, scope){

		this._el = el;
		this._activateCallback = activateCallback;
		this._disableCallback = disableCallback;
		this._callbackScope = scope;

		this._isUIShowing = true;

		this._showUICopy = this._el.querySelector('.show');
		this._hideUICopy = this._el.querySelector('.hide');

		this._showUICopy.style.display = 'none';
	
		this._el.addEventListener('click', this._onClick.bind(this));
	};

	p._onClick = function(e){

		e.preventDefault();
		e.stopPropagation();

		this.toggleUI();
	};

	p.toggleUI = function(){

		if (this._isUIShowing){
			this._disableCallback.call(this._callbackScope);
			this._isUIShowing = false;
			this._showUICopy.style.display = 'block';
			this._hideUICopy.style.display = 'none';
		}else{
			this._activateCallback.call(this._callbackScope);
			this._isUIShowing = true;
			this._showUICopy.style.display = 'none';
			this._hideUICopy.style.display = 'block';
		}
	};

})();