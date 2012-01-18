var
  fs = require('fs'),
  Euclid = require('./../../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

var world = {
  defaultColor: '',
  height : 0,
  width  : 0,
  data : [],
  init : function(lowerPoint, upperPoint, defaultColor) {
    var
      x1 = lowerPoint.x,
      y1 = lowerPoint.y,
      x2 = upperPoint.x,
      y2 = upperPoint.y;

    this.defaultColor = defaultColor || '#ffffff';
    this.width  = (x2 - x1) + 1;
    this.height = (y2 - y1) + 1;

    for (var i = x1; i <= x2; i++) {
      this.data.push([]);
      for (var j = y1; j <= y2; j++) {
        this.data[i][j] = defaultColor;
      }
    }
  },
  add : function() {

  },
  print : function() {
    var
      x = this.data.length,
      y = this.data.length && this.data[0].length,
      s;
    for (var i = 0; i < x; i++) {
      s = '';
      for (var j = 0; j < y; j++) {
        s += this.data[i][j] === this.defaultColor ? '.' : 'x';
      }
      console.log(s);
    }
  }
};

module.exports = world;
