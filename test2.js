const ga = require('./ga.js');
const printElites = require('./print_elites');

// Problem 3: 求 f(x) = x + sin(x) + cos(x), (0 <= x <= 10) 的最大值
const bounds = [
  {
    lower: 0,
    upper: 10,
  },
];
function fitnessFun(arr) {
  return arr[0] + Math.sin(arr[0]) + Math.cos(arr[0]);
}
const elites = ga(30, 100, 0.5, 0.05, bounds, fitnessFun, 50);

printElites(elites, fitnessFun);