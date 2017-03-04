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

	const House = __webpack_require__(3);
	
	//get canvas
	$(document).ready(function(){
	  const canvas = $("#canvas")[0];
	  const x = window.innerWidth || document.documentElement.clientWidth;
	  const y = window.innerHeight || document.documentElement.clientHeight;
	  canvas.width = x;
	  canvas.height = y;
	  console.log(x, y);
	
	
	
	  if (canvas.getContext){
	    const ctx = canvas.getContext('2d');
	    // let w = $("#canvas").width();
	    // let h = $("#canvas").height();
	    // let livingControls = new Controls('living',ctx, x, y);
	    // let kitchenControls = new Controls('')
	    let house = new House(ctx);
	    house.start();
	
	
	
	} else{
	  console.log("canvas not supported");
	}
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Room = __webpack_require__(2);
	class Controls{
	  constructor(name, ctx, curtainDims, roomDims){
	    this.name = name;
	    this.ctx = ctx;
	    this.light = 90;
	    this.temp = 70;
	    this.curtain = 20;
	    this.room = null;
	    this.curtainDims = curtainDims;
	    this.curtainPresent = curtainDims.present;
	    this.roomDims = roomDims;
	    this.update = this.update.bind(this);
	    this.updateLight = this.updateLight.bind(this);
	    this.updateCurtain = this.updateCurtain.bind(this);
	    this.updateTemp = this.updateTemp.bind(this);
	    this.lightText = this.lightText.bind(this);
	
	
	  }
	  start(){
	    this.loadControls();
	
	    this.room = new Room(this.name, this.ctx, this.temp, this.light, this.curtain, this.curtainDims, this.roomDims);
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
	  lightText(val){
	    if(val == 100 ){
	      return "MAX";
	    } else if(val <= 10){
	      return "OFF";
	    } else {
	      return val + '%';
	    }
	  }
	
	  loadControls(){
	    const update = this.update;
	    const updateLight = this.updateLight;
	    const updateCurtain = this.updateCurtain;
	    const updateTemp = this.updateTemp;
	    const name = this.name;
	    const lightText = this.lightText;
	
	    $( `#${name}-minval-temp` ).text( `${this.temp}°F` );
	    $( `#${name}-minval-light` ).text( lightText(this.light) );
	    $( `#${name}-minval-curtain` ).text( `${this.curtain}%` );
	
	
	    $( `#${name}-temp-slider` ).slider({
	              orientation:"horizontal",
	              min: 50,
	              max: 90,
	              value:this.temp,
	              slide: function( event, ui ) {
	                 $( `#${name}-minval-temp` ).text( `${ui.value}°F` ),
	                 updateTemp(ui.value);
	              }
	           });
	          //  $( "#minval-temp" ).val( $( "#temp-slider" ).slider( "value" ) );
	
	
	        $( `#${name}-light-slider` ).slider({
	                  orientation:"horizontal",
	                  min: 10,
	                  max: 100,
	                  step: 10,
	                  value:this.light,
	                  slide: function( event, ui ) {
	                     $( `#${name}-minval-light` ).text( lightText(ui.value) );
	                     updateLight(ui.value);
	
	                  },
	
	               });
	
	            if(this.curtainPresent){
	              $( `#${name}-curtain-slider` ).slider({
	                        orientation:"horizontal",
	                        min: 10,
	                        step: 10,
	                        max: 100,
	                        value:this.curtain,
	                        slide: function( event, ui ) {
	                           $( `#${name}-minval-curtain` ).text( `${ui.value}%` );
	                           updateCurtain(ui.value);
	                        },
	
	                     });
	            } else{
	              console.log(`.${name} > div.curtains`);
	              $(`.${name} .curtains`).hide();
	            }
	
	
	                }
	
	  }
	
	module.exports = Controls;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Room{
	  constructor(name, ctx, temp, light, curtain, curtainDims, roomDims){
	    this.name = name;
	    this.ctx = ctx;
	    this.temp = temp;
	    this.light = 10/light;
	    this.curtainHeight = curtainDims.max * (curtain/100);
	    this.draw = this.draw.bind(this);
	    this.updateTemp = this.updateTemp.bind(this);
	    this.update = this.update.bind(this);
	
	    this.curtainX = curtainDims.x;
	    this.curtainY = curtainDims.y;
	    this.curtainW = curtainDims.w;
	    this.curtainMaxHeight = curtainDims.max;
	    this.curtainColor = curtainDims.col;
	
	    this.roomX = roomDims.x;
	    this.roomY = roomDims.y;
	    this.roomW = roomDims.w;
	    this.roomH = roomDims.h;
	    if(name == "living"){
	    $('.fire').fire({
	    speed:50,
	    maxPow: (this.temp-60)/5,
	    gravity:0,
	    flameWidth:3,
	    flameHeight:0,
	    fadingFlameSpeed:8
	  });
	  }
	}
	
	
	  draw(){
	    let curtainHeight = this.curtainHeight;
	    let brightness = this.light;
	    console.log(curtainHeight);
	    const ctx = this.ctx;
	    // let img = new Image();
	    // img.onload = function(){
	      // ctx.drawImage(img, 0,0);
	      ctx.clearRect(this.roomX, this.roomY, this.roomW, this.roomH);
	
	      ctx.fillStyle = this.curtainColor;
	      ctx.fillRect(this.curtainX, this.curtainY, this.curtainW, curtainHeight);
	
	      ctx.fillStyle = `rgba(0, 0, 0, ${brightness})`;
	      ctx.fillRect(this.roomX, this.roomY, this.roomW, this.roomH);
	
	      ctx.fillStyle = 'white';
	      ctx.font = "25px Arial";
	      ctx.fillText(`${this.temp}°F`,this.roomX + this.roomW - 90,this.roomY + 40);
	
	    // };
	    // img.src = `./assets/${this.name}.png`;
	
	    }
	  update(temp, light, curtain){
	    this.temp = temp;
	    this.light = 10/light;
	    if(light == 100) this.light = 0;
	    this.curtainHeight = this.curtainMaxHeight * (curtain/100);
	    this.draw();
	    this.updateTemp();
	  }
	  updateTemp(){
	    if(this.name == "living"){
	      $('.fire').fire('change',{maxPow:(this.temp-60)/5});
	    }
	
	  }
	
	
	}
	
	module.exports = Room;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Controls = __webpack_require__(1);
	
	class House{
	  constructor(ctx){
	    this.ctx = ctx;
	    this.livingCurtainDims = {
	          present: true,
	          col: "rgba(219,112,147, 0.7)",
	          x: 110,
	          y: 475,
	          w: 103,
	          max: 90
	        };
	    this.livingRoomDims = {
	          x: 85,
	          y: 435,
	          w: 378,
	          h: 300
	        };
	    this.bedCurtainDims = {
	      present: true,
	      col: "rgba(225,187,66, 0.8)",
	      x: 215,
	      y: 225,
	      w: 110,
	      max: 60
	    };
	    this.bedRoomDims = {
	          x: 85,
	          y: 213,
	          w: 378,
	          h: 205
	        };
	    this.kitCurtainDims = {
	      present: true,
	      col: "rgba(36,122,156, 0.7)",
	      x: 507,
	      y: 458,
	      w: 105,
	      max: 105
	    };
	    this.kitRoomDims = {
	      x: 485,
	      y: 435,
	      w: 305,
	      h: 300
	        };
	    this.bathCurtainDims = {
	      present: false,
	      col: "",
	      x: 0,
	      y: 0,
	      w: 0,
	      max: 0
	    };
	    this.bathRoomDims = {
	          x: 485,
	          y: 213,
	          w: 305,
	          h: 205
	        };
	  }
	  start(){
	    let livingControls = new Controls('living',this.ctx, this.livingCurtainDims, this.livingRoomDims);
	    livingControls.start();
	    let bedControls = new Controls('bedroom',this.ctx, this.bedCurtainDims, this.bedRoomDims);
	    bedControls.start();
	    let kitControls = new Controls('kitchen',this.ctx, this.kitCurtainDims, this.kitRoomDims);
	    kitControls.start();
	    let bathControls = new Controls('bath',this.ctx, this.bathCurtainDims, this.bathRoomDims);
	    bathControls.start();
	  }
	}
	
	module.exports = House;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map