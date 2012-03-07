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

Matrix.perspective = function(d) {
  return new Matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 1/d, 0]
  ]);
}

Matrix.orthographic = function() {
  return new Matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1]
  ]);
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

Matrix.translateOrigin3D = function(vrp) {
  return new Matrix([
    [1, 0, 0, -vrp.x],
    [0, 1, 0, -vrp.y],
    [0, 0, 1, -vrp.z],
    [0, 0, 0, 1]
  ]);
}

Matrix.rotate3D = function(vpn, vup) {
  var
    r3 = vpn.normalize(),
    r1 = vup.cross(r3).normalize(),
    r2 = r1.cross(r3);
  return new Matrix([
    [r1.x, r1.y, r1.z, 0],
    [r2.x, r2.y, r2.z, 0],
    [r3.x, r3.y, r3.z, 0],
    [   0,    0,    0, 1]
  ]);
}

Matrix.shear3D = function(viewMin, viewMax, prp) {
  var
    a = ( 1/(2 * (viewMax.x + viewMin.x)) - prp.x) / prp.z,
    b = ( 1/(2 * (viewMax.y + viewMin.y)) - prp.y) / prp.z;
  return new Matrix([
    [1, 0, a, 0],
    [0, 1, b, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]);
}

Matrix.translate3D = function(viewMin, viewMax, front) {
  return new Matrix([
    [1, 0, 0, -(viewMax.x + viewMin.x)/2],
    [0, 1, 0, -(viewMax.y + viewMin.y)/2],
    [0, 0, 1, -front],
    [0, 0, 0, 1]
  ]);
}

Matrix.scale3D = function(viewMin, viewMax, front, back) {
  var
    a = 2 / (viewMax.x - viewMin.x),
    b = 2 / (viewMax.y - viewMin.y),
    c = 1 / (front - back);
  return new Matrix([
    [a, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, c, 0],
    [0, 0, 0, 1]
  ]);
}

  /*
   * vrp : vector
   * vpn : vector
   * vup : vector
   * prp : vector
   * viewMin : Point
   * viewMax : Point
   */
  normalizeParallel : function(vrp, vpn, vup, prp, viewMin, viewMax) {
    var
      Torigin = Matrix.translateOrigin3D(vrp),
      R = Matrix.rotate3D(vpn, vup),
      SH = Matrix.shear3D(viewMin, viewMax, prp),
      T = Matrix.translate3D(viewMin, viewMax, front),
      S = Matrix.scale3D(viewMin, viewMax, front, back),
      N = Torigin
        .multiply(R)
        .multiply(SH)
        .multiply(T)
        .multiply(S);
    return N;
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
