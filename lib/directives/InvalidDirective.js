function InvalidDirective() {
	// invalid directive that can not be pre-processed
}

InvalidDirective.prototype.parse = function() { return null; };

InvalidDirective.prototype.isValid = function() { return false; };

module.exports = InvalidDirective;
