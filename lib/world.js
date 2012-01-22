var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

var world = function(lowerPoint, upperPoint) {
  this.x1 = lowerPoint.x;
  this.y1 = lowerPoint.y;
  this.x2 = upperPoint.x;
  this.y2 = upperPoint.y;
  this.data = [];
  this.width  = (this.x2 - this.x1);
  this.height = (this.y2 - this.y1);
  for (var i = this.x1; i < this.x2; i++) {
    this.data.push([]);
    for (var j = this.y1; j < this.y2; j++) {
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
