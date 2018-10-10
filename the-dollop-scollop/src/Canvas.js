import React from 'react';
import { Rect, getMousePos, Pencil } from './tools/draw.js';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevX: '',
      prevY: '',
      x: '',
      y: ''
    };
  }

  canvas = React.createRef();

  draw = e => {
    let ctx = this.canvas.current.getContext('2d');
    let prevClickPos = getMousePos(this.canvas.current, e.nativeEvent);
    console.log(this.state);
    this.setState({
      prevX: prevClickPos.x,
      prevY: prevClickPos.y
    });

    // Rect(this.state.prevX, this.state.prevY, 1, 1, ctx);
    Pencil(
      this.state.prevX,
      this.state.prevY,
      prevClickPos.x,
      prevClickPos.x,
      '',
      ctx
    );
  };
  render() {
    return (
      <canvas
        onMouseDown={this.draw}
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
