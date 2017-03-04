const Controls = require('./controls');

class House{
  constructor(ctx, data, updateDB){
    this.updateDB = updateDB;
    this.ctx = ctx;
    this.data = data;
  
  }
  start(){
    let data = this.data;
    for(let i=0; i < data.length; i++){
      let roomParams = data[i];
      let newRoom = new Controls(this.ctx, roomParams, this.updateDB);
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
}

module.exports = House;
