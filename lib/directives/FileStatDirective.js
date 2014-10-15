var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');

util.inherits(FileStatDirective, Directive);

function FileStatDirective(attributes) {
	this.attributes = attributes;
}

FileStatDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error("invalid file path");
		return _callback('');
	}
	console.log('---------------');
	console.log(this.attributes.file);

	var directive = this;

	/**
	 * Code for getting filesize is adapted from https://coderwall.com/p/y5zb8q
	 */
	fs.stat(this.attributes.file, function(error, stat) {
		if(error) {
			console.error(error);
			return _callback(error);
		}
		if(stat[directive.attributes._statType] === undefined) {
			console.error('#fstat can not be found');
			return _callback('');
		}
		console.log(stat[directive.attributes._statType]);
		_callback(stat[directive.attributes._statType]);
	});
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
FileStatDirective.prototype.isValid = function() {
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		return false;
	}
	return true;
}

module.exports = FileStatDirective;
