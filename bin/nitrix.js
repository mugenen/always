#!/usr/bin/env node

/*!
  Module dependencies
*/

require('colors');

var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    program = require('commander'),
    spawn = require('child_process').spawn,
    app = null;
/*!
  Commander
*/

program
  .version('0.0.1')
  .option('-o, --output <path/log>', 'stream output to a log file [./my/app.log]')
  .option('-v, --verbose', 'verbose node output even with piped logging')

program
  .command('start [app]')
  .description('start [app] with nitrix/node')
  .action(function(env){
    app = env;
    start();
    logger('Starting ' +app.green +' with Node');
    start();
  });

program
  .command('*')
  .action(function(env){
    app = env;
    logger('Starting ' +app.green +' with Node');
    start();
  });

program.parse(process.argv);

/*!
  @method logger
  Log methods with nice highlighting
*/

function logger(str){
  console.log('[Nitrix]'.magenta+' '+str);
};

/*!
  @method exists
  Check that file exists
  @param {String} file File to check exists
*/

function exists(file){
  try {
    var stats = Fs.lstatSync(file);
    if (stats.isDirectory()) {
      logger(file+' is a directory');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    logger(error);  
    return false;
  }
};

/*!
  @method start
  @param {String} app NodeJS file
*/

function start(){
  exists(app);
  return;
  node = spawn('node', [app]);
  node.stdout.on('data', function(data){
    console.log(data.toString());
  });
  node.stderr.on('data', function(data){
    console.error(data.toString());
  });
  node.stderr.on('data', function (data) {
    if (/^execvp\(\)/.test(data)) {
      console.log('Failed to restart child process.');
    }
  });
  node.on('exit', function (code, signal) {
    if (signal == 'SIGUSR2') {
      start();
    } else {
      start();  
    }
  });
};

/*!
  listen for uncaughtException(s)
  on exception, restart
*/

process.on('uncaughtException', function(error){
  console.error(error.stack);
  logger('Restarting ' +app.green +' with Node');
  start();
});

/* EOF */