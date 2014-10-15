var execSync = require('exec-sync');
var util = require('util');
var Directive = require('./Directive');

util.inherits(ExecDirective, Directive);

function ExecDirective(attributes) {
	this.attributes = attributes;
}

ExecDirective.prototype.parse = function() {
	var cmd = (this.attributes.cgi || this.attributes.cmd);
	try {
		return execSync(cmd);
	} catch(err) {
		console.error(err);
		return '';
	}
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
ExecDirective.prototype.isValid = function() {
	if(this.attributes.cgi === undefined && this.attributes.cmd === undefined) {
		console.error("invalid command");
		return false;
	}
	return true;
}

module.exports = ExecDirective;
