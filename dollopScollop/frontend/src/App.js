import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './components/Canvas';

function App() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
      .then(function(res) {
        return res.text();
      })
      .then(function(data) {
        return setApiResponse(data);
      });
  }, [apiResponse]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dollop Scollop</h1>
        <Canvas />
        <p>{apiResponse}</p>
      </header>
    </div>
  );
}

export default App;
