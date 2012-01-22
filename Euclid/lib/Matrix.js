// Matrix constructor accepts an array of arrays
var Matrix = function(e) {
  this.elements = e;
  this.dimensions = {
    rows    : e.length,
    columns : e[0].length
  };
}

Matrix.prototype = {
  multiply : function(m) {
    var
      Ar = this.dimensions.rows,
      Ac = this.dimensions.columns,
      Br = m.dimensions.rows,
      Bc = m.dimensions.columns,
      C = [],
      A = this.elements,
      B = m.elements;
    if (Ac !== Br) {
      console.error("Matrices cannot be multiplied -- A.rows and B.columns do not match.");
      return;
    }
    for (var i = 0; i < Ar; i++) {
      C.push([]);
      for (var j = 0; j < Bc; j++) {
        C[i].push(0);
        for (var k = 0; k < Br; k++) {
          C[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return new Matrix(C);
  }

}

Matrix.scaling = function(x, y) {
  return new Matrix([
    [x, 0, 0],
    [0, y, 0],
    [0, 0, 0]
  ]);
}

Matrix.rotation = function(angle, direction) {
//  var isCCW = direction === 'ccw';
  var isCCW = true;
  return new Matrix([
    [Math.cos(angle), Math.sin(angle) * (isCCW ? -1 : 1), 0],
    [Math.sin(angle) * (isCCW ? 1 : -1), Math.cos(angle), 0],
    [0, 0, 1]
  ]);
}

Matrix.translation = function(x, y) {
  return new Matrix([
    [1, 0, x],
    [0, 1, y],
    [0, 0, 1]
  ]);
}

Matrix.identity = function(dimensions) {
  M = [];
  for (var i=0; i < dimensions; i++) {
    M.push([]);
    for (var j=0; j < dimensions; j++) {
      M[i].push( i === j ? 1 : 0 );
    }
  }
  return new Matrix(M);
}

module.exports = Matrix;
