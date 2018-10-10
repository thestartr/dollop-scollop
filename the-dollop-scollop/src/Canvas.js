import React from "react";
import { Rect, getMousePos, Pencil } from "./tools/draw.js";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevX: "",
      prevY: "",
      x: "",
      y: ""
    };
  }

  canvas = React.createRef();

  setCoords = e => {
    let ctx = this.canvas.current.getContext("2d");
    let mousePos = getMousePos(this.canvas.current, e.nativeEvent);
    this.setState(
      {
        prevX: mousePos.x,
        prevY: mousePos.y
      },
      () => console.log(this.state)
    );
    // console.log(this.state);
    Rect(this.state.prevX, this.state.prevY, 1, 1, ctx);
  };

  draw = e => {
    if (e.nativeEvent.which !== 1) return;
    let ctx = this.canvas.current.getContext("2d");
    let mousePos = getMousePos(this.canvas.current, e.nativeEvent);

    Pencil(this.state.prevX, this.state.prevY, mousePos.x, mousePos.x, "", ctx);
  };
  render() {
    return (
      <canvas
        onMouseDown={this.setCoords}
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
