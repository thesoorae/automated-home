class Room{
  constructor(ctx, temp, light, curtain){
    this.ctx = ctx;
    this.temp = temp;
    this.light = 1/light;
    this.curtainHeight = 25 * curtain;
    this.draw = this.draw.bind(this);
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
    img.src = './assets/room.png';

  }
  update(light, curtain){

    this.light = 1/light;
    if(light == 10) this.light = 0;
    this.curtainHeight = 25 *curtain;
    this.draw();
  }
}

module.exports = Room;
