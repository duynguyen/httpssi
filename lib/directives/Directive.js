function Directive() {
	// default constructor
}

Directive.prototype.parse = function() {
	return '';
}

Directive.prototype.isValid = function() { return false; }

module.exports = Directive;
