"use strict";


let canvas = document.getElementById("canvas_id");
let context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let flower = {x: 234, y: HEIGHT, dx: 5, color: "rgb(16, 141, 43)"};

// Functions for drawing left flower stem
function updateStem() {
  flower.x += flower.dx;
  flower.y = (0.1 * ((flower.x - 300)**2)) - flower.x + 700;
}

function startStem() { 
  if(flower.x < 310){ requestAnimationFrame(startStem); }

  context.strokeStyle = flower.color;
  context.lineWidth = 5;
  context.beginPath();
  console.log("1: " + flower.y);
  context.moveTo(flower.x, flower.y);
  updateStem();
  console.log("2: " + flower.y);
  context.lineTo(flower.x, flower.y);
  context.stroke();
}

// Code
startStem();