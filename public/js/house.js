const Controls = require('./controls');

class House{
  constructor(ctx, data, updateDB){
    this.updateDB = updateDB;
    this.ctx = ctx;
    this.data = data;

  }
  start(){
    let data = this.data;
  // Iterate through data and create Control objects for each room in database 
    for(let i=0; i < data.length; i++){
      let roomParams = data[i];
      let newRoom = new Controls(this.ctx, roomParams, this.updateDB);
      newRoom.start();
    }
  }
}

module.exports = House;
