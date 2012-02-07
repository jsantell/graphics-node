//TODO
// Get rid of substring comparisons for %%%BEGIN and %%%END
var
  fs       = require('fs'),
  Euclid   = require('./../Euclid'),
  $Point   = Euclid.Point,
  $Line    = Euclid.Line,
  $Polygon = Euclid.Polygon;

function parse(file, callback) {
  var results = [], shouldParse = false, polygonBuilder = [],
    commands = [
      { regex: /^%%%BEGIN/, func: function() { shouldParse = true; } },
      { regex: /^%%%END/,   func: function() { shouldParse = false; } },
      { regex: /lineto/i,    func: lineTo },
      { regex: /moveto/i,    func: moveTo },
      { regex: /line/i,      func: createLine },
      { regex: /stroke/i,    func: stroke }
    ];
  parseFile(fs.createReadStream(file), callback);

  function parseFile(input, func) {
    var
      remainingData = '';

    input.on('data', function(data) {
      var EOL = '\n', i, line;

      remainingData += data;
      i = remainingData.indexOf(EOL);

      while (i > -1) {
        line = remainingData.substring(0, i);
        remainingData = remainingData.substring(i + 1);
        i = remainingData.indexOf(EOL);
        
        // Parse for action to take
        for (var j = 0; j < commands.length; j++) {
          if (('' + line).match(commands[j].regex)) {
            (!j || shouldParse) && commands[j].func(line);
            break;
          }
        };
      }
    });
      
    input.on('end', function() {
      callback(results);
    }); 
  }

  function lineTo(line) {
    var params = line.split(' ');
    if (polygonBuilder.length) {
      polygonBuilder.push(
        new $Point(params[0], params[1])
      );
    }
  }

  function moveTo(line) {
    var params = line.split(' ');
    if (!polygonBuilder.length) {
      polygonBuilder.push(
        new $Point(params[0], params[1])
      );
    }
  }

  function stroke() {
    if (polygonBuilder.length) {
      results.push(new $Polygon(polygonBuilder));
      polygonBuilder = [];
    }
  }

  function createLine(line) {
    var params = line.split(' ');
    results.push(new $Line(
      new $Point(params[0], params[1]),
      new $Point(params[2], params[3])
    ));
  }
}

module.exports = parse;
