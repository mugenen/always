#!/usr/bin/env node

require('colors');

var fs = require('fs'),
  util = require('util');
  spawn = require('child_process').spawn;
  path = require('path');
  args = process.argv.slice(2);

// main node's child event loop
function start(app) {
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
      console.log('Failed to start child process.');
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