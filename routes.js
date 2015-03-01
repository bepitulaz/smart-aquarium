/**
 * copyright (c) 2015, Asep Bagja Priandana
 * This file for handling the route.
 */
module.exports = function(io) {
  var routes = {};

  routes.index = function(req, res) {
    io.emit('feeding', {message: "your food is coming"});
    res.send('Feed my fish now!');
  };

  return routes;
};
