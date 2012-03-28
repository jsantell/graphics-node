var config = {
  // Flags taken via CLI with their defaults
  defaultBg  : "#000000",
  defaultFg  : "#ffffff",
  parameters : {
    'screen' : {
      x0: 0,
      x1: 501,
      y0: 0,
      y1: 501
    },
    'f' : 'bound-lo-sphere.smf',
  
    'j' : 0,
    'k' : 0,
    'o' : 500,
    'p' : 500,

    //vrc
    'x' : 0.0,
    'y' : 0.0,
    'z' : 1.0,
    // negative vrc
    'a' : null,
    'b' : null,
    'c' : null,

    //vrp
    'X' : 0.0,
    'Y' : 0.0,
    'Z' : 0.0,
    //negative vrp
    'A' : null,
    'B' : null,
    'C' : null,

    // VPN
    'q' : 0.0,
    'r' : 0.0,
    'w' : -1.0,
    // negative VPN
    'd' : null,
    'e' : null,
    'g' : null,

    // vup
    'Q' : 0.0,
    'R' : 1.0,
    'W' : 0.0,
    // negative vup
    'D' : null,
    'E' : null,
    'G' : null,

    // vrc u,v,  u',v'
    'u' : -0.7,
    'v' : -0.7,
    'U' : 0.7,
    'V' : 0.7,
    // negative vrc
    'h' : null,
    'i' : null,
    'H' : null,
    'I' : null,
    'P' : 0 
  }
}

module.exports = config;
