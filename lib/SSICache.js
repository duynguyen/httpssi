exports.initCache = function() {
	global._SSICache = {};
};

exports.addCache = function(directive, key, value) {
	if(!global._SSICache[directive]) {
		global._SSICache[directive] = {};
	}
	global._SSICache[directive][key] = value;
};

exports.getCache = function(directive, key) {
	if(global._SSICache[directive]) {
		return global._SSICache[directive][key];
	}
	return null;
};
