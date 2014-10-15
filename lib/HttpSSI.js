var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var SSIParser = require('./SSIParser');
var SSICache = require('./SSICache');

var DEFAULT_PORT = '8080';
var DEFAULT_DIR = __dirname;

function HttpSSI() {
	SSICache.initCache();
	this.server = http.createServer(function(request, response) {
		var uri = url.parse(request.url).pathname;
		var filename = path.join(process.cwd() + "/", uri);
		fs.readFile(filename, 'binary', function(err, file) {
			if (err) {
				console.error(err);
				return;
			}
			if(getFileExtension(filename) == 'shtml') {
				file = SSIParser.parse(file);
			}
			response.write(file, 'binary');
			response.end();
		});
	});
};

HttpSSI.prototype.start = function() {
	this.server.listen(8080);
	console.log('HTTP server is starting ...');
};

HttpSSI.prototype.close = function() {
	if (this.server !== undefined) {
		console.log('Closing the server');
		this.server.close();
	}
};

function getFileExtension(filename) {
	var nameTokens = filename.split('.');
	if(nameTokens.length < 2) {
		return '';
	}
	return nameTokens[nameTokens.length - 1];
}

module.exports = HttpSSI;
