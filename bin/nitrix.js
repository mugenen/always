#!/usr/bin/env node

require('colors');

var fs = require('fs'),
  util = require('util'),
  path = require('path'),
  spawn = require('child_process').spawn,
  commander = require('commander'),
  args = process.argv.slice(2);

/*!
  @method start
  @param {String} app NodeJS file
*/

function start(app, status){
  console.log(status);
  node = spawn('node', [app]);
  console.log('Nitrix >'.magenta+' Node started'.yellow);
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

function restart(app){
  start(app, 'Nitrix >'.magenta+' Restarting Node...'.yellow);
}

/*!
  listen for uncaughtException(s) then restart
*/

process.on('uncaughtException', function(error){
  console.error('App error, restarting!');
  console.error(error.stack);
  start(args[0], 'Nitrix >'.magenta+' Starting Node...'.yellow);
});

// switch
start(args[0]);

/* EOF */