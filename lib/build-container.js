const IoC = require('electrolyte');
	/**
	* @param {string} id - electrolyte module id
	* @param {object} container - electrolyte container
	* @param {any} mdl - raw module to inject
	* @return {undefined}
	*/
const _overrideLocalModule = function ({
	id,
	container,
	mdl
}) {
	if (typeof (mdl) === 'object') {
		container.use(idLocal => {
			if (idLocal === id) {
				const module = Promise.resolve(mdl);
				module['@singleton'] = true;
				return module;
			}
		});
	}
};
	/**
	* @param {Array.<string>} ids - list of ids to override
	* @param {deps} deps
	* @param {object} container - electrolyte container
	* @return {undefined}
	*/
const _overrideDeps = function (ids, deps, container) {
	if (!deps) {
		deps = {};
	}
	for (let i = 0; i < ids.length; i++) {
		_overrideLocalModule({
			mdl: deps[ids[i]],
			container,
			id: ids[i]
		});
	}
};
	/**
	 * Create an eectrolyte component using loading dirs folder by default and ovverriden by "deps" manually injected modules
	* @param {Array.<string>} ids - list of ids to override
	* @param {Array.<string>} dirs - list of path to load for components
	* @param {deps} deps
	* @return {object} container - electrolyte container
	*/
const buildContainer = function (ids, dirs, deps) {
	const container = new IoC.Container();

	for (let i = 0; i < dirs.length; i++) {
		container.use(IoC.dir(dirs[i]));
	}

	_overrideDeps(ids, deps, container);
	return container;
};

module.exports = buildContainer;
