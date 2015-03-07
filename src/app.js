/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This file for handling the http server using express.io
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes')(io);

app.get('/', routes.index);

// get feedback from aquarium
io.on('connection', function(socket) {
  console.log('an aquarium is connected'); 

  socket.on('feedback', function(data) {
    console.log(data.message);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
