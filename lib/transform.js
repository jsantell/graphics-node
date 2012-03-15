
function rotate(degrees) {
  this.rotate(degrees);
}

function scale(x, y, z) {
  this.scale(x, y, z);
}

function translate(x, y, z) {
  this.translate(x, y, z);
}

function matrixTransform(M) {
  this.matrixTransform(M);
}

function perspectiveProjection(d) { 
  this.perspectiveProjection(d);
}

function orthogonalProjection(d) { 
  this.orthogonalProjection(d);
}

var transform = {
  rotate : function(shapes, degrees) {
    applyToGeometry(shapes, rotate, [degrees]);
  },
  scale : function(shapes, x, y, z) {
    applyToGeometry(shapes, scale, [x, y, z]);
  },
  translate : function(shapes, x, y, z) {
    applyToGeometry(shapes, translate, [x, y, z]);
  },
  matrixTransform : function(shapes, M) {
    applyToGeometry(shapes, matrixTransform, [M]);
  },
  perspectiveProjection : function(shapes, d) {
    applyToGeometry(shapes, perspectiveProjection, [d]);
  },
  orthogonalProjection : function(shapes) {
    applyToGeometry(shapes, orthogonalProjection);
  }
}

function applyToGeometry(geometry, func, params) {
  if (geometry && geometry.length) {
    for (var i = 0; i < geometry.length; i++) {
      func.apply(geometry[i], params);
    } 
  } else if (geometry) {
    func.apply(geometry, params); 
  }
}

module.exports = transform;
