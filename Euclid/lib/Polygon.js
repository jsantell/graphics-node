var Polygon = function(points) {
  this.points = points;
}

Polygon.prototype = {
  rotate : function(degrees) {
    this.points.forEach(function(point) {
      point.rotate(degrees);
    });
  },

  scale : function(x, y) {
    this.points.forEach(function(point) {
      point.scale(x, y);
    });
  },

  translate : function(x, y) {
    this.points.forEach(function(point) {
      point.translate(x, y);
    });
  },

  matrixTransform : function(M) {
    this.points.forEach(function(point) {
      point.matrixTransform(M);
    });
  },

  perspectiveProjection : function(d) {
    this.points.forEach(function(point) {
      point.perspectiveProjection(d);
    });
  },

  orthogonalProjection : function() {
    this.points.forEach(function(point) {
      point.orthogonalProjection();
    });
  }
};

module.exports = Polygon;
