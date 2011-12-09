#!/usr/bin/env node

/*!
  Module dependencies
*/

require('colors');

var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    program = require('commander'),
    spawn = require('child_process').spawn;
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
    start(app, var str = '[Nitrix]'.magenta+' Starting ' +app.green +' with Node');
  });

program.parse(process.argv);

/*!
  @method start
  @param {String} app NodeJS file
*/

function start(){
  node = spawn('node', [app]);
  node.stdout.on('data', function(data){
    console.log(data.toString());
  });
  node.stderr.on('data', function(data){
    console.error(data.toString());
  });
  node.on('exit', function(code, signal){
    start();
  });
  node.stderr.on('data', function (data) {
    if (/^execvp\(\)/.test(data)) {
      console.log('Failed to restart child process.');
    }
  });
};

/*!
  listen for uncaughtException(s)
  on exception, restart
*/

process.on('uncaughtException', function(error){
  start(app, var str = '[Nitrix]'.magenta+' Retarting ' +app.green +' with Node');
  console.error(error.stack);
  start();
});

/* EOF */