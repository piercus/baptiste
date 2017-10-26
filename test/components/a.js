module.exports = function () {
	return {
		foo: 'bar'
	};
};

exports = module.exports;
exports['@singleton'] = false;
