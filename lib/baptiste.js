const buildContainer = require('./build-container');

const Baptiste = function (opts) {
	this.paths = opts.paths;
	this.components = opts.components;
	this.entry = opts.entry;
	this.isCstr = opts.isCstr;
};
/**
* @param {object.<String, Component>} deps raw module to override depencies
*/

Baptiste.prototype.inject = function (deps) {
	const container = buildContainer(this.components, this.paths, deps);
	return container.create(this.entry);
};

Baptiste.prototype.create = Baptiste.prototype.inject;
/**
* @param {object.<String, Component>} deps raw module to override depencies
*/
Baptiste.prototype.initCstr = function (deps) {
	if (!this.isCstr) {
		return Promise.reject(new Error('baptiste module is not configured for Cstr'));
	}
	return this.inject(deps);
};
/**
* @param {object.<String, Component>} deps raw module to override depencies
* @param {any} data instance data
*/
Baptiste.prototype.initNewInstance = function (deps, data) {
	if (!this.isCstr) {
		return Promise.reject(new Error('baptiste module is not configured for initNewInstance'));
	}
	return this.inject(deps).then(Cstr => {
		return new Cstr(data);
	});
};

const baptiste = {
	buildModule(opts) {
		return new Baptiste(opts);
	}
};

module.exports = baptiste;
