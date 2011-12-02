#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var path = require('path');

var args = process.argv.splice(2);

// start node myappXYZ.js
function start() {
  var app = args[1];
  node = spawn('node', app);
  node.stdout.on('data', function(data){
    console.log(data);
  });
  node.stderr.on('data', function(data){
    console.error(data);
  });
  node.on('exit', function(code, signal){
    start();
  });
};

// listen for uncaughtExceptions
process.on('uncaughtException', function(error){
  console.error('App error, restarting --');
  console.error(error.stack);
  start();
});

/* EOF */