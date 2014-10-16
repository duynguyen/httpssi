var execSync = require('exec-sync');
var util = require('util');
var Directive = require('./Directive');

util.inherits(ExecDirective, Directive);

function ExecDirective(attributes) {
	this.attributes = attributes;
}

ExecDirective.prototype.parse = function() {
	var cmd = (this.attributes.cgi || this.attributes.cmd);
	return execSync(cmd);
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
ExecDirective.prototype.isValid = function() {
	var cgiPattern = /(.+?).cgi/;
	if(this.attributes.cgi === undefined && this.attributes.cmd === undefined) {
		console.error("at least one of the commands cmd or cgi must be run");
		return false;
	}
	if(this.attributes.cgi !== undefined && this.attributes.cgi.match(cgiPattern) == null) {
		console.error("invalid cgi param");
		return false;
	}
	if(this.attributes.cmd !== undefined && this.attributes.cmd.match(cgiPattern) != null) {
		console.error("invalid cmd param");
		return false;
	}
	return true;
}

module.exports = ExecDirective;
