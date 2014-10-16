var util = require('util');
var debug = require('debug')('http');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(EchoDirective, Directive);

function EchoDirective(attributes) {
	this.attributes = attributes;
}

EchoDirective.prototype.parse = function() {
	var val = SSICache.get('set', this.attributes.var);
	// if var was not set before, do not replace the directive content
	if(val == null) {
		throw('Error: var not found');
	}
	return val;
}

EchoDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined) {
		debug('invalid attributes for #echo');
		return false;
	}
	return true;
}

module.exports = EchoDirective;
