// Math Library 
var
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;


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
    lower : new $P(argv.a, argv.b),
    upper : new $P(argv.c, argv.d)
  },
  transforms = {
    scale        : argv.s,
    rotation     : argv.z ? (argv.z * -1) : argv.r,
    translation  : {
      x : argv.m,
      y : argv.n
    },
  };

var
  shapes = [],
  pixels = [],
  world  = new $G.world(screen.lower, screen.upper);
//console.log(argv);
$G.parse(inputFile, function(parsedShapes) {
  shapes = parsedShapes;
// console.log('parsed'); 
  $G.transform.scale(shapes, transforms.scale, transforms.scale);
// console.log('scaled'); 
  $G.transform.rotate(shapes, transforms.rotation * Math.PI/180);
// console.log('rotated', transforms.rotation * Math.PI/180); 
  $G.transform.translate(shapes, transforms.translation.x, transforms.translation.y);
// console.log('translated'); 
  
  $G.clip(shapes, screen.lower, screen.upper);
// console.log('clipped'); 
  
  world = $G.draw(shapes, world, { defaultFg : defaultFg });
  $G.render(world, function(outputString) {
    process.stdout.write(outputString);
  });
});
