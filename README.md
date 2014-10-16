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
./node_modules/.bin/httpssi [--port 8080 --path path/to/server]
```
Implement in code:
```sh
var HttpSSI = require('httpssi');

// Arguments are optional
var httpSSI = new HttpSSI({
    port: [PORT],
    path: [PATH]
});

// Start server
httpSSI.start();

// Your code
...

// Stop server
httpSSI.stop();
```

Directives
====
The overall syntax of SSI:
```sh
<!--#directive attribute=value attribute=value ... -->
```
Supported directives: include, set, echo, printenv, exec, fsize, flastmod.
include
----
```sh
<!--#include file="included.html" -->
```
set
----
```sh
<!--#set var="actor" value="Superman" -->
```
echo
----
```sh
<!--#set var="actor" -->
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
If a directive appears to be invalid, it will not be pre-processed and returned as original form.

Design Patterns
====
There are two prominent design patterns being applied to this npm module: strategy pattern and factory pattern.
Strategy pattern is implemented for Directive, so that it has several sub-classes such as IncludeDirective, EchoDirective, etc. This ensures the polymophism of the program since the outsider method, in this case is SSIParser.parse(), does not need to know exactly the detailed implementation of Directive, and it only uses Directive.parse() in the abstract level.

Implementation discussion
====
One of the most difficult problems of this homework is handling the asynchronous fs.readFile() function inside the synchronous string.replace(). There is a solution found at [HttpServerWithSSI] which implements recursive algorithm, manually looping over each directive and replace its content. However, since that code is quite complicated and in order to respect the authorship, I eventually ended up using fs.readFileSync() to simplify the implementation, and used cache as a compensation for performance. To some extent, caching could be much more important than asynchronous processing because there are many requests to the same shtml file, so cache can significantly reduce IOs to files. Meanwhile, there might be several include directives in one shtml file but they are only read synchronously once during server up-time (and cached subsequently).
As specified in the homework requirement, the available good solution mentioned above can be applied to optimize the performance in production systems.

Testing
====
This project uses `mocha` library for testing. Makefile is available tests can be run by using the command:
```sh
make test
```
* Note: because there are some test cases for `exec` directive using "ls" command, tests must be run in UNIX Terminal. Windows machine needs "Cygwin" in order to run them.

[HttpServerWithSSI]:https://github.com/cmihail/HttpServerWithSSI