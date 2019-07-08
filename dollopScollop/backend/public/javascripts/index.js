(function() {
  "use strict";

  const canvasContainer = document.querySelector(".c-dollopScollop__container");
  // const ctx = canvas.getContext('2d');
  const socket = io();
  let isDrawing = false;
  let mousePos = { x: 0, y: 0 };
  let lastPos = mousePos;

  // functions
  function createCanvas(parentContainer, canvasWidth, canvasHeight, canvasID) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", canvasID);
    this.canvas.setAttribute("width", 1000);
    this.canvas.setAttribute("height", 500);
    parentContainer.appendChild(this.canvas);

    return this.canvas;
  }

  socket.on("newCanvas", newCanvas);

  function newCanvas(data) {
    console.log(data);
  }

  socket.on("mouse", newDrawing);
  function newDrawing(data) {
    // console.log(data);
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.strokeStyle = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(data.prevX, data.prevY);
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
    ctx.lineJoin = ctx.lineCap = "round";
    lastPos = getMousePos(canvas, e);
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

      socket.emit("mouse", data);
      ctx.strokeStyle = "#000";
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
    1000,
    1000,
    "c-dollopScollp__canvas"
  );
  const ctx = canvas.getContext("2d");

  // event listeners
  canvas.addEventListener("mousedown", getCanvasPosition);
  canvas.addEventListener("mousemove", mouseDragged);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
})();

//TODO: convert lineto to bezier curves
//TODO: fix going off
//TODO: allow selection of colour from user
