var config = {
  // Flags taken via CLI with their defaults
  defaultBg  : "#ffffff",
  defaultFg  : "#000000",
  parameters : {
    'f' : 'test.ps',
    'a' : 0,
    'b' : 0,
    'c' : 499, //499,
    'd' : 499, //499,
    's' : 1.0,
    'm' : 0,
    'n' : 0,
    'r' : 0,
    'z' : null // used for negative rotational values due to issue with Optimist parsing negative parameters
  }
}

module.exports = config;
