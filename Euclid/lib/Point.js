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
  },
  rotate : function(degrees) {
    var
      p = this.homogenousCoordinates(),
      m = Matrix.rotation(degrees).multiply(p);
    this.x = m.elements[0][0];
    this.y = m.elements[1][0];
  },
  scale : function(x, y) {
    var
      p = this.homogenousCoordinates(),
      m = Matrix.scaling(x, y).multiply(p);
    this.x = m.elements[0][0];
    this.y = m.elements[1][0];
  },
  translate : function(x, y) {
    var
      p = this.homogenousCoordinates(),
      m = Matrix.translation(x, y).multiply(p);
    this.x = m.elements[0][0];
    this.y = m.elements[1][0];
  },
  homogenousCoordinates : function() {
    return new Matrix([[this.x], [this.y], [1]]);
  }
};

module.exports = Point;
