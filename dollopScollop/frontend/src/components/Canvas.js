import React, { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
  }, []);

  return (
    <canvas
      onClick={e => {}}
      id="c-dollopScollop__canvas"
      width="500px"
      height="500px"
      ref={canvasRef}
    />
  );
}

export default Canvas;
