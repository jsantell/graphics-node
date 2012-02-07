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
  world     : require('./world.js'),
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
  screen = {
    lower : new $Point(argv.a, argv.b),
    upper : new $Point(argv.c, argv.d)
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
  world  = new $G.world(screen.lower, screen.upper);
$G.parse(inputFile, function(parsedShapes) {
  shapes = parsedShapes;

  $G.transform.scale(shapes, transforms.scale, transforms.scale);
  $G.transform.rotate(shapes, transforms.rotation * Math.PI/180);
  $G.transform.translate(shapes, transforms.translation.x, transforms.translation.y);

  $G.clip(shapes, screen.lower, screen.upper);

  world = $G.draw(shapes, world, { defaultFg : defaultFg });
  $G.render(world, function(outputString) {
    process.stdout.write(outputString);
  });
});
