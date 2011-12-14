
/*!
  Module dependencies
*/

var fs = require('fs'),
    util = require('util'),
    events = require('events'),
    EventEmitter = events.EventEmitter,
    watched = [];

exports.create = function(file) {
  var monitor = new events.EventEmitter();
  fs.watchFile(file, { interval:1 }, function(current, previous){
    if (current.mtime.valueOf() != previous.mtime.valueOf() || current.ctime.valueOf() != previous.ctime.valueOf()) {
      return monitor.emit('change', file);
    };
  });
  return monitor;
};

/* EOF */