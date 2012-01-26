// TODO
// Add ability to pass in a world parameter to overwrite
var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

function draw(shapes, world, o) {
  var options = o || {},
      defaultMark = options.defaultMark || "#000000";
  applyToGeometry(shapes, addLine);
  return world;

  // Bresenham's Algorithm
  function addLine() {
    var
      x0 = +this.q.x,
      y0 = +this.q.y,
      x1 = +this.r.x,
      y1 = +this.r.y,
      isSteep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
      t, deltaX, deltaY, err, yStep, y;
      if (isSteep) {
        t = x0; x0 = y0; y0 = t;
        t = x1; x1 = y1; y1 = t;
      }
      if (x0 > x1) {
        t = x0; x0 = x1; x1 = t;
        t = y0; y0 = y1; y1 = t;
      }
      deltaX = x1 - x0;
      deltaY = Math.abs(y1 - y0);
      err    = deltaX / 2;
      yStep  = y0 < y1 ? 1 : -1;
      y      = y0;
      for (var x = x0; x <= x1; x++) {
        isSteep ? write(y, x) : write(x, y);
        err -= deltaY;
        if (err < 0) {
          y   += yStep;
          err += deltaX;
        }
      }
  }

  function write(x, y) {
    var
      maxX = world.data.length,
      maxY = world.data[0].length;
    x = parseInt(x, 10) - world.x0;
    y = parseInt(y, 10) - world.y0;
    world.data[x][y] = defaultMark;
  }
}

function applyToGeometry(geometry, func, params) {
  if (geometry instanceof Array) {
    for (var i = 0; i < geometry.length; i++) {
      func.apply(geometry[i], params);
    } 
  } else if (geometry) {
    func.apply(geometry, params); 
  }
}

module.exports = draw;
