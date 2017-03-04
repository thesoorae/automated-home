const House = require('./js/house');

//get canvas
$(document).ready(function(){
  const canvas = $("#canvas")[0];
  const x = window.innerWidth || document.documentElement.clientWidth;
  const y = window.innerHeight || document.documentElement.clientHeight;
  canvas.width = x;
  canvas.height = y;
  console.log(x, y);



  if (canvas.getContext){
    const ctx = canvas.getContext('2d');
    // let w = $("#canvas").width();
    // let h = $("#canvas").height();
    // let livingControls = new Controls('living',ctx, x, y);
    // let kitchenControls = new Controls('')
    let house = new House(ctx);
    house.start();



} else{
  console.log("canvas not supported");
}
});
