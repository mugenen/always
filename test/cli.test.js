
/*!
  Core Modules
 */

var fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    spawn = require('child_process').spawn;

/*!
  Setup
 */

var testApp =
  'var http = require(\'http\');\n'+
  'var app = http.createServer(function(request, response) {\n'+
  '  response.end(\'hi\');\n'+
  '});\n'+
  'app.listen(8081)';

/*!
  Spawn Config
 */

var args = [
  path.join(__dirname, '..', 'bin', 'nitrix.js'),
  path.join(__dirname, '..', 'test', 'app.js')
];

/*!
  Vows
 */

vows.describe('nitrix vows setup & teardown')

/*!
  Vows Setup
 */

.addBatch({
  'when creating file /test/app.js':{
    topic:function(){
      fs.writeFile(__dirname+'/app.js', testApp, 'utf8', this.callback);
    },
    'there should be no errors':function(error){
      assert.equal(typeof(error), 'undefined');
    }
  }
})

/*!
  Test nitrix CLI
 */

.addBatch({
  'when running `nitrix start app.js`':{
    topic:function() {
      var self = this;
      var child = spawn('node', args),
        stdout = '',
        stderr = '';
        exitCode = 0;
      child.stdout.on('data', function(data) {
        stdout += data;
      });
      child.stderr.on('data', function(data) {
        stderr += data;
      });
      child.on('exit', function(code) {
        exitCode = code;
      });
      setTimeout(function() {
        child.kill();
        self.callback(null, exitCode, stdout, stderr);
      }, 300);
    },
    'there should be no errors':function(error, exitCode, stdout, stderr){
      assert.isNull(error);
    },
    'the exit status code should be 0 (false for issues)':function(error, exitCode, stdout, stderr){
      assert.equal(exitCode, 0);
    },
    'stdout should not be an empty value':function(error, exitCode, stdout, stderr){
      assert.notEqual(stdout, '');
    },
    'stderr should be an empty value':function(error, exitCode, stdout, stderr){
      assert.equal(stderr, '');
    }
  }
})

/*!
  Teardown
 */

.addBatch({
  'when removing /test/app.js':{
    topic:function(){
      fs.unlink(__dirname+'/app.js', this.callback);
    },
    'there should be no errors':function(error) {
      assert.equal(typeof(error), 'undefined');
    }
  }
})
.export(module);

/* EOF */