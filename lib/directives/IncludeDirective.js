var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(IncludeDirective, Directive);

function IncludeDirective(attributes) {
	this.attributes = attributes;
}

IncludeDirective.prototype.parse = function() {
	var result = SSICache.getCache(this.directive, this.attributes.file);
	if(!result) {
		/**
		 * fs.readFileSync is not recommended in production environment
		 * However it is used in this case to simplify the code of content string replace
		 * Instead, memory cache is used to overcome this disadvantage
		 */
		result = fs.readFileSync(this.attributes.file, 'binary');
		SSICache.addCache(this.directive, this.attributes.file, result);
		console.log("read file");
	}
	return result;
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
IncludeDirective.prototype.isValid = function() {
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		console.error("invalid path");
		return false;
	}
	return true;
}

module.exports = IncludeDirective;
