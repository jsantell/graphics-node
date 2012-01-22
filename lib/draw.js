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
  if (shapes && shapes.length) {
    for (var i = 0; i < shapes.length; i++) {
      addLine(shapes[i]);
    } 
  } else if (shapes) {
    addLine(shapes); 
  }
  return world;

  // Bresenham's Algorithm
  function addLine(line) {
    var
      x0 = +line.q.x,
      y0 = +line.q.y,
      x1 = +line.r.x,
      y1 = +line.r.y,
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
    x = parseInt(x, 10) - world.x1;
    y = parseInt(y, 10) - world.y1;
    // Deal with clipping
    if (x < maxX && x >= 0 && y < maxY && y >= 0) {
      world.data[x][y] = defaultMark;
    }
  }
}

module.exports = draw;
