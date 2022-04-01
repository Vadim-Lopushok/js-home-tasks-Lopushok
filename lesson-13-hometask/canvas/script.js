'use strict';

var canvasElem = document.createElement('canvas');
canvasElem.width = 500;
canvasElem.height = 500;
document.body.appendChild(canvasElem);

canvasElem.id = 'clock';

function createCanvasClock() {
  var clock = document.getElementById('clock');
  var ctx = clock.getContext('2d');

  var clockWidth = clock.width;
  var clockHeight = clock.height;
  var clockRadius = clock.width / 2 - 5;
  var clockX = clock.width / 2;
  var clockY = clock.height / 2;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0,clock.width,clock.height);

  // Циферблат
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'yellow';
  ctx.lineWidth = 3;
  ctx.arc(clockX, clockY, clockRadius, 0, 2 * Math.PI, false);
  ctx.moveTo(clockX,clockY)
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

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

  // Цифры на циферблате
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

  // Время и угол наклона стрелок
  var time = new Date();

  var angleHour = (time.getHours()%12)/12*360+time.getMinutes()/60*30;
  var angleMin = time.getMinutes()/60*360;
  var angleSec = time.getSeconds()/60*360;

  // Рисуем стрелки
  var secLength = clockRadius - clockRadius/5.5;
  var minLength = clockRadius - clockRadius/2.8;
  var hourLength = minLength / 1.25;

  // Рисуем часовую стрелку
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + hourLength*Math.cos(Math.PI/2 -angleHour*(Math.PI/180)),
    clockY - hourLength*Math.sin(Math.PI/2 -angleHour*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();

  // Рисуем минутную стрелку
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'blue';
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + minLength*Math.cos(Math.PI/2 -angleMin*(Math.PI/180)),
    clockY - minLength*Math.sin(Math.PI/2 -angleMin*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();

  // Рисуем секундную стрелку
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + secLength*Math.cos(Math.PI/2 - angleSec*(Math.PI/180)),
    clockY - secLength*Math.sin(Math.PI/2 - angleSec*(Math.PI/180)));
  ctx.stroke();
  ctx.closePath();

  // Рисуем центр
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'lightblue';
  ctx.lineWidth = 1;
  ctx.arc(clockX, clockY, 5, 0, 2 * Math.PI, false);
  ctx.moveTo(clockX,clockY)
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  // Добавляем часы
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.fillText(time.toLocaleTimeString(), clockX-clockWidth/6, clockY-clockHeight/6);
  ctx.font='italic normal '+textSize+' Arial';
  ctx.closePath();
}

// Запускаем часы
setTimeout(function run(){
  var time = new Date();
  var mSec = time.getMilliseconds()
  createCanvasClock();
  setTimeout(run,1000-mSec+20);
}, 20);