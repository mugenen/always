
var vows = require('vows');
var assert = require('assert');

var nitrix = require('../lib/nitrix');

vows.describe('nitrix.typeof').addBatch({
  'when checking the typeof of nitrix':{
    topic:function(){
      return nitrix;
    },
    'typeof should be a function':function(topic){
      assert.equal(typeof(topic), 'function');
    }
  }
}).export(module);

/* EOF */