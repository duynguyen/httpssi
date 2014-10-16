var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var debug = require('debug')('http');
var SSIParser = require('./SSIParser');
var SSICache = require('./SSICache');

var DEFAULT_PORT = '8080';
var DEFAULT_DIR = './';
// default path is the dir where user runs server

function HttpSSI(args) {
	this.params = {
		port: DEFAULT_PORT,
		path: DEFAULT_DIR
	};

	// copy all args to internal params
	for (var arg in args) {
		if(arg === "path") {
			// if path is in args, append to current dir
			this.params[arg] += args[arg];
		} else {
			this.params[arg] = args[arg];
		}
	}

	// turn on testMode if requested
	if(this.params.testMode) {
		SSICache.enableTestMode();
	}

	var serverPath = this.params.path;
	var parser = new SSIParser(this.params.path);

	this.server = http.createServer(function(request, response) {
		// Get name of the requested file
		var uri = url.parse(request.url).pathname;
		var filename = path.join(serverPath, uri);

		// process shtml file or return original content if not shtml
		fs.readFile(filename, 'binary', function(err, fileData) {
			if(err) {
				debug(err);
				return err;
			}
			if(getFileExtension(filename) == 'shtml') {
				fileData = parser.parse(fileData);
			}
			response.write(fileData, 'binary');
			response.end();
		});
	});
}

HttpSSI.prototype.start = function(_callback) {
	debug('HTTP SSI server is starting on port ' + this.params.port);
	this.server.listen(this.params.port, _callback);
};

HttpSSI.prototype.stop = function() {
	if (this.server !== undefined) {
		debug('HTTP SSI server stopped!');
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
