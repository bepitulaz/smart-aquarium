/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This is file for handling the client side of fish feeding system.
 */
var config = require('./config');
var socket = require('socket.io-client')(config.serverName);
var firmata = require('firmata');

var board = new firmata.Board(config.pathToUsb);

/**
 * Function for feeding the fish.
 *
 * degrees {int} - the degree of the servo
 * incrementer {int} - to stepping up the servo
 */
function feedingTheFish(degrees, incrementer) {
  if (degrees >= 180 || degrees === 0) {
    incrementer *= -1;
  }
  degrees += incrementer;
  board.servoWrite(9, degrees);

  console.log(degrees);
}

/**
 * Stop feeding the fish
 *
 * intervalId {object} - the interval to be killed
 * board {object} - the arduino
 */
function stopFeeding(intervalId, board) {
  clearInterval(intervalId);
  board.servoWrite(9, 0);
}

board.on('ready', function() {
  /*board.servoConfig(9, 1000, 2000);
  board.servoWrite(9, 0);
  
  // connect to the websocket server
  socket.on('connect', function() {
    console.log('connecting to the server');
  });

  // wait to the server to get feeding instruction
  socket.on('feeding', function(data) {
    console.log("from human: " + data.message);

    var degrees = 10;
    var incrementer = 10;
    
    board.pinMode(9, board.MODES.SERVO);
    board.servoWrite(9, 0);
    
    // start feeding
    var feedingProgress = setInterval(feedingTheFish(degrees, incrementer), 500);
  });*/
  console.log('connect');
});
