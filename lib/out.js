//TODO
// Get rid of substring comparisons for %%%BEGIN and %%%END
var
  fs = require('fs'),
  Euclid = require('./../../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

function renderXPM(world, callback) {
  var
    output    = '',
    EOL       = '\n',
    numColors = 2,
    pixelSize = 1,
    data      = world.data,
    width     = world.width,
    height    = world.height;

  output += '/* XPM */' + EOL;
  output += 'static char *sco100[] = {' + EOL;
  output += '/* width height num_colors chars_per_pixel */' + EOL;
  output += '"' + width + ' ' + height + ' ' + numColors + ' ' + pixelSize + '",' + EOL;
  output += '/* colors */' + EOL;
  // TODO Don't hardcore colors
  output += '"o c #ffffff",' + EOL;
  output += '"x c #000000",' + EOL;
  output += '/* pixels */' + EOL;
  for (var i = height-1; i >= 0; i--) {
    output += '"';
    for (var j = 0; j < width; j++) {
      output += data[j][i] === '#ffffff' ? 'o' : 'x';
    }
    output += '",' + EOL;
  }
  output += '};';
  callback(output);
}

var renderer = {
  render : function(world, callback) {
    renderXPM(world, callback);
  }
};

module.exports = renderer;
