Home assessment for ...


Usage
#include
file:
#set: var / value
<!--#set var="name" value="Superman" -->
#echo: var
<!--#echo var="name" -->

Design Pattern
There are two prominent design patterns being applied to this npm module: strategy pattern and factory pattern.
Strategy pattern is implemented for Directive, so that it has several sub-classes such as IncludeDirective, EchoDirective, etc. This ensures the polymophism of the program since the outsider method, in this case is SSIParser.parse(), does not need to know exactly the detailed implementation of Directive, and it only uses Directive.parse() in the abstract level.
Factory pattern supports strategy pattern for the initialization of the implemented object. In particular when the DirectiveManager.buildDirective() method receives construction data from outside, it automatically build a new Directive object based on information provided.

Testing
Good code can not decoupled from testing, so I use Mocha as one of the most well-supported testing tool for Node.js application. The test cases here are 