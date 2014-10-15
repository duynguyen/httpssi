var Directive = require('./Directive');
var IncludeDirective = require('./IncludeDirective');
var SetDirective = require('./SetDirective');
var EchoDirective = require('./EchoDirective');
var ExecDirective = require('./ExecDirective');
var PrintEnvDirective = require('./PrintEnvDirective');
var FileStatDirective = require('./FileStatDirective');

var attributePattern = /([a-z]+)="(.+?)"/g;

exports.buildDirective = function(directiveName, attributes) {
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
			return new Directive();
	}
}

exports.parseAttributes = function(directiveContent) {
	attributes = {};
	directiveContent.replace(attributePattern, function(attribute, name, value) {
		attributes[name] = value;
	});
	return attributes;
}
