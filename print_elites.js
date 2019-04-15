function printElites(elites, fitnessFun) {
  for (let i = 0; i < elites.length; i++) {
    console.log('elite ', i, ': ', elites[i]);
    console.log('fitness: ', fitnessFun(elites[i]));
    console.log('\n')
  }
}

module.exports = printElites;