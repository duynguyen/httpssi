var fs = require('fs');
var util = require('util');
var Directive = require('./Directive');

util.inherits(PrintEnvDirective, Directive);

function PrintEnvDirective(attributes) {
	this.attributes = attributes;
}

PrintEnvDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error("#printenv can not contain any attributes");
		_callback('');
	}
	var envResult = '';
	for(var env in process.env) {
		envResult += (env + ': ' + process.env[env] + '\n');
	}
	_callback(envResult);
}

PrintEnvDirective.prototype.isValid = function() {
	return JSON.stringify(this.attributes) == '{}';
}

module.exports = PrintEnvDirective;
