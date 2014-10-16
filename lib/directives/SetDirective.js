var util = require('util');
var debug = require('debug')('http');
var Directive = require('./Directive');
var SSICache = require('./../SSICache');

util.inherits(SetDirective, Directive);

function SetDirective(attributes) {
	this.attributes = attributes;
}

SetDirective.prototype.parse = function() {
	/**
	 * #set var is stored in cache
	 */
	SSICache.put('set', this.attributes.var, this.attributes.value);
	return SSICache.get('set', this.attributes.var);
};

SetDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined || this.attributes.value === undefined) {
		debug('invalid attributes for #set');
		return false;
	}
	return true;
};

module.exports = SetDirective;
