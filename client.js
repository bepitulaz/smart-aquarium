/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This is file for handling the client side of fish feeding system.
 */
var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function() {
  console.log('connecting to server');
});

socket.on('feeding', function(data) {
  console.log(data.message);

  socket.emit('feedback', {message: "nom nom nom"});
});
