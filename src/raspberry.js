/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This is file for handling the client side of fish feeding system.
 */
var config = require('./config');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var socket = require('socket.io-client')(config.serverName);

var serial = new SerialPort(config.pathToUsb, {
  parser: serialport.parsers.readline("\n"),
  baudrate: 9600
});

serial.open(function(error) {
  if(error) {
    console.log('failed to open: ' + error);
  } else {
    console.log('open connection');
    
    setTimeout(function() {
    serial.write("feed\n", function(error, result) {
      serial.drain(function() {
        console.log(result);
      });
    });
    }, 10000);

    serial.on('data', function(data) {
      console.log('message from aquarium: ' + data);
    }); 
  }
});
