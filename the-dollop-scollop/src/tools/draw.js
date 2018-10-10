// Functions that help you draw to the canvas.

//
export function Rect(x, y, width, height, ctx) {
  ctx.fillRect(x, y, width, height);
}

export function Pencil(prevX, prevY, x, y, color, ctx) {
  ctx.beginPath();
  ctx.strokeStyle = color ? color : 'blue';
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
