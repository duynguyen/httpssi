function Directive() {
	// something
}

Directive.prototype.parse = function(_callback) {
	_callback('');
}

Directive.prototype.isValid = function() { return false; }

module.exports = Directive;
