
function rotate(shape, degrees) {
  shape.rotate(degrees);
}

function scale(shape, x, y) {
  shape.scale(x, y);
}

function translate(shape, x, y) {
  shape.translate(x, y);
}

var transform = {
  rotate : function(shapes, degrees) {
    if (shapes && shapes.length) {
      for (var i = 0; i < shapes.length; i++) {
        rotate(shapes[i], degrees);
      } 
    } else if (shapes) {
      rotate(shapes, degrees);
    }
  },
  scale : function(shapes, x, y) {
    if (shapes && shapes.length) {
      for (var i = 0; i < shapes.length; i++) {
        scale(shapes[i], x, y);
      } 
    } else if (shapes) {
      scale(shapes, x, y);
    }
  },
  translate : function(shapes, x, y) {
    if (shapes && shapes.length) {
      for (var i = 0; i < shapes.length; i++) {
        translate(shapes[i], x, y);
      } 
    } else if (shapes) {
      translate(shapes, x, y);
    }
  }
}

module.exports = transform;
