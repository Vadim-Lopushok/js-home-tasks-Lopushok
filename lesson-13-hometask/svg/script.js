'use strict';
const radius = 300; //циферблат
const radiusN = radius / 2.5; //цифры циферблата
const radiusC = 20; // область цифр
const dotSize = 8; // точка в центре часов
const wrapper = document.getElementById('wrapper');

createClock();
setInterval(tickTimer, 1000);

function createClock() {
  wrapper.appendChild(createSvg(300, 300));
}

function createSvg(width, height) {
  let elemSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  elemSVG.setAttribute('width', width);
  elemSVG.setAttribute('height', height);
  elemSVG.appendChild(createCircle(150, 150, 150));
  elemSVG.appendChild(createClockFace());
  elemSVG.appendChild(createHourArrow(6, 70, 'hour', 'rgba(42, 39, 42, 1)'));
  elemSVG.appendChild(createHourArrow(4, 110, 'minute', 'rgba(42, 39, 42, 1)'));
  elemSVG.appendChild(createHourArrow(2, 135, 'second', 'red'));
  elemSVG.appendChild(createDot(dotSize, 150, 150));
  elemSVG.appendChild(createDigitalWatch());
  return elemSVG;
}

function createCircle(radius, cx, cy) {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('r', radius);
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('fill', 'yellow');
  circle.setAttribute('id', 'base');
  return circle;
}

function createDot(size, cx, cy) {
  let dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('r', size);
  dot.setAttribute('cx', cx);
  dot.setAttribute('cy', cy);
  dot.setAttribute('fill', 'rgba(42, 39, 42, 1)');
  return dot;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let cx = Math.round(((radius - radiusC) / 1.83) + Math.sin(angle) * radiusN);
    let cy = Math.round(((radius - radiusC) / 1.83) - Math.cos(angle) * radiusN);
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', cx);
    text.setAttribute('y', cy);
    text.setAttribute('fill', 'rgba(75, 74, 84, 1)');
    text.setAttribute('font-size', 25);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = number;
    clockFace.appendChild(createHourCircle(cx, cy, radiusC));
    clockFace.appendChild(text);
  }
  return clockFace;
}

function createHourCircle(circleX, circleY, radius) {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', circleX);
  circle.setAttribute('cy', circleY);
  circle.setAttribute('fill', 'rgba(163, 207, 205, 1)');
  circle.setAttribute('r', radius);
  return circle;
}

function createHourArrow(arrowWidth, arrowHeight, id, color) {
  let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  let x = radius / 2;
  let y = 150 - arrowHeight + arrowHeight * 0.1;
  arrow.setAttribute('x', x);
  arrow.setAttribute('y', y);
  arrow.setAttribute('rx', 20);
  arrow.setAttribute('ry', 20);
  arrow.setAttribute('width', arrowWidth);
  arrow.setAttribute('height', arrowHeight);
  arrow.setAttribute('id', id);
  arrow.setAttribute('fill', color);
  return arrow;
}

function createDigitalWatch() {
  let digitalClock = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  let x = radius / 2 - 40;
  let y = radius / 2 - 60;
  digitalClock.setAttribute('x', x);
  digitalClock.setAttribute('y', y);
  digitalClock.setAttribute('fill', 'dark gray');
  digitalClock.setAttribute('font-size', 20);
  digitalClock.setAttribute('id', 'digital')
  return digitalClock;
}

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  let hourArrowPosition = thisHour * 30 + (thisMinute * 60 + thisSecond) * (1 / 120);
  let secondArrow = document.getElementById('second');
  let minuteArrow = document.getElementById('minute');
  let hourArrow = document.getElementById('hour');
  secondArrow.setAttribute('transform', 'rotate(' + thisSecond * 6 + ' ' + 150 + ' ' + 150 + ' )');
  minuteArrow.setAttribute('transform', 'rotate(' + thisMinute * 6 + ' ' + 150 + ' ' + 150 + ' )');
  hourArrow.setAttribute('transform', 'rotate(' + hourArrowPosition + ' ' + 150 + ' ' + 150 + ' )');
  let digitalClockText = document.getElementById('digital');
  digitalClockText.textContent = now.toLocaleTimeString();
}