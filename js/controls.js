const Room = require('./room');
class Controls{
  constructor(ctx){
    this.ctx = ctx;
    this.light = 10;
    this.temp = 70;
    this.curtain = 2;
    this.room = null;
    this.update = this.update.bind(this);
    this.updateLight = this.updateLight.bind(this);
    this.updateCurtain = this.updateCurtain.bind(this);

  }
  start(){
    this.loadControls();
    this.room = new Room(this.ctx, this.light, this.temp, this.curtain);
    this.room.draw();
  }

  update(){
    console.log("in here");
    this.room.update(this.light, this.curtain);
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

  loadControls(){
    const update = this.update;
    const updateLight = this.updateLight;
    const updateCurtain = this.updateCurtain;
    $( "#temp-slider" ).slider({
              orientation:"vertical",
              min: 50,
              max: 90,
              value:this.temp,
              slide: function( event, ui ) {
                 $( "#minval-temp" ).val( ui.value );
              }
           });
           $( "#minval-temp" ).val( $( "#temp-slider" ).slider( "value" ) );


        $( "#light-slider" ).slider({
                  orientation:"vertical",
                  min: 0,
                  max: 10,
                  value:this.light,
                  slide: function( event, ui ) {
                     $( "#minval-light" ).val( ui.value );
                     updateLight(ui.value);

                  },

               });
               $( "#minval-light" ).val( $( "#light-slider" ).slider( "value" ) );


            $( "#curtain-slider" ).slider({
                      orientation:"vertical",
                      min: 0,
                      max: 10,
                      value:this.curtain,
                      slide: function( event, ui ) {
                         $( "#minval-curtain" ).val( ui.value );
                         updateCurtain(ui.value);
                      },

                   });
                   $( "#minval-curtain" ).val( $( "#curtain-slider" ).slider( "value" ) );
                }

  }

module.exports = Controls;
