const ga = require('./ga.js');
const printElites = require('./print_elites');

// Problem 3: 求 f(x) = x^2 + sin(x) + cos(x), (-5 <= x <= 5) 的最大值
const bounds = [
  {
    lower: -5,
    upper: 5,
  },
];
function fitnessFun(arr) {
  return Math.pow(arr[0], 2) + Math.sin(arr[0]) + Math.cos(arr[0]);
}
const elites = ga(30, 100, 0.5, 0.05, bounds, fitnessFun, 50);

printElites(elites, fitnessFun);