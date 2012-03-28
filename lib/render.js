//TODO
// Get rid of substring comparisons for %%%BEGIN and %%%END
var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

var
  red = [
{'key':'a', 'color':'#000000' },
{'key':'b', 'color':'#100000' },
{'key':'c', 'color':'#200000' },
{'key':'d', 'color':'#300000' },
{'key':'e', 'color':'#400000' },
{'key':'f', 'color':'#500000' },
{'key':'g', 'color':'#600000' },
{'key':'h', 'color':'#700000' },
{'key':'i', 'color':'#800000' },
{'key':'j', 'color':'#900000' },
{'key':'k', 'color':'#a00000' },
{'key':'l', 'color':'#b00000' },
{'key':'m', 'color':'#c00000' },
{'key':'n', 'color':'#d00000' },
{'key':'o', 'color':'#e00000' },
{'key':'p', 'color':'#f00000' },
{'key':'q', 'color':'#f10000' },
{'key':'r', 'color':'#f20000' },
{'key':'s', 'color':'#f30000' },
{'key':'t', 'color':'#f40000' }];

function renderXPM(world, callback, front) {
  var
    output    = '',
    EOL       = '\n',
    numColors = 17,
    pixelSize = 1,
    data      = world.data,
    width     = world.width,
    height    = world.height;

  output += '/* XPM */' + EOL;
  output += 'static char *sco100[] = {' + EOL;
  output += '/* width height num_colors chars_per_pixel */' + EOL;
  output += '"' + width + ' ' + height + ' ' + numColors + ' ' + pixelSize + '",' + EOL;
  output += '/* colors */' + EOL;
  output += '"x c #000000",' + EOL;
  red.forEach(function(color) {
    output += '"' + color.key + ' c ' + color.color + '",' + EOL;
  });
  output += '/* pixels */' + EOL;
  for (var i = height - 1; i >= 0; i--) {
    output += '"';
    for (var j = 0; j < width; j++) {
      output += data[j][i] === '#000000' ? 'x' : red[ front - data[j][i] ].key;
    }
    output += (i ? '",' : '"') + EOL;
  }
  output += '};';
  callback(output);
}

var render = function(world, callback, front) {
    renderXPM(world, callback, front);
};

module.exports = render;
