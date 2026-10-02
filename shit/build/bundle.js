/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(1);

	var _SceneMain = __webpack_require__(5);

	var _SceneMain2 = _interopRequireDefault(_SceneMain);

	var _Main = __webpack_require__(13);

	var _Main2 = _interopRequireDefault(_Main);

	var _Data = __webpack_require__(25);

	var _Data2 = _interopRequireDefault(_Data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Starter = function () {
		function Starter() {
			var _this = this;

			_classCallCheck(this, Starter);

			var canvas = document.createElement("canvas");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvas.className = "Main-Canvas";
			canvas.id = 'gl';
			var container = document.body.querySelector('.container');
			container.appendChild(canvas);

			function transformProp() {
				var testEl = document.createElement('div');
				if (testEl.style.transform == null) {
					var vendors = ['Webkit', 'Moz', 'ms'];
					for (var vendor in vendors) {
						if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
							return vendors[vendor] + 'Transform';
						}
					}
				}
				return 'transform';
			};

			window.NS = {};
			window.NS.GL = {};
			window.NS.GL.params = {};
			window.NS.GL.params.detail = 32;
			window.NS.transform = transformProp();
			window.NS.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

			if (!Detector.webgl) Detector.addGetWebGLMessage();

			this.sceneMain = new _SceneMain2.default(container);
			// this.main = new Main(new Data());

			this.onResize();
			window.addEventListener('resize', function () {
				_this.onResize();
			});

			this.reqFrame();
		}

		_createClass(Starter, [{
			key: 'reqFrame',
			value: function reqFrame() {
				var _this2 = this;

				requestAnimationFrame(function () {
					_this2.reqFrame();
				});

				this.sceneMain.loop();
				// this.main.update();
			}
		}, {
			key: 'onResize',
			value: function onResize() {
				var w = window.innerWidth;
				var h = window.innerHeight;
				this.sceneMain.onResize(w, h);
				// this.main.onResize(w,h);
			}
		}]);

		return Starter;
	}();

	;

	if (document.body) new Starter();else {
		window.addEventListener("load", new Starter());
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  position: static;\n  background: #fff; }\n\nbody {\n  height: 100%; }\n\n* {\n  box-sizing: border-box; }\n\na {\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.8); }\n\nhtml {\n  -webkit-text-size-adjust: none;\n  -moz-text-size-adjust: none;\n  text-size-adjust: none; }\n\nh1, h2, h3, h4, h5, text, p {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-webkit-font-smoothing: antialiased;\n  font-family: Arial; }\n\n.mainLoader {\n  position: absolute;\n  z-index: 10;\n  width: 200px;\n  height: 200px;\n  top: 50%;\n  left: 50%;\n  margin-top: -100px;\n  margin-left: -100px; }\n\n.logo {\n  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);\n  color: transparent;\n  font-family: Arial;\n  font-weight: lighter;\n  position: fixed;\n  right: 14px;\n  top: 6px;\n  z-index: 20;\n  margin: 0;\n  font-size: 32px;\n  opacity: 1; }\n  @media only screen and (max-width: 767px) {\n    .logo {\n      top: 10px; } }\n\n.closeBtn {\n  position: fixed;\n  top: 52px;\n  right: 40px;\n  width: 50px;\n  height: 50px;\n  text-indent: -9999px;\n  padding: 0 4px;\n  z-index: 10;\n  cursor: pointer; }\n  @media only screen and (max-width: 767px) {\n    .closeBtn {\n      right: 10px;\n      width: 30px;\n      height: 30px; } }\n\n.container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0; }\n\n.Main-Canvas {\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  position: absolute;\n  z-index: 0; }\n\n.imageContainer {\n  position: absolute;\n  z-index: 2;\n  width: 100%;\n  height: 100%; }\n  .imageContainer > img {\n    height: 100%;\n    margin: 0 auto;\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 50%;\n    transform: scale(0);\n    -webkit-transform: scale(0);\n    opacity: 0; }\n\n.nav {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  font-family: \"Arial\";\n  padding: 10px;\n  z-index: 5;\n  color: rgba(0, 0, 0, 0.8);\n  z-index: 10;\n  opacity: 1; }\n  .nav .nav-item {\n    cursor: pointer;\n    padding: 10px;\n    font-size: 10px;\n    position: relative;\n    left: 0;\n    transition: transform .5s;\n    -webkit-transition: transform .5s; }\n    .nav .nav-item:hover {\n      background: white; }\n    @media only screen and (max-width: 767px) {\n      .nav .nav-item {\n        display: block;\n        padding: 4px;\n        margin-bottom: 10px;\n        transform: translate(-200px, 0);\n        background: white; }\n        .nav .nav-item:hover {\n          background: transparent; } }\n  .nav .menuBurger {\n    display: none;\n    width: 39px;\n    height: 35px;\n    text-indent: -9999px;\n    padding: 0 4px;\n    margin-top: 0;\n    margin-bottom: 10px; }\n    @media only screen and (max-width: 767px) {\n      .nav .menuBurger {\n        display: block; } }\n\n.overlay {\n  position: absolute;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  opacity: 0;\n  display: none;\n  -webkit-transition: opacity .6s, transform .6s;\n  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */\n  transition: opacity .6s, transform .6s;\n  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */\n  color: rgba(0, 0, 0, 0.8);\n  -webkit-transform: scale(0.8);\n  /* Chrome, Opera 15+, Safari 3.1+ */\n  transform: scale(0.8);\n  /* Firefox 16+, IE 10+, Opera */\n  padding: 40px 100px; }\n  .overlay .overlayTitle {\n    text-align: center;\n    font-size: 32px; }\n\n.touchLayer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n.contact {\n  padding-top: 20%;\n  text-align: center; }\n  .contact > h1 {\n    font-size: 60px;\n    color: rgba(0, 0, 0, 0.8); }\n  @media only screen and (max-width: 767px) {\n    .contact {\n      padding: 40% 0;\n      margin-top: 0; }\n      .contact > h1 {\n        font-size: 20px; } }\n\n.about {\n  margin-top: 100px; }\n  .about .overlayDescr {\n    line-height: 22px;\n    width: 50%; }\n  @media only screen and (max-width: 767px) {\n    .about {\n      padding: 0px 10px;\n      font-size: 10px;\n      line-height: 0px;\n      padding-top: 40px;\n      margin-top: 16%; }\n      .about .overlayDescr {\n        line-height: 18px;\n        font-size: 14px;\n        width: 90%; } }\n\n.projects {\n  padding: 0;\n  margin-top: 80px; }\n  .projects .projectsContainer {\n    width: 80%;\n    margin: 20px auto;\n    position: relative; }\n  .projects .projectDetailWrapper {\n    opacity: 0;\n    display: none;\n    height: 100%;\n    width: 100%;\n    z-index: 8;\n    position: relative;\n    transition: opacity .5s;\n    -webkit-transition: opacity .5s; }\n    .projects .projectDetailWrapper .projectDescr {\n      width: 100%;\n      text-align: center;\n      padding: 0 10%;\n      font-size: 12px;\n      line-height: 20px; }\n    .projects .projectDetailWrapper .projectSlider {\n      margin: 20px auto;\n      position: relative; }\n      .projects .projectDetailWrapper .projectSlider .sliderNav {\n        width: 20px;\n        height: 20px;\n        position: absolute;\n        top: 50%;\n        margin-top: -10px;\n        cursor: pointer;\n        transition: transform .2s;\n        -webkit-transition: transform .2s;\n        transform: scale(1);\n        -webkit-transform: scale(1); }\n        .projects .projectDetailWrapper .projectSlider .sliderNav:hover {\n          transform: scale(1.2);\n          -webkit-transform: scale(1.2); }\n        .projects .projectDetailWrapper .projectSlider .sliderNav.sliderNext {\n          right: -30px; }\n        .projects .projectDetailWrapper .projectSlider .sliderNav.sliderPrev {\n          left: -30px; }\n      .projects .projectDetailWrapper .projectSlider .sliderContainer {\n        position: absolute;\n        overflow: hidden;\n        height: 100%; }\n      .projects .projectDetailWrapper .projectSlider .sliderItem {\n        position: absolute;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        transition: transform .5s, opacity .5s;\n        -webkit-transition: transform .5s, opacity .5s;\n        z-index: 2; }\n        .projects .projectDetailWrapper .projectSlider .sliderItem > img {\n          width: 100%;\n          height: auto; }\n  .projects .projectItem {\n    background: rgba(0, 0, 0, 0.2);\n    position: absolute;\n    top: 0;\n    left: 0;\n    cursor: pointer;\n    transition: opacity .4s, transform .3s;\n    -webkit-transition: opacity .4s, transform .3s; }\n    .projects .projectItem > .touchLayer {\n      z-index: 2; }\n    .projects .projectItem .projectItemLoader {\n      z-index: 3; }\n    .projects .projectItem .itemCaption {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      color: white;\n      background: rgba(0, 0, 0, 0.6);\n      z-index: 1;\n      opacity: 0;\n      transition: opacity .4s;\n      -webkit-transition: opacity .4s;\n      padding-top: 22%; }\n      .projects .projectItem .itemCaption > h5 {\n        font-size: 20px;\n        text-align: center;\n        text-transform: uppercase; }\n      .projects .projectItem .itemCaption .projectOpenBtn {\n        font-size: 16px;\n        color: white; }\n    .projects .projectItem > img {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      transform: scale(1);\n      -webkit-transform: scale(1);\n      opacity: 1;\n      z-index: 0; }\n  @media only screen and (max-width: 767px) {\n    .projects {\n      padding-top: 40px;\n      margin-top: 0; } }\n", "", {"version":3,"sources":["/./app/main.scss"],"names":[],"mappings":"AAGA;EACC,YAAW;EACX,aAAY;EAEZ,UAAS;EACT,WAAU;EAGV,iBAAiB;EACjB,iBAAiB,EACjB;;AAED;EACC,aAAa,EACb;;AAED;EACC,uBAAuB,EACvB;;AAED;EACC,sBAAsB;EACtB,0BAAW,EACX;;AAED;EACC,+BAA+B;EAC/B,4BAA4B;EAC5B,uBAAuB,EACvB;;AAED;EACC,oCAAoC;EACpC,4CAA4C;EAC5C,mBAAmB,EACnB;;AAED;EACC,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,cAAc;EACd,SAAS;EACT,UAAU;EACV,mBAAmB;EACnB,oBAAoB,EACpB;;AAED;EACC,kDAA6B;EAC1B,mBAAW;EACX,mBAAmB;EACnB,qBAAqB;EACrB,gBAAgB;EAChB,YAAY;EACZ,SAAS;EACT,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,WAAW,EAId;EAHG;IAZJ;MAaK,UAAU,EAEd,EAAA;;AAED;EACC,gBAAgB;EAChB,UAAU;EACV,YAAY;EAEZ,YAAY;EACT,aAAa;EACb,qBAAqB;EACrB,eAAe;EACf,YAAY;EACZ,gBAAgB,EAQnB;EALA;IAbD;MAcE,YAAY;MACZ,YAAY;MACT,aAAa,EAEjB,EAAA;;AAED;EACC,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,YAAW;EACX,aAAY;EACZ,WAAW,EAEX;;AAED;EACC,YAAW;EACX,aAAY;EACZ,SAAQ;EACR,UAAS;EACT,mBAAmB;EACnB,WAAW,EACX;;AAED;EACC,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,aAAa,EAab;EAjBD;IAME,aAAa;IACb,eAAe;IACf,eAAe;IACf,mBAAmB;IACnB,OAAO;IACP,UAAU;IACV,oBAAgB;IAChB,4BAAwB;IACxB,WAAW,EAEX;;AAKF;EACC,gBAAgB;EACb,SAAS;EACT,UAAU;EACV,qBAAqB;EACrB,cAAc;EACd,WAAW;EACX,0BAAW;EACX,YAAY;EACZ,WAAW,EAyCd;EAlDD;IAYE,gBAAgB;IAChB,cAAc;IACd,gBAAgB;IAChB,mBAAmB;IACnB,QAAQ;IACR,0BAA0B;IAC1B,kCAAkC,EAelC;IAjCF;MAoBG,kBAAkB,EAClB;IAED;MAvBF;QAwBG,eAAe;QACf,aAAa;QACb,oBAAoB;QACpB,gCAAoB;QACpB,kBAAkB,EAKnB;QAjCF;UA8BI,wBAAwB,EACxB,EAAA;EA/BJ;IAoCE,cAAc;IACd,YAAY;IACT,aAAa;IACb,qBAAqB;IACrB,eAAe;IACf,cAAc;IACd,oBAAoB,EAMvB;IAJA;MA5CF;QA6CG,eAAe,EAGhB,EAAA;;AAIF;EACC,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,QAAQ;EACR,OAAO;EACP,WAAW;EACX,cAAc;EACd,+CAA+C;EAAG,2DAA2D;EAC1G,uCAAuC;EAAG,iEAAiE;EAC3G,0BAAW;EACX,8BAAwB;EAAQ,oCAAoC;EAEpE,sBAAgB;EAAO,gCAAgC;EAEvD,oBAAoB,EAWvB;EA3BD;IAmBK,mBAAmB;IACnB,gBAAgB,EAEhB;;AAOL;EACC,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,aAAa,EACb;;AAED;EACC,iBAAiB;EACjB,mBAAmB,EAcnB;EAhBD;IAIE,gBAAgB;IAChB,0BAAW,EACX;EAED;IARD;MAUE,eAAe;MACZ,cAAc,EAKlB;MAhBD;QAaG,gBAAgB,EAChB,EAAA;;AAIH;EAEC,kBAAkB,EAkBlB;EApBD;IAIK,kBAAkB;IAClB,WAAW,EACX;EAED;IARJ;MASK,kBAAkB;MAClB,gBAAgB;MAChB,iBAAiB;MACjB,kBAAkB;MAClB,gBAAgB,EAOpB;MApBD;QAeM,kBAAkB;QAClB,gBAAgB;QAChB,WAAW,EACX,EAAA;;AAIN;EAEC,WAAW;EACX,iBAAiB,EAgIjB;EAnID;IAKE,WAAW;IACX,kBAAkB;IAClB,mBAAmB,EACnB;EARF;IAUE,WAAW;IACX,cAAc;IACd,aAAa;IACV,YAAY;IAEZ,WAAW;IACX,mBAAmB;IACnB,wBAAwB;IACxB,gCAAgC,EAwDnC;IA1EF;MAqBM,YAAY;MACZ,mBAAmB;MACnB,eAAe;MACf,gBAAgB;MAChB,kBAAkB,EAClB;IA1BN;MA6BG,kBAAkB;MACf,mBAAmB,EA0CnB;MAxEN;QAgCO,YAAY;QACZ,aAAa;QACb,mBAAmB;QACnB,SAAS;QACT,kBAAkB;QAClB,gBAAgB;QAChB,0BAA0B;QAC1B,kCAAkC;QAClC,oBAAgB;QAChB,4BAAwB,EAWxB;QApDP;UA2CQ,sBAAgB;UAChB,8BAAwB,EACxB;QA7CR;UA+CQ,aAAa,EACb;QAhDR;UAkDQ,YAAY,EACZ;MAnDR;QAsDO,mBAAmB;QACnB,iBAAiB;QACjB,aAAa,EACb;MAzDP;QA4DO,mBAAmB;QACnB,OAAO;QACP,YAAY;QACZ,aAAa;QACb,uCAAuC;QACvC,+CAA+C;QAC/C,WAAW,EAKX;QAvEP;UAoEQ,YAAY;UACf,aAAa,EACV;EAtER;IA4EE,+BAAgB;IAChB,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,gBAAgB;IAChB,uCAAuC;IACvC,+CAA+C,EA2C/C;IA7HF;MAoFG,WAAW,EACX;IArFH;MAuFG,WAAW,EACX;IAxFH;MA0FG,mBAAmB;MACnB,OAAO;MACP,QAAQ;MACR,YAAY;MACZ,aAAa;MACb,aAAa;MACb,+BAAgB;MAChB,WAAW;MACX,WAAW;MACX,wBAAwB;MACxB,gCAAgC;MAChC,iBAAiB,EAYjB;MAjHH;QAwGI,gBAAgB;QAChB,mBAAmB;QACnB,0BAA0B,EAC1B;MA3GJ;QA6GI,gBAAgB;QACb,aAAa,EAEhB;IAhHJ;MAmHG,mBAAmB;MAChB,OAAO;MACP,QAAQ;MACR,YAAY;MACZ,aAAa;MACb,oBAAgB;MAChB,4BAAwB;MACxB,WAAW;MACX,WAAW,EACd;EAEF;IA9HD;MA+HE,kBAAkB;MACf,cAAc,EAGlB,EAAA","file":"main.scss","sourcesContent":["$mobile      : 'only screen and (max-width : 767px)';\n\n\nhtml, body {\n\twidth:100%;\n\theight:100%;\n\n\tmargin:0;\n\tpadding:0;\n\n\t// overflow:hidden;\n\tposition: static;\n\tbackground: #fff;\n}\n\nbody{\n\theight: 100%;\n}\n\n*{\n\tbox-sizing: border-box;\n}\n\na{\n\ttext-decoration: none;\n\tcolor: rgba(0,0,0,.8);\n}\n\nhtml {\n\t-webkit-text-size-adjust: none;\n\t-moz-text-size-adjust: none;\n\ttext-size-adjust: none;\n}\n\nh1,h2,h3,h4,h5,text,p {\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-webkit-font-smoothing: antialiased;\n\tfont-family: Arial;\n}\n\n.mainLoader{\n\tposition: absolute;\n\tz-index: 10;\n\twidth: 200px;\n\theight: 200px;\n\ttop: 50%;\n\tleft: 50%;\n\tmargin-top: -100px;\n\tmargin-left: -100px;\n}\n\n.logo{\n\t-webkit-text-stroke: 1px rgba(255,255,255,.5);\n    color: rgba(0,0,0,0);\n    font-family: Arial;\n    font-weight: lighter;\n    position: fixed;\n    right: 14px;\n    top: 6px;\n    z-index: 20;\n    margin: 0;\n    font-size: 32px;\n    opacity: 1;\n    @media #{$mobile}{\n    \ttop: 10px;\n    }\n}\n\n.closeBtn{\n\tposition: fixed;\n\ttop: 52px;\n\tright: 40px;\n\t// display: none;\n\twidth: 50px;\n    height: 50px;\n    text-indent: -9999px;\n    padding: 0 4px;\n    z-index: 10;\n    cursor: pointer;\n\n   \n\t@media #{$mobile}{\n\t\tright: 10px;\n\t\twidth: 30px;\n    \theight: 30px;\n\t}\n}\n\n.container{\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth:100%;\n\theight:100%;\n\topacity: 0;\n\n}\n\n.Main-Canvas {\n\twidth:100%;\n\theight:100%;\n\ttop:0px;\n\tleft:0px;\n\tposition: absolute;\n\tz-index: 0;\n}\n\n.imageContainer{\n\tposition: absolute;\n\tz-index: 2;\n\twidth: 100%;\n\theight: 100%;\n\t> img{\n\t\theight: 100%;\n\t\tmargin: 0 auto;\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 50%;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t\topacity: 0;\n\n\t}\n}\n\n\n\n.nav{\n\tposition: fixed;\n    top: 0px;\n    left: 0px;\n    font-family: \"Arial\";\n    padding: 10px;\n    z-index: 5;\n    color: rgba(0,0,0,.8);\n    z-index: 10;\n    opacity: 1;\n\n\t.nav-item{\n\t\tcursor: pointer;\n\t\tpadding: 10px;\n\t\tfont-size: 10px;\n\t\tposition: relative;\n\t\tleft: 0;\n\t\ttransition: transform .5s;\n\t\t-webkit-transition: transform .5s;\n\t\t&:hover{\n\t\t\tbackground: white;\n\t\t}\n\n\t\t@media #{$mobile}{\n\t\t\tdisplay: block;\n\t\t\tpadding: 4px;\n\t\t\tmargin-bottom: 10px;\n\t\t\ttransform: translate(-200px, 0);\n\t\t\tbackground: white;\n\t\t\t&:hover{\n\t\t\t\tbackground: transparent;\n\t\t\t}\n\t\t}\n\t}\n\n\t.menuBurger{\n\t\tdisplay: none;\n\t\twidth: 39px;\n\t    height: 35px;\n\t    text-indent: -9999px;\n\t    padding: 0 4px;\n\t    margin-top: 0;\n\t    margin-bottom: 10px;\n\n\t\t@media #{$mobile}{\n\t\t\tdisplay: block;\n\t\t}\n\n\t}\n\n}\n\n.overlay{\n\tposition: absolute;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tleft: 0;\n\ttop: 0;\n\topacity: 0;\n\tdisplay: none;\n\t-webkit-transition: opacity .6s, transform .6s;  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */\n    transition: opacity .6s, transform .6s;  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */\n    color: rgba(0,0,0,.8);\n    -webkit-transform: scale(0.8);  /* Chrome, Opera 15+, Safari 3.1+ */\n    //   -ms-transform: scale(0.8);  /* IE 9 */\n    transform: scale(.8);  /* Firefox 16+, IE 10+, Opera */\n    // background: rgba(0,0,0,.3);\n    padding: 40px 100px;\n    // background: rgba(255,255,255,.6);\n    .overlayTitle{\n    \ttext-align: center;\n    \tfont-size: 32px;\n\n    }\n    \n\n\n\t\n}\n\n.touchLayer{\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.contact{\n\tpadding-top: 20%;\n\ttext-align: center;\n\t> h1{\n\t\tfont-size: 60px;\n\t\tcolor: rgba(0,0,0,.8);\n\t}\n\n\t@media #{$mobile}{\n\t\t// padding-top: 40px;\n\t\tpadding: 40% 0;\n    \tmargin-top: 0;\n\t\t> h1 {\n\t\t\tfont-size: 20px;\n\t\t}\n\t}\n}\n\n.about{\n\t// background: rgba(250, 40, 40, .7);\n\tmargin-top: 100px;\n\t.overlayDescr{\n    \tline-height: 22px;\n    \twidth: 50%;\n    }\n\n    @media #{$mobile}{\n    \tpadding: 0px 10px;\n\t    font-size: 10px;\n\t    line-height: 0px;\n\t    padding-top: 40px;\n    \tmargin-top: 16%;\n    \t.overlayDescr{\n    \t\tline-height: 18px;\n    \t\tfont-size: 14px;\n    \t\twidth: 90%;\n    \t}\n    }\n}\n\n.projects{\n\t// background: rgba(250, 40, 240, .7);\n\tpadding: 0;\n\tmargin-top: 80px;\n\t.projectsContainer{\n\t\twidth: 80%;\n\t\tmargin: 20px auto;\n\t\tposition: relative;\n\t}\n\t.projectDetailWrapper{\n\t\topacity: 0;\n\t\tdisplay: none;\n\t\theight: 100%;\n\t    width: 100%;\n\t    // background: rgba(0,0,0,.1);\n\t    z-index: 8;\n\t    position: relative;\n\t    transition: opacity .5s;\n\t    -webkit-transition: opacity .5s;\n\t    \n\t    .projectDescr{\n\t    \twidth: 100%;\n\t\t    text-align: center;\n\t\t    padding: 0 10%;\n\t\t    font-size: 12px;\n    \t\tline-height: 20px;\n\t    }\n\t    .projectSlider{\n\t   \t\t\n\t\t\tmargin: 20px auto;\n   \t\t\tposition: relative;\n\t\t    .sliderNav{\n\t\t    \twidth: 20px;\n\t\t    \theight: 20px;\n\t\t    \tposition: absolute;\n\t\t    \ttop: 50%;\n\t\t    \tmargin-top: -10px;\n\t\t    \tcursor: pointer;\n\t\t    \ttransition: transform .2s;\n\t\t    \t-webkit-transition: transform .2s;\n\t\t    \ttransform: scale(1.0);\n\t\t    \t-webkit-transform: scale(1.0);\n\t\t    \t&:hover{\n\t\t    \t\ttransform: scale(1.2);\n\t\t    \t\t-webkit-transform: scale(1.2);\n\t\t    \t}\n\t\t    \t&.sliderNext{\n\t\t    \t\tright: -30px;\n\t\t    \t}\n\t\t    \t&.sliderPrev{\n\t\t    \t\tleft: -30px;\n\t\t    \t}\n\t\t    }\n\t\t    .sliderContainer{\n\t\t    \tposition: absolute;\n\t\t    \toverflow: hidden;\n\t\t    \theight: 100%;\n\t\t    }\n\t\t    \n\t    \t.sliderItem{\n\t    \t\tposition: absolute;\n\t    \t\ttop: 0;\n\t    \t\twidth: 100%;\n\t    \t\theight: 100%;\n\t    \t\ttransition: transform .5s, opacity .5s;\n\t    \t\t-webkit-transition: transform .5s, opacity .5s;\n\t    \t\tz-index: 2;\n\t    \t\t> img{\n\t    \t\t\twidth: 100%;\n\t\t\t\t\theight: auto;\n\t    \t\t}\n\t\t    }\n\t    }\n\n\t}\n\t.projectItem{\n\t\tbackground: rgba(0,0,0,.2);\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tcursor: pointer;\n\t\ttransition: opacity .4s, transform .3s;\n\t\t-webkit-transition: opacity .4s, transform .3s;\n\t\t> .touchLayer{\n\t\t\tz-index: 2;\n\t\t}\n\t\t.projectItemLoader{\n\t\t\tz-index: 3;\n\t\t}\n\t\t.itemCaption{\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tcolor: white;\n\t\t\tbackground: rgba(0,0,0,.6);\n\t\t\tz-index: 1;\n\t\t\topacity: 0;\n\t\t\ttransition: opacity .4s;\n\t\t\t-webkit-transition: opacity .4s;\n\t\t\tpadding-top: 22%;\n\n\t\t\t> h5{\n\t\t\t\tfont-size: 20px;\n\t\t\t\ttext-align: center;\n\t\t\t\ttext-transform: uppercase;\n\t\t\t}\n\t\t\t.projectOpenBtn{\n\t\t\t\tfont-size: 16px;\n    \t\t\tcolor: white;\n    \t\t\t\n\t\t\t}\n\t\t}\n\t\t> img{\n\t\t\tposition: absolute;\n\t\t    top: 0;\n\t\t    left: 0;\n\t\t    width: 100%;\n\t\t    height: 100%;\n\t\t    transform: scale(1);\n\t\t    -webkit-transform: scale(1);\n\t\t    opacity: 1;\n\t\t    z-index: 0;\n\t\t}\n\t}\n\t@media #{$mobile}{\n\t\tpadding-top: 40px;\n    \tmargin-top: 0;\n\t}\n\n}\n\n\n\n\n"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Scene = __webpack_require__(6);

	var _Scene2 = _interopRequireDefault(_Scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import ViewCopy from "./views/ViewCopy";
	// import ViewPoints from "./views/ViewPoints";

	// import MouseInteractor from "./framework/MouseInteractor";
	// import KeyboardInteractor from "./framework/KeyboardInteractor";
	// import SceneTransforms from "./framework/SceneTransforms";
	// import Framebuffer from "./framework/Framebuffer";
	// import Texture from "./framework/Texture";
	// import ImageLoader from "./framework/ImageLoader";
	// import TextureCreator from "./framework/TextureCreator";


	var SceneMain = function () {
		function SceneMain(container) {
			var _this = this;

			_classCallCheck(this, SceneMain);

			this.increase = Math.PI * 2 / 500;
			this.counter = 0;

			this.mouseX = 0;
			this.mouseY = 0;

			this.nrClouds = 500;
			this.totDepth = 2000;

			this.start_time = Date.now();

			this.windowHalfX;
			this.windowHalfY;

			this.container = container;

			this.pumpkin = null;

			this.doRender = false;

			this.container.style.opacity = 1;

			this.createBgCanvas();

			this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
			this.camera.position.z = this.totDepth;
			this.camera.position.y = -40;

			this.scene = new THREE.Scene();

			this.geometry = new THREE.Geometry();

			this.texture = THREE.ImageUtils.loadTexture('assets/cloud10.png', null, function () {
				return _this.enableRender();
			});
			this.texture.magFilter = THREE.LinearMipMapLinearFilter;
			this.texture.minFilter = THREE.LinearMipMapLinearFilter;

			var fog = new THREE.Fog(0x4584b4, -100, 3000);

			this.material = new THREE.ShaderMaterial({

				uniforms: {

					"map": { type: "t", value: this.texture },
					"fogColor": { type: "c", value: fog.color },
					"fogNear": { type: "f", value: fog.near },
					"fogFar": { type: "f", value: fog.far }

				},
				vertexShader: __webpack_require__(9),
				fragmentShader: __webpack_require__(10),
				depthWrite: false,
				depthTest: true,
				transparent: true

			});

			// var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

			for (var i = 0; i < this.nrClouds; i++) {

				var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), this.material);

				plane.position.x = Math.random() * 1000 - 500;
				plane.position.y = -Math.random() * Math.random() * 200 - 15;
				plane.position.z = Math.random() * this.totDepth;
				plane.rotation.z = Math.random() * Math.PI;
				plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

				// THREE.GeometryUtils.merge( this.geometry, plane );

				var mesh = new THREE.Mesh(plane, this.material);
				this.scene.add(plane);

				// this.clouds.push(plane);
			}

			// var mesh = new THREE.Mesh( this.geometry, this.material );
			// this.scene.add( mesh );


			// var mesh = new THREE.Mesh( this.geometry, this.material );
			// mesh.position.z = - this.nrClouds;
			// this.scene.add( mesh );

			this.renderer = new THREE.WebGLRenderer({ antialias: false });
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// this.renderer.setClearColorHex( 0x000000, 1 );
			this.container.appendChild(this.renderer.domElement);

			this.loadImports();
		}

		_createClass(SceneMain, [{
			key: "loadImports",
			value: function loadImports() {

				var loader = new THREE.ObjectLoader();

				var self = this;

				// loader.setTexturePath('assets/imports/low_poly_pumpkin/texture.jpg');

				// load a resource
				loader.load(
				// resource URL
				'assets/imports/low_poly_pumpkin/low-poly-halloween-pumpkin.json', function (obj) {
					// for (var i=0;i<10;i++){
					// var clone = JSON.parse(JSON.stringify(obj));
					// console.log(obj);
					// console.log(clone);
					// var test = obj.clone();
					// console.log(test);
					self.onImportLoaded(obj);
					// }
				}

				// Function when resource is loaded
				// function ( obj) {
				// 	var material = new THREE.MultiMaterial( materials );
				// 	var object = new THREE.Mesh( geometry, material );

				// 	console.log('loaded');
				// 	console.log(geometry, materials);
				// 	// scene.add( object );
				// }
				);
			}
		}, {
			key: "onImportLoaded",
			value: function onImportLoaded(object) {

				console.log('main: ', object);

				var material = new THREE.ShaderMaterial({

					uniforms: {

						// "map": { type: "t", value: object.texture },
						// "fogColor" : { type: "c", value: fog.color },
						// "fogNear" : { type: "f", value: fog.near },
						// "fogFar" : { type: "f", value: fog.far },

					},
					vertexShader: __webpack_require__(11),
					fragmentShader: __webpack_require__(12),
					depthWrite: false,
					depthTest: true,
					transparent: false

				});

				object.traverse(function (child) {

					if (child instanceof THREE.Mesh) {

						child.material = material;
						// console.log('assign m');
					}
				});

				for (var i = 0; i < 30; i++) {
					var scale = Math.random() * 0.8 + .8;
					var obj = object.clone();
					obj.position.x = Math.random() * 80 - 40;
					obj.position.y = -Math.random() * Math.random() * 60 - 30;
					obj.position.z = Math.random() * this.totDepth;
					obj.rotation.y = 180 * Math.PI / 180;
					// object.rotation.z = 90 * Math.PI / 180;
					obj.scale.x = scale;
					obj.scale.y = scale;
					obj.scale.z = scale;

					this.scene.add(obj);
				}

				// object.position.x = 0;
				// object.position.y = -40;
				// object.position.z = 2200;
				//       object.rotation.y = 180* Math.PI / 180;
				//       // object.rotation.z = 90 * Math.PI / 180;
				//       object.scale.x = .8;
				//       object.scale.y = .8;
				//       object.scale.z = .8;
				//       var obj = object;

				// this.scene.add(obj);

				// this.pumpkin = obj;
			}
		}, {
			key: "createBgCanvas",
			value: function createBgCanvas() {

				var canvas = document.createElement('canvas');
				canvas.width = 32;
				canvas.height = window.innerHeight;

				var context = canvas.getContext('2d');

				var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
				gradient.addColorStop(0, "#1e4877");
				gradient.addColorStop(0.5, "#4584b4");

				context.fillStyle = gradient;
				context.fillRect(0, 0, canvas.width, canvas.height);

				this.container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
				this.container.style.backgroundSize = '32px 100%';
			}
		}, {
			key: "enableRender",
			value: function enableRender() {

				this.doRender = true;
			}
		}, {
			key: "initTextures",
			value: function initTextures() {}
		}, {
			key: "initViews",
			value: function initViews() {}
		}, {
			key: "loop",
			value: function loop() {

				this.update();
				this.render();
			}
		}, {
			key: "update",
			value: function update() {

				// super.update();

			}
		}, {
			key: "render",
			value: function render() {

				if (!this.doRender) return;

				var position = (Date.now() - this.start_time) * 0.03 % this.totDepth;

				this.increase = Math.PI * 2 / 300;

				// this.pumpkin.position.z = -position + this.nrClouds - ((Math.sin( this.counter ) / 2 + 0.5) * 10) - 10;
				// this.pumpkin.position.x = (Math.cos( this.counter ) / 2 + 0.5) * 10 - 5;
				// this.pumpkin.position.y = ((Math.sin( this.counter ) / 2 + 0.5) * 2) - 40;
				// this.counter += this.increase;

				// this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.01;
				// this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.01;
				this.camera.position.z = -position + this.totDepth;

				// console.log('pos: ',- position + this.totDepth);

				this.renderer.render(this.scene, this.camera);
			}
		}, {
			key: "onResize",
			value: function onResize(w, h) {

				this.windowHalfX = w / 2;
				this.windowHalfY = h / 2;

				this.camera.aspect = w / h;
				this.camera.updateProjectionMatrix();

				this.renderer.setSize(w, h);

				// this.canvas.width = w;
				// this.canvas.height = h;

				// this.canvas.style.height = h + 'px';
				// this.canvas.style.width = w + 'px';
			}
		}]);

		return SceneMain;
	}();

	exports.default = SceneMain;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _FreeCamera = __webpack_require__(7);

	var _FreeCamera2 = _interopRequireDefault(_FreeCamera);

	var _BaseCamera = __webpack_require__(8);

	var _BaseCamera2 = _interopRequireDefault(_BaseCamera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
		function Scene() {
			_classCallCheck(this, Scene);

			this.canvas = document.getElementById('gl');
			this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

			window.NS.GL.glContext = this.gl;

			this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
			this.gl.disable(this.gl.DEPTH_TEST);
			// this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
			// gl.enable(gl.CULL_FACE);
			// this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
			// this.gl.enable(this.gl.BLEND);
			this.gl.clearColor(0, 0, 0, 1);
			this.gl.clearDepth(1);
			// this.depthTextureExt = this.gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
			this.floatTextureExt = this.gl.getExtension("OES_texture_float"); // Or browser-appropriate prefix
			// this.deravitives = this.gl.getExtension("GL_OES_standard_derivatives");


			this.setCamera();
		}

		_createClass(Scene, [{
			key: 'setCamera',
			value: function setCamera() {

				this.camera = new _FreeCamera2.default();

				this.orthoCamera = new _BaseCamera2.default('ortho');
			}
		}, {
			key: 'loop',
			value: function loop() {

				this.update();
				this.render();
			}
		}, {
			key: 'update',
			value: function update() {

				this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
			}
		}, {
			key: 'render',
			value: function render() {}
		}]);

		return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseCamera2 = __webpack_require__(8);

	var _BaseCamera3 = _interopRequireDefault(_BaseCamera2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FreeCamera = function (_BaseCamera) {
		_inherits(FreeCamera, _BaseCamera);

		function FreeCamera() {
			_classCallCheck(this, FreeCamera);

			var _this = _possibleConstructorReturn(this, (FreeCamera.__proto__ || Object.getPrototypeOf(FreeCamera)).call(this));

			_this.linVel = vec3.fromValues(0.0, 0.0, 0.0); // Animation of positions
			_this.angVel = vec3.fromValues(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)

			return _this;
		}

		_createClass(FreeCamera, [{
			key: 'yaw',
			value: function yaw(angle) {

				this.rotateOnAxis(this.up, angle);
			}
		}, {
			key: 'pitch',
			value: function pitch(angle) {

				this.rotateOnAxis(this.left, angle);
			}
		}, {
			key: 'roll',
			value: function roll(angle) {

				this.rotateOnAxis(this.dir, angle);
			}
		}, {
			key: 'rotateOnAxis',
			value: function rotateOnAxis(axisVec, angle) {

				// Create a proper Quaternion based on location and angle
				var quate = quat.create();
				quat.setAxisAngle(quate, axisVec, angle);

				// Create a rotation Matrix out of this quaternion
				vec3.transformQuat(this.dir, this.dir, quate);
				vec3.transformQuat(this.left, this.left, quate);
				vec3.transformQuat(this.up, this.up, quate);
				vec3.normalize(this.up, this.up);
				vec3.normalize(this.left, this.left);
				vec3.normalize(this.dir, this.dir);

				this.up = vec3.fromValues(0.0, 1.0, 0.0); // Camera Up vector
			}
		}, {
			key: 'setAngularVel',
			value: function setAngularVel(newVec) {

				this.angVel[0] = newVec[0];
				this.angVel[1] = newVec[1];
				this.angVel[2] = newVec[2];
			}
		}, {
			key: 'getAngularVel',
			value: function getAngularVel() {

				return vec3.clone(this.angVel);
			}
		}, {
			key: 'getLinearVel',
			value: function getLinearVel() {

				return vec3.clone(this.linVel);
			}
		}, {
			key: 'setLinearVel',
			value: function setLinearVel() {

				this.linVel[0] = newVec[0];
				this.linVel[1] = newVec[1];
				this.linVel[2] = newVec[2];
			}
		}, {
			key: 'setLookAtPoint',
			value: function setLookAtPoint(newVec) {

				function isVectorEqual(vecone, vectwo) {
					if (vecone[0] == vectwo[0] && vecone[1] == vectwo[1] && vecone[2] == vectwo[2]) {
						return true;
					} else {
						return false;
					}
				}

				// if the position hasn't yet been changed and they want the
				// camera to look at [0,0,0], that will create a problem.
				if (isVectorEqual(this.pos, [0, 0, 0]) && isVectorEqual(newVec, [0, 0, 0])) {} else {
					// Figure out the direction of the point we are looking at.
					vec3.subtract(this.dir, newVec, this.pos);
					vec3.normalize(this.dir, this.dir);
					// Adjust the Up and Left vectors accordingly
					vec3.cross(this.left, vec3.fromValues(0, 1, 0), this.dir);
					vec3.normalize(this.left, this.left);
					vec3.cross(this.up, this.dir, this.left);
					vec3.normalize(this.up, this.up);
				}
			}
		}, {
			key: 'setPosition',
			value: function setPosition(newVec) {

				this.pos = vec3.fromValues(newVec[0], newVec[1], newVec[2]);
			}
		}, {
			key: 'setUpVector',
			value: function setUpVector(newVec) {

				this.up[0] = newVec[0];
				this.up[1] = newVec[1];
				this.up[2] = newVec[2];
			}

			// moveSide(s){

			//   var newPosition = [this.pos[0] - s*this.left[0],this.pos[1] - s*this.left[1],this.pos[2] - s*this.left[2]];

			//   this.setPosition(newPosition);
			// };


		}, {
			key: 'moveForward',
			value: function moveForward(s) {

				var dirTemp = this.dir.slice(0);
				dirTemp[1] = 0;

				var newPosition = [this.pos[0] - s * this.dir[0], this.pos[1] - s * this.dir[1], this.pos[2] - s * this.dir[2]];

				this.setPosition(newPosition);
			}
		}, {
			key: 'update',
			value: function update(timeStep) {

				if (vec3.squaredLength(this.linVel) == 0 && vec3.squaredLength(this.angularVel) == 0) return false;

				if (vec3.squaredLength(this.linVel) > 0.0) {
					// Add a velocity to the position
					vec3.scale(this.velVec, this.velVec, timeStep);

					vec3.add(this.pos, this.velVec, this.pos);
				}

				if (vec3.squaredLength(this.angVel) > 0.0) {
					// Apply some rotations to the orientation from the angular velocity
					this.pitch(this.angVel[0] * timeStep);
					this.yaw(this.angVel[1] * timeStep);
					this.roll(this.angVel[2] * timeStep);
				}

				return true;
			}
		}]);

		return FreeCamera;
	}(_BaseCamera3.default);

	exports.default = FreeCamera;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseCamera = function () {
		function BaseCamera(type) {
			_classCallCheck(this, BaseCamera);

			this.type = type;

			if (this.type == 'ortho') {
				this.projMatrix = mat4.create();
				this.viewMatrix = mat4.create();

				return;
			}

			// Raw Position Values
			this.left = vec3.fromValues(1.0, 0.0, 0.0); // Camera Left vector
			this.up = vec3.fromValues(0.0, 1.0, 0.0); // Camera Up vector
			this.dir = vec3.fromValues(0.0, 0.0, 1.0); // The direction its looking at
			this.pos = vec3.fromValues(0.0, 0.0, 0.0); // Camera eye position
			this.projectionTransform = null;
			this.projMatrix;
			this.viewMatrix;

			this.fieldOfView = 45;
			this.nearClippingPlane = 0.1;
			this.farClippingPlane = 1000.0;
		}

		_createClass(BaseCamera, [{
			key: 'apply',
			value: function apply(aspectRatio) {

				function degToRadian(degrees) {
					return degrees * Math.PI / 180;
				};

				var matView = mat4.create();
				var lookAtPosition = vec3.create();
				vec3.add(lookAtPosition, this.pos, this.dir);
				mat4.lookAt(matView, this.pos, lookAtPosition, this.up);
				mat4.translate(matView, matView, vec3.fromValues(-this.pos[0], -this.pos[1], -this.pos[2]));
				this.viewMatrix = matView;

				// console.log(this.dir, this.up);

				// Create a projection matrix and store it inside a globally accessible place.
				this.projMatrix = mat4.create();
				mat4.perspective(this.projMatrix, degToRadian(this.fieldOfView), aspectRatio, this.nearClippingPlane, this.farClippingPlane);
			}
		}, {
			key: 'getFarClippingPlane',
			value: function getFarClippingPlane() {
				return this.farClippingPlane;
			}
		}, {
			key: 'getFieldOfView',
			value: function getFieldOfView() {
				return this.fieldOfView;
			}
		}, {
			key: 'getLeft',
			value: function getLeft() {

				return vec3.clone(this.left);
			}
		}, {
			key: 'getNearClippingPlane',
			value: function getNearClippingPlane() {

				return this.nearClippingPlane;
			}
		}, {
			key: 'getPosition',
			value: function getPosition() {

				return vec3.clone(this.pos);
			}
		}, {
			key: 'getProjectionMatrix',
			value: function getProjectionMatrix() {

				return mat4.clone(this.projMatrix);
			}
		}, {
			key: 'getViewMatrix',
			value: function getViewMatrix() {

				return mat4.clone(this.viewMatrix);
			}
		}, {
			key: 'getUp',
			value: function getUp() {

				return vec3.clone(this.up);
			}
		}, {
			key: 'setFarClippingPlane',
			value: function setFarClippingPlane() {

				if (fcp > 0) {
					this.farClippingPlane = fcp;
				}
			}
		}, {
			key: 'setFieldOfView',
			value: function setFieldOfView(fov) {

				if (fov > 0 && fov < 180) {
					this.fieldOfView = fov;
				}
			}
		}, {
			key: 'setNearClippingPlane',
			value: function setNearClippingPlane(ncp) {

				if (ncp > 0) {
					this.nearClippingPlane = ncp;
				}
			}
		}, {
			key: 'update',
			value: function update(timeStep, lineVel, angularVel) {

				if (vec3.squaredLength(linVel) == 0 && vec3.squaredLength(angularVel) == 0) return false;

				if (vec3.squaredLength(linVel) > 0.0) {
					// Add a velocity to the position
					vec3.scale(velVec, velVec, timeStep);

					vec3.add(this.pos, velVec, this.pos);
				}

				if (vec3.squaredLength(angularVel) > 0.0) {
					// Apply some rotations to the orientation from the angular velocity
					this.pitch(angularVel[0] * timeStep);
					this.yaw(angularVel[1] * timeStep);
					this.roll(angularVel[2] * timeStep);
				}

				return true;
			}
		}]);

		return BaseCamera;
	}();

	exports.default = BaseCamera;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}"

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D map;\n\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\n\tvec4 textureColor = texture2D( map, vUv );\n\t// gl_FragColor = texture2D( map, vUv );\n\t// gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );\n\t\n\tvec4 color = mix( textureColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n\tgl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0) * color;\n\n}"

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}"

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D map;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t\n\tvec4 textureColor = texture2D( map, vUv );\n\tgl_FragColor = texture2D( map, vUv );\n\t// gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );\n\t\n\t// vec4 color = mix( textureColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n\t// gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0) * color;\n\n}"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewImages = __webpack_require__(14);

	var _ViewImages2 = _interopRequireDefault(_ViewImages);

	var _ViewAbout = __webpack_require__(16);

	var _ViewAbout2 = _interopRequireDefault(_ViewAbout);

	var _ViewProjects = __webpack_require__(18);

	var _ViewProjects2 = _interopRequireDefault(_ViewProjects);

	var _ViewContact = __webpack_require__(22);

	var _ViewContact2 = _interopRequireDefault(_ViewContact);

	var _ViewMobileMenu = __webpack_require__(23);

	var _ViewMobileMenu2 = _interopRequireDefault(_ViewMobileMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MOBILE_BREAK = 768;

	var Main = function () {
		function Main(data) {
			_classCallCheck(this, Main);

			this.DATA = data;

			this.currentShowingOverlay = null;

			// console.log(getVendorPrefix());


			console.log(window.NS.transform);

			this._mainLoaderGif = document.querySelector('.mainLoader');

			this._vImages = new _ViewImages2.default(document.getElementById('imageWrapper'), this.DATA.featured, this.featuredLoaded, this, MOBILE_BREAK);
			this._vAbout = new _ViewAbout2.default(document.querySelector('.overlay.about'), this.onOverlayHide, this);
			this._vProjects = new _ViewProjects2.default(document.querySelector('.overlay.projects'), this.onOverlayHide, this, this.DATA.projects, true);
			this._vContact = new _ViewContact2.default(document.querySelector('.overlay.contact'), this.onOverlayHide, this);

			this._vMobileMenu = new _ViewMobileMenu2.default(document.querySelector('.nav'));

			this._overlays = [];

			this._overlays[this._vAbout.dataId] = this._vAbout;
			this._overlays[this._vProjects.dataId] = this._vProjects;
			this._overlays[this._vContact.dataId] = this._vContact;

			var logo = document.querySelector('.logo');

			setTimeout(function () {
				logo.style.opacity = 1;
			}, 500);
		}

		_createClass(Main, [{
			key: "onOverlayHide",
			value: function onOverlayHide() {
				var _this = this;

				// document.body.style.overflow = 'visible';

				setTimeout(function () {
					_this._vImages.show();
				}, 500);
			}
		}, {
			key: "featuredLoaded",
			value: function featuredLoaded() {
				var _this2 = this;

				this._mainLoaderGif.style.display = 'none';

				this.onResize(window.innerWidth, window.innerHeight);

				var navItems = document.querySelectorAll('.nav-item');
				for (var i = 0; i < navItems.length; i++) {
					navItems[i].addEventListener('click', this.onNavClick.bind(this));
				}

				window.scrollTo(0, 0);
				this.onScroll();

				window.addEventListener('scroll', function (e) {
					_this2.onScroll(e);
				});
			}
		}, {
			key: "onNavClick",
			value: function onNavClick(e) {
				var _this3 = this;

				// debugger;

				if (e.target.nodeName !== 'A') {

					e.preventDefault();

					if (this._overlays[e.target.getAttribute('data-id')].showing) return;

					if (!this._vImages.isHidden) {
						// document.body.style.overflow = 'hidden';

						this._vImages.hide();
					}

					for (var overlay in this._overlays) {
						this._overlays[overlay]._hide();
					}

					setTimeout(function () {

						_this3._overlays[e.target.getAttribute('data-id')]._show();
					}, 1000);
				}
			}
		}, {
			key: "onScroll",
			value: function onScroll(e) {

				var scrollTop = getScrollTop();

				this._vImages.onScroll(scrollTop);

				function getScrollTop() {

					var ret = document.body.scrollTop;

					if (ret == 0) {
						if (window.pageYOffset) ret = window.pageYOffset;else ret = document.body.parentElement ? document.body.parentElement.scrollTop : 0;
					}

					return ret;
				}
			}
		}, {
			key: "update",
			value: function update() {
				if (this._vImages) this._vImages.update();
			}
		}, {
			key: "onResize",
			value: function onResize(w, h) {
				document.body.style.height = this._vImages.nrImages * h + 'px';

				this._vImages.onResize(w, h);
				for (var overlay in this._overlays) {
					this._overlays[overlay].onResize(w, h);
				}this._vMobileMenu.onResize(w, h);
			}
		}]);

		return Main;
	}();

	exports.default = Main;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewImage = __webpack_require__(15);

	var _ViewImage2 = _interopRequireDefault(_ViewImage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewImages = function () {
		function ViewImages(el, images, imagesLoadedCallback, scope, mobileBreak) {
			_classCallCheck(this, ViewImages);

			this._el = el;

			this.mobileBreak;

			this.nrImages = images.length;
			this.images = images.slice();

			this.imagesLoadedCallback = imagesLoadedCallback;
			this.scope = scope;
			this.loadImage(this.images.shift());

			this.winH = undefined;

			this._viewImages = [];

			this.currScrollTop = -1;

			this.runUpdate = false;
			this.currentAnimation = { diff: undefined, start: undefined, end: undefined, current: undefined };

			this.isHidden = false;
		}

		_createClass(ViewImages, [{
			key: 'loadImage',
			value: function loadImage(src) {
				var _this = this;

				var img = new Image();
				img.onload = function () {
					_this._el.appendChild(img);
					var viewImage = new _ViewImage2.default(img, _this.nrImages - _this._viewImages.length);
					_this._viewImages.push(viewImage);
					if (_this.images.length > 0) _this.loadImage(_this.images.shift());else {
						_this.onResize(window.innerWidth, window.innerHeight);
						_this.imagesLoadedCallback.call(_this.scope);
					}
				};
				img.src = 'assets/' + src + '.png';
			}
		}, {
			key: 'show',
			value: function show() {

				this.isHidden = false;

				var currScrollTop = this.currScrollTop;
				var winH = this.winH;
				var currentIdx = Math.floor(currScrollTop / winH);

				window.scrollTo(0, currScrollTop);

				var scrollTop = 0;
				if (currentIdx == 0) {
					scrollTop = winH;
					console.log('first');
				} else if (currentIdx == this.nrImages - 1) {
					console.log('last');
					scrollTop = currentIdx * winH;
				} else {
					scrollTop = winH * currentIdx - winH;
					console.log('mid');
				}

				currScrollTop -= winH;
				var diff = scrollTop - currScrollTop;
				this.currentAnimation.diff = diff;
				this.currentAnimation.start = currScrollTop;
				this.currentAnimation.current = 0.0;
				this.currentAnimation.type = 'show';
				this.runUpdate = true;
			}
		}, {
			key: 'hide',
			value: function hide() {

				var currScrollTop = this.currScrollTop;
				var winH = this.winH;
				var currentIdx = Math.floor(currScrollTop / winH);

				var scrollTop = 0;
				if (currentIdx == 0) {
					scrollTop = winH / 2;
					console.log('first');
				} else if (currentIdx == this.nrImages - 1) {
					console.log('last');
					scrollTop = currentIdx * winH - winH / 2;
				} else {
					scrollTop = winH * currentIdx + winH / 2 - winH;
					console.log('mid');
				}

				currScrollTop -= winH;
				var diff = scrollTop - currScrollTop;
				this.currentAnimation.diff = diff;
				this.currentAnimation.start = currScrollTop;
				this.currentAnimation.current = 0.0;
				this.currentAnimation.type = 'hide';
				this.runUpdate = true;
			}
		}, {
			key: 'update',
			value: function update() {

				if (!this.runUpdate) return;

				var val = this.currentAnimation.diff * this.currentAnimation.current + this.currentAnimation.start;

				window.scrollTo(0, val);

				if (this.currentAnimation.current >= 1) {
					if (this.currentAnimation.type == 'hide') this.isHidden = true;

					this.runUpdate = false;
				} else {
					this.currentAnimation.current += .05;
				}
			}
		}, {
			key: 'onScroll',
			value: function onScroll(scrollTop) {

				if (this.isHidden) return;

				if (this._viewImages.length == 0) return;

				var winH = this.winH;
				scrollTop += winH;
				var currentIdx = Math.floor(scrollTop / winH);
				if (currentIdx == this.nrImages) return;
				var prevIdx = currentIdx > 0 ? currentIdx - 1 : -1;
				var nextIdx = currentIdx < this.nrImages - 1 ? currentIdx + 1 : -1;

				var normalized = Math.round(scrollTop % winH / winH * 100) / 100;
				var prevNormalized = 1 - normalized;
				var nextNormalized = 1 - normalized;

				if (currentIdx > -1) {
					this._viewImages[currentIdx].update(normalized);
				}

				if (prevIdx > -1) {
					this._viewImages[prevIdx].update(prevNormalized);
				}

				this.currScrollTop = scrollTop;
				// console.log(currentIdx, normalized);
			}
		}, {
			key: 'onResize',
			value: function onResize(w, h) {

				this.winH = h;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this._viewImages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var img = _step.value;

						img.onResize(w, h);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}]);

		return ViewImages;
	}();

	exports.default = ViewImages;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewImage = function () {
		function ViewImage(el, idx) {
			_classCallCheck(this, ViewImage);

			this._el = el;
			this._idx = idx;
		}

		_createClass(ViewImage, [{
			key: 'update',
			value: function update(normalized) {

				var opacity = Math.pow(normalized, 8);
				var scaleMult = this._isMobile ? 1.0 : 1.3;
				var scale = Math.pow(normalized, 3) * scaleMult;

				this._el.style[window.NS.transform] = 'scale(' + scale + ')';

				this._el.style.opacity = opacity;
			}
		}, {
			key: 'onResize',
			value: function onResize(w, h) {

				this._isMobile = w < 768 ? true : false;
				this._el.style.marginLeft = -(this._el.width / 2) + 'px';
			}
		}]);

		return ViewImage;
	}();

	exports.default = ViewImage;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ViewOverlay2 = __webpack_require__(17);

	var _ViewOverlay3 = _interopRequireDefault(_ViewOverlay2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ViewAbout = function (_ViewOverlay) {
		_inherits(ViewAbout, _ViewOverlay);

		function ViewAbout(el, onHideCallback, callbackScope) {
			_classCallCheck(this, ViewAbout);

			return _possibleConstructorReturn(this, (ViewAbout.__proto__ || Object.getPrototypeOf(ViewAbout)).call(this, el, onHideCallback, callbackScope));
		}

		return ViewAbout;
	}(_ViewOverlay3.default);

	exports.default = ViewAbout;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewOverlay = function () {
		function ViewOverlay(el, onHideCallback, callbackScope) {
			var hasDetail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			_classCallCheck(this, ViewOverlay);

			this._el = el;

			this.dataId = this._el.getAttribute('data-id');

			this._el.style.transform = 'scale(.93)';

			this.onHideCallback = onHideCallback;
			this.callbackScope = callbackScope;

			this.hasDetail = hasDetail;

			this.closeBtn = document.querySelector('.closeBtn');
			this.onCloseBtnClickBound = this.onCloseBtnClick.bind(this);
			// var touchLayer = this._el.querySelector('.touchLayer');
			// touchLayer.addEventListener('click', () => {
			// 	this._hide();
			// 	this.onHideCallback.call(this.callbackScope);
			// });

			this.showing = false;
			// this.onResize(window.innerWidth, window.innerHeight);

		}

		_createClass(ViewOverlay, [{
			key: 'toggle',
			value: function toggle() {

				if (this.showing) this._hide();else this._show();
			}
		}, {
			key: 'activateCloseBtn',
			value: function activateCloseBtn() {

				this.closeBtn.addEventListener('click', this.onCloseBtnClickBound);
			}
		}, {
			key: 'onCloseBtnClick',
			value: function onCloseBtnClick() {

				console.log('close btn');
				if (this.hasDetail) {

					if (this.detailOpen) {
						console.log('deatil open');
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var item = _step.value;

								item._projectDetail.hide();
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					} else {
						this._hide();
						this.onHideCallback.call(this.callbackScope);
					}
				} else {
					this._hide();
					this.onHideCallback.call(this.callbackScope);
				}
			}
		}, {
			key: 'inactivateCloseBtn',
			value: function inactivateCloseBtn() {

				this.closeBtn.removeEventListener('click', this.onCloseBtnClickBound);
			}
		}, {
			key: '_show',
			value: function _show() {

				this.activateCloseBtn();
				this._el.style.display = 'block';

				var self = this;
				setTimeout(function () {
					self._el.style.opacity = 1;
					self._el.style[window.NS.transform] = 'scale(1.0)';

					self.closeBtn.style.opacity = 1;
				}, 100);

				this.showing = true;

				window.scrollTo(0, 0);
			}
		}, {
			key: '_hide',
			value: function _hide() {
				var _this = this;

				this.inactivateCloseBtn();
				// this._el.style.transform = 'translate3d(0, -100%,0)';
				this._el.style.opacity = 0;
				this._el.style[window.NS.transform] = 'scale(.93)';

				this.closeBtn.style.opacity = 0;

				setTimeout(function () {
					_this._el.style.display = 'none';
				}, 1000);
				this.showing = false;

				// this._el.style.height = '0';
			}
		}, {
			key: 'update',
			value: function update() {}
		}, {
			key: 'render',
			value: function render() {}
		}, {
			key: 'onResize',
			value: function onResize(w, h) {}
		}]);

		return ViewOverlay;
	}();

	exports.default = ViewOverlay;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewOverlay2 = __webpack_require__(17);

	var _ViewOverlay3 = _interopRequireDefault(_ViewOverlay2);

	var _ViewProjectItem = __webpack_require__(19);

	var _ViewProjectItem2 = _interopRequireDefault(_ViewProjectItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ViewProjects = function (_ViewOverlay) {
		_inherits(ViewProjects, _ViewOverlay);

		function ViewProjects(el, onHideCallback, callbackScope, projectsData, hasDetail) {
			_classCallCheck(this, ViewProjects);

			var _this = _possibleConstructorReturn(this, (ViewProjects.__proto__ || Object.getPrototypeOf(ViewProjects)).call(this, el, onHideCallback, callbackScope, hasDetail));

			_this.projectsContainer = _this._el.querySelector('.projectsContainer');

			_this.ITEMS_PER_ROW = 3;
			_this.ITEMS_PER_ROW_MOBILE = 1;
			_this.MOBILE_BREAK = 768;
			_this.MARGIN = 10;

			_this.items = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = projectsData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var projectData = _step.value;

					var item = new _ViewProjectItem2.default(_this.projectsContainer, projectData, _this.onDetailOpen, _this.onDetailClose, _this);
					_this.items.push(item);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			_this.detailOpen = false;

			return _this;
		}

		_createClass(ViewProjects, [{
			key: 'onDetailOpen',
			value: function onDetailOpen() {

				var delay = 0;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var item = _step2.value;

						item.hide(delay += 100);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				this.detailOpen = true;
				// this.closeBtn.style.display = 'none';
			}
		}, {
			key: 'onDetailClose',
			value: function onDetailClose() {

				var delay = (this.items.length - 1) * 100;
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var item = _step3.value;

						item.show(delay -= 100);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				this.detailOpen = false;
				// this.closeBtn.style.display = 'block';
			}
		}, {
			key: 'onResize',
			value: function onResize(w, h) {

				var isMobile = w < this.MOBILE_BREAK ? true : false;
				var wMult = isMobile ? .9 : .8;
				var containerW = w * wMult;
				this.projectsContainer.style.width = containerW + 'px';

				var itemsPerRow = isMobile ? this.ITEMS_PER_ROW_MOBILE : this.ITEMS_PER_ROW;

				var itemW = Math.floor(containerW / itemsPerRow);

				var currentX = 0;
				var currentY = 0;
				var idx = 1;

				var itemH = itemW;

				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = this.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var item = _step4.value;

						item.onResize(currentX, currentY, itemW, itemH, w);
						if (idx % itemsPerRow == 0) {
							if (idx > 0) {
								currentY += itemH + this.MARGIN;
							}
							currentX = 0;
						} else {
							currentX += itemW + this.MARGIN;
						}

						idx++;
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				var containerH = this.items.length * (itemH + this.MARGIN);
				// this._el.style.height = containerH + 'px';
			}
		}]);

		return ViewProjects;
	}(_ViewOverlay3.default);

	exports.default = ViewProjects;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewProjectDetail = __webpack_require__(20);

	var _ViewProjectDetail2 = _interopRequireDefault(_ViewProjectDetail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewProjectItem = function () {
		function ViewProjectItem(parentEl, data, openDetailCallback, closeDetailCallback, callbackScope) {
			var _this = this;

			_classCallCheck(this, ViewProjectItem);

			this.isMobile = false;

			this.openDetailCallback = openDetailCallback;
			this.closeDetailCallback = closeDetailCallback;
			this.callbackScope = callbackScope;

			var el = document.createElement('div');
			el.classList.add('projectItem');

			var loader = document.createElement('img');
			loader.classList.add('projectItemLoader');
			loader.src = '../assets/triangle.svg';
			el.appendChild(loader);
			this.loader = loader;

			var captionLayer = document.createElement('div');
			captionLayer.classList.add('itemCaption');

			var captionCopy = document.createElement('h5');
			captionCopy.innerHTML = data.title;

			captionLayer.appendChild(captionCopy);

			var openBtn = document.createElement('h5');
			openBtn.classList.add('projectOpenBtn');
			openBtn.innerHTML = 'VIEW';

			captionLayer.appendChild(openBtn);

			var touchLayer = document.createElement('div');
			touchLayer.classList.add('touchLayer');

			el.appendChild(touchLayer);
			el.appendChild(captionLayer);

			parentEl.appendChild(el);

			this._el = el;

			var img = new Image();
			img.onload = function () {
				_this._el.appendChild(img);
			};
			img.src = '../assets/projects/' + data.frontAsset + '.jpg';

			this.touchLayer = touchLayer;
			this.captionLayer = captionLayer;

			this.captionVisible = false;

			var projectDetailEl = document.createElement('div');
			projectDetailEl.className = 'projectDetailWrapper';

			parentEl.appendChild(projectDetailEl);

			this._projectDetail = new _ViewProjectDetail2.default(projectDetailEl, data.detail, this.onDetailClose, this.onDetailLoaded, this);

			touchLayer.addEventListener('click', function () {
				if (!_this._projectDetail.isSliderLoaded()) return;
				_this.openDetailCallback.call(_this.callbackScope);

				_this._projectDetail.show();
			});
		}

		_createClass(ViewProjectItem, [{
			key: 'onDetailLoaded',
			value: function onDetailLoaded() {

				this.loader.style.display = 'none';
			}
		}, {
			key: 'onDetailClose',
			value: function onDetailClose() {

				this.closeDetailCallback.call(this.callbackScope);
			}
		}, {
			key: 'activateDesktop',
			value: function activateDesktop() {
				var _this2 = this;

				this.touchLayer.addEventListener('mouseover', function () {
					_this2.captionLayer.style.opacity = 1;
				});

				this.touchLayer.addEventListener('mouseout', function () {
					_this2.captionLayer.style.opacity = 0;
				});

				this.touchLayer.removeEventListener('click', function () {});
			}
		}, {
			key: 'activateMobile',
			value: function activateMobile() {
				var _this3 = this;

				this.touchLayer.removeEventListener('mouseover', function () {});
				this.touchLayer.removeEventListener('mouseout', function () {});

				this.touchLayer.addEventListener('click', function (e) {
					if (_this3.captionVisible) {
						_this3.captionVisible = false;
						_this3.captionLayer.style.opacity = 0;
					} else {
						_this3.captionVisible = true;
						_this3.captionLayer.style.opacity = 1;
					}
				});
			}
		}, {
			key: 'show',
			value: function show(delay) {
				var _this4 = this;

				this._el.style.display = 'block';

				setTimeout(function () {
					_this4._el.style.opacity = 1;
					_this4._el.style[window.NS.transform] = 'scale(1)';
				}, delay + 200);
			}
		}, {
			key: 'hide',
			value: function hide(delay) {
				var _this5 = this;

				setTimeout(function () {
					_this5._el.style.opacity = 0;
					_this5._el.style[window.NS.transform] = 'scale(.92)';
				}, delay);

				setTimeout(function () {
					_this5._el.style.display = 'none';
				}, delay + 500);
			}
		}, {
			key: 'onResize',
			value: function onResize(x, y, w, h, winW) {

				var isMobile = winW < 768 ? true : false;
				if (isMobile && !this.isMobile) this.activateMobile();else {
					this.activateDesktop();
				}

				this.isMobile = isMobile;

				this._el.style.left = x + 'px';
				this._el.style.top = y + 'px';
				this._el.style.width = w + 'px';
				this._el.style.height = h + 'px';

				this._projectDetail.onResize(winW);
			}
		}]);

		return ViewProjectItem;
	}();

	exports.default = ViewProjectItem;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewSlider = __webpack_require__(21);

	var _ViewSlider2 = _interopRequireDefault(_ViewSlider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewProjectDetail = function () {
		function ViewProjectDetail(el, data, closeCallback, loadedCallback, callbackScope) {
			_classCallCheck(this, ViewProjectDetail);

			this._el = el;

			this.closeCallback = closeCallback;
			this.callbackScope = callbackScope;
			this.loadedCallback = loadedCallback;

			this._descrEl = document.createElement('p');
			this._descrEl.className = 'projectDescr';
			this._descrEl.innerHTML = data.descr;

			this._el.appendChild(this._descrEl);

			// var projectDetailCloseBtn = document.createElement('img');
			// projectDetailCloseBtn.className = 'projectDetailCloseBtn';
			// projectDetailCloseBtn.src = 'assets/icons/cancel.svg';

			// projectDetailCloseBtn.addEventListener('click', (e) => {

			// 	this.hide();
			// });

			// this._el.appendChild(projectDetailCloseBtn);

			var sliderWrapper = document.createElement('div');
			sliderWrapper.className = 'projectSlider';
			this._el.appendChild(sliderWrapper);
			this._slider = new _ViewSlider2.default(sliderWrapper, data, this.sliderLoaded, this);
		}

		_createClass(ViewProjectDetail, [{
			key: 'sliderLoaded',
			value: function sliderLoaded() {

				this.loadedCallback.call(this.callbackScope);
			}
		}, {
			key: 'isSliderLoaded',
			value: function isSliderLoaded() {

				return this._slider.isLoaded;
			}
		}, {
			key: 'show',
			value: function show() {
				var _this = this;

				this._el.style.display = 'block';

				setTimeout(function () {
					_this._el.style.opacity = 1;
					window.scrollTo(0, 0);
				}, 800);

				// this._slider.currentIdx = 1;
				if (this._slider.currentIdx > -1) this._slider.hide(this._slider.currentIdx);

				this._slider.show(0);
			}
		}, {
			key: 'hide',
			value: function hide() {
				var _this2 = this;

				setTimeout(function () {
					_this2._el.style.display = 'none';
				}, 500);

				this._el.style.opacity = 0;

				this.closeCallback.call(this.callbackScope);
			}
		}, {
			key: 'onResize',
			value: function onResize(w) {
				this._slider.onResize(w);
			}
		}]);

		return ViewProjectDetail;
	}();

	exports.default = ViewProjectDetail;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewSlider = function () {
		function ViewSlider(el, data, loadedCallback, callbackScope) {
			var _this = this;

			_classCallCheck(this, ViewSlider);

			this._el = el;

			this.loadedCallback = loadedCallback;
			this.callbackScope = callbackScope;

			this._containerEl = document.createElement('div');
			this._containerEl.className = 'sliderContainer';

			this._el.appendChild(this._containerEl);

			// this._innerEl = document.createElement('div');
			// this._innerEl.className = 'sliderInner';
			// this._containerEl.appendChild(this._innerEl);

			var arrowNext = document.createElement('img');
			arrowNext.className = 'sliderNext sliderNav';
			arrowNext.src = 'assets/icons/next.svg';
			arrowNext.addEventListener('click', function () {

				var hideIdx = _this.currentIdx;
				var nextIdx = _this.currentIdx;
				if (nextIdx >= _this._items.length - 1) {
					nextIdx = 0;
				} else nextIdx++;

				setTimeout(function () {
					_this.show(nextIdx);
				}, 600);

				setTimeout(function () {
					_this.hide(hideIdx, nextIdx);
				}, 0);
			});

			var arrowPrev = document.createElement('img');
			arrowPrev.className = 'sliderPrev sliderNav';
			arrowPrev.src = 'assets/icons/back.svg';
			arrowPrev.addEventListener('click', function () {
				var hideIdx = _this.currentIdx;
				var nextIdx = _this.currentIdx;
				if (nextIdx == 0) {
					nextIdx = _this._items.length - 1;
				} else nextIdx--;

				setTimeout(function () {
					_this.show(nextIdx);
				}, 600);

				setTimeout(function () {
					_this.hide(hideIdx, nextIdx);
				}, 0);
			});

			this._el.appendChild(arrowNext);
			this._el.appendChild(arrowPrev);

			this._assets = data.assets.slice();

			this.isLoaded = false;

			this._items = [];
			this.loadedCounter = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this._assets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var asset = _step.value;

					var item = document.createElement('div');
					item.className = 'sliderItem';

					var img = new Image();
					img.onload = function () {
						_this.loadedCounter++;
						if (_this.loadedCounter == _this._assets.length - 1) {
							_this.loadedCallback.call(_this.callbackScope);
							_this.isLoaded = true;
							_this.onResize(window.innerWidth);
						}
					};
					img.src = 'assets/projects/' + data.assetsFolder + '/' + asset;
					item.appendChild(img);

					this._containerEl.appendChild(item);

					this._items.push({ item: item, 'img': img });
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.currentIdx = -1;

			// this.onResize(window.innerWidth);		
		}

		_createClass(ViewSlider, [{
			key: 'show',
			value: function show(idx) {

				// var translateX = this.currentWidth;
				// var leftX = -this.currentWidth;
				// if (idx > this.currentIdx){
				// 	translateX = -this.currentWidth;
				// 	leftX = this.currentWidth;
				// }
				// console.log('show: ',idx,' leftX: ',leftX, ' transX: ',translateX);
				// this._items[idx].item.style.left = leftX + 'px';
				// this._items[idx].item.style.transform = 'translate('+translateX+'px, 0px)';

				// this._el.style.height = this._items[idx].img.height * this._items[idx].ratio + 'px';

				this._items[idx].item.style[window.NS.transform] = 'scale(1)';
				this._items[idx].item.style.opacity = 1;
				this.currentIdx = idx;
			}
		}, {
			key: 'hide',
			value: function hide(idx, nextIdx) {

				// console.log('hide: ',idx, 'curridx: ',this.currentIdx);
				// var translateX = 0;
				// // var leftX = 0;
				// if (nextIdx > idx){
				// 	// leftX = 0;
				// 	translateX = -this.currentWidth * 2;
				// }
				// // this._items[idx].item.style.left = 0 + 'px';
				// this._items[idx].item.style.transform = 'translate('+translateX+'px, 0px)';

				this._items[idx].item.style[window.NS.transform] = 'scale(0.4)';
				this._items[idx].item.style.opacity = 0;
			}
		}, {
			key: 'onResize',
			value: function onResize(w) {

				if (!this.isLoaded) return;

				var maxH = window.innerHeight - 20;
				var isMobile = w < 768 ? true : false;
				var wMult = isMobile ? .8 : .5;
				var outerW = w * wMult;

				this._el.style.width = outerW + 'px';

				this._containerEl.style.width = outerW + 'px';

				var sliderHeight = 0;

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this._items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var item = _step2.value;

						var ratio = outerW / item.img.width;
						item.ratio = ratio;
						var imgHeight = item.img.height * ratio;
						item.height = imgHeight;
						item.width = outerW;

						if (imgHeight > maxH) {
							ratio = maxH / item.img.height;
							item.ratio = ratio;
							item.height = maxH;
							item.width = item.img.width * ratio;
						}
						if (sliderHeight < item.height) sliderHeight = item.height;
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this._items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var item = _step3.value;

						item.item.style.width = item.width + 'px';
						if (item.width < outerW) item.item.style.left = outerW / 2 - item.width / 2 + 'px';
						item.item.style[window.NS.transform] = 'scale(0.4)';
						item.item.style.opacity = 0;

						item.item.style.top = sliderHeight / 2 - item.height / 2 + 'px';
						// item.item.style.marginTop = (sliderHeight/2) - (item.img.height)/2 + 'px';
						// item.item.style.left = -outerW + 'px';

						// var ratio = outerW / item.img.width;
						// var imgHeight = item.img.height * ratio;
						// if (sliderHeight < imgHeight)
						// 	sliderHeight = imgHeight;
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				this._el.style.height = sliderHeight + 'px';

				this.currentWidth = outerW;
			}
		}]);

		return ViewSlider;
	}();

	exports.default = ViewSlider;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ViewOverlay2 = __webpack_require__(17);

	var _ViewOverlay3 = _interopRequireDefault(_ViewOverlay2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ViewContact = function (_ViewOverlay) {
		_inherits(ViewContact, _ViewOverlay);

		function ViewContact(el, onHideCallback, callbackScope) {
			_classCallCheck(this, ViewContact);

			return _possibleConstructorReturn(this, (ViewContact.__proto__ || Object.getPrototypeOf(ViewContact)).call(this, el, onHideCallback, callbackScope));
		}

		return ViewContact;
	}(_ViewOverlay3.default);

	exports.default = ViewContact;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ViewNavItem = __webpack_require__(24);

	var _ViewNavItem2 = _interopRequireDefault(_ViewNavItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DELAY_TIME = 50;

	var ViewMobileMenu = function () {
		function ViewMobileMenu(el) {
			var _this = this;

			_classCallCheck(this, ViewMobileMenu);

			this._el = el;

			setTimeout(function () {
				_this._el.style.opacity = 1;
			}, 500);

			this.isActive = false;

			this._burgerEl = this._el.querySelector('.menuBurger');
			this._burgerEl.addEventListener('click', function (e) {
				_this.onBurgerClick(e);
			});

			this._navItems = [];
			var navItems = this._el.querySelectorAll('.nav-item');
			for (var i = 0; i < navItems.length; i++) {
				var navItem = new _ViewNavItem2.default(navItems[i]);
				this._navItems.push(navItem);

				navItems[i].addEventListener('click', function (e) {
					_this.onItemClick();
				});
			}

			this.isOpen = false;
		}

		_createClass(ViewMobileMenu, [{
			key: 'onItemClick',
			value: function onItemClick() {

				if (!this.isActive) return;

				this.hideMenu();
			}
		}, {
			key: 'onBurgerClick',
			value: function onBurgerClick(e) {

				if (!this.isActive) return;

				e.preventDefault();

				this.isOpen ? this.hideMenu() : this.showMenu();
			}
		}, {
			key: 'showMenu',
			value: function showMenu() {

				var delay = 0;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this._navItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;

						item.show(delay);

						delay += DELAY_TIME;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				this.isOpen = true;
			}
		}, {
			key: 'hideMenu',
			value: function hideMenu() {

				var delay = (this._navItems.length - 1) * DELAY_TIME;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this._navItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var item = _step2.value;

						item.hide(delay);

						delay -= DELAY_TIME;
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				this.isOpen = false;
			}
		}, {
			key: 'onResize',
			value: function onResize(w, h) {

				this.isActive = w < 768 ? true : false;
			}
		}]);

		return ViewMobileMenu;
	}();

	exports.default = ViewMobileMenu;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewNavItem = function () {
		function ViewNavItem(el) {
			_classCallCheck(this, ViewNavItem);

			this._el = el;

			this.timer = null;
		}

		_createClass(ViewNavItem, [{
			key: 'show',
			value: function show(delay) {
				var _this = this;

				clearTimeout(this.timer);
				this.timer = setTimeout(function () {
					_this._el.style[window.NS.transform] = 'translate(0,0)';
				}, delay);
			}
		}, {
			key: 'hide',
			value: function hide(delay) {
				var _this2 = this;

				clearTimeout(this.timer);
				this.timer = setTimeout(function () {
					_this2._el.style[window.NS.transform] = 'translate(-200px,0)';
				}, delay);
			}
		}]);

		return ViewNavItem;
	}();

	exports.default = ViewNavItem;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Data = function Data() {
		_classCallCheck(this, Data);

		this.featured = ['image_1_small', 'image_2_small', 'image_3_small'];

		this.projects = [{
			title: "Unfold",
			frontAsset: "project_dripping",
			detail: {
				'descr': "",
				'assetsFolder': 'dripping',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']
			}
		}, {
			title: "Indigo",
			frontAsset: "project_indigo",
			detail: {
				'descr': "",
				'assetsFolder': 'indigo',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
			}
		}, {
			title: "Yarn Life",
			frontAsset: "project_yarn",
			detail: {
				'descr': "",
				'assetsFolder': 'yarn',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg']
			}
		}, {
			title: "Recycle",
			frontAsset: "project_recycle",
			detail: {
				'descr': "",
				'assetsFolder': 'recycle',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
			}
		}, {
			title: "The process",
			frontAsset: "project_process",
			detail: {
				'descr': "",
				'assetsFolder': 'the_process',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
			}
		}, {
			title: "Wrapped",
			frontAsset: "project_wrapped",
			detail: {
				'descr': "",
				'assetsFolder': 'wrapped',
				'assets': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
			}
		}];
	};

	exports.default = Data;

/***/ }
/******/ ]);