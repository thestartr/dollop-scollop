(function() {
  'use strict';

  const canvasContainer = document.querySelector('.c-dollopScollop__container');
  // const ctx = canvas.getContext('2d');
  const socket = io();
  let isDrawing = false;
  let mousePos = { x: 0, y: 0 };
  let lastPos = mousePos;

  // functions
  function createCanvas(parentContainer, canvasWidth, canvasHeight, canvasID) {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', canvasID);
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', window.innerHeight);
    parentContainer.appendChild(this.canvas);

    return this.canvas;
  }

  socket.on('newCanvas', newCanvas);

  function newCanvas(data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      var parsed = JSON.parse(data[i]);
      // console.log(parsed);
      newDrawing(parsed);
    }
  }

  socket.on('mouse', newDrawing);
  function newDrawing(data) {
    console.log(data);
    var colour = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = colour;
    ctx.beginPath();
    ctx.lineWidth = 10;
    if (data.prevX && data.prevY) {
      ctx.moveTo(data.prevX, data.prevY);
    }
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    // ctx.closePath();
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
    ctx.lineWidth = 5;
    ctx.lineJoin = ctx.lineCap = 'round';
    lastPos = getMousePos(canvas, e);
  }

  function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return pixelBuffer.every(color => color !== 0);
  }

  function mouseDragged(e) {
    let mouseCoords = getMousePos(canvas, e);
    mousePos = mouseCoords;
    if (isDrawing) {
      let data = {
        x: mouseCoords.x,
        y: mouseCoords.y,
        prevX: lastPos.x,
        prevY: lastPos.y
      };

      socket.emit('mouse', data);
      ctx.strokeStyle = '#000';
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mouseCoords.x, mouseCoords.y);
      ctx.stroke();
      // ctx.closePath();
      lastPos = mousePos;
    }
  }

  // END - functions

  // create canvas & get context
  const canvas = new createCanvas(
    canvasContainer,
    100,
    100,
    'c-dollopScollp__canvas'
  );
  const ctx = canvas.getContext('2d');

  // event listeners
  canvas.addEventListener('mousedown', getCanvasPosition);
  canvas.addEventListener('mousemove', mouseDragged);
  canvas.addEventListener('mouseup', () => (isDrawing = false));

  setInterval(function() {
    if (isCanvasBlank(canvas)) {
      socket.emit('clearCanvas', 'clear');
      //TODO: clear all canvases on screen. but check if other signals are coming through.
    }
  }, 3000);
})();

//TODO: convert lineto to bezier curves
//TODO: fix going off
//TODO: allow selection of colour from user
