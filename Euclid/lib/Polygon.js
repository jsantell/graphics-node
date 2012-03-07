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

  perspective : function(d) {
    this.points.forEach(function(point) {
      point.perspective(d);
    });
  },

  orthographic : function() {
    this.points.forEach(function(point) {
      point.orthographic();
    });
  }
};

module.exports = Polygon;
