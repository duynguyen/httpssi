var util = require('util');
var Directive = require('./Directive');

util.inherits(SetDirective, Directive);

function SetDirective(attributes) {
	this.attributes = attributes;
}

SetDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error('invalid attributes for #set');
		return _callback('');
	}
	// The use of global variable is not a good practice in NodeJS
	// In this case it is used for the sake of simplicity for implementing #set and #echo
	global[this.attributes.var] = this.attributes.value;
	_callback('');
}

SetDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined || this.attributes.value === undefined) {
		return false;
	}
	return true;
}

module.exports = SetDirective;
