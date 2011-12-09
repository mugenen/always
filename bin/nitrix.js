#!/usr/bin/env node

require('colors');

var fs = require('fs'),
  util = require('util'),
  path = require('path'),
  spawn = require('child_process').spawn,
  commander = require('commander'),
  args = process.argv.slice(2);

// main node's child event loop
function start(app) {
  console.log('Nitrix >'.magenta+' starting Node...'.yellow);
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

// listen for uncaughtExceptions
process.on('uncaughtException', function(error){
  console.error('App error, restarting!');
  console.error(error.stack);
  start();
});

// switch
start(app);

/* EOF */