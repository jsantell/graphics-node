var config = {
  // Flags taken via CLI with their defaults
  defaultBg  : "#ffffff",
  defaultFg  : "#000000",
  parameters : {
    'screen' : {
      x0: 0,
      x1: 500,
      y0: 0,
      y1: 500
    },
    'f' : 'samples/hw3_split.ps',
    'a' : 0,
    'b' : 0,
    'c' : 250, //499,
    'd' : 250, //499,
    's' : 1.0,
    'j' : 0,
    'k' : 0,
    'o' : 200,
    'p' : 200,
    'm' : 0,
    'n' : 0,
    'r' : 0,
    'x' : null, // used for negative translate-x values due to issue with Optimist parsing negative parameters
    'y' : null, // used for negative translate-y values due to issue with Optimist parsing negative parameters
    'z' : null // used for negative rotational values due to issue with Optimist parsing negative parameters
  }
}

module.exports = config;
