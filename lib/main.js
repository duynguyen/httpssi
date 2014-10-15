(function() {
    // HttpSSI = require('./HttpSSI');
    var fs = require('fs');
    var SSIParser = require('./SSIParser');
    // var server = new HttpSSI();
    // server.start();
    fs.readFile('test-include.shtml', 'binary', function(error, file) {
        if (error) {
            console.error(error);
            return;
        }
        var ssiParser = new SSIParser();
        console.log(ssiParser.parse(file));
    });

}).call(this);
