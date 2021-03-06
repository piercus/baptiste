const path = require('path');
const assert = require('assert');
const baptiste = require('../index.js');

const mdl = baptiste.buildModule({
	paths: [
		path.join(__dirname, 'components')
	],
	components: ['a', 'b'],
	entry: 'b'
});

mdl.inject({a: {foo2: 'bar2'}}).then(b => {
	assert.equal(b.a.foo2, 'bar2');
	assert.equal(typeof (b.a.foo), 'undefined');
	console.info('successfully tested');
}).then(() => {
	return mdl.inject();
}).then(b => {
	console.log('b', b);
	assert.equal(b.a.foo, 'bar');
	assert.equal(typeof (b.a.foo2), 'undefined');
	console.info('successfully tested');
});
