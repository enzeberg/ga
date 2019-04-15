/** 
* @param {number} initialPopulationSize: 初始种群规模
* @param {number} generationLimit: 最大遗传代数
* @param {number} crossoverRate: 交叉概率
* @param {number} mutationRate: 变异概率
* @param {[]} bounds: 每个基因取值的约束范围
* @param {function} fitnessFun: 适应度函数
* @param {number} targetFitness: 目标适应度，若进化过程中种群达到此适应度，可提前终止进化
* @return {[]} elites
*/

function ga(initialPopulationSize, generationLimit, crossoverRate,
            mutationRate, bounds, fitnessFun, targetFitness) {
  const variableNum = bounds.length; // 每个个体的基因数
  let population = [];
  const elites = [];

  // 种群初始化
  for (let i = 0; i < initialPopulationSize; i++) {
    let individual = [];
    for (let j = 0; j < variableNum; j++) {
      individual.push(
        bounds[j].lower + Math.random() * (bounds[j].upper - bounds[j].lower)
      );
    }
    population.push(individual);
  }
  // console.log(population)

  // 进化过程
  for (let generation = 0; generation < generationLimit; generation++) {
    
    // 将种群内的个体按照适应度大小降序排序，便于淘汰和选择
    population.sort((first, second) => fitnessFun(second) - fitnessFun(first));
    console.log('generation ', generation);
    console.log('sorted population: \n', population);
    console.log('\n\n');
    elites.push((population[0]).slice()); // 记录每一代中最好的个体
    if (fitnessFun(population[0]) > targetFitness) break;

    // 按照交叉概率淘汰，保留要发生交叉的个体
    population.splice(population.length * crossoverRate);

    // 交叉
    const children = [];
    for (let i = 0; i < population.length; i += 2) {
      let father = population[i];
      if (!population[i + 1]) break; // parent 不够了
      let mother = population[i + 1];
      // 交叉位置。若有索引分别为 0、1、2、3 的 4 个基因，则交叉位置为 1 或 2 或 3
      let crossoverPosition = Math.floor(1 + Math.random() * (variableNum - 1));
      let fatherSegmentA = father.slice(0, crossoverPosition);
      let fatherSegmentB = father.slice(crossoverPosition);
      let motherSegmentA = mother.slice(0, crossoverPosition);
      let motherSegmentB = mother.slice(crossoverPosition);
      let childA = fatherSegmentA.concat(motherSegmentB);
      let childB = motherSegmentA.concat(fatherSegmentB);
      children.push(childA);
      children.push(childB);
    }

    // 旧个体与子代组成新种群
    population = population.concat(children);

    // 变异。
    const populationSize = population.length; // 种群规模不一定保持不变
    const totalGenes = populationSize * variableNum; // 种群的基因总数
    for (let i = 0; i < totalGenes * mutationRate; i++) {
      let whichIndividual =
        Math.floor(Math.random() * (populationSize - 1)) + 1; // 精英不发生变异
      let whichGene = Math.floor(Math.random() * variableNum);
      population[whichIndividual][whichGene] =
        bounds[whichGene].lower +
        Math.random() * (bounds[whichGene].upper - bounds[whichGene].lower);
    }
  }
  return elites;
}

module.exports = ga;
