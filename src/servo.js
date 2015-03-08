/**
  copyright (c) 2015, Asep Bagja Priandana
  This file for controlling arduino.
*/
var config = require('./config');
var raspi = require('raspi-io');
var five = require('johnny-five');
var socket = require('socket.io-client')(config.serverName);

var board = new five.Board({
  io: new raspi(),
  repl: false
});

board.on('ready', function() {
  console.log("connect");

  var servo = new five.Servo({
    pin: 1,
    center: true
  });
  
  // connect to the websocket server
  socket.on('connect', function() {
    console.log('connecting to the server');
  });
  
  // wait to the server to get feeding instruction
  socket.on('feeding', function(data) { 
    // send feedback to server
    socket.emit('progress', {message: "yippie...nom...nom...nom..."});
    
    // start servo
    servo.sweep();

    setTimeout(function() {
      servo.stop();
      servo.center();
      
      // tell to server if it's done
      socket.emit('done', {message: "Thank you, human!"});
    }, 10000);
  });
});
