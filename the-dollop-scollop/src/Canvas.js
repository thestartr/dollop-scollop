import React from "react";
import { Rect, getMousePos } from "./tools/draw.js";

class Canvas extends React.Component {
  canvas = React.createRef();

  draw = e => {
    let ctx = this.canvas.current.getContext("2d");

    if (e.nativeEvent.which === 1) {
      console.log(e.nativeEvent);
      let clickPos = getMousePos(this.canvas.current, e.nativeEvent);
      Rect(clickPos.x, clickPos.y, 2, 2, ctx);
    }
  };
  render() {
    return (
      <canvas
        onMouseMove={this.draw}
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        className="Dollop-Scollop"
        ref={this.canvas}
      />
    );
  }
}

export default Canvas;
