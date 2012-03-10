#!/usr/bin/env node

/*!
  Module dependencies
*/

require('../lib/colors');

var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    spawn = require('child_process').spawn,
    Monitor = require('../lib/monitor'),
    args = process.argv,
    managed = [],
    specials = /^\s+|\s+$/gmi,
    previousEvent,
    directory,
    node = null,
    file = null,
    app = null,
    cleaned,
    version = 'v0.4.3'

/*!
  Setup CLI
*/

if (args.length === 2) {
  logger('No file specified!'.yellow);
  process.exit(0);
} else {
  switch(args[2]) {
    case 'help':
    case '-h':
    case '--help':
      help();
      break;
    case 'version':
    case '-v':
    case '--version':
      displayVersion();
      break; 
    case 'start':
      if (args[3] === undefined){
        logger('No file specified!'.yellow);
        process.exit(0);
      } else {
        startDaemon(args[3]);
      }
      break;
    default:
      initializeDevelopment();
      break;   
  }
};

/*!
  @method initalizeDevelopment
  Initialize Development/Live Editing mode for `always`
 */

function initializeDevelopment(){
  app = npm(args[2]);
  logger(version);
  logger('Starting ' +file.green +' with Node');
  start();
};

/*!
  @method help
  Display `always` usage information
 */

 function help(){
  console.log([
    '',
    'Usage: always <options> <app.js>'.cyan,
    '=> always app.js'.green,
    '',
    'Options:',
    '  -v, --version    current `always` version',
    '  -h, --help       help!',
    ''
  ].join('\n'));
 };

/*!
  @method displayVersion
  Display current `always` version #
 */

function displayVersion(){
  console.log('');
  logger(version);
  console.log('');
};

/*!
  @method npm
  Test for npm test being used,
  if so; format the string.
 */

function npm(env) {
  file = env;
  if (new RegExp(/test/i).test(env)){
    return env;
  } else {
    return env;
  }
};

/*!
  @method logger
  Log methods with nice highlighting
*/

function logger(str, isError){
  isError = isError || false;
  if (isError) {
    console.log('[always]'.magenta+' '+str.red);
  } else {
    console.log('[always]'.magenta+' '+str);
  }
};

/*!
  @method appLogger
  Log <yourapp.js> methods with green highlighting
*/

function appLogger(str, isError){
  isError = isError || false;
  var nice = '['+file+']';
  if (isError) {
    console.log(nice.cyan+' '+str.red);
  } else {
    console.log(nice.cyan+' '+str);
  }
};

/*!
  @method watcher
  @param {String} file Name of file to monitor for changes
*/

function initializeFileMonitor(app){
  // setup monitor EE
  var monitor = Monitor.create(path.dirname(app));
  monitor.on('change', function(which) {
    logger(which.green+' has changed, restarting');
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
      logger(file+' is a directory', true);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    logger(error.toString(), true);  
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
    initializeFileMonitor(app);
    node.stdout.on('data', function(data){
      cleaned = data.toString().replace(specials, '');
      appLogger(cleaned);
    });
    node.stderr.on('data', function(data){
      cleaned = data.toString().replace(specials, '');
      appLogger(cleaned, true);
    });
    node.stderr.on('data', function (data) {
      if (/^execvp\(\)/.test(data)) {
        logger('failed to restart child process.', true);
        process.exit(0);
      }
    });
    node.on('exit', function (code, signal) {
      if (signal == 'SIGUSR2') {
        logger('signal interuption, restarting '+app.green, true);
        restart();
      };
    });
  };
};

/*!
  @method startDaemon
  @param {String} app
 */

function startDaemon(app){
  
};

/*!
  @method kill
  Try to kill node process
*/

function kill(){
  monitor = null;
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
if (process.platform.substr(0,3) !== 'win') {
  // CTRL+C
  process.on('SIGINT', function(){
    logger('User killed process. Killing '+app.green, true);
    kill();
    process.exit(0);
  });

  process.on('SIGTERM', function(){
    logger(app.green+' killed',true);
    kill();
    process.exit(0);
  });
}

process.on('uncaughtException', function(error){
  logger(error.toString(), true);
  logger(error.stack.toString(), true);
  logger('Restarting '+app.green+' with Node');
  restart();
});

/* EOF */