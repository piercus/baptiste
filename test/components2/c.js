module.exports = function (a, e) {
	return {
		a,
		e
	};
};
exports = module.exports;
exports['@require'] = ['a', 'e'];
exports['@singleton'] = true;
