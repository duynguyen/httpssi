var exec = require('child_process').exec;
var util = require('util');
var Directive = require('./Directive');

util.inherits(ExecDirective, Directive);

function ExecDirective(attributes) {
	this.attributes = attributes;
}

ExecDirective.prototype.parse = function(_callback) {
	if(!this.isValid()) {
		console.error("invalid command");
		return _callback('');
	}

	var cmd = (this.attributes.cgi || this.attributes.cmd);
	exec(cmd, function(err, stdout, stderr) {
		if (err || stderr) {
			console.error(err ? err : stderr);
			return _callback('');
		}

		console.log('----------');
		console.log(stdout);
		_callback(stdout);
	});
}

/**
 * Validate that the path exists, cannot contain ../, nor can it be an absolute path
 */
ExecDirective.prototype.isValid = function() {
	if(this.attributes.cgi === undefined && this.attributes.cmd === undefined) {
		return false;
	}
	return true;
}

module.exports = ExecDirective;
