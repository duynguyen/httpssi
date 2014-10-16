/**
 * Test cases are based on the requirements in homework specification
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var SSICache = require('../lib/SSICache');
var SSIParser = require('../lib/SSIParser');
var HttpSSI = require('../lib/HttpSSI');

var TEST_PORT = 9655;
var TEST_PATH = __dirname + '/test_folder/';

var parser = new SSIParser(TEST_PATH);
SSICache.enableTestMode();

describe("#include file", function() {
	it("should process include directive with valid path", function() {
		assertFileContent('testIncludeValid.shtml', 'testIncludeValid.shtml.expected');
	});

	it("should process include directive with valid sub-folder path", function() {
		assertFileContent('testIncludeSubfolderValid.shtml', 'testIncludeSubfolderValid.shtml.expected');
	});
	
	it("should not process include directive with invalid path (relative path, root path, non-existed file)", function() {
		assertFileContent('testIncludeInvalid.shtml', 'testIncludeInvalid.shtml');
	});
});

describe("#set and #echo", function() {
	/**
	 * Since set values are stored in cache,
	 * temporarily disable testMode to make #set and #echo work
	 */
	beforeEach(function() {
		SSICache.disableTestMode();
	});
	
	afterEach(function() {
		SSICache.flush();
		SSICache.enableTestMode();
	});

	it("should set a new variable and successfully echo it afterwards", function() {
		assertFileContent('testSetEchoValid.shtml', 'testSetEchoValid.shtml.expected');
	});

	it("should not process if echo value was not set", function() {
		assertFileContent('testEchoInvalid.shtml', 'testEchoInvalid.shtml');
	});
});

describe("#printenv", function() {
	it("should print all process environment variables", function() {
		// check if the output file contains environment variables
		// TERM_PROGRAM_VERSION and TMPDIR are two of them
		containedInFileContent('testPrintenvValid.shtml', ['TERM_PROGRAM_VERSION', 'TMPDIR']);
	});

	it("should not process if there is any attribute (invalid syntax)", function() {
		assertFileContent('testPrintenvInvalid.shtml', 'testPrintenvInvalid.shtml');
	});
});

describe("#exec", function() {
	it("-cmd should execute the shell command", function() {
		// included_sub.html is one of the files in the directory where ls locates
		containedInFileContent('testExecCmdValid.shtml', ['included_sub.html', 'testIncludeValid_sub.shtml']);
	});

	it("-cgi should execute the shell script in cgi file", function() {
		assertFileContent('testExecCgiValid.shtml', 'testExecCgiValid.shtml.expected');
	});

	it("-cmd should not execute the invalid shell command", function() {
		assertFileContent('testExecCmdInvalid.shtml', 'testExecCmdInvalid.shtml');
	});

	it("-cgi should not execute the invalid cgi file", function() {
		assertFileContent('testExecCgiInvalid.shtml', 'testExecCgiInvalid.shtml');
	});
});

describe("#filestats", function() {
	var stat;

	beforeEach(function() {
		stat = fs.statSync(TEST_PATH + 'included.html');
	});
	
	afterEach(function() {
		stat = null;
	});

	it("#fsize should print the size of file", function() {
		containedInFileContent('testFsizeValid.shtml', [stat.size]);
	});

	it("#flastmod should print the last modified time of file", function() {
		containedInFileContent('testFlastmodValid.shtml', [stat.mtime]);
	});
});

describe("multiple directives", function() {
	/**
	 * Since set values are stored in cache,
	 * temporarily disable testMode to make #set and #echo work
	 */
	beforeEach(function() {
		SSICache.disableTestMode();
	});
	
	afterEach(function() {
		SSICache.flush();
		SSICache.enableTestMode();
	});

	it("should process all valid directives", function() {
		assertFileContent('testMultipleDirectivesValid.shtml', 'testMultipleDirectivesValid.shtml.expected');
	});

	it("should process valid directives and keep original invalid directives", function() {
		assertFileContent('testMultipleDirectivesInvalid.shtml', 'testMultipleDirectivesInvalid.shtml.expected');
	});
});

describe("#http request", function() {
	var httpServer;
	var options = {
			host: 'http://localhost',
			port: TEST_PORT,
			path: 'testMultipleDirectivesValid.shtml',
			method: 'GET'
		};
	beforeEach(function() {
		httpServer = new HttpSSI({
			port: TEST_PORT,
			path: TEST_PATH,
			testMode: true
		});
		httpServer.start();
	});

	afterEach(function() {
		httpServer.stop();
	});

	it("should pre-process shtml file with valid get request", function(done) {
		var req = http.request(options, function(res) {
			res.on('data', function (chunk) {
				assertContent(chunk, 'testMultipleDirectivesValid.shtml.expected');
				done();
			});
		});
		req.end();
	});

	it("should not pre-process any non-shtml file", function(done) {
		options.path = 'testSSI.html';
		var req = http.request(options, function(res) {
			res.on('data', function (chunk) {
				assertContent(chunk, 'testSSI.html');
				done();
			});
		});
		req.end();
	});
});

function assertFileContent(file, expected) {
	var fileData = fs.readFileSync(path.join(TEST_PATH, file), 'binary');
	var expectedData = fs.readFileSync(path.join(TEST_PATH, expected), 'binary');
	assert.equal(parser.parse(fileData), expectedData);
};

function assertContent(content, expectedFile) {
	var expectedData = fs.readFileSync(path.join(TEST_PATH, expectedFile), 'binary');
	assert.equal(content, expectedData);
};

function containedInFileContent(file, expectedTexts) {
	var fileData = fs.readFileSync(path.join(TEST_PATH, file), 'binary');
	var parsedData = parser.parse(fileData);
	for(var i in expectedTexts) {
		assert(parsedData.indexOf(expectedTexts[i]) > -1);
	}
};
