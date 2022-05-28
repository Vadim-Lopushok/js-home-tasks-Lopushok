'use strict';

const gameWidth = 640;
const gameHeight = 480;
const ballWidth = 15;
const ballHeight = 15;
const bracketWidth = 10;
const bracketHeight = 60;

// игровое поле
var gameField = document.createElement('div');
gameField.id = 'field';
document.body.appendChild(gameField);

var field = {
  width: gameWidth,
  height: gameHeight,

  update: function() {
    var field = document.getElementById('field');
    field.style.width = Math.round(this.width) + 'px';
    field.style.height = Math.round(this.height) + 'px';
  }
}

// мяч
var gameBall = document.createElement('div');
gameBall.id = 'ball';
gameField.appendChild(gameBall);

var ball = {
  width: ballWidth,
  height: ballHeight,
  posX: gameWidth/2-ballWidth/2,
  posY: gameHeight/2-ballHeight/2,
  speedX: 0,
  speedY: 0,

  update: function(){
    var ball = document.getElementById('ball');
    ball.style.left = Math.round(this.posX) + 'px';
    ball.style.top = Math.round(this.posY) + 'px';
    ball.style.width = Math.round(this.width) + 'px';
    ball.style.height = Math.round(this.height) + 'px';
  },

  run: function(){
    this.posX = gameWidth/2-ballWidth/2;
    this.posY = gameHeight/2-ballHeight/2;
    this.speedX = 5;
    this.speedY = 5;
  }
}

// первый игрок
var playerOne = document.createElement('div');
playerOne.id = 'player1';
gameField.appendChild(playerOne);

var player1 = {
  width: bracketWidth,
  height: bracketHeight,
  posX: 0,
  posY: gameHeight/2-bracketHeight/2,
  speed: 0,
  score: 0,

  update: function(){
    var player1 = document.getElementById('player1');

    player1.style.left = Math.round(this.posX) + 'px';
    player1.style.top = Math.round(this.posY) + 'px';
    player1.style.width = Math.round(this.width) + 'px';
    player1.style.height = Math.round(this.height) + 'px';
  },

  updateScore:  function() {
    var counter = document.getElementById('pl1');
    counter.innerHTML = this.score;
  }
}

// второй игрок
var playerTwo = document.createElement('div');
playerTwo.id = 'player2';
gameField.appendChild(playerTwo);

var player2= {
  width: bracketWidth,
  height: bracketHeight,
  posX: gameWidth-bracketWidth,
  posY: gameHeight/2-bracketHeight/2,
  speed: 0,
  score: 0,

  update: function(){
    var player2 = document.getElementById('player2');
    player2.style.left = Math.round(this.posX) + 'px';
    player2.style.top = Math.round(this.posY) + 'px';
    player2.style.width = Math.round(this.width) + 'px';
    player2.style.height = Math.round(this.height) + 'px';
  },

  updateScore:  function() {
    var counter = document.getElementById('pl2');
    counter.innerHTML = this.score;
  }
}

// Запуск мяча
function start() {
  ball.run();
}

function tick() {

  // Движение мяча
  ball.posX+=ball.speedX;
  ball.posY+=ball.speedY;

  // Движение ракеток
  player1.posY += player1.speed;
  player2.posY += player2.speed;

  document.onkeydown = function(e) {
    // gameWidth-вверх
    if(e.keyCode === 87) {
      player1.speed = -10;
    }
    // S-вниз
    if(e.keyCode === 83) {
      player1.speed = 10;
    }
    // Up-вверх
    if(e.keyCode === 38) {
      player2.speed = -10;
    }
    // Down-вниз
    if(e.keyCode === 40) {
      player2.speed = 10;
    }
  }

  document.onkeyup = function(e) {
    if(e.keyCode === 87) {
      player1.speed = 0;
    }

    if(e.keyCode === 83) {
      player1.speed = 0;
    }

    if(e.keyCode === 38) {
      player2.speed = 0;
    }

    if(e.keyCode === 40) {
      player2.speed = 0;
    }
  }

  // Упор ракетки к верху поля
  if(player1.posY<=0) {
    player1.posY = 0;
  }
  if(player2.posY<=0) {
    player2.posY = 0;
  }

  // к низу поля
  if ( player1.posY+player1.height>field.height ) {
    player1.posY=field.height-player1.height;
  }
  if ( player2.posY+player2.height>field.height ) {
    player2.posY=field.height-player2.height;
  }

  // вылетел ли мяч за стену правую
  if ( ball.posX+ball.width>field.width ) {
    ball.speedX=0;
    ball.speedY=0;
    ball.posX=field.width-ball.width;
    player1.score++;
    player1.updateScore();
  }

  // ударился ли мяч о правую ракетку?
  if ( ball.posX+ball.width >= player2.posX && ball.posX <= player2.posX + player2.width ) {
    if ( ball.posY >= player2.posY && ball.posY <= player2.posY + player2.height ) {
      ball.speedX=-ball.speedX;
    }
  }

  // вылетел ли мяч за стену левую
  if ( ball.posX<0 ) {
    ball.speedX=0;
    ball.speedY=0;
    ball.posX=0;
    player2.score++;
    player2.updateScore();
  }

  // ударился ли мяч о левую ракетку?
  if ( ball.posX <= player1.posX+player1.width) {
    if ( ball.posY+ball.height >= player1.posY && ball.posY <= player1.posY + player1.height ) {
      ball.speedX=-ball.speedX;
    }
  }

  // вылетел ли мяч ниже пола?
  if ( ball.posY+ball.height>field.height ) {
    ball.speedY=-ball.speedY;
    ball.posY=field.height-ball.height;
  }

  // вылетел ли мяч выше пола?
  if ( ball.posY<0) {
    ball.speedY=-ball.speedY;
    ball.posY=0;
  }

  ball.update();
  player1.update();
  player2.update();
}

var initGame = setInterval(tick,40);

field.update();
ball.update();
player1.update();
player2.update();