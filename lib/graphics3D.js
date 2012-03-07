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

var
  argv = require('optimist').default(config.parameters).argv,
  defaultBg = config.defaultBg || "#ffffff",
  defaultFg = config.defaultFg || "#000000",
  inputFile = argv.f,
  boundaries = {
    lower : new $Point(argv.screen.x0, argv.screen.y0),
    upper : new $Point(argv.screen.x1, argv.screen.y1)
  },
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
  viewport = {
    lower: new $Point(argv.u, argv.v),
    upper: new $Point(argv.U, argv.V)
  },
  perspective = !argv.P,
  front = 0.6,
  back = -0.6;

var
  shapes = [],
  pixels = [],
  matrixNormal,
  screen  = new $G.screen(boundaries.lower, boundaries.upper);
$G.parse(inputFile, function(parsedShapes) {
  shapes = parsedShapes;
console.log(shapes);
  if (perspective) {
    matrixNormal = Matrix.normalizePerspective(vrp, vpn, vup, prp, viewport.lower, viewport.upper, front, back);
    $G.transform.matrixTransform(shapes, matrixNormal)
    $G.transform.perspectiveProjection(shapes, d);
  } else {
    matrixNormal = Matrix.normalizeParallel(vrp, vpn, vup, prp, viewport.lower, viewport.upper, front, back);
    $G.transform.matrixTransform(matrixNormal)
    $G.transform.orthogonalProjection(shapes);
  }

  // Viewport
  $G.transform.translate(shapes, -world.lower.x, -world.lower.y);
  $G.transform.scale(shapes,
    (viewport.upper.x - viewport.lower.x) / (world.upper.x - world.lower.x), 
    (viewport.upper.y - viewport.lower.y) / (world.upper.y - world.lower.y)
  )
  //$G.transform.translate(shapes, world.lower.x, world.lower.y);
  $G.transform.translate(shapes, viewport.lower.x, viewport.lower.y);

  $G.clip(shapes, viewport.lower, viewport.upper);

  screen = $G.draw(shapes, screen, { defaultFg : defaultFg });
  $G.render(screen, function(outputString) {
    process.stdout.write(outputString);
  });
});
