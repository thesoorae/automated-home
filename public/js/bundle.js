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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = __webpack_require__(1);

var House = function () {
  function House(ctx, data, updateDB) {
    _classCallCheck(this, House);

    this.updateDB = updateDB;
    this.ctx = ctx;
    this.data = data;
  }

  _createClass(House, [{
    key: 'start',
    value: function start() {
      var data = this.data;
      for (var i = 0; i < data.length; i++) {
        var roomParams = data[i];
        var newRoom = new Controls(this.ctx, roomParams, this.updateDB);
        newRoom.start();
      }
      // console.log(this.data);
      // let livingControls = new Controls('living',this.ctx, this.livingCurtainDims, this.livingRoomDims);
      // livingControls.start();
      // let bedControls = new Controls('bedroom',this.ctx, this.bedCurtainDims, this.bedRoomDims);
      // bedControls.start();
      // let kitControls = new Controls('kitchen',this.ctx, this.kitCurtainDims, this.kitRoomDims);
      // kitControls.start();
      // let bathControls = new Controls('bath',this.ctx, this.bathCurtainDims, this.bathRoomDims);
      // bathControls.start();
    }
  }]);

  return House;
}();

module.exports = House;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = __webpack_require__(2);

var Controls = function () {
  function Controls(ctx, params, updateDB) {
    _classCallCheck(this, Controls);

    this.id = params.id;
    this.roomParams = params;
    this.name = params.name;
    this.ctx = ctx;
    this.light = params.light;
    this.temp = params.temp;
    this.curtain = params.curtain_height;
    this.room = null;
    this.curtainPresent = params.curtains.present;
    this.roomDims = params.dims;
    this.update = this.update.bind(this);
    this.updateLight = this.updateLight.bind(this);
    this.updateCurtain = this.updateCurtain.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.lightText = this.lightText.bind(this);
    this.updateDB = updateDB;
    this.patchServer = this.patchServer.bind(this);
  }

  _createClass(Controls, [{
    key: "start",
    value: function start() {
      this.loadControls();

      this.room = new Room(this.ctx, this.roomParams);
      this.room.draw();
    }
  }, {
    key: "update",
    value: function update() {
      console.log(this.id);
      this.room.update(this.temp, this.light, this.curtain);
    }
  }, {
    key: "updateLight",
    value: function updateLight(light) {
      this.light = light;
      console.log("updateLight", this.light);
      this.update();
    }
  }, {
    key: "patchServer",
    value: function patchServer() {
      var data = {
        "light": this.light,
        "curtain_height": this.curtain,
        "temp": this.temp
      };
      this.updateDB(this.id, data);
    }
  }, {
    key: "updateCurtain",
    value: function updateCurtain(curtain) {
      this.curtain = curtain;
      this.update();
    }
  }, {
    key: "updateTemp",
    value: function updateTemp(temp) {
      this.temp = temp;
      this.update();
    }
  }, {
    key: "lightText",
    value: function lightText(val) {
      if (val == 100) {
        return "MAX";
      } else if (val <= 10) {
        return "OFF";
      } else {
        return val + '%';
      }
    }
  }, {
    key: "loadControls",
    value: function loadControls() {
      var update = this.update;
      var updateLight = this.updateLight;
      var updateCurtain = this.updateCurtain;
      var updateTemp = this.updateTemp;
      var name = this.name;
      var lightText = this.lightText;
      var patchServer = this.patchServer;

      $("#" + name + "-minval-temp").text(this.temp + "\xB0F");
      $("#" + name + "-minval-light").text(lightText(this.light));
      $("#" + name + "-minval-curtain").text(this.curtain + "%");

      $("#" + name + "-temp-slider").slider({
        orientation: "horizontal",
        min: 50,
        max: 90,
        value: this.temp,
        slide: function slide(event, ui) {
          $("#" + name + "-minval-temp").text(ui.value + "\xB0F"), updateTemp(ui.value);
        },
        change: function change() {
          patchServer();
        }
      });
      //  $( "#minval-temp" ).val( $( "#temp-slider" ).slider( "value" ) );


      $("#" + name + "-light-slider").slider({
        orientation: "horizontal",
        min: 10,
        max: 100,
        step: 10,
        value: this.light,
        slide: function slide(event, ui) {
          $("#" + name + "-minval-light").text(lightText(ui.value));
          updateLight(ui.value);
        },
        change: function change() {
          patchServer();
        }
      });

      if (this.curtainPresent) {
        $("#" + name + "-curtain-slider").slider({
          orientation: "horizontal",
          min: 10,
          step: 10,
          max: 100,
          value: this.curtain,
          slide: function slide(event, ui) {
            $("#" + name + "-minval-curtain").text(ui.value + "%");
            updateCurtain(ui.value);
          },
          change: function change() {
            patchServer();
          }
        });
      } else {
        console.log("." + name + " > div.curtains");
        $("." + name + " .curtains").hide();
      }
    }
  }]);

  return Controls;
}();

module.exports = Controls;

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room(ctx, params) {
    _classCallCheck(this, Room);

    this.name = params.name;
    this.ctx = ctx;
    this.temp = params.temp;
    this.light = 10 / params.light;
    this.curtainHeight = params.curtains.max * (params.curtain_height / 100);
    this.draw = this.draw.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.update = this.update.bind(this);

    this.curtainX = params.curtains.x;
    this.curtainY = params.curtains.y;
    this.curtainW = params.curtains.w;
    this.curtainMaxHeight = params.curtains.max;
    this.curtainColor = params.curtains.col;

    this.roomX = params.dims.x;
    this.roomY = params.dims.y;
    this.roomW = params.dims.w;
    this.roomH = params.dims.h;
    if (params.name == "living") {
      $('.fire').fire({
        speed: 50,
        maxPow: (this.temp - 60) / 5,
        gravity: 0,
        flameWidth: 3,
        flameHeight: 0,
        fadingFlameSpeed: 8
      });
    }
  }

  _createClass(Room, [{
    key: 'draw',
    value: function draw() {
      var curtainHeight = this.curtainHeight;
      var brightness = this.light;
      console.log(curtainHeight);
      var ctx = this.ctx;
      // let img = new Image();
      // img.onload = function(){
      // ctx.drawImage(img, 0,0);
      ctx.clearRect(this.roomX, this.roomY, this.roomW, this.roomH);

      ctx.fillStyle = this.curtainColor;
      ctx.fillRect(this.curtainX, this.curtainY, this.curtainW, curtainHeight);

      ctx.fillStyle = 'rgba(0, 0, 0, ' + brightness + ')';
      ctx.fillRect(this.roomX, this.roomY, this.roomW, this.roomH);

      ctx.fillStyle = 'white';
      ctx.font = "25px Arial";
      ctx.fillText(this.temp + '\xB0F', this.roomX + this.roomW - 90, this.roomY + 40);

      // };
      // img.src = `./assets/${this.name}.png`;
    }
  }, {
    key: 'update',
    value: function update(temp, light, curtain) {
      this.temp = temp;
      this.light = 10 / light;
      if (light == 100) this.light = 0;
      this.curtainHeight = this.curtainMaxHeight * (curtain / 100);
      this.draw();
      this.updateTemp();
    }
  }, {
    key: 'updateTemp',
    value: function updateTemp() {
      if (this.name == "living") {
        $('.fire').fire('change', { maxPow: (this.temp - 60) / 5 });
      }
    }
  }]);

  return Room;
}();

module.exports = Room;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var House = __webpack_require__(0);

// let root = "http://localhost:3000";
// let root = "https://github.com/thesoorae/automated-home";
// let root = process.env.PORT || 3000;
var root = "https://automated-home.herokuapp.com/";
//get canvas
$(document).ready(function () {
  var canvas = $("#canvas")[0];
  var x = window.innerWidth || document.documentElement.clientWidth;
  var y = window.innerHeight || document.documentElement.clientHeight;
  canvas.width = x;
  canvas.height = y;
  console.log(root);

  var updateDB = function updateDB(id, data) {
    $.ajax({
      type: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      url: root + '/rooms/' + id,
      dataType: 'json',
      data: JSON.stringify(data)
    }).then(function (res) {
      console.log('successfully updated' + res);
    });
  };

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    $.ajax({
      url: root + '/rooms',
      method: 'GET'
    }).then(function (data) {
      var house = new House(ctx, data, updateDB);
      house.start();
    });

    // Fetch data from API and pass into House constructor to specify starting parameters
  } else {
    throw Error("HTML5 Canvas not supported on your browser");
  }
});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map