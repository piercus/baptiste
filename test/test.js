const path = require('path');
const assert = require('assert');
const baptiste = require('../index.js');

var mdl = baptiste.buildModule({
  paths: [
    path.join(__dirname, 'components')
  ],
  components : ['a', 'b'],
  entry: 'b'
})

mdl.inject({ a : {foo2: "bar2"}}).then(function(b){
  assert.equal(b.a.foo2, "bar2");
  assert.equal(typeof(b.a.foo), "undefined");
  console.info('successfully tested');
});
