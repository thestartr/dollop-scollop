// import io from 'socket.io-client';
self.importScripts('/socket.io/socket.io.js');

const socket = io();

// setInterval(() => console.log(socket), 1000);

// recieving information from Server through socket connection
socket.on('colour', data => postMessage({ action: 'SET_COLOUR', data: data }));
socket.on('newCanvas', data =>
  postMessage({ action: 'NEW_CANVAS', data: data })
);
socket.on('mouse', data =>
  postMessage({ action: 'CONECTION_DRAWING', data: data })
);
socket.on('clearRect', data =>
  postMessage({ action: 'CLEAR_RECT', data: data })
);

// Posting messages to the server from Client connections

self.onmessage = e => {
  switch (e.data.action) {
    case 'STORE_MOUSE':
      return socket.emit('mouse', e.data.data);
    default:
      return null;
  }
};
