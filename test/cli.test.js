
/*!
  Core Modules
 */

var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    speculum = require('speculum'),
    spawn = require('child_process').spawn;

/*!
  Setup
 */

var testApp =
  'var http = require(\'http\');\n'+
  'var app = http.createServer(function(request, response) {\n'+
  '  response.end(\'hi\');\n'+
  '});\n'+
  'app.listen(8000)';

/*!
  Spawn Config
 */

var args = [
  path.join(__dirname, '..', 'bin', 'always.js'),
  path.join(__dirname, '..', 'test', 'app.js')
];

/*!
  Speculum Tests
 */

speculum.describe('`always` `speculum` setup');

/*!
  Speculum Setup
 */

speculum.add({
  'when creating file /test/app.js':{
    result:function(){
      fs.writeFileSync(__dirname+'/app.js', testApp, 'utf8');
      return null;
    },
    'there should be no errors':function(error){
      assert.equal(error, null);
    }
  }
});

/*!
  Test always CLI
 */

speculum.add({
  'when running `always start app.js`':{
    result:function() {
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
        var obj = {
          error:null,
          exitCode:exitCode, 
          stdout:stdout,
          stderr:stderr
        };
        return obj;
      }, 300);
    },
    'there should be no errors':function(result){
      console.log(arguments);
      console.log(result);
      assert.isNull(result.error);
    },
    'the exit status code should be 0 (false for issues)':function(result){
      assert.equal(result.exitCode, 0);
    },
    'stdout should not be an empty value':function(result){
      assert.notEqual(result.stdout, '');
    },
    'stderr should be an empty value':function(result){
      assert.equal(result.stderr, '');
    }
  }
})

/*!
  Teardown
 */
/*
speculum.add({
  'when removing /test/app.js':{
    topic:function(){
      return fs.unlinkSync(__dirname+'/app.js');
    },
    'there should be no errors':function(error) {
      assert.equal(typeof(error), 'undefined');
    }
  }
});*/

speculum.insert();

/* EOF */