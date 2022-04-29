'use strict';

const canvasElem = document.getElementById('canvas-clock');
const ctx = canvasElem.getContext('2d');
let radius = canvasElem.height / 2;
let clockX = canvasElem.width / 2;
let clockY = canvasElem.height / 2;
let clockWidth = canvasElem.width;
let clockHeight = canvasElem.height;
let clockRadius = canvasElem.width / 2 - 5;

setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  handHour();
  handMinute();
  handSecond();
  drawCentre();
}

function drawFace() {
  ctx.beginPath();
  ctx.arc(clockX, clockY, clockRadius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.fillStyle = 'yellow';
  ctx.moveTo(clockX,clockY)
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillRect(0,0,clockWidth,clockHeight);
  ctx.closePath();
}

function drawNumbers() {
  for(var i = 1; i <= 12; i++) {
    var angle = parseFloat(i*30)/180*Math.PI;
    var numX = clockX+(clockRadius-clockWidth/10)*Math.sin(angle);
    var numY = clockY-(clockRadius-clockWidth/10)*Math.cos(angle);
    var numRadius = clockRadius/10;

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'lightblue';
    ctx.lineWidth = 2;
    ctx.arc(numX, numY, numRadius, 0, 2 * Math.PI, false);
    ctx.moveTo(clockX,clockY)
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  for(var i = 1; i <= 12; i++) {
    var angle = parseFloat(i*30)/180*Math.PI;
    var textX = clockX+(clockRadius-clockWidth/10)*Math.sin(angle);
    var textY = clockY-(clockRadius-clockWidth/10)*Math.cos(angle);
    var textSize = clockWidth/12.9 + 'px';

    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.font='italic normal '+textSize+' Arial';
    if(i <= 9){
      ctx.fillText(i, textX-clockWidth/38.46, textY+clockWidth/38.46);
    }else{
      ctx.fillText(i, textX-clockWidth/20, textY+clockWidth/38.46);
    }
    ctx.closePath();
  }
  }

function handHour() {
  let time = new Date();
  let angleHour = (time.getHours()%12)/12*360+time.getMinutes()/60*30;
  let minLength = clockRadius - clockRadius/2.8;
  let hourLength = minLength / 1.25;
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + hourLength*Math.cos(Math.PI/2 -angleHour*(Math.PI/180)),
    clockY - hourLength*Math.sin(Math.PI/2 -angleHour*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();
} // часовая стрелка

function handMinute() {
  let time = new Date();
  var angleMin = time.getMinutes()/60*360;
  var minLength = clockRadius - clockRadius/2.8;
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'blue';
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + minLength*Math.cos(Math.PI/2 -angleMin*(Math.PI/180)),
    clockY - minLength*Math.sin(Math.PI/2 -angleMin*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();
}  // минутная стрелка

function handSecond() {
  let time = new Date();
  var secLength = clockRadius - clockRadius/5.5;
  var angleSec = time.getSeconds()/60*360;
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + secLength*Math.cos(Math.PI/2 - angleSec*(Math.PI/180)),
    clockY - secLength*Math.sin(Math.PI/2 - angleSec*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();
}   // секундная стрелка

function drawCentre() {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'lightblue';
  ctx.lineWidth = 1;
  ctx.arc(clockX, clockY, 5, 0, 2 * Math.PI, false);
  ctx.moveTo(clockX,clockY)
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

} // точка в центре часов

function drawTime() {
  let time = new Date();

  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.fillText(time.toLocaleTimeString(), clockX-clockWidth/6, clockY-clockHeight/6);
  ctx.font='italic normal '+' Arial';
  ctx.closePath();
  } // часы