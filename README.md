Home assessment for ...


Usage
#include
file:
#set: var / value
<!--#set var="name" value="Superman" -->
#echo: var
<!--#echo var="name" -->

Assumption
----
If a directive appears to be invalid, it will not be pre-processed and returned as original form.

Design Patterns
----
There are two prominent design patterns being applied to this npm module: strategy pattern and factory pattern.
Strategy pattern is implemented for Directive, so that it has several sub-classes such as IncludeDirective, EchoDirective, etc. This ensures the polymophism of the program since the outsider method, in this case is SSIParser.parse(), does not need to know exactly the detailed implementation of Directive, and it only uses Directive.parse() in the abstract level.

Some discussion on the implementation
---
One of the most difficult problems of this homework is handling the asynchronous fs.readFile() function inside the synchronous string.replace(). There is a solution found at which implements recursive algorithm, manually looping over each directive and replace its content. However, since that code is quite complicated and respecting the authorship of code, I eventually ended up using fs.readFileSync() to simplify the implementation, and used cache as a compensation for performance. To some extent, caching could be much more important than asynchronous processing because there are many requests to the same shtml file, so cache can significantly reduce IOs to files. Meanwhile, there might be several include directives in one shtml file but they are only read synchronously once during server up-time (and cached subsequently).
As specified in the homework requirement, the available good solution mentioned above can be applied to optimize the performance in production systems.

Testing
----
Good code can not decoupled from testing, so I use Mocha as one of the most well-supported testing tool for Node.js application. The test cases here are 