import React from 'react';

class Canvas extends React.Component {
  canvas = React.createRef();

  draw = e => {
    let ctx = this.canvas.current.getContext('2d');

    if (e.nativeEvent.which === 1) {
      console.log(ctx);
    }
  };
  render() {
    return (
      <canvas
        onMouseDown={this.draw}
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        className="Dollop-Scollop"
        ref={this.canvas}
      />
    );
  }
}

export default Canvas;
