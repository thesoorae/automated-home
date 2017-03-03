const Room = require('./room');
class Controls{
  constructor(ctx){
    this.ctx = ctx;
    this.light = 10;
    this.temp = 70;
    this.curtain = 10;
    this.room = null;
    this.update = this.update.bind(this);
    this.updateLight = this.updateLight.bind(this);
    this.updateCurtain = this.updateCurtain.bind(this);
    this.updateTemp = this.updateTemp.bind(this);


  }
  start(){
    this.loadControls();
    this.room = new Room(this.ctx, this.temp, this.light, this.curtain);
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

    $( "#minval-temp" ).text( this.temp );
    $( "#minval-light" ).text( this.light );
    $( "#minval-curtain" ).text( this.curtain );

    $( "#temp-slider" ).slider({
              orientation:"vertical",
              min: 50,
              max: 90,
              value:this.temp,
              slide: function( event, ui ) {
                 $( "#minval-temp" ).text( ui.value ),
                 updateTemp(ui.value);
              }
           });
          //  $( "#minval-temp" ).val( $( "#temp-slider" ).slider( "value" ) );


        $( "#light-slider" ).slider({
                  orientation:"vertical",
                  min: 1,
                  max: 10,
                  value:this.light,
                  slide: function( event, ui ) {
                     $( "#minval-light" ).text( ui.value );
                     updateLight(ui.value);

                  },

               });


            $( "#curtain-slider" ).slider({
                      orientation:"vertical",
                      min: 1,
                      max: 10,
                      value:this.curtain,
                      slide: function( event, ui ) {
                         $( "#minval-curtain" ).text( ui.value );
                         updateCurtain(ui.value);
                      },

                   });
                }

  }

module.exports = Controls;
