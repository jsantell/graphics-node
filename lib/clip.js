// Cohen-Sutherland
function clip(shapes, p0, p1) {
  var
    INSIDE = 0,
    LEFT   = 1,
    RIGHT  = 2,
    BOTTOM = 4,
    TOP    = 8,
    xMin = p0.x,
    yMin = p0.y,
    xMax = p1.x,
    yMax = p1.y;
  applyToGeometry(shapes, cohenSutherland);

  function cohenSutherland() {
    var
      x0 = +this.q.x,
      y0 = +this.q.y,
      x1 = +this.r.x,
      y1 = +this.r.y,
      p0Code = getOutCode(x0, y0),
      p1Code = getOutCode(x1, y1),
      accept = false,
      reject = false,
      outCode, x, y;
    while (!accept && !reject) {
      if (!(p0Code | p1Code)) { 
        accept = true; // Both points are in the view
      } else if (p0Code & p1Code) {
        reject = true; // Both points are outside of view
      } else {
        outCode = p0Code || p1Code;
        if ( outCode & TOP ) {
          x = x0 + (x1 - x0) * (yMax - y0) / (y1 - y0);
          y = yMax;
        } else if (outCode & BOTTOM) {
          x = x0 + (x1 - x0) * (yMin - y0) / (y1 - y0);
          y = yMin;
        } else if (outCode & RIGHT) {
          y = y0 + (y1 - y0) * (xMax - x0) / (x1 - x0);
          x = xMax;
        } else if (outCode & LEFT) {
          y = y0 + (y1 - y0) * (xMin - x0) / (x1 - x0);
          x = xMin;
        }

        if (outCode === p0Code) {
          x0 = x;
          y0 = y;
          p0Code = getOutCode(x0, y0);
        } else {
          x1 = x;
          y1 = y;
          p1Code = getOutCode(x1, y1);
        }
      }
    }
    if (accept) {
      this.q.x = x0;
      this.q.y = y0;
      this.r.x = x1;
      this.r.y = y1;
    }
  }

  function getOutCode(x, y) {
    var code = INSIDE;
    code |= x < xMin ? LEFT : ( x > xMax ? RIGHT : 0 );
    code |= y < yMin ? BOTTOM : ( y > yMax ? TOP : 0 );
    return code;
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

module.exports = clip;
