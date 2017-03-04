const Room = require('./room');
class Controls{
  constructor(name, ctx, curtainDims, roomDims){
    this.name = name;
    this.ctx = ctx;
    this.light = 10;
    this.temp = 70;
    this.curtain = 8;
    this.room = null;
    this.curtainDims = curtainDims;
    this.curtainPresent = curtainDims.present;
    this.roomDims = roomDims;
    this.update = this.update.bind(this);
    this.updateLight = this.updateLight.bind(this);
    this.updateCurtain = this.updateCurtain.bind(this);
    this.updateTemp = this.updateTemp.bind(this);


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

            if(this.curtainPresent){
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
            } else{
              console.log("no curtain");
            }


                }

  }

module.exports = Controls;
