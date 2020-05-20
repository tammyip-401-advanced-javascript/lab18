'use strict';

const sioc = require('socket.io-client');
const faker = require('faker');

const flowerSocket = sioc.connect('http://localhost:3000/csps');
const candySocket = sioc.connect('http://localhost:3000/csps');

//Emit a join event, with the store name (which will be used as the room name) as the event payload

setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: 'flower-shop',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  flowerSocket.emit('join', order.store);
  flowerSocket.emit('pickup', order);
}, 5000);

setInterval(() => {
  const order = {
    time: faker.date.recent(),
    store: 'candy-shop',
    orderID: faker.random.number(),
    customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  candySocket.emit('join', order.store);
  candySocket.emit('pickup', order);
}, 8000);

// assign a listener
flowerSocket.on('delivered', (payload) => {
  console.log(`Flower: Thank you for delivering order ${payload.orderID}\n`);
  flowerSocket.emit('confirmation', `Delivered order ${payload.orderID}\n`);
});

candySocket.on('delivered', (payload) => {
  console.log(`Candy: Thank you for delivering order ${payload.orderID}\n`);
  // candySocket.emit('confirmation', `Delivered order ${payload.orderID}\n`);
});