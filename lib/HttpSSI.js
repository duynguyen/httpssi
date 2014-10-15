var http = require('http');
var Request = require('./Request');

var DEFAULT_PORT = '8080';
var DEFAULT_DIR = __dirname;

function HttpSSI() {
    this.server = http.createServer(function(request, response) {
    	var httpRequest = new Request(request, response);
    	httpRequest.process('test-include.html');
    }).listen(8080);
}

HttpSSI.prototype.start = function() {
	this.server.listen(8080);
	console.log('HTTP server is starting ...');
}

module.exports = HttpSSI;
