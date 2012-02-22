// Math Library
var
  Euclid = require('./../Euclid'),
  $Line = Euclid.Line,
  $Polygon = Euclid.Polygon,
  $Point = Euclid.Point;


// Graphics Library
var $G = {
  parse     : require('./parse.js'),
  transform : require('./transform.js'),
  screen     : require('./screen.js'),
  clip      : require('./clip.js'),
  draw      : require('./draw.js'),
  render    : require('./render.js')
},
  config = require('./config.js');

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
    lower: new $Point(argv.a, argv.b),
    upper: new $Point(argv.c, argv.d)
  },
  viewport = {
    lower: new $Point(argv.j, argv.k),
    upper: new $Point(argv.o, argv.p)
  },
  transforms = {
    scale        : argv.s,
    rotation     : argv.z ? (argv.z * -1) : argv.r,
    translation  : {
      x : argv.x ? (argv.x * -1) : argv.m,
      y : argv.y ? (argv.y * -1) : argv.n
    },
  };

var
  shapes = [],
  pixels = [],
  screen  = new $G.screen(boundaries.lower, boundaries.upper);
$G.parse(inputFile, function(parsedShapes) {
  shapes = parsedShapes;

  $G.transform.scale(shapes, transforms.scale, transforms.scale);
  $G.transform.rotate(shapes, transforms.rotation * Math.PI/180);
  $G.transform.translate(shapes, transforms.translation.x, transforms.translation.y);

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
