
function rotate(degrees) {
  this.rotate(degrees);
}

function scale(x, y) {
  this.scale(x, y);
}

function translate(x, y) {
  this.translate(x, y);
}

function matrixTransform(M) {
  console.log('!!!');
  console.log(this);
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
  scale : function(shapes, x, y) {
    applyToGeometry(shapes, scale, [x, y]);
  },
  translate : function(shapes, x, y) {
    applyToGeometry(shapes, translate, [x, y]);
  },
  matrixTransform : function(shapes, M) {
    applyToGeometry(shapes, matrixTransform, [M]);
  },
  perspectiveProjection : function(shapes, d) {
    applyToGeometry(shapes, perspectiveProjection, [d]);
  },
  orthogonalProjection : function(shapes) {
    applyToGeometry(shapes, orthogonalProjection, [d]);
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
