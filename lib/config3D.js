var config = {
  // Flags taken via CLI with their defaults
  defaultBg  : "#ffffff",
  defaultFg  : "#000000",
  parameters : {
    'screen' : {
      x0: 0,
      x1: 501,
      y0: 0,
      y1: 5001
    },
    'f' : 'samples/octahedron.smf',
    
    //vrc
    'x' : 0.0,
    'y' : 0.0,
    'z' : 1.0,

    //vrp
    'X' : 0.0,
    'Y' : 0.0,
    'Z' : 0.0,
    
    // VPN
    'q' : 0.0,
    'r' : 0.0,
    'w' : -1.0,

    // vup
    'Q' : 0.0,
    'R' : 1.0,
    'W' : 0.0,

    // vrc u,v,  u',v'
    'u' : -0.7,
    'v' : -0.7,
    'U' : 0.7,
    'V' : 0.7,

    'P' : 0 
  }
}

module.exports = config;
