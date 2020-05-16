'use strict';

const sioc = require('socket.io-client');
const faker = require('faker');

const socket = sioc.connect('http://localhost:3000/csps');

//Emit a join event, with the store name (which will be used as the room name) as the event payload

setInterval(() => {
  const order1 = {
    time: faker.date.recent(),
    store: 'flower-shop',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  socket.emit('join', order1.store);
  socket.emit('pickup', order);
}, 5000);

setInterval(() => {
  const order2 = {
    time: faker.date.recent(),
    store: 'candy-shop',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  socket.emit('join', order2.store);
  socket.emit('pickup', order);
}, 5000);

// assign a listener
socket.on('delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderID}\n`);
  socket.emit('confirmation', `Delivered order ${payload.orderID}\n`);
});