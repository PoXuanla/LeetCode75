/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const maxCount = Math.max(...candies);
  return candies.reduce((acc, curr) => {
    return acc.concat(curr + extraCandies >= maxCount ? true : false);
  }, []);
};
