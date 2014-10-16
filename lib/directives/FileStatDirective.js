var fs = require('fs');
var util = require('util');
var debug = require('debug')('http');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(FileStatDirective, Directive);

function FileStatDirective(attributes) {
	this.attributes = attributes;
}

FileStatDirective.prototype.parse = function() {
	var directive = this;
	var stat = SSICache.get('stat', this.attributes.file);
	if(stat == null) {
		debug("read file");
		/**
		 * fs.statSync is not recommended in production environment
		 * However it is used in this case to simplify the code of replacing SSI content
		 * Instead, memory cache is used to overcome this disadvantage (more in project report)
		 */
		stat = fs.statSync(this.attributes.file);
		SSICache.put('stat', this.attributes.file, stat);
	}
	if(stat[directive.attributes._statType] === undefined) {
		throw('#fstat can not be found');
	}
	return stat[directive.attributes._statType];
};

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
FileStatDirective.prototype.isValid = function() {
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		debug("invalid file path");
		return false;
	}
	return true;
};

module.exports = FileStatDirective;
