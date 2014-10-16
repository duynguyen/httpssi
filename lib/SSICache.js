/**
 * This is a simplified cache implemented for the scope of this prototype project
 * In production, there could be extended features such as timeout, clear cache, hits/misses count, etc.
 */
var _SSICache = {};

/**
 * Cache does not apply if test mode is enabled
 */
var testMode = false;

/**
 * Structure of cache:
 * {directive1 : {key11: value11, key12: value12}, directive2 : {key21: value21, key22: value22}}
 * directives: include, set, stat (for both fsize and flastmod)
 * keys are the name of files or variable names
 * values: cached values
 */

exports.put = function(directive, key, value) {
	if(_SSICache[directive] === undefined) {
		_SSICache[directive] = {};
	}
	_SSICache[directive][key] = value;
};

exports.get = function(directive, key) {
	if(!testMode && _SSICache[directive] !== undefined) {
		return _SSICache[directive][key];
	}
	return null;
};

exports.enableTestMode = function() {
	testMode = true;
};

exports.disableTestMode = function() {
	testMode = false;
};

exports.flush = function() {
	_SSICache = {};
}
