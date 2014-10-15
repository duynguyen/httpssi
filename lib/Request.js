var fs = require('fs');
var SSIParser = require('./SSIParser');

function Request(req, res) {
	console.log('creating request...');
	this.req = req;
	this.res = res;
}

Request.prototype.process = function(filename) {
	fs.readFile(filename, 'binary', function(error, file) {
		if (error) {
			console.error(error);
		} else {
			var ssiParser = new SSIParser();
			ssiParser.parse(file);
		}
	});
}

module.exports = Request;
