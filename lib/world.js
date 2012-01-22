var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

var world = function(lowerPoint, upperPoint) {
  this.x0 = lowerPoint.x;
  this.y0 = lowerPoint.y;
  this.x1 = upperPoint.x;
  this.y1 = upperPoint.y;
  this.data = [];
  this.width  = (this.x1 - this.x0);
  this.height = (this.y1 - this.y0);
  for (var i = 0; i < this.width; i++) {
    this.data.push([]);
    for (var j = 0; j < this.height; j++) {
      this.data[i][j] = '';
    }
  }
};

world.prototype = {
  print : function() {
    var
      x = this.data.length,
      y = this.data.length && this.data[0].length,
      s;
    for (var i = 0; i < x; i++) {
      s = '';
      for (var j = 0; j < y; j++) {
        s += this.data[i][j] === '' ? '.' : 'x';
      }
      console.log(s);
    }
  }
};

module.exports = world;
