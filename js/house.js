const Controls = require('./controls');

class House{
  constructor(ctx){
    this.ctx = ctx;
    this.livingCurtainDims = {
          present: true,
          x: 110,
          y: 475,
          w: 105,
          max: 100
        };
    this.livingRoomDims = {
          x: 85,
          y: 435,
          w: 378,
          h: 300
        };
    this.bedCurtainDims = {
      present: true,
      x: 215,
      y: 225,
      w: 110,
      max: 70
    };
    this.bedRoomDims = {
          x: 85,
          y: 213,
          w: 378,
          h: 205
        };
    this.kitCurtainDims = {
      present: true,
      x: 507,
      y: 458,
      w: 105,
      max: 105
    }
    this.kitRoomDims = {
      x: 485,
      y: 435,
      w: 305,
      h: 300
        };
  }
  start(){
    let livingControls = new Controls('living',this.ctx, this.livingCurtainDims, this.livingRoomDims);
    livingControls.start();
    let bedControls = new Controls('bedroom',this.ctx, this.bedCurtainDims, this.bedRoomDims);
    bedControls.start();
    let kitControls = new Controls('kitchen',this.ctx, this.kitCurtainDims, this.kitRoomDims);
    kitControls.start();
  }
}

module.exports = House;
