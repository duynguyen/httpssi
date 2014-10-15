var fs = require('fs');
var DirectiveManager = require('./directives/DirectiveManager');

var DIRECTIVE_PATTERN = /<!--#([a-z]+)([ ]+([a-z]+)="(.+?)")* -->/g;

/**
 * Replace the SSI tags by pre-processed content
 */
exports.parse = function(content) {
	return content.replace(DIRECTIVE_PATTERN, function(directiveContent, directiveName) {
		var directive = DirectiveManager.buildDirective(directiveName, directiveContent);
		if(directive.isValid()) {
			return directive.parse();
		}
		return directiveContent;
	});
}
