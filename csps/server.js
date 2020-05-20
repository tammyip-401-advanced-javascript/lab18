'use strict'

const sio = require('socket.io');
const server = sio(3000);
const cspsIO = server.of('/csps');

cspsIO.on('connection', (socket) => {
  console.log('connected to socket', socket.id);

  //emit a join event that will tell the server to put this socket into a specified room
  //log out every event it receives from connected sockets, as shown in the sample console output above
  //broadcast in-transit and delivered events to the vendor sockets in the appropriate room

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`socket ${socket.id} joined room ${room}\n`);
  });

  socket.on('pickup', (payload) => {

    console.log(payload)
    // const keys = Object.keys(payload);
    // keys.forEach(key => {
    //   console.log(`- ${key}: ${payload[key]}`);
    // })

    cspsIO.emit('pickup', payload)
    // cspsIO
    //   .to('flower-shop')
    //   .emit('inTransit', payload)
    //   .emit('delivered', payload)

    //   .to('candy-shop')
    //   .emit('inTransit', payload)
    //   .emit('delivered', payload);
  });

  socket.on('inTransit', (payload) => {
    console.log('inTransit order', payload.orderID);
    cspsIO.to(payload.store).emit('inTransit', payload)
  })

  // socket.on('confirmation', (payload) => {
  //   console.log(payload);
  // })

  socket.on('delivered', (payload) => {
    console.log('Delivered order', payload.orderID);
    cspsIO.to(payload.store).emit('delivered', payload)
  })
});


