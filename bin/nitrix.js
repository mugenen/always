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
    args = process.argv;
    node = null,
    app = null,
    pid = null

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
    logger('Starting ' +app.green +' with Node');
    start();
  });

program
  .command('*')
  .action(function(env){
    if (env){
      app = env;
      logger('Starting ' +app.green +' with Node');
      start();
    } else {
      logger('No file specified'.red);
    }
  });

// no args?
if (args.length === 2) {
  logger('No file specified!'.red);
} else {
  program.parse(args);
};

/*!
  @method logger
  Log methods with nice highlighting
*/

function logger(str){
  console.log('[Nitrix]'.magenta+' '+str);
};

/*!
  @method watcher
  @param {String} file Name of file to monitor for changes
*/

function watcher(){
  fs.watch(__dirname+'/'+app, { persistent:true, interval:1000 }, function(event, filename){
    if (event === 'change') {
      logger(app.green+' has changed, restarting');
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
      logger(file+' is a directory'.red);
      return false;
    } else {
      watcher(file);
      return true;
    }
  } catch (error) {
    logger(error.toString().red);  
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
    node.stdout.on('data', function(data){
      logger(data.toString().split('/\n')[0]);
    });
    node.stderr.on('data', function(data){
      logger(data.toString());
    });
    node.stderr.on('data', function (data) {
      if (/^execvp\(\)/.test(data)) {
        logger('Failed to restart child process.');
      }
    });
    node.on('exit', function (code, signal) {
      if (signal == 'SIGUSR2') {
        logger('Signal interuption, restarting '+app.green);
        restart();
      } else {
        console.log(code, signal);
        logger('Error, restarting '+app.green)
        restart();  
      }
    });
  };
};

/*!
  @method kill
  Try to kill node process
*/

function kill(){
  node && node.kill();
};

/*!
  @method restart
  Cleanup (kill by pid), then start()
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
  logger('Killing '+app.green);
  kill();
  process.exit(0);
});

process.on('SIGTERM', function(){
  logger(app.green+' killed');
  kill();
  process.exit(0);
});

process.on('uncaughtException', function(error){
  logger(error.toString().red);
  logger(error.stack.toString().red);
  logger('Restarting ' +app.green +' with Node');
  restart();
});

/* EOF */