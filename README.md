An HTTP server in Node.js with support for Server Side Include (SSI).

Installation
====
```sh
npm install path/to/module
npm install git://github.com/duynguyen/httpssi.git
```

Usage
====
From the root directory of your project, run directly in the installed module:
```sh
INSTALL_DIR/node_modules/.bin/httpssi [port=PORT_NUMBER] [path=PATH/TO/SERVER_DIR] [no-cache]
```
* Default port is 8080 and default path is the directory where user run server.

Implement in code:
```sh
var HttpSSI = require('httpssi');

// Arguments are optional
var httpSSI = new HttpSSI({
    port: [PORT_NUMBER],
    path: [PATH/TO/SERVER_DIR],
    testMode: [true/false]
});

// Start server
httpSSI.start();

// Your code
...

// Stop server
httpSSI.stop();
```
To start the server with debug log, add flag `DEBUG=http` at the beginning of run command, for example:
```sh
DEBUG=http node main.js
```
There are several sample files in server_dir which can be used to test the module manually.

Directives
====
The overall syntax of SSI:
```sh
<!--#directive attribute=value attribute=value ... -->
```
Supported directives: include, set, echo, printenv, exec, fsize, flastmod. More details about syntax at http://httpd.apache.org/docs/current/mod/mod_include.html.
include
----
```sh
<!--#include file="included.html" -->
```
* Based on the project requirements, #include here only has one attribute "file".

set
----
```sh
<!--#set var="actor" value="Superman" -->
```
echo
----
```sh
<!--#echo var="actor" -->
```
printenv
----
```sh
<!--#printenv -->
```
exec
----
```sh
<!--#exec cmd="ls my_dir" -->
<!--#exec cgi="./testScript.cgi" -->
```
fsize
----
```sh
<!--#fsize file="myfile.html" -->
```
flastmod
----
```sh
<!--#flastmod file="myfile.html" -->
```

Assumption
----
If a directive appears to be invalid, it will not be pre-processed and returned in the original form.

Design Patterns
====
Strategy pattern is applied in the implementation of this npm module, particularly for different types of directives. The parent Directive class has several subclasses such as IncludeDirective, EchoDirective, etc. This ensures the flexibility of the architecture since the calling method, in this case is SSIParser.parse(), does not need to know exactly the detailed implementation of Directive, and it uses Directive.parse() and Directive.isValid() only in the generic way. Categorization is determined in DirectiveManager which decides which subclass is created for which directive.

Implementation discussion
====

One of the most challenging problems of this homework is handling the asynchronous fs.readFile() function inside the synchronous string.replace(). There is a solution found at [HttpServerWithSSI] which implements recursive algorithm, manually looping over each directive and replace its content. However, since that code is quite complicated and in order to respect the authorship, I eventually end up using fs.readFileSync() to simplify the implementation, and use cache as a compensation for performance. To some extent, caching could be much more important than asynchronous processing because there are many requests to the same shtml file, so cache can significantly reduce IOs to files. Meanwhile, there might be several include directives in one shtml file but they are only read synchronously once during server up-time (and cached subsequently).

In real working environment, the available good solution mentioned above should be applied to optimize the performance in production systems.

Testing
====
This project uses `mocha` library for testing. Makefile is available tests can be run by using the command:
```sh
make test
```
* Note: because there are some test cases for `exec` directive using "ls" command, tests must be run in UNIX Terminal. Windows machine needs "Cygwin" in order to run them.

Tools & Libraries
====
[exec-sync]: npm module for executing shell command synchronously

[debug]: small debugging utility

[mocha]: a famous test framework for node.js application

Rererences
====
http://nodejs.org/api

http://en.wikipedia.org/wiki/Server_Side_Includes

http://httpd.apache.org/docs/current/mod/mod_include.html

http://nodejs.org/docs/latest/api/util.html

https://github.com/cmihail/HttpServerWithSSI

https://github.com/67726e/node-ssi

[HttpServerWithSSI]:https://github.com/cmihail/HttpServerWithSSI
[exec-sync]:https://www.npmjs.org/package/exec-sync
[debug]:https://www.npmjs.org/package/debug
[mocha]:https://www.npmjs.org/package/mocha