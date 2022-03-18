'use strict';

var dragImages = document.getElementsByTagName('img');

for (var i = dragImages.length - 1; i >= 0; i--) {
  var dragImage = dragImages[i];
  dragImage.style.position = 'absolute';
  dragImage.style.left = dragImage.offsetLeft + 'px';
  dragImage.style.top = dragImage.offsetTop + 'px';
  dragImage.style.cursor = 'pointer';
  dragImage.style.margin = '0';

  dragImage.addEventListener('mousedown', mouseDown, false);

  dragImage.ondragstart = function () {
    return false;
  };
}

function mouseDown(EO) {
  EO = EO || window.event;
  var elem = EO.target;
  var posElem = getElementPos(elem);
  var offsetX = EO.pageX - posElem.left;
  var offsetY = EO.pageY - posElem.top;

  document.body.appendChild(elem);

  function moveElem(EO) {
    elem.style.left = EO.pageX - offsetX + 'px';
    elem.style.top = EO.pageY - offsetY + 'px';
  };

  document.onmousemove = function (EO) {
    EO = EO || window.event;
    moveElem(EO);
  };

  elem.onmouseup = function () {
    document.onmousemove = null;
    elem.onmouseup = null;
  };
}

function getElementPos(elem) {
  var domRect = elem.getBoundingClientRect();
  return {
    left: domRect.left + window.pageXOffset,
    top: domRect.top + window.pageYOffset,
  };
}
