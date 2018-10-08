import React from "react";

class Canvas extends React.Component {
  render() {
    return (
      <canvas
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        className="Dollop-Scollop"
      />
    );
  }
}

export default Canvas;
