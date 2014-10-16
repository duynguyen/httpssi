var util = require('util');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(EchoDirective, Directive);

function EchoDirective(attributes) {
	this.attributes = attributes;
}

EchoDirective.prototype.parse = function() {
	var val = SSICache.get('set', this.attributes.var);
	// if var was not set before, do not replace the directive
	if(!val) {
		throw('Error: var not found');
	}
	return val;
}

EchoDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined) {
		console.error('invalid attributes for #echo');
		return false;
	}
	return true;
}

module.exports = EchoDirective;
