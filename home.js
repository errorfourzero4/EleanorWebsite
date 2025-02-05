"use strict";


let canvas = document.getElementById("canvas_id");
let context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let frameRate = 30;
var startTime, then, now, elapsed;

let flower = {x: 234, y: HEIGHT, dx: 0.5, color: "rgb(16, 141, 43)"};

function startAnimating() {
  then = Date.now();
  startTime = then;
}

// Functions for drawing left flower stem
function updateLeftStem() {
  flower.x += flower.dx;
  flower.y = (0.1 * ((flower.x - 300)**2)) - flower.x + 700;
}

function startLeftStem() { 
  if(flower.x < 310){ 
    requestAnimationFrame(startLeftStem); 
  }
  else {
    setup();
    loop();
  }

  now = Date.now();
  elapsed = now - then;

  if (elapsed > frameRate) {
    then = now - (elapsed % frameRate);
      

    context.strokeStyle = flower.color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(flower.x, flower.y);
    updateLeftStem();
    context.lineTo(flower.x, flower.y);
    context.stroke();
  }
}

function updateRightStem() {
  // code
}

function startRightStem() {
  // code
}

// Code
setTimeout(function() { startAnimating(); }, 1000);
startLeftStem();



// Rose

// Rose (mathematics) function.
// https://en.wikipedia.org/wiki/Rose_(mathematics)
//
// What is k, n, d variable?
// you can understand to see follow svg image.
// https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
function rose(theta, n, d, amplitude) {
  var k = n / d;
  var x = amplitude * Math.cos(k * theta) * Math.cos(theta);
  var y = amplitude * Math.cos(k * theta) * Math.sin(theta);  
  return {"x":x, "y": y};
}

function point(x, y, context) {
    context.beginPath();
    context.arc(x, y, 1, 0, 2 * Math.PI, true);
    context.stroke();
}

var nodes;
var t = 0;

function setup() {
  // bloom.
  context.shadowBlur = 10;
  context.shadowColor = 'rgb(0, 0, 0)';
  
  // point style
  context.strokeStyle = 'rgb(192, 23, 207)';
}

function loop() {
  window.requestAnimationFrame(loop);

  context.translate(WIDTH/2, HEIGHT/2); // (0, 0) set to screen center position.

  var p = rose(t, 3, 2, 100.0);
  point(p.x, p.y - 50, context);


  
  context.translate(-WIDTH/2, -HEIGHT/2); // reset screen
  
  t += 0.05;
}
