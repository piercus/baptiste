const buildContainer = require('./build-container');
const electrolyte = require('electrolyte');

const injectionErrorCatch = function (module, logger, err) {
	logger.error(err.message, err.code, err.stack);
	return Promise.reject(err);
};

const Baptiste = function (opts) {
	this.paths = opts.paths;
	this.components = opts.components;
	this.entry = opts.entry;
	this.isCstr = opts.isCstr;
	this.logger = opts.logger || console;
	this.required = opts.required || [];
};

/**
* Example:
*   IoC.use(module.dir());
*
* @return {function}
* @public
*/

Baptiste.prototype.dir = function () {
	return function app(id){
		for(var i = this.path.length -1; i >= 0; i++){
			const comp = electrolyte.dir(dir)(id);
			if(comp){
				return comp;
			}
		}
	}
};

/**
* @param {object.<String, Component>} [deps={}] raw module to override depencies
* @param {String} [entry=this.entry] module to get
*/

Baptiste.prototype.inject = function (deps, entry) {
	if (typeof (deps) === 'string') {
		entry = deps;
		deps = {};
	}
	if (!deps) {
		deps = {};
	}
	if (typeof (entry) !== 'string') {
		entry = this.entry;
	}
	if (typeof (entry) !== 'string') {
		const e = new Error('No module set up to be loaded, define entry module in module constructor or in function call');
		return Promise.reject(e);
	}
	if (this.required.length > 0) {
		const missings = [];
		for (let i = 0; i < this.required.length; i++) {
			if (!deps[this.required[i]]) {
				missings.push(this.required[i]);
			}
		}
		if (missings.length > 0) {
			const e = new Error('missing required components : ' + missings.join(','));
			return Promise.reject(e);
		}
	}
	const container = buildContainer(this.components.concat(this.required), this.paths, deps);
	return container.create(entry).catch(injectionErrorCatch.bind(this, this.entry, this.logger));
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
	if (!data) {
		data = deps;
		deps = {};
	}
	return this.inject(deps).then(Cstr => {
		return new Cstr(data);
	});
};

/**
* @param {Baptiste} otherBaptiste baptiste instance to extend current instance with
* @returns {Baptiste} mergedBaptiste
*/
Baptiste.prototype.extend = function (otherBaptiste) {
	const required = this.required.concat(otherBaptiste.required);
	const components = this.components.concat(otherBaptiste.components);

	const filteredRequired = [];

	required.forEach(r => {
		if (components.indexOf(r) === -1 && filteredRequired.indexOf(r) === -1) {
			filteredRequired.push(r);
		}
	});

	const MergedBaptiste = function (opts) {
		Baptiste.call(this, opts);
	};

	MergedBaptiste.prototype = Object.assign({}, Baptiste.prototype, this, otherBaptiste);

	const merged = new MergedBaptiste({
		paths: this.paths.concat(otherBaptiste.paths),
		components,
		entry: otherBaptiste.entry || this.entry,
		isCstr: otherBaptiste.entry ? otherBaptiste.isCstr : this.isCstr,
		logger: otherBaptiste.logger || this.logger,
		required: filteredRequired
	});

	return merged;
};

const baptiste = {
	buildModule(opts) {
		return new Baptiste(opts);
	}
};

module.exports = baptiste;
