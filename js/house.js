const Controls = require('./controls');

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
