// Math Library
var
  Euclid = require('./../Euclid'),
  $Line = Euclid.Line,
  $Polygon = Euclid.Polygon,
  $Vector = Euclid.Vector,
  $Matrix = Euclid.Matrix,
  $Point = Euclid.Point;


// Graphics Library
var $G = {
  parse     : require('./parsesmf.js'),
  transform : require('./transform.js'),
  screen     : require('./screen.js'),
  clip      : require('./clip.js'),
  draw      : require('./draw.js'),
  render    : require('./render.js')
},
  config = require('./config3D.js');

var argv = require('optimist').default(config.parameters).argv;
fixNegativeValues(argv);
var
  defaultBg = config.defaultBg || "#ffffff",
  defaultFg = config.defaultFg || "#000000",
  inputFile = argv.f,
  world = {
    lower : new $Point(argv.screen.x0, argv.screen.y0),
    upper : new $Point(argv.screen.x1, argv.screen.y1)
  },
  viewport = {
    lower: new $Point(argv.j, argv.k),
    upper: new $Point(argv.o, argv.p)
  },
  prp = new $Vector(argv.x, argv.y, argv.z),
  vrp = new $Vector(argv.X, argv.Y, argv.Z),
  vpn = new $Vector(argv.q, argv.r, argv.w),
  vup = new $Vector(argv.Q, argv.R, argv.W),
  vrcWindow = {
    lower: new $Point(argv.u, argv.v),
    upper: new $Point(argv.U, argv.V)
  },
  perspective = !argv.P,
  front = 1,
  back = -5,
  d = -1;

var
  shapes = [],
  pixels = [],
  matrixNormal,
  screen  = new $G.screen(world.lower, world.upper);
$G.parse(inputFile, function(parsedShapes) {
  shapes = parsedShapes;

  if (perspective) {
    matrixNormal = Matrix.normalizePerspective(vrp, vpn, vup, prp, vrcWindow.lower, vrcWindow.upper, front, back);
    log(matrixNormal);
    matrixNormal = $Matrix.perspective(d).multiply(matrixNormal);
    $G.transform.matrixTransform(shapes, matrixNormal);
  } else {
    matrixNormal = Matrix.normalizeParallel(vrp, vpn, vup, prp, vrcWindow.lower, vrcWindow.upper, front, back);
    log(matrixNormal);
    matrixNormal = $Matrix.orthographic().multiply(matrixNormal);
    $G.transform.matrixTransform(shapes, matrixNormal);
  }
  $G.transform.translate(shapes, 1, 1); 
  $G.transform.scale(shapes, 
    ( viewport.upper.x - viewport.lower.x ) / 2,
    ( viewport.upper.y - viewport.lower.y ) / 2
  );
  $G.transform.translate(shapes, viewport.lower.x, viewport.lower.y);
  
  // Viewport
  /*$G.transform.translate(shapes, -world.lower.x, -world.lower.y);
  $G.transform.scale(shapes,
    (viewport.upper.x - viewport.lower.x) / (world.upper.x - world.lower.x), 
    (viewport.upper.y - viewport.lower.y) / (world.upper.y - world.lower.y)
  )
  $G.transform.translate(shapes, viewport.lower.x, viewport.lower.y);
*/
  $G.clip(shapes, viewport.lower, viewport.upper);

  screen = $G.draw(shapes, screen, { defaultFg : defaultFg });
  $G.render(screen, function(outputString) {
    process.stdout.write(outputString);
  });
});

function printShapes() {
  shapes.forEach(function(shape) {
    console.log(shape.points);
  });
}

function fixNegativeValues(argv) {
  var fix = [
    ['x', 'a'],
    ['y', 'b'],
    ['z', 'c'],
    ['X', 'A'],
    ['Y', 'B'],
    ['Z', 'C'],
    ['q', 'd'],
    ['r', 'e'],
    ['w', 'g'],
    ['Q', 'D'],
    ['R', 'E'],
    ['W', 'G'],
    ['u', 'h'],
    ['v', 'i'],
    ['U', 'H'],
    ['V', 'I']
  ];
  fix.forEach(function(pair) {
    if ( argv[ pair[1] ] !== null ) {
      argv[ pair[0] ] = argv[ pair[1] ] * -1;
    }
  });
}

function log(s) {
  console.log('/*');
  console.log(s);
  console.log('*/');
}
