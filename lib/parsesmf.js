//TODO
// Get rid of substring comparisons for %%%BEGIN and %%%END
var
  fs       = require('fs'),
  Euclid   = require('./../Euclid'),
  $Point   = Euclid.Point,
  $Line    = Euclid.Line,
  $Polygon = Euclid.Polygon;

function parse(file, callback) {
  var
    faces = [],
    vertices = [];
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
        
        if (line[0] == 'v') {
          vertex(line);
        } else if (line[0] == 'f') {
          face(line);
        }
      }
    });
      
    input.on('end', function() {
      callback(faces);
    }); 
  }
  
  function vertex(line) {
    var params = line.split(' ');
    vertices.push(new $Point(params[1], params[2], params[3]));
  }

  function face(line) {
    var params = line.split(' ');
    faces.push(new $Polygon([
      vertices[(+params[1])-1],
      vertices[(+params[2])-1],
      vertices[(+params[3])-1]])
    );
  }
}

module.exports = parse;
