(function(){

	

	var ViewAnalyser = function(){};

	if (!window.NS.GL.Views)
		window.NS.GL.Views = {};

	window.NS.GL.Views.ViewAnalyser = ViewAnalyser;

	var p = ViewAnalyser.prototype;



	function addClass(el, className) {
	  if (el.classList)
	    el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}

	function removeClass(el, className) {
	  if (el.classList)
	    el.classList.remove(className)
	  else if (hasClass(el, className)) {
	    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
	    el.className=el.className.replace(reg, ' ')
	  }
	}
	




	p.init = function(el, clickCallback, callbackScope){

		this._el = el;

		this._callbackScope = callbackScope;
		this._clickCallback = clickCallback;

		this.onSelectItemClickBound = this.onSelectItemClick.bind(this);

		this._selectItems = [];
		var items = this._el.querySelectorAll('.selectItem');
		for (var i=0;i<items.length;i++){
			var obj = {};
			obj.el = items[i];
			obj.selected = false;
			obj.connected = false;
			obj.connectedPoint = null;

			// obj.el.addEventListener('click', this.onSelectItemClickBound);

			this._selectItems[obj.el.getAttribute('data-id')] = obj;
		}

	};

	p.onSelectItemClick = function(e){

		e.preventDefault();
		e.stopPropagation();

		var obj = this._selectItems[e.target.getAttribute('data-id')];

		if (obj){
			this._clickCallback.call(this._callbackScope, obj);

			this.hideOptions();
		}
	};

	p.showOptions = function(){

		addClass(this._el, 'show');
	};

	p.hideOptions = function(){

		removeClass(this._el, 'show');
	};


})();