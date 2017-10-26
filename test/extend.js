const path = require('path');
const assert = require('assert');
const baptiste = require('../index.js');

const mdla = baptiste.buildModule({
	paths: [
		path.join(__dirname, 'components')
	],
	components: ['a', 'b'],
	entry: 'b'
});

const mdlb = baptiste.buildModule({
	paths: [
		path.join(__dirname, 'components2')
	],
	components: ['c'],
	required: ['a'],
	entry: 'c'
});

mdla.extend(mdlb).inject().then(c => {
	console.log('here', c);
	assert.equal(c.a.foo, 'bar');
	console.info('successfully tested');
});
