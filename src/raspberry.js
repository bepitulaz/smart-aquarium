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
  port: new SerialPort(config.pathToUsb, {
    parser: serialport.parsers.readline("\r"),
    baudrate: 115200
  })
});

board.on('ready', function() {
  console.log("ready!");
  
  this.repl.inject({  
    servo: new five.Servo({
      pin: 9,
      center: true
    })
  });
});
