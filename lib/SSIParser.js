var fs = require('fs');
var debug = require('debug')('http');
var DirectiveManager = require('./directives/DirectiveManager');

var DIRECTIVE_PATTERN = /<!--#([a-z]+)([ ]+([a-z]+)="(.+?)")* -->/g;

function SSIParser(path) {
	this.serverPath = path;
}

/**
 * Replace the SSI tags by pre-processed content
 */
SSIParser.prototype.parse = function(content) {
	var parser = this;
	return content.replace(DIRECTIVE_PATTERN, function(directiveContent, directiveName) {
		var directive = DirectiveManager.buildDirective(directiveName, directiveContent);
		// only replace directive if it is valid and parsing causes no error
		// otherwise, return the original content
		try {
			if(directive.isValid()) {
				// go to server working directory
				process.chdir(parser.serverPath);
				return directive.parse();
			}
		} catch(err) {
			debug(err);
		}
		return directiveContent;
	});
};

module.exports = SSIParser;
