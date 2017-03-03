const Controls = require('./js/controls');

//get canvas
$(document).ready(function(){
  const canvas = $("#canvas")[0];
  canvas.width = 600;
  canvas.height = 600;



  if (canvas.getContext){
    const ctx = canvas.getContext('2d');
    // let w = $("#canvas").width();
    // let h = $("#canvas").height();
    let controls = new Controls(ctx);
    controls.start();



} else{
  console.log("canvas not supported");
}
});
