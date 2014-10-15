var util = require('util');
var Directive = require('./Directive');

util.inherits(EchoDirective, Directive);

function EchoDirective(attributes) {
	this.attributes = attributes;
}

EchoDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error('invalid attributes for #echo');
		return _callback('');
	}
	try {
		_callback(eval(this.attributes.var));
	} catch(error) {
		console.error(error);
		_callback('')
	}
}

EchoDirective.prototype.isValid = function() {
	if(this.attributes.var === undefined) {
		return false;
	}
	return true;
}

module.exports = EchoDirective;
