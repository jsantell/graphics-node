//TODO
// Get rid of substring comparisons for %%%BEGIN and %%%END
var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;


function parse(file, callback) {
  var results = [];
  parseFile(fs.createReadStream(file), callback);

  function parseFile(input, func) {
    var remainingData = '';
    input.on('data', function(data) {
      var
        i,
        line,
        EOL = '\n',
        shouldParse = false;

      remainingData += data;
      i = remainingData.indexOf(EOL);

      while (i > -1) {
        line = remainingData.substring(0, i);
        remainingData = remainingData.substring(i + 1);
        i = remainingData.indexOf(EOL);

        if (line.substring(0,6) === '%%%END') {
          shouldParse = false;
        } else if (shouldParse && line !== '') {
          create(line);
        } else if (line.substring(0,8) === '%%%BEGIN') {
          shouldParse = true;
        }
      }
    });
      
    input.on('end', function() {
      callback(results);
    }); 
  }

  function create(line) {
    var params = line.split(' ');
    results.push(new $L(
      new $P(params[0], params[1]),
      new $P(params[2], params[3])
    ));
  }
}

module.exports = parse;
