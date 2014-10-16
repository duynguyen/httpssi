var fs = require('fs');
var util = require('util');
var debug = require('debug')('http');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(IncludeDirective, Directive);

function IncludeDirective(attributes) {
	this.attributes = attributes;
}

IncludeDirective.prototype.parse = function() {
	var parsedResult = SSICache.get('include', this.attributes.file);
	if(parsedResult == undefined) {
		debug("read file");
		/**
		 * fs.readFileSync is not recommended in production environment
		 * However it is used in this case to simplify the code of replacing SSI content
		 * Instead, memory cache is used to overcome this disadvantage (more in project report)
		 */
		parsedResult = fs.readFileSync(this.attributes.file, 'binary');
		SSICache.put('include', this.attributes.file, parsedResult);
	}
	return parsedResult;
};

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 * #include only accepts one attribute
 */
IncludeDirective.prototype.isValid = function() {
	// based on the requirement that include only receives one attribute
	if(getObjectLength(this.attributes) != 1) {
		debug("include does not receive one and only one attribute");
		return false;
	}
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		debug("invalid path");
		return false;
	}
	return true;
};

function getObjectLength(obj) {
	var objLength = 0;
	for(var key in obj) {
		if (obj.hasOwnProperty(key)) objLength++;
	}
	return objLength
}

module.exports = IncludeDirective;
