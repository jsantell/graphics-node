var
  fs = require('fs'),
  Euclid = require('./../../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;

var defaultMark = "#000000";

function write(x, y, world) {
  var
    maxX = world.length,
    maxY = world[0].length;

  // Deal with clipping
  if (x < maxX && x >= 0 && y < maxY && y >= 0) {
    world[x][y] = defaultMark;
  }
}

// Bresenham's Algorithm
function addLine(line, world) {
  var
    x0 = +line.q.x,
    y0 = +line.q.y,
    x1 = +line.r.x,
    y1 = +line.r.y,
    isSteep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
    t, deltaX, deltaY, err, yStep, y;
    if (isSteep) {
      steepSwap();
    }
    if (x0 > x1) {
      t = x0;
      x0 = x1;
      x1 = t;
      t = y0;
      y0 = y1;
      y1 = t;
    }
    deltaX = x1 - x0;
    deltaY = Math.abs(y1 - y0);
    err    = deltaX / 2;
    yStep  = y0 < y1 ? 1 : -1;
    y      = y0;
    for (var x = x0; x <= x1; x++) {
      isSteep ? write(y, x, world) : write(x, y, world);
      err -= deltaY;
      if (err < 0) {
        y   += yStep;
        err += deltaX;
      }
    }

    function steepSwap() {
      t = x0;
      x0 = y0
      y0 = t;
      t = x1;
      x1 = y1;
      y1 = t;
    }
}

var compute = {
  add : function(object, world, callback) {
    if (object && object.length) {
      for (var i = 0; i < object.length; i++) {
        addLine(object[i], world);
      }
    } else if (object) {
      addLine(object, world); 
    }
    callback();
  }
};

module.exports = compute;
