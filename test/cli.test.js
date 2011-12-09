
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
  'app.listen(8000)';

/*!
  Vows
 */

vows.describe('nitrix vows setup & teardown')

/*!
  Setup
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
      var args = [
        path.join(__dirname, '..', 'bin', 'nitrix'),
        path.join(__dirname, '..', 'test', 'app')
      ];
      var child = spawn('node', args),
        stdout = '',
        stderr = '';
      child.stdout.on('data', function(data) {
        stdout += data;
      });
      child.stderr.on('data', function(data) {
        stderr += data;
      });
      child.once('exit', function(exitCode) {
        setTimeout(function() {
          return exitCode;
        }, 200);
      });
    },
    'there should be no errors':function(error, exitCode, stdout, stderr){
      console.log(arguments);
      console.log(error, exitCode, stdout, stderr);
      assert.isNull(error);
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