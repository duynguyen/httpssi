var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');

util.inherits(PrintEnvDirective, Directive);

function PrintEnvDirective(attributes) {
	this.attributes = attributes;
}

PrintEnvDirective.prototype.parse = function() {
	var envResult = '';
	for(var env in process.env) {
		envResult += (env + ': ' + process.env[env] + '\n');
	}
	return envResult;
}

PrintEnvDirective.prototype.isValid = function() {
	if(JSON.stringify(this.attributes) == '{}') {
		return true;
	}
	console.error("#printenv can not contain any attributes");
	return false;
}

module.exports = PrintEnvDirective;
