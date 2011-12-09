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
    args = process.argv,
    previousEvent,
    node = null,
    app = null,
    pid = null

// processes managed by nitrix
var managed = [
];

/*!
  Commander
*/

program
  .version('0.0.1')
  .option('-l, --list', 'list all processes being managed')
  .option('-o, --output <path/log>', 'stream output to a log file [./my/app.log]')
  .option('-v, --verbose', 'verbose node output even with piped logging')

program
  .command('start [app]')
  .description('start [app] with nitrix/node')
  .action(function(env){
    var obj = {
      pid : null,
      id : managed.length,
      startTime : new Date().getTime()
    }
    managed.push(obj);
    app = env;
    logger('sarting ' +app.green +' with Node');
    start();
  });

program
  .command('*')
  .action(function(env){
    if (env){
      app = env;
      logger('starting ' +app.green +' with Node');
      start();
    } else {
      logger('no file specified'.red);
    }
  });

// no args?
if (args.length === 2) {
  logger('no file specified!'.red);
} else {
  program.parse(args);
};

/*!
  @method logger
  Log methods with nice highlighting
*/

function logger(str){
  console.log('[nitrix]'.magenta+' '+str);
};

/*!
  @method watcher
  @param {String} file Name of file to monitor for changes
*/

function monitor(){
  /* NOTE: 
    -- there is an open Node 0.6.5 stable bug reporting on strange and
       unstable fs.watch behavior. Change is triggered twice, at the expense of
       the app firing twice on each edit:
        => https://github.com/joyent/node/issues/1986
  */
  fs.watch(__dirname+'/'+app, { interval:1 }, function(event, filename){
    if (event === 'change')
      logger(app.green+' has changed, restarting');
      restart();
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
    // watch node child process file
    monitor(app);
    node.stdout.on('data', function(data){
      logger(data.toString().split('/\n')[0]);
    });
    node.stderr.on('data', function(data){
      logger(data.toString());
    });
    node.stderr.on('data', function (data) {
      if (/^execvp\(\)/.test(data)) {
        logger('failed to restart child process.');
      }
    });
    node.on('exit', function (code, signal) {
      if (signal == 'SIGUSR2') {
        logger('signal interuption, restarting '+app.green);
      } else {
        //...
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
  fs.unwatchFile(__dirname+'/'+app);
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