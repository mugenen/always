
var vows = require('vows'),
    assert = require('assert'),
    nitrix = require('../bin/nitrix');

// setup
var testApp = '
  var http = require("http"),\n'+
  '  app = http.createServer(function(request, response) {\n'+
  '    response.end('hi');\n'+
  '  });\n'+
  'app.listen(8000)';

vows.describe('nitrix.typeof').addBatch({
  'when checking the typeof of nitrix':{
    topic:function(){
      return nitrix;
    },
    'typeof should be a function':function(topic){
      assert.equal(typeof(topic), 'object');
    }
  }
}).export(module);

/* EOF */