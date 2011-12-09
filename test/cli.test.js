
/*!
  Core Modules
 */

var fs = require('fs'),
    vows = require('vows'),
    assert = require('assert');

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