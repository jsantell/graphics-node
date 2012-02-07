// Math Library
var
  Euclid = require('./../Euclid'),
  $Line = Euclid.Line,
  $Polygon = Euclid.Polygon,
  $Point = Euclid.Point;

// Cohen-Sutherland
function clip(shapes, p0, p1) {
  var
    INSIDE = 0,
    LEFT   = 1,
    RIGHT  = 2,
    BOTTOM = 4,
    TOP    = 8,
    xMin = +p0.x,
    yMin = +p0.y,
    xMax = +p1.x,
    yMax = +p1.y,
    clipPoints = [
      new $Point(+p0.x, +p0.y),
      new $Point(+p1.x, +p0.y),
      new $Point(+p1.x, +p1.y),
      new $Point(+p0.x, +p1.y)
    ],
    typeCheck = [
      { object: $Line, func: clipLine },
      { object: $Polygon, func: clipPolygon }
    ];

  applyToGeometry(shapes);

  //Sutherland-Hodgman Algorithm
  function clipPolygon() {
    var
      outputPoints = this.points,
      clip1 = clipPoints[clipPoints.length - 1], clip2,
      inputPoints, p1, p2;
    clipPoints.forEach(function(clipPoint) {
      clip2 = clipPoint;
      inputPoints = outputPoints;
      outputPoints = [];
      p1 = inputPoints[inputPoints.length - 1];
      inputPoints.forEach(function(point) {
        p2 = point; 
        if (isInside(p2)) {
          if (!isInside(p1)) { outputPoints.push(intersection());  }
          outputPoints.push(p2);
        } else if (isInside(p1)) {
          outputPoints.push(intersection());
        }
        p1 = p2;
      });
      clip1 = clip2;
    });
    this.points = outputPoints;
    return true;

    function intersection() {
      var
        clipDeltaX = clip1.x - clip2.x,
        clipDeltaY = clip1.y - clip2.y,
        lineDeltaX = p1.x - p2.x,
        lineDeltaY = p1.y - p2.y,
        n1 = clip1.x * clip2.y - clip1.y * clip2.x,
        n2 = p1.x * p2.y - p1.y * p2.x,
        n3 = 1 / (clipDeltaX * lineDeltaY - clipDeltaY * lineDeltaX)
        return new $Point(
          (n1 * lineDeltaX - n2 * clipDeltaX) * n3,
          (n1 * lineDeltaY - n2 * clipDeltaY) * n3
        );
    }

    function isInside(p) {
      return (clip2.x - clip1.x) * (p.y - clip1.y) > (clip2.y - clip1.y) * (p.x - clip1.x);
    }
  }



  // Cohen-Sutherland Algorithm
  function clipLine() {
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
    return accept;
  }

  function getOutCode(x, y) {
    var code = INSIDE;
    code |= x < xMin ? LEFT : ( x > xMax ? RIGHT : 0 );
    code |= y < yMin ? BOTTOM : ( y > yMax ? TOP : 0 );
    return code;
  }

  function applyToGeometry(geometry) {
    if (geometry instanceof Array) {
      for (var i = 0; i < geometry.length; i++) {
        for (var j = 0; j < typeCheck.length; j++) {
          if (geometry[i] instanceof typeCheck[j].object) {
            if (!typeCheck[j].func.apply(geometry[i])) {
              geometry.splice(i, 1);
              i--;
            }
            break;
          }
        }
      }
      // dunno if this works TODO
    } else if (geometry) {
      for (var j = 0; j < typeCheck.length; j++) {
        if (geometry[i] instanceof typeCheck[j].object) {
          if (!typeCheck[j].func.apply(geometry)) {
            geometry.splice(i, 1);
            i--;
           }
          break;
        }
      }
    }
  }
};

module.exports = clip;
