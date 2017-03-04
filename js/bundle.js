/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Controls = __webpack_require__(1);
	
	//get canvas
	$(document).ready(function(){
	  const canvas = $("#living-canvas")[0];
	  canvas.width = 600;
	  canvas.height = 600;
	
	
	
	  if (canvas.getContext){
	    const ctx = canvas.getContext('2d');
	    // let w = $("#canvas").width();
	    // let h = $("#canvas").height();
	    let controls = new Controls('living',ctx);
	    controls.start();
	
	
	
	} else{
	  console.log("canvas not supported");
	}
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Room = __webpack_require__(2);
	class Controls{
	  constructor(name, ctx){
	    this.name = name;
	    this.ctx = ctx;
	    this.light = 10;
	    this.temp = 70;
	    this.curtain = 8;
	    this.room = null;
	    this.update = this.update.bind(this);
	    this.updateLight = this.updateLight.bind(this);
	    this.updateCurtain = this.updateCurtain.bind(this);
	    this.updateTemp = this.updateTemp.bind(this);
	
	
	  }
	  start(){
	    this.loadControls();
	    this.room = new Room(this.name, this.ctx, this.temp, this.light, this.curtain);
	    this.room.draw();
	  }
	
	  update(){
	    console.log("in here");
	    this.room.update(this.temp, this.light, this.curtain);
	    console.log(this.room);
	  }
	  updateLight(light){
	    this.light = light;
	    console.log("updateLight", this.light);
	    this.update();
	  }
	
	  updateCurtain(curtain){
	    this.curtain = curtain;
	    this.update();
	  }
	  updateTemp(temp){
	    this.temp = temp;
	    this.update();
	  }
	
	  loadControls(){
	    const update = this.update;
	    const updateLight = this.updateLight;
	    const updateCurtain = this.updateCurtain;
	    const updateTemp = this.updateTemp;
	    const name = this.name;
	
	    $( `#${name}-minval-temp` ).text( this.temp );
	    $( `#${name}-minval-light` ).text( this.light );
	    $( `#${name}-minval-curtain` ).text( this.curtain );
	
	
	    $( `#${name}-temp-slider` ).slider({
	              orientation:"horizontal",
	              min: 50,
	              max: 90,
	              value:this.temp,
	              slide: function( event, ui ) {
	                 $( `#${name}-minval-temp` ).text( ui.value ),
	                 updateTemp(ui.value);
	              }
	           });
	          //  $( "#minval-temp" ).val( $( "#temp-slider" ).slider( "value" ) );
	
	
	        $( `#${name}-light-slider` ).slider({
	                  orientation:"horizontal",
	                  min: 1,
	                  max: 10,
	                  value:this.light,
	                  slide: function( event, ui ) {
	                     $( `#${name}-minval-light` ).text( ui.value );
	                     updateLight(ui.value);
	
	                  },
	
	               });
	
	
	            $( `#${name}-curtain-slider` ).slider({
	                      orientation:"horizontal",
	                      min: 1,
	                      max: 10,
	                      value:this.curtain,
	                      slide: function( event, ui ) {
	                         $( `#${name}-minval-curtain` ).text( ui.value );
	                         updateCurtain(ui.value);
	                      },
	
	                   });
	
	
	                }
	
	  }
	
	module.exports = Controls;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Room{
	  constructor(name, ctx, temp, light, curtain){
	    this.name = name;
	    this.ctx = ctx;
	    this.temp = (temp - 50)/5;
	    this.light = 0;
	    this.curtainHeight = 250 * (1/8);
	    this.draw = this.draw.bind(this);
	    this.updateTemp = this.updateTemp.bind(this);
	    this.update = this.update.bind(this);
	    $('.fire').fire({
	    speed:50,
	    maxPow: this.temp,
	    gravity:0,
	    flameWidth:3,
	    flameHeight:0,
	    fadingFlameSpeed:8
	  });
	  }
	
	
	  draw(){
	    let curtainHeight = this.curtainHeight;
	    let brightness = this.light;
	    console.log(curtainHeight);
	    const ctx = this.ctx;
	    let img = new Image();
	    img.onload = function(){
	      ctx.drawImage(img, 0,0);
	      ctx.fillStyle = "rgba(219,112,147, 0.7)";
	      ctx.fillRect(420, 45, 132, curtainHeight);
	
	      ctx.fillStyle = `rgba(0, 0, 0, ${brightness})`;
	      ctx.fillRect(0, 0, 600, 600);
	
	
	    };
	    img.src = `./assets/${this.name}.png`;
	
	    }
	  update(temp, light, curtain){
	    this.temp = (temp-50)/5;
	    this.light = 1/light;
	    if(light == 10) this.light = 0;
	    this.curtainHeight = 250 * (1/curtain);
	    if(curtain == 10) this.curtainHeight = 0;
	    this.draw();
	    this.updateTemp();
	  }
	  updateTemp(){
	    $('.fire').fire('change',{maxPow:this.temp});
	  }
	
	
	}
	
	module.exports = Room;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map