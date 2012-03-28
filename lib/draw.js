// TODO
// Add ability to pass in a world parameter to overwrite
var
  fs = require('fs'),
  Euclid = require('./../Euclid'),
  $Polygon = Euclid.Polygon,
  $Line = Euclid.Line,
  $Point = Euclid.Point;

function draw(shapes, world, o) {
  var options = o || {},
      defaultMark = options.defaultMark || "#000000";
  applyToGeometry(shapes, addLine, scanFill);
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
  
  function scanFill() {
    var
      edges = [],
      p2 = this.points[this.points.length - 1],
      maxY = world.y1,
      minX = world.x0,
      maxX = world.x1;
    //console.log(this.points);
    this.points.forEach(function(p) {
      if (p.x == p2.x && p.y == p2.y) { return; }
      edges.push(new $Line(p2, p));
      p2 = p;
    });

    for (var i = maxY; i >= world.y0; i--) {
      var points = getIntersects(i)
      points.sort(function(a,b) {
        return (a.x - b.x) //* -1
      });
//      if (points.length) { console.log(points) }
      var k = 0, parity=0, x=minX;
      while (k < points.length && x <= maxX) {
        if (x == points[k].x) {
          parity++;
          k++;
        } else if (parity%2) {
          write(x, i, points[k].z);
        }
        x++;
      }
    }

    function getIntersects(y) {
      var intersections = [];
      edges.forEach(function(edge) {
        var 
          m = (edge.q.y - edge.r.y) / (edge.q.x - edge.r.x),
          b = ((m*edge.q.x) - edge.q.y) * -1,
          ymax = edge.q.y > edge.r.y ? edge.q.y : edge.r.y,
          ymin = edge.q.y < edge.r.y ? edge.q.y : edge.r.y,
          xval = (y - b) / m;

        // Doesn't collide
        if (y <= ymin || y >= ymax) { return; }
        
        // Horizontal line TODO
        if (xval === Infinity || xval === -Infinity) {
          return;
        }
        
        if (isNaN(xval)) {
          // shouldn't happen
        }
        //console.log(edge, b, m); 
        intersections.push(new $Point(xval, y));
      });

      // If any points share an X value
      for(var j = 0; j < intersections.length; j++) {
        var total=0;
        intersections.forEach(function(i) {
          if (i.x == intersections[j].x) {
            total++;
          }
        });
        if (total > 1) {
          intersections.splice(j,1);
          j--;
        }
      }  
      return intersections;
    }
  }

  function write(x, y, z) {
    var
      maxX = world.data.length,
      maxY = world.data[0].length;
    x = parseInt(x, 10) - world.x0;
    y = parseInt(y, 10) - world.y0;
    _z = world.data[x][y];
    if ( _z < z ) world.data[x][y] = z;
  }


}



function applyToGeometry(geometry, func, polyFunc) {
  if (geometry instanceof Array) {
    for (var i = 0; i < geometry.length; i++) {
      if (geometry[i] instanceof $Line) { func.apply(geometry[i]); }
      if (geometry[i] instanceof $Polygon) {
        var polyPoints = geometry[i].points;
        polyPoints.forEach(function(p, index) {
          func.apply(new $Line(
            new $Point(polyPoints[index].x, polyPoints[index].y),
            new $Point(
              polyPoints[ polyPoints.length - 1 === index ? 0 : index+1].x,
              polyPoints[ polyPoints.length - 1 === index ? 0 : index+1].y
            )
          ))
        });
    //    polyFunc.apply(geometry[i]);
      }
    } 
  } else if (geometry) {
    func.apply(geometry, params); 
  }
}

module.exports = draw;
