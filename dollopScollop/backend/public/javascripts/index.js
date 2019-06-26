(function() {
  'use strict';

  const canvasContainer = document.querySelector('.c-dollopScollop__container');
  // const ctx = canvas.getContext('2d');
  var socket = io();
  let isDrawing = false;

  // functions
  function createCanvas(parentContainer, canvasWidth, canvasHeight, canvasID) {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', canvasID);
    this.canvas.setAttribute('width', 1000);
    this.canvas.setAttribute('height', 500);
    parentContainer.appendChild(this.canvas);

    return this.canvas;
  }

  socket.on('mouse', newDrawing);
  function newDrawing(data) {
    ctx.strokeStyle = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.closePath();
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function getCanvasPosition(e) {
    isDrawing = true;
    ctx.lineWidth = 10;

    ctx.lineJoin = ctx.lineCap = 'round';

    let mouseCoords = getMousePos(canvas, e);
    ctx.moveTo(mouseCoords.x, mouseCoords.y);
  }

  function mouseDragged(e) {
    let mouseCoords = getMousePos(canvas, e);

    if (isDrawing) {
      let data = {
        x: mouseCoords.x,
        y: mouseCoords.y
      };

      socket.emit('mouse', data);
      ctx.strokeStyle = '#000';
      ctx.beginPath();
      ctx.lineTo(mouseCoords.x, mouseCoords.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  // END - functions

  // create canvas & get context
  const canvas = new createCanvas(
    canvasContainer,
    1000,
    1000,
    'c-dollopScollp__canvas'
  );
  const ctx = canvas.getContext('2d');

  // event listeners
  canvas.addEventListener('mousedown', getCanvasPosition);
  canvas.addEventListener('mousemove', mouseDragged);
  canvas.addEventListener('mouseup', () => (isDrawing = false));
})();

//TODO: fill line gaps
//TODO: allow selection of colour from user
//TODO: set mouse position from socket users
