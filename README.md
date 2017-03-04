#Automated Home Application

##Description
[Live Demo](http://automated-home.herokuapp.com)
##Running on local server
`npm-install`
`json-server db.json`
`localhost:3000`
uncomment `main.js:3` and comment `main.js:4` and then run `webpack` to change path.
Or uncomment `bundle.js:392` and comment `bundle.js:393`.

##Structure of data
```
{rooms: [
  {
    "id": 1,
    "name": "living",
    "curtains": {
      "present": true,
      "col": "rgba(219,112,147, 0.7)",
      "x": 110,
      "y": 475,
      "w": 103,
      "max": 90
    },
    "dims": {
      "x": 85,
      "y": 435,
      "w": 378,
      "h": 300
    },
    "temp": 67,
    "light": 100,
    "curtain_height": 10
  }...
  ]}
  ```

##JavaScript ES6 Objects
`entry.js`
`House`
`Controls`
  `update()`
  `updateDB()`
  `patchServer()`
  ```
    $( `#${name}-temp-slider` ).slider()
    ```
    `updateTemp(ui.value)`
`Room`
  `$('.fire').fire()`
  `$('.fire').fire('change',{maxPow:(this.temp-60)/5})`
  `draw()`

##Technologies
HTML5/Canvas
Babel-ES5
jQuery
Mock API run on JSON-Server

##Styled Elements
jQuery UI Widget Slider
Slim Slider created by AndreasStorm
JavaScript Fire Texture created by Ramon Saquete

##Browsers
Chrome
Mozilla Firefox
