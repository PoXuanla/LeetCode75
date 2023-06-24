/**
 * 解題思路
 * 1. 標註出無法種植的土地
 * 2. 算出每個連續可種植花朵的土地最大種花數量
 * 3. 連續能種植的土地最大種花數量公式（ n = 連續土地數量）
 *    奇數 : n / 2 + 1
 *    偶數 : n / 2
 * 4. 加總所有可種花數量
 */

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  const plantedPlot = calcUnavailablePlantedPlot(flowerbed);
  const count = calcMaxPlantedFlowersCount(plantedPlot);
  return count >= n;
};

/**
 * @description Set the unavailable planted plot to -1
 * @param {array.<number>} flowerbed
 */
const calcUnavailablePlantedPlot = (flowerbed) => {
  return flowerbed.reduce(
    (acc, curr, index, currArray) => {
      if (acc[index] === 0 || acc[index] === -1) return acc;

      const prevIndex = index - 1;
      const nextIndex = index + 1;

      if (prevIndex >= 0) acc[prevIndex] = -1;
      if (nextIndex < currArray.length) {
        acc[nextIndex] = acc[nextIndex] === 1 ? 1 : -1;
      }

      return acc;
    },
    [...flowerbed]
  );
};
/**
 * @description
 * Sum up the maximum number of flowers that can be planted in all contiguous available land plots.
 * @param {array.<number>} flowerbed
 * @returns
 */
const calcMaxPlantedFlowersCount = (flowerbed) => {
  let emptyPlotCount = 0;

  const getPlotMaxPlantedQuantity = (n) =>
    n % 2 === 0 ? n / 2 : Math.floor(n / 2) + 1;

  return flowerbed.reduce((acc, curr, currIndex) => {
    const AT_THE_END = currIndex === flowerbed.length - 1;

    if (curr === 0 && AT_THE_END) {
      emptyPlotCount++;
      acc += getPlotMaxPlantedQuantity(emptyPlotCount);
    } else if (curr === 0) {
      emptyPlotCount++;
    } else {
      if (emptyPlotCount === 0) return acc;
      acc += getPlotMaxPlantedQuantity(emptyPlotCount);
      emptyPlotCount = 0;
    }
    return acc;
  }, 0);
};

console.log(calcMaxPlantedFlowersCount([0, 0, 0, 0, 0]));
