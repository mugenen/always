#!/usr/bin/env node

/*!
  Module dependencies
*/

require('../lib/colors');

var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    nitrix = require('../lib/program'),
    spawn = require('child_process').spawn,
    restartTimeout = 1000,
    args = process.argv,
    specials = /^\s+|\s+$/gmi,
    previousEvent,
    directory,
    node = null,
    file = null,
    app = null,
    cleaned;

// processes managed by nitrix
var managed = [
];

/*!
  Setup CLI
*/

nitrix.version('v0.1.2');

nitrix.args(args);
    
/*nitrix
  .command('start [app]')
  .description('start [app] with nitrix/node')
  .action(function(env){
    var obj = {
      pid : null,
      id : managed.length,
      startTime : new Date().getTime()
    }
    managed.push(obj);
    // npm test
    app = npm(env);
    logger(version);
    logger('Sarting '+file.green +' with Node');
    start();
  });

program
  .command('*')
  .action(function(env){
    if (env){
      // npm test
      app = npm(env);
      logger(version);
      logger('Starting ' +file.green +' with Node');
      start();
    } else {
      logger('No file specified'.yellow);
      process.exit(0);
    }
  });

// no args?
if (args.length === 2) {
  logger('No file specified!'.yellow);
  process.exit(0);
} else {
  program.parse(args);
};*/

/*!
  @method npm
  Test for npm test being used,
  if so; format the string.
 */

function npm(env) {
  file = env;
  if (new RegExp(/test/i).test(env)){
    return env;
  } else {
    return env;
  }
};

/*!
  @method logger
  Log methods with nice highlighting
*/

function logger(str, isError){
  isError = isError || false;
  if (isError) {
    console.log('[nitrix]'.magenta+' '+str.red);
  } else {
    console.log('[nitrix]'.magenta+' '+str);
  }
};

/*!
  @method appLogger
  Log <yourapp.js> methods with green highlighting
*/

function appLogger(str, isError){
  isError = isError || false;
  var nice = '['+file+']';
  if (isError) {
    console.log(nice.cyan+' '+str.red);
  } else {
    console.log(nice.cyan+' '+str);
  }
};

/*!
  @method watcher
  @param {String} file Name of file to monitor for changes
*/

function monitor(){
  directory = path.dirname(file);
  fs.watchFile(file, { interval:1 }, function(current, previous){
    if (current.mtime.valueOf() != previous.mtime.valueOf() || current.ctime.valueOf() != previous.ctime.valueOf()) {
      logger(file.green+' has changed, restarting');
      restart();
    };
  });
};

/*!
  @method exists
  Check that file exists
  @param {String} file File to check exists
*/

function exists(file){
  try {
    var stats = fs.lstatSync(file);
    if (stats.isDirectory()) {
      logger(file+' is a directory', true);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    logger(error.toString(), true);  
    return false;
  }
};

/*!
  @method start
  @param {String} app NodeJS file
*/

function start(){
  if (!exists(app)){
    return false;
  } else {
    node = spawn('node', [app]);
    // watch node child process file
    monitor(app);
    node.stdout.on('data', function(data){
      cleaned = data.toString().replace(specials, '');
      appLogger(cleaned);
    });
    node.stderr.on('data', function(data){
      cleaned = data.toString().replace(specials, '');
      appLogger(cleaned, true);
    });
    node.stderr.on('data', function (data) {
      if (/^execvp\(\)/.test(data)) {
        logger('failed to restart child process.', true);
        process.exit(0);
      }
    });
    node.on('exit', function (code, signal) {
      if (signal == 'SIGUSR2') {
        logger('signal interuption, restarting '+app.green, true);
        restart();
      } else {
        logger('fatal error. waiting for file change');
      }
    });
  };
};

/*!
  @method kill
  Unwatch file, then ->
  Try to kill node process
*/

function kill(){
  fs.unwatchFile(app);
  node && node.kill();
};

/*!
  @method restart
  Kill process, restart
*/

function restart(){
  kill();
  start();
};

/*!
  listen for error instance(s)
  on error, generally restart.
*/

process.on('exit', function(code){
  kill();
});

// CTRL+C
process.on('SIGINT', function(){
  logger('User killed process. Killing '+app.green, true);
  kill();
  process.exit(0);
});

process.on('SIGTERM', function(){
  logger(app.green+' killed',true);
  kill();
  process.exit(0);
});

process.on('uncaughtException', function(error){
  logger(error.toString(), true);
  logger(error.stack.toString(), true);
  logger('Restarting '+app.green+' with Node');
  restart();
});

/* EOF */