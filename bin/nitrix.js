#!/usr/bin/env node

/*!
  Module dependencies
*/

require('colors');

var nitrix = require('../lib/nitrix');
    program = require('commander'),
    args = process.argv;

/*!
  Commander
*/

// version 0.0.3
program
  .version('0.0.3');
    
// nitrix start app.js
program
  .command('start [app]')
  .description('start [app] with nitrix/node')
  .action(function(env){
    nitrix.init(env);
    nitrix.start();
  });

// nitrix app.js
program
  .command('*')
  .action(function(env){
    if (env){
      nitrix.init(env);
      nitrix.start();
    } else {
      nitrix.logger('no file specified'.red);
    }
  });

// test arguments
if (args.length === 2) {
  nitrix.logger('no file specified!'.red);
} else {
  program.parse(args);
};

/* EOF */