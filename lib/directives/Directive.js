function Directive() {
	// default constructor
}

Directive.prototype.parse = function() {};

Directive.prototype.isValid = function() { return true; };

module.exports = Directive;
