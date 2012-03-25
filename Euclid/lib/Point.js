var Point = function(x, y, z) {
    this.x = +x;
    this.y = +y;
    this.z = z ? +z : null;
    this.w = null;
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
  scale : function(x, y, z) {
    var
      p = z ? this.homogenousCoordinates3D() : this.homogenousCoordinates(),
      m = Matrix.scaling(x, y, z).multiply(p);
    this.x = m.elements[0][0];
    this.y = m.elements[1][0];
    this.z = z ? m.elements[2][0] : null;
  },
  translate : function(x, y, z) {
    var
      p = z ? this.homogenousCoordinates3D() : this.homogenousCoordinates(),
      m = Matrix.translation(x, y, z).multiply(p);
    this.x = m.elements[0][0];
    this.y = m.elements[1][0];
    this.z = z ? m.elements[2][0] : null;
  },
  homogenousCoordinates : function() {
    return new Matrix([[this.x], [this.y], [1]]);
  },
  
  homogenousCoordinates3D : function() {
    this.w = 1;
    return new Matrix([[this.x], [this.y], [this.z], [this.w]]);
  },

  perspectiveProjection : function(d) {
    // Can simplify multiplying by the homogenous matrix
    this.x = this.x / ( this.z / d );
    this.y = this.y / ( this.z / d );
    this.z = d;
  },

  orthogonalProjection : function() {
    // Can simplify by making z 0
    this.z = 0;
  },

  matrixTransform : function(M) {
    var
      m = M.multiply(this.homogenousCoordinates3D());
    this.w = m.elements[3][0];
    this.x = m.elements[0][0] / this.w;
    this.y = m.elements[1][0] / this.w;
    this.z = m.elements[2][0] / this.w;
  }

};

module.exports = Point;
