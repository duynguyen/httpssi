var InvalidDirective = require('./InvalidDirective');
var IncludeDirective = require('./IncludeDirective');
var SetDirective = require('./SetDirective');
var EchoDirective = require('./EchoDirective');
var ExecDirective = require('./ExecDirective');
var PrintEnvDirective = require('./PrintEnvDirective');
var FileStatDirective = require('./FileStatDirective');

var ATTRIBUTE_PATTERN = /([a-z]+)="(.+?)"/g;

/**
 * {attributes: {key1: value1, key2: value2}}
 * Example: for IncludeDirective {attributes: {file: "file.shtml"}}
 */
function parseAttributes(directiveContent) {
	attributes = {};
	directiveContent.replace(ATTRIBUTE_PATTERN, function(attribute, name, value) {
		attributes[name] = value;
	});
	return attributes;
}

exports.buildDirective = function(directiveName, directiveContent) {
	var attributes = parseAttributes(directiveContent);
	switch(directiveName) {
		case 'include':
			return new IncludeDirective(attributes);
		case 'set':
			return new SetDirective(attributes);
		case 'echo':
			return new EchoDirective(attributes);
		case 'exec':
			return new ExecDirective(attributes);
		case 'printenv':
			return new PrintEnvDirective(attributes);
		case 'fsize':
			attributes._statType = 'size';
			return new FileStatDirective(attributes);
		case 'flastmod':
			attributes._statType = 'mtime';
			return new FileStatDirective(attributes);
		default:
			return new InvalidDirective();
	}
};
