var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var SSIParser = require('./SSIParser');
var SSICache = require('./SSICache');

var DEFAULT_PORT = '8080';
var DEFAULT_DIR = __dirname;

function HttpSSI(args) {
	this.params = {
		port: DEFAULT_PORT,
		path: DEFAULT_DIR,
	};

	for (var arg in args) {
		this.params[arg] = args[arg];
	}
	if(this.params.testMode) {
		SSICache.enableTestMode();
	}
	var serverPath = this.params.path;

	this.server = http.createServer(function(request, response) {
		// Get name of the requested file
		var uri = url.parse(request.url).pathname;
		var filename = path.join(process.cwd(), uri);

		var parser = new SSIParser(serverPath);

		// process shtml file or return original content if not shtml
		fs.readFile(filename, 'binary', function(err, fileData) {
			if (err) {
				console.error(err);
				return(err);
			}
			if(getFileExtension(filename) == 'shtml') {
				fileData = parser.parse(fileData);
			}
			response.write(fileData, 'binary');
			response.end();
		});
	});
};

HttpSSI.prototype.start = function() {
	this.server.listen(this.params.port);
	console.log('HTTP SSI server is starting on port ' + this.params.port);
};

HttpSSI.prototype.stop = function() {
	if (this.server !== undefined) {
		console.log('HTTP SSI server stopped!');
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
