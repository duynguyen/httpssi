var fs = require('fs');
var SSIParser = require('./SSIParser');

function Request(req, res, path) {
	console.log('creating request...');
	this.req = req;
	this.res = res;
	this.path = path;
}

Request.prototype.process = function(filename) {
	var request = this;
	fs.readFile(filename, 'binary', function(err, file) {
		if (error) {
			throw err;
		}
		if(getFileExtension(filename) == 'shtml') {
			file = SSIParser.parse(file);
		}
		request.response.write(file, 'binary');
		request.response.end();
	});
}

function getFileExtension(filename) {
	var nameTokens = file.split('.');
	if(nameTokens.length < 2) {
		return '';
	}
	return nameTokens[nameTokens.length - 1];
}

module.exports = Request;
