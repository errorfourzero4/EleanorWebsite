"use strict";


let canvas = document.getElementById("canvas_id");
let context = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let frameRate = 30;
var startTime, then, now, elapsed;

var stemDone = 0;
let leftStem = {x: 73, y: HEIGHT, dx: 0.5, color: "rgb(16, 141, 43)"};
let rightStem = {x: 1276, y: HEIGHT, dx: 1, color: "rgb(16, 141, 43)"};

function startAnimating() {
  then = Date.now();
  startTime = then;
}

// Functions for drawing left flower stem
function updateLeftStem() {
  leftStem.x += leftStem.dx;
  leftStem.y = (0.08 * ((leftStem.x - 120)**2)) - leftStem.x + 600;
}

function startLeftStem() { 
  if(leftStem.x <= 138){ 
    requestAnimationFrame(startLeftStem); 
  }
  else {
    stemDone++;
    roseSetup();
    leftLoop();
  }

  now = Date.now();
  elapsed = now - then;

  if (elapsed > frameRate) {
    then = now - (elapsed % frameRate);
      
    context.strokeStyle = leftStem.color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(leftStem.x, leftStem.y);
    updateLeftStem();
    context.lineTo(leftStem.x, leftStem.y);
    context.stroke();
  }
}

function updateRightStem() {
  rightStem.x -= rightStem.dx;
  rightStem.y = (0.1 * ((rightStem.x - 1200)**2)) - rightStem.x + 1400;
}

function startRightStem() {
  if(rightStem.x >= 1193){ 
    requestAnimationFrame(startRightStem); 
  }
  else {
    stemDone++;
    roseSetup();
    rightLoop();
  }

  if (elapsed > frameRate) {
    context.strokeStyle = rightStem.color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(rightStem.x, rightStem.y);
    updateRightStem();
    context.lineTo(rightStem.x, rightStem.y);
    context.stroke();
  }
}

// Code
setTimeout(function() { startAnimating(); }, 1000);
startLeftStem();
startRightStem();



// Rose

// Rose (mathematics) function.
// https://en.wikipedia.org/wiki/Rose_(mathematics)
//
// What is k, n, d variable?
// you can understand to see follow svg image.
// https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg

let frameRateRose = 20;

function rose(theta, n, d, amplitude) {
  var k = n / d;
  var x = amplitude * Math.cos(k * theta) * Math.cos(theta);
  var y = amplitude * Math.cos(k * theta) * Math.sin(theta);  
  return {"x":x, "y": y};
}

function point(x, y, context) {
  if (stemDone < 2) {
    roseSetup();
  }
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI, true);
  context.stroke();
}

var nodes;
var t = 0;

function roseSetup() {
  // bloom.
  context.shadowBlur = 10;
  context.shadowColor = 'rgb(0, 0, 0)';
  
  // point style
  context.strokeStyle = 'rgb(192, 23, 207)';
}

function leftLoop() {
  window.requestAnimationFrame(leftLoop);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > frameRateRose) {
    then = now - (elapsed % frameRateRose);

    context.translate(WIDTH/2, HEIGHT/2); // (0, 0) set to screen center position.

    var leftP = rose(t, 3, 2, 100.0);
    point(leftP.x - 560, leftP.y + 132, context);

    context.translate(-WIDTH/2, -HEIGHT/2); // reset screen
    
    t += 0.05;
  }
}

function rightLoop() {
  window.requestAnimationFrame(rightLoop);


  if (((Date.now() - startTime) > 4100) && (Date.now() - startTime) < 4120) {
    textSetup("Happy Valentines Eleanor!");
    fadeOut();
  }

  if (elapsed > frameRateRose) {
    context.translate(WIDTH/2, HEIGHT/2); // (0, 0) set to screen center position.

    var rightP = rose(t, 7, 2, 100.0);
    point(rightP.x + 490, rightP.y - 140, context);

    context.translate(-WIDTH/2, -HEIGHT/2); // reset screen
    
    t += 0.05;
  }
}



// Text

let message, alpha, frameRateText;
var textThen, textNow, textElapsed;


function textSetup(text) {
  message = text;
  alpha = 0.0;
  frameRateText = 10;
  textThen = Date.now();
}

function fadeOut() {
  if (alpha <= 1.0) {
    requestAnimationFrame(fadeOut);
  }

  textNow = Date.now();
  textElapsed = textNow - textThen;
  console.log(textElapsed);

  if (textElapsed > frameRateText) {
    textThen = textNow - (textElapsed % frameRateText);

    context.clearRect(300, 316, 900, 350);
    context.fillStyle = "rgba(166, 64, 188, " + alpha + ")";
    context.font = "italic 50pt Arial";
    context.fillText(message, 340, 375);
    alpha += 0.003;
  }
}