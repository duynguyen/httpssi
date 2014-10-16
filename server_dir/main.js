// (function() {
//     // HttpSSI = require('./HttpSSI');
//     var fs = require('fs');
//     var SSIParser = require('./SSIParser');
//     // var server = new HttpSSI();
//     // server.start();
//     fs.readFile('test-include.shtml', 'binary', function(error, file) {
//         if (error) {
//             console.error(error);
//             return;
//         }
//         var cont = SSIParser.parse(file);
//         console.log(cont);
//     });

// }).call(this);

var HttpSSI = require('./HttpSSI');

var httpServer = new HttpSSI();
httpServer.start();
