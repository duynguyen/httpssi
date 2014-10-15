var fs = require('fs');
var DirectiveManager = require('./directives/DirectiveManager');

var directivePattern = /<!--#([a-z]+)([ ]+([a-z]+)="(.+?)")* -->/g;

function SSIParser() {
	//TODO
}

/**
 * Replace the SSI tags by pre-processed content
 */
SSIParser.prototype.parse = function(content) {
	content = content.replace(directivePattern, function(directiveContent, directiveName) {
		var attributes = DirectiveManager.parseAttributes(directiveContent);
		var directive = DirectiveManager.buildDirective(directiveName, attributes);
		if(directive.isValid()) {
			var result = '';
			directive.parse(function(parsedContent) {
				result = parsedContent;
			});
			console.log('+++++++++++++');
			console.log(result);
			return result;
		}
		return directiveContent;
	});
	// console.log(content);
	return content;
}

module.exports = SSIParser;
