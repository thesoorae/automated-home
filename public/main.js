const House = require('./js/house');

let root = "http://localhost:3000";
// let root = "https://automated-home.herokuapp.com";

// set function for inner classes to update json database

const updateDB = function(id, data){
  $.ajax({
    type: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    url: root + '/rooms/'+ id,
    dataType: 'json',
    data: JSON.stringify(data)
  }).then(function(res){console.log('successfully updated' + res);});
};

//get canvas
$(document).ready(function(){
  const canvas = $("#canvas")[0];
  const x = window.innerWidth || document.documentElement.clientWidth;
  const y = window.innerHeight || document.documentElement.clientHeight;
  canvas.width = x;
  canvas.height = y;

  if (canvas.getContext){
    const ctx = canvas.getContext('2d');

// Fetch data from API and pass into House constructor to specify starting parameters

    $.ajax({
      url: root + '/rooms',
      method: 'GET'
    }).then(function(data){
      let house = new House(ctx, data, updateDB);
      house.start();
    });
  } else {
    throw Error("HTML5 Canvas not supported on your browser");
  }
});
