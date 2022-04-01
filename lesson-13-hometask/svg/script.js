'use strict'

function createSVG () {

  var clockWrap = document.createElement('div');
  var clockWrapWidth = clockWrap.style.width = 300 +'px';
  var clockWrapHeight = clockWrap.style.height = 300 +'px';

  document.body.appendChild(clockWrap);

  var svgClock = document.createElementNS ('http://www.w3.org/2000/svg', 'svg');
  svgClock.setAttribute('width', clockWrapWidth);
  svgClock.setAttribute('height', clockWrapHeight);
  clockWrap.appendChild(svgClock);

  svgClock.id = 'clock';

  var clock = document.getElementById('clock');

  var clockWidth = parseInt(clock.getAttribute('width'));
  var clockHeight = parseInt(clock.getAttribute('height'));
  var clockRadius = clockHeight / 2;
  var clockX = clockWidth / 2;
  var clockY = clockHeight / 2;

  var clockCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
  clockCircle.setAttribute('fill','yellow');
  clockCircle.setAttribute('cx',clockX);
  clockCircle.setAttribute('cy',clockY);
  clockCircle.setAttribute('r',clockRadius);

  clock.appendChild(clockCircle);

  for(var i = 1; i <= 12; i++) {

    var bbox = document.createElementNS('http://www.w3.org/2000/svg','g');
    bbox.setAttribute('class','group')
    clock.appendChild(bbox);

    var clockNum = document.createElementNS('http://www.w3.org/2000/svg','circle');
    var angle = parseFloat(i*30)/180*Math.PI;

    clockNum.setAttribute('stroke','gray');
    clockNum.setAttribute('fill','lightblue');
    clockNum.setAttribute('cx', clockX+(clockRadius-clockWidth/10)*Math.sin(angle));
    clockNum.setAttribute('cy', clockY-(clockRadius-clockWidth/10)*Math.cos(angle));
    clockNum.setAttribute('r',clockRadius/10);

    bbox.appendChild(clockNum);

    var clockNumCenterX = clockNum.getAttribute('cx');
    var clockNumCenterY = clockNum.getAttribute('cy');
    var clockNumRadius = clockNum.getAttribute('r');

    var text = document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('x', clockNumCenterX);
    text.setAttribute('y', Number(clockNumCenterY) + clockNumRadius / 2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', clockNumRadius*1.55);

    text.textContent = [i];

    bbox.appendChild(text);
  }


  var handHour = document.createElementNS('http://www.w3.org/2000/svg','line');
  handHour.setAttribute('stroke','green');
  handHour.setAttribute('stroke-width', clockRadius/35);
  handHour.setAttribute('x1',clockX);
  handHour.setAttribute('y1',clockY*1.1);
  handHour.setAttribute('x2',clockX);
  handHour.setAttribute('y2',clockY*0.4);

  handHour.id = 'hand-hour';

  clock.appendChild(handHour);

  var handMin = document.createElementNS('http://www.w3.org/2000/svg','line');
  handMin.setAttribute('stroke','red');
  handMin.setAttribute('stroke-width',clockRadius/50);
  handMin.setAttribute('x1',clockX);
  handMin.setAttribute('y1',clockY*1.1);
  handMin.setAttribute('x2',clockX);
  handMin.setAttribute('y2',clockY*0.3);

  handMin.id = 'hand-min';

  clock.appendChild(handMin);

  var handSec = document.createElementNS('http://www.w3.org/2000/svg','line');
  handSec.setAttribute('stroke','black');
  handSec.setAttribute('stroke-width',clockRadius/83.33);
  handSec.setAttribute('x1',clockX);
  handSec.setAttribute('y1',clockY*1.1);
  handSec.setAttribute('x2',clockX);
  handSec.setAttribute('y2',clockY*0.15);

  handSec.id = 'hand-sec';

  clock.appendChild(handSec);

  var date = document.createElementNS('http://www.w3.org/2000/svg','text');
  date.setAttribute('x', clockX);
  date.setAttribute('y', clockY-clockRadius/2.75);
  date.setAttribute('text-anchor', 'middle');
  date.setAttribute('font-size', clockRadius/5);
  date.id = 'date';

  svgClock.appendChild(date);

  setHands();
}
createSVG();

function setHands() {
  var dateTime = new Date();

  var hour = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var msec = dateTime.getMilliseconds();

  var angleHour = (hour%12)/12*360+min/60*30;
  var angleMin = min/60*360;
  var angleSec = sec/60*360;

  var clockCenterX = parseInt(document.getElementById('clock').getAttribute('width'))/2;
  var clockCenterY = parseInt(document.getElementById('clock').getAttribute('height'))/2;

  document.getElementById('date').textContent = dateTime.toLocaleTimeString();
  document.getElementById('hand-hour').setAttribute('transform', 'rotate('+ angleHour +' '+clockCenterX+' '+clockCenterY+')');
  document.getElementById('hand-min').setAttribute('transform', 'rotate('+ angleMin +' '+clockCenterX+' '+clockCenterY+')');
  document.getElementById('hand-sec').setAttribute('transform', 'rotate('+ angleSec +' '+clockCenterX+' '+clockCenterY+')');
}

setInterval(function(){
  setHands();
},1000);