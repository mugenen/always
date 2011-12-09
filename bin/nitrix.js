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

/*!
  Commander
*/

program
  .version('0.0.1')
  .option('-o, --output <path/log>', 'stream output to a log file [./my/app.log]')
  .option('-v, --verbose', 'verbose node output even with piped logging')

program
  .command('*')
  .action(function(env){
    console.log('Nitrix >'.magenta+' Node started'.yellow);
  });

program.parse(process.argv);

/*!
  @method start
  @param {String} app NodeJS file
*/

function start(app, status){
  console.log(status);
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
  listen for uncaughtException(s) then restart
*/

process.on('uncaughtException', function(error){
  console.error('App error, restarting!'.magenta);
  console.error(error.stack);
  start(args[0], 'Nitrix >'.magenta+' Starting Node...'.yellow);
});

/* EOF */