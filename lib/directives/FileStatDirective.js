var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(FileStatDirective, Directive);

function FileStatDirective(attributes) {
	this.attributes = attributes;
}

FileStatDirective.prototype.parse = function() {
	var directive = this;
	/**
	 * Code for getting filesize is adapted from https://coderwall.com/p/y5zb8q
	 */
	var stat = SSICache.get('stat', this.attributes.file);
	if(!stat) {
		/**
		 * fs.readFileSync is not recommended in production environment
		 * However it is used in this case to simplify the code of replacing SSI content
		 * Instead, memory cache is used to overcome this disadvantage
		 */
		stat = fs.statSync(this.attributes.file);
		SSICache.put('stat', this.attributes.file, stat);
		console.log("read file");
	}
	if(stat[directive.attributes._statType] === undefined) {
		console.error('#fstat can not be found');
		return '';
	}
	return stat[directive.attributes._statType];
};

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
FileStatDirective.prototype.isValid = function() {
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		console.error("invalid file path");
		return false;
	}
	return true;
};

module.exports = FileStatDirective;
