// Matrix constructor accepts an array of arrays
var Matrix = function(e) {
  this.elements = e;
  this.dimensions = {
    rows    : e.length,
    columns : e[0].length
  }
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
      console.err("Matrices cannot be multiplied -- A.rows and B.columns do not match.");
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

Matrix.Rotation = function(angle, direction) {
  var isCCW = direction === 'ccw';
  return new Matrix([
    [Math.cos(angle), Math.sin(angle) * isCCW ? 1 : -1],
    [Math.sin(angle) * isCCW ? -1 : 1, Math.cos(angle)]
  ]);
}

module.exports = Matrix;
