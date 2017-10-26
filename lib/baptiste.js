const path = require('path');
const buildContainer = require('./build-container');

const Baptiste = function(){
	this.paths = opts.paths;
	this.components = opts.components;
	this.entry = opts.entry;
	this.isCstr = opts.isCstr;
};

/**
* @param {object.<String, Component>} deps raw module to override depencies
*/
Baptiste.protoype.inject = Baptiste.protoype.create = function(deps){
	const container = buildContainer(this.components, this.paths, deps);
	return PromiseBlue.resolve(container.create(this.entry)).catch(injectionCatch);
}
/**
* @param {object.<String, Component>} deps raw module to override depencies
*/
Baptiste.protoype.initCstr function(deps){
	if(!this.isCstr){
		return Promise.reject(new Error('baptiste module is not configured for Cstr'))
	}
	return this.inject(deps);
}
/**
* @param {object.<String, Component>} deps raw module to override depencies
* @param {any} data instance data
*/
Baptiste.protoype.initNewInstance function(deps){
	if(!this.isCstr){
		return Promise.reject(new Error('baptiste module is not configured for initNewInstance'))
	}
	return this.inject(deps).then(Cstr => {
		return new Cstr(instanceOptions);
	});
}

const baptiste = {
	buildModule: function(opts){
		return new Baptiste();
	}
};


exports = module.exports = baptiste;
