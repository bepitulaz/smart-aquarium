/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This is file for handling the client side of fish feeding system.
 */
var config = require('./config');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var socket = require('socket.io-client')(config.serverName);
var five = require('johnny-five');

var board = new five.Board({
  port: config.pathToUsb
});

board.on('ready', function() {
  console.log("ready!");
  
  var Servo = new five.Servo({
    pin: 10,
    range: [45, 135]
  });

  this.repl.inject({  
    servo: Servo 
  });

});
