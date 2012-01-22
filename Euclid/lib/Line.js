var Line = function(q, r) {
  this.q = q;
  this.r = r;
}

Line.prototype = {
  rotate : function(degrees) {
    this.q.rotate(degrees);
    this.r.rotate(degrees);
  },

  scale : function(x, y) {
    this.q.scale(x, y);
    this.r.scale(x, y);
  },

  translate : function(x, y) {
    this.q.translate(x, y);
    this.r.translate(x, y);
  }
}

module.exports = Line;
