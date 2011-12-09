
/*!
  Core Modules
 */
 
var path = require('path'),
    assert = require('assert'),
    spawn = require('child_process').spawn;
 
/*!
  Export macros
 */

var macros = exports;

/*!
  Spawn Macro
 */

// some nice pointers on vows for spawns from
// github.com/nodejitsu/forever/test/ | /macros/ ++

macros.spawn = function(args) {
  return function() {
    var child = spawn('node', args),
        stdout = '',
        stderr = '';
    child.stdout.on('data', function(data) {
      stdout += data;
    });
    child.stderr.on('data', function(data) {
      stderr += data;
    });
    child.once('exit', function(exitCode) {
      setTimeout(function () {
        self.callback(null, exitCode, stdout, stderr);
      }, 200);
    });
  };
};

/* EOF */