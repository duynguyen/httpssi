var util = require('util');
var Directive = require('./Directive');

util.inherits(EchoDirective, Directive);

function EchoDirective(attributes) {
	this.attributes = attributes;
}

EchoDirective.prototype.parse = function() {
	try {
		return eval(this.attributes.var);
	} catch(err) {
		console.error(err);
		return '';
	}
}

EchoDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined) {
		console.error('invalid attributes for #echo');
		return false;
	}
	return true;
}

module.exports = EchoDirective;
