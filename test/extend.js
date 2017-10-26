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
	required: ['a', 'e'],
	entry: 'c'
});

mdlb.d = function () {
	return this.inject({e: 'this is e'});
};

const merged = mdla.extend(mdlb);

merged.d().then(c => {
	assert.equal(c.a.foo, 'bar');
	assert.equal(c.e, 'this is e');
	console.info('successfully tested');
});
