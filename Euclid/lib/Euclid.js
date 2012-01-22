
var
  Point = require('./Point.js'),
  Line  = require('./Line.js');
  Matrix = require('./Matrix.js');
/*
  a = new Matrix([[2,3],[4,5]]);
b = new Matrix([[1,2,3],[4,5,6],[7,8,9]]);
console.log(Matrix.identity(2).multiply(a).elements);
console.log(Matrix.identity(3).multiply(b).elements);
console.log(Matrix.rotation(0).elements); 
*/
module.exports = {
    Point  : Point,
    Line   : Line,
    Matrix : Matrix
}
