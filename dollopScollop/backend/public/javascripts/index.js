(function() {
  'use strict';

  const canvasContainer = document.querySelector('.c-dollopScollop__container');
  // const ctx = canvas.getContext('2d');
  let isDrawing = false;

  // functions
  function createCanvas(parentContainer, canvasWidth, canvasHeight, canvasID) {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', canvasID);
    this.canvas.setAttribute('width', this.canvasWidth || 500);
    this.canvas.setAttribute('height', this.canvasHeight || 500);
    parentContainer.appendChild(this.canvas);
    return this.canvas;
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
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';

    let mouseCoords = getMousePos(canvas, e);
    ctx.moveTo(mouseCoords.x, mouseCoords.y);
  }

  function drawLine(e) {
    let mouseCoords = getMousePos(canvas, e);
    if (isDrawing) {
      ctx.lineTo(mouseCoords.x, mouseCoords.y);
      ctx.stroke();
      console.log(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  }

  // END - functions

  // create canvas & get context
  const canvas = new createCanvas(
    canvasContainer,
    500,
    500,
    'c-dollopScollp__canvas'
  );
  const ctx = canvas.getContext('2d');

  // event listeners
  canvas.addEventListener('mousedown', getCanvasPosition);
  canvas.addEventListener('mousemove', drawLine);
  canvas.addEventListener('mouseup', () => (isDrawing = false));
})();
