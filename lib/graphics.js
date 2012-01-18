// Math Library 
var
  Euclid = require('./../Euclid'),
  $L = Euclid.Line,
  $P = Euclid.Point;


// Graphics Library
var
  parser   = require('.parser.j'),
  world    = require('.world.js'),
  compute  = require('.render.js'),
  renderer = require('.out.js');

var 
  argv   = require('optimist').default({
    'f' : 'test.ps',
    'a' : 0,
    'b' : 0,
    'c' : 499, //499,
    'd' : 499, //499,
    's' : 1.0,
    'm' : 0,
    'n' : 0,
    'r' : 0
  }).argv,
  options = {
    'defaultColor' : '#ffffff',
    'inputFile'    : argv.f,
    'scale'        : argv.s,
    'rotation'     : argv.r,
    'translation'  : {
      'x' : argv.m,
      'y' : argv.n
    },
    'screen'       : {  
      'lower' : new $P(argv.a, argv.b),
      'upper' : new $P(argv.c, argv.d)
    }
  };

world.init(options.screen.lower, options.screen.upper, options.defaultColor); 
parser.parse(options.inputFile, function(parsedObjects) {
  compute.add(parsedObjects, world.data, function() {
    renderer.render(world, function(outputString) {
      process.stdout.write(outputString);
    });
  });
});
