'use strict'

const sioc = require('socket.io-client');
const socket = sioc.connect('http://localhost:3000/csps');


socket.on('pickup', (payload) => {

  setTimeout(() => {
    console.log(`picked up ${payload.orderID}`);
    socket.emit('inTransit', payload.orderID);
  }, 1000);
});

socket.on('inTransit', (payload) => {

  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    socket.emit('delivered', payload);
  }, 3000);
});