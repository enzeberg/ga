const ga = require('./ga.js');

// Problem 1: 求 f(x, y) = sin(x) + cos(y), (0 <= x <= 2PI, 0 <= y <= 2PI,) 的最大值
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
  return Math.sin(arr[0]) + Math.cos(arr[1]);
}
const elites = ga(30, 100, 0.5, 0.03, bounds, fitnessFun, 1.99);

for (let i = 0; i < elites.length; i++) {
  console.log('elite ', i, ': ', elites[i]);
  console.log('  fitness: ', fitnessFun(elites[i]));
  console.log('\n')
}