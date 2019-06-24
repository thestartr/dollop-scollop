(function() {
  'use strict';

  const canvas = document.getElementById('c-dollopScollop__canvas');
  const ctx = canvas.getContext('2d');
  let isDrawing;

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  canvas.onmousedown = function(e) {
    isDrawing = true;
    ctx.lineWidth = 10;
    ctx.lineJoin = ctx.lineCap = 'round';

    let mouseCoords = getMousePos(canvas, e);
    ctx.moveTo(mouseCoords.x, mouseCoords.y);
  };

  canvas.onmousemove = function(e) {
    let mouseCoords = getMousePos(canvas, e);
    if (isDrawing) {
      ctx.lineTo(mouseCoords.x, mouseCoords.y);
      ctx.stroke();
    }
  };
  canvas.onmouseup = function() {
    isDrawing = false;
  };
})();
