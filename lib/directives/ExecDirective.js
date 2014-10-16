var execSync = require('exec-sync');
var util = require('util');
var debug = require('debug')('http');
var Directive = require('./Directive');

util.inherits(ExecDirective, Directive);

function ExecDirective(attributes) {
	this.attributes = attributes;
}

ExecDirective.prototype.parse = function() {
	// cgi command is prioritized over cmd
	var cmd = (this.attributes.cgi || this.attributes.cmd);
	return execSync(cmd);
};

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
ExecDirective.prototype.isValid = function() {
	// none of the command available
	if(this.attributes.cgi === undefined && this.attributes.cmd === undefined) {
		debug("at least one of the commands cmd or cgi must be run");
		return false;
	}
	var cgiPattern = /(.+?).cgi/;
	// wrong format of cgi command
	if(this.attributes.cgi !== undefined && this.attributes.cgi.match(cgiPattern) == null) {
		debug("invalid cgi param");
		return false;
	}
	// wrong format of cmd command
	if(this.attributes.cmd !== undefined && this.attributes.cmd.match(cgiPattern) != null) {
		debug("invalid cmd param");
		return false;
	}
	return true;
};

module.exports = ExecDirective;
