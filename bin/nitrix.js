#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');

var args = process.argv.slice(2);
var app = args[0];

// start node myappXYZ.js
function start(app) {
  node = spawn('node', [app]);
  node.stdout.on('data', function(data){
    console.log(data);
  });
  node.stderr.on('data', function(data){
    console.error(data);
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