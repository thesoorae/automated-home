class Room{
  constructor(name, ctx, temp, light, curtain){
    this.name = name;
    this.ctx = ctx;
    this.temp = (temp - 50)/5;
    this.light = 0;
    this.curtainHeight = 250 * (1/8);
    this.draw = this.draw.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.update = this.update.bind(this);
    $('.fire').fire({
    speed:50,
    maxPow: this.temp,
    gravity:0,
    flameWidth:3,
    flameHeight:0,
    fadingFlameSpeed:8
  });
  }


  draw(){
    let curtainHeight = this.curtainHeight;
    let brightness = this.light;
    console.log(curtainHeight);
    const ctx = this.ctx;
    let img = new Image();
    img.onload = function(){
      ctx.drawImage(img, 0,0);
      ctx.fillStyle = "rgba(219,112,147, 0.7)";
      ctx.fillRect(420, 45, 132, curtainHeight);

      ctx.fillStyle = `rgba(0, 0, 0, ${brightness})`;
      ctx.fillRect(0, 0, 600, 600);


    };
    img.src = `./assets/${this.name}.png`;

    }
  update(temp, light, curtain){
    this.temp = (temp-50)/5;
    this.light = 1/light;
    if(light == 10) this.light = 0;
    this.curtainHeight = 250 * (1/curtain);
    if(curtain == 10) this.curtainHeight = 0;
    this.draw();
    this.updateTemp();
  }
  updateTemp(){
    $('.fire').fire('change',{maxPow:this.temp});
  }


}

module.exports = Room;
