var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');

util.inherits(IncludeDirective, Directive);

function IncludeDirective(attributes) {
	this.attributes = attributes;
}

IncludeDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error("invalid path");
		return _callback('');
	}
	console.log('---------------');
	console.log(this.attributes.file);
	fs.readFile(this.attributes.file, 'binary', function(error, fileContent) {
		if(error) {
			console.error(error);
			return _callback('');
		}
		console.log(fileContent == undefined);
		return _callback(fileContent);
	});
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
IncludeDirective.prototype.isValid = function() {
	var path = this.attributes.file;
	if(path === undefined || path.length == 0 || path[0] == '/' || path.indexOf('../') != -1) {
		return false;
	}
	return true;
}

module.exports = IncludeDirective;
