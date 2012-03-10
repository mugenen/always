
/*!
  Module dependencies
*/

var monitor,
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    events = require('events'),
    EventEmitter = events.EventEmitter,
    exts = /(.*?)\.(js|ejs|json|yaml)$/i,
    watched = [];

/*!
  @method private _cleanup
  Iterate over watched files, and unwatch on (re)initialization
 */

function _cleanup(){
  if (watched.length > 0) {
    if (!fs.watch) {
      watched.forEach(function(watchedFile) {
        fs.unwatchFile(watchedFile);
      });
    } else {
      watched.forEach(function(watcher) {
        watcher.close();
      });
    }
    watched.length = 0;
  };
};

/*!
  @method private _walk
  Walk over the specified directory and continue until reaching an endpoint
 */

function _walk(directory){
  fs.readdir(directory, function(error, files) {
    if (error) {
      throw new Error(error);
    } else {
      files.forEach(function(filename) {
        var remixedFilename = path.join(directory,filename);
        fs.stat(remixedFilename, function(error, stats) {
          if (error) {
            throw new Error(error);
          } else {
            // individual file
            if (stats.isFile()) {
              if (exts.test(filename)) {
                if (!fs.watch) {
                  watched.push(remixedFilename);
                  fs.watchFile(remixedFilename, { interval:1 }, function(current, previous){
                    if (current.mtime.valueOf() != previous.mtime.valueOf() || current.ctime.valueOf() != previous.ctime.valueOf()) {
                      return monitor.emit('change', filename); 
                    };
                  });
                } else {
                  var watcher = fs.watch(remixedFilename, function(event, filename){
                      return monitor.emit('change', filename); 
                  });
                  watched.push(watcher);
                }
              } else {
                return;
              }
            // directory
            } else if (stats.isDirectory) {
              if (!/^\./i.test(filename) && !/modules/i.test(filename)) {
                _walk(path.resolve(directory + '/' + filename));
              };
            }
          }
        });
      });
    }
  });
};

exports.create = function(file) {
  _cleanup();
  monitor = new events.EventEmitter();
  // walk
  _walk(path.dirname(file))
  return monitor;
};

/* EOF */