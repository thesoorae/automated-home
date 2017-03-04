const Room = require('./room');
class Controls{
  constructor(ctx, params, updateDB){
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

  start(){
    this.loadControls();
    this.room = new Room(this.ctx, this.roomParams);
    this.room.draw();
  }

// update animation to reflect slider input

  update(){
    this.room.update(this.temp, this.light, this.curtain);
  }

//Update each animation according to what slider is being changed
  updateLight(light){
    this.light = light;
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

//Function that creates data and passes it into AJAX PATCH request at Main object level.

  patchServer(){
    let data = {
      "light": this.light,
      "curtain_height": this.curtain,
      "temp": this.temp
    };
    this.updateDB(this.id, data);
  }

// Create slider effects and event handlers for onslide and onchange.

  loadControls(){
    const update = this.update;
    const updateLight = this.updateLight;
    const updateCurtain = this.updateCurtain;
    const updateTemp = this.updateTemp;
    const name = this.name;
    const lightText = this.lightText;
    const patchServer = this.patchServer;

// Set text for initial load

    $( `#${name}-minval-temp` ).text( `${this.temp}°F` );
    $( `#${name}-minval-light` ).text( lightText(this.light) );
    $( `#${name}-minval-curtain` ).text( `${this.curtain}%` );

// Temperature slider

    $( `#${name}-temp-slider` ).slider({
      orientation:"horizontal",
      min: 50,
      max: 90,
      value:this.temp,
      slide: function( event, ui ) {
         $( `#${name}-minval-temp` ).text( `${ui.value}°F` ),
         updateTemp(ui.value);
      },
      change: function(){
        patchServer();
      }
   });

// Light Slider
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
          change: function(){
            patchServer();
          }
       });

// Curtain slider
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
            change: function(){
              patchServer();
            }
         });
        } else{
          console.log(`.${name} > div.curtains`);
          $(`.${name} .curtains`).hide();
        }
      }
    }

module.exports = Controls;
