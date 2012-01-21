var Point = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

Point.prototype = {
  dimensions : function() {
    var dimensions = 0;
    this.x !== undefined && dimensions++;
    this.y !== undefined && dimensions++;
    this.z !== undefined && dimensions++;
    return dimensions;
  },
  is2D : function() {
    return this.dimensions === 2;
  },
  is3D : function() {
    return this.dimensions === 3;
  }
};

module.exports = Point;
