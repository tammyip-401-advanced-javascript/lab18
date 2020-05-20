'use strict'

const sioc = require('socket.io-client');
const driverSocket = sioc.connect('http://localhost:3000/csps');

// driverSocket.emit('join', 'driver');

driverSocket.on('pickup', (payload) => {

  setTimeout(() => {
    console.log(`picked up ${payload.orderID}`);
    driverSocket.emit('inTransit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    driverSocket.emit('delivered', payload);
  }, 3000);
});

// driverSocket.on('inTransit', (payload) => {

//   setTimeout(() => {
//     console.log(`delivered ${payload.orderID}`);
//     driverSocket.emit('delivered', payload);
//   }, 3000);
// });