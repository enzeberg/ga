const ga = require('./ga.js');
const printElites = require('./print_elites');

// Problem 2: 求 f(x, y) = sin(x) + cos(2x) - sin(3y) + cos(4y), (0 <= x <= 2PI, 0 <= y <= 2PI,) 的最大值
const bounds = [
  {
    lower: 0,
    upper: 2 * Math.PI,
  },
  {
    lower: 0,
    upper: 2 * Math.PI,
  },
];
function fitnessFun(arr) {
  return Math.sin(arr[0]) + Math.cos(2 * arr[0]) -
         Math.sin(3 * arr[1]) + Math.cos(4 * arr[1]);
}
const elites = ga(30, 100, 0.5, 0.05, bounds, fitnessFun, 50);

printElites(elites, fitnessFun);