var Vector = function(x, y, z) {
    this.x = +x;
    this.y = +y;
    this.z = +z;
};

Vector.prototype = {
  normalize : function() {
    var l = this.length();
    return new Vector( this.x / l, this.y / l, this.z / l );
  },

  length : function() {
    return Math.sqrt( (this.x * this.x) + (this.y * this.y) + (this.z * this.z) );
  },

  cross : function(v) {
    return new Vector(
      (this.y * v.z) - (this.z * v.y),
      (this.z * v.x) - (this.x * v.z),
      (this.x * v.y) - (this.y * v.x)
    );
  }
};

module.exports = Vector;
