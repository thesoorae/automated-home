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
      // Iterate through data and create Control objects for each room in database
      for (var i = 0; i < data.length; i++) {
        var roomParams = data[i];
        var newRoom = new Controls(this.ctx, roomParams, this.updateDB);
        newRoom.start();
      }
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

  // create control inputs and room animation canvas for each room

  _createClass(Controls, [{
    key: "start",
    value: function start() {
      this.loadControls();
      this.room = new Room(this.ctx, this.roomParams);
      this.room.draw();
    }

    // update animation to reflect slider input

  }, {
    key: "update",
    value: function update() {
      this.room.update(this.temp, this.light, this.curtain);
    }

    //Update each animation according to what slider is being changed

  }, {
    key: "updateLight",
    value: function updateLight(light) {
      this.light = light;
      this.update();
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

    //Function that creates data and passes it into AJAX PATCH request at Main object level.

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

    // Create slider effects and event handlers for onslide and onchange.

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

      // Set text for initial load

      $("#" + name + "-minval-temp").text(this.temp + "\xB0F");
      $("#" + name + "-minval-light").text(lightText(this.light));
      $("#" + name + "-minval-curtain").text(this.curtain + "%");

      // Temperature slider

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

      // Light Slider
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

      // Curtain slider
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

    // Start fire javascript animation in living room

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
      var ctx = this.ctx;

      // Clear canvas from previous draw
      ctx.clearRect(this.roomX, this.roomY, this.roomW, this.roomH);
      ctx.fillStyle = this.curtainColor;

      // Draw new curtain height
      ctx.fillRect(this.curtainX, this.curtainY, this.curtainW, curtainHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, ' + brightness + ')';

      // Draw light filter
      ctx.fillRect(this.roomX, this.roomY, this.roomW, this.roomH);
      ctx.fillStyle = 'white';
      // Update temperature
      ctx.font = "25px Arial";
      ctx.fillText(this.temp + '\xB0F', this.roomX + this.roomW - 90, this.roomY + 40);
    }
    // Update instance variables and redraw.

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
    // Updates fireplace if available

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
'use strict';

var House = __webpack_require__(0);

var root = "http://localhost:3000";
// let root = "https://automated-home.herokuapp.com";

// set function for inner classes to update json database

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

//get canvas
$(document).ready(function () {
  var canvas = $("#canvas")[0];
  var x = window.innerWidth || document.documentElement.clientWidth;
  var y = window.innerHeight || document.documentElement.clientHeight;
  canvas.width = x;
  canvas.height = y;

  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // Fetch data from API and pass into House constructor to specify starting parameters

    $.ajax({
      url: root + '/rooms',
      method: 'GET'
    }).then(function (data) {
      var house = new House(ctx, data, updateDB);
      house.start();
    });
  } else {
    throw Error("HTML5 Canvas not supported on your browser");
  }
});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map