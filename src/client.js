/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This is file for handling the client side of fish feeding system.
 */
var socket = require('socket.io-client')('http://128.199.111.65:5001');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var five = require('johnny-five');

var board = new five.Board({
  port: new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    parser: serialport.parsers.readline("\n"),
    flowControl: false
  })
});

// preparing the board for working
board.on('ready', function() {
  var servo = new five.Servo(9);

  // Connect to the websocket server
  socket.on('connect', function() {
    console.log('connecting to server');
  });

  // Wait to the server to get feeding instruction.
  socket.on('feeding', function(data) {
    // message from human
    console.log("from human: " + data.message);
    
    // feed it now for 10 s
    servo.sweep();
    board.wait(10000, function() {
      servo.stop();
      servo.center();
    
      socket.emit('feedback', {message: "from fish: nom nom nom...thank you!"});
    }); 
  });
});
