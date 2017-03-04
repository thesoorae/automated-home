class Room{
  constructor(name, ctx, temp, light, curtain, curtainDims, roomDims){
    this.name = name;
    this.ctx = ctx;
    this.temp = temp;
    this.light = 10/light;
    this.curtainHeight = curtainDims.max * (curtain/100);
    this.draw = this.draw.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.update = this.update.bind(this);

    this.curtainX = curtainDims.x;
    this.curtainY = curtainDims.y;
    this.curtainW = curtainDims.w;
    this.curtainMaxHeight = curtainDims.max;
    this.curtainColor = curtainDims.col;

    this.roomX = roomDims.x;
    this.roomY = roomDims.y;
    this.roomW = roomDims.w;
    this.roomH = roomDims.h;
    if(name == "living"){
    $('.fire').fire({
    speed:50,
    maxPow: (this.temp-60)/5,
    gravity:0,
    flameWidth:3,
    flameHeight:0,
    fadingFlameSpeed:8
  });
  }
}


  draw(){
    let curtainHeight = this.curtainHeight;
    let brightness = this.light;
    console.log(curtainHeight);
    const ctx = this.ctx;
    // let img = new Image();
    // img.onload = function(){
      // ctx.drawImage(img, 0,0);
      ctx.clearRect(this.roomX, this.roomY, this.roomW, this.roomH);

      ctx.fillStyle = this.curtainColor;
      ctx.fillRect(this.curtainX, this.curtainY, this.curtainW, curtainHeight);

      ctx.fillStyle = `rgba(0, 0, 0, ${brightness})`;
      ctx.fillRect(this.roomX, this.roomY, this.roomW, this.roomH);

      ctx.fillStyle = 'white';
      ctx.font = "25px Arial";
      ctx.fillText(`${this.temp}°F`,this.roomX + this.roomW - 90,this.roomY + 40);

    // };
    // img.src = `./assets/${this.name}.png`;

    }
  update(temp, light, curtain){
    this.temp = temp;
    this.light = 10/light;
    if(light == 100) this.light = 0;
    this.curtainHeight = this.curtainMaxHeight * (curtain/100);
    this.draw();
    this.updateTemp();
  }
  updateTemp(){
    if(this.name == "living"){
      $('.fire').fire('change',{maxPow:(this.temp-60)/5});
    }

  }


}

module.exports = Room;
