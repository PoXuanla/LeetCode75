/**
 * @description 解題思路
 * 1. 找到兩字串各自的最小組成單位及數量
 * 2. 兩字串組成單位不一致代表沒有最大公因，回傳 ""
 * 3. 算出數量的最大公因
 * 4. 答案 ＝ 組成單位 * 最大公因數
 */

/**
 * @description To find the greatest common divisor (GCD) of two numbers
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
const gcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

/**
 * @typedef {Object} composeInform
 * @property {string} composeUnit - Smallest unit of a stirng 
 * @property {number} count - Ｈow many units can compose a string
 */

/**
 * @param {string} inputStr
 * @returns {composeInform}
 */
const findComposeOf = (inputStr) => {
  let count = 1;
  while (count <= inputStr.length / 2) {
    const composeUnit = inputStr.substring(0, count);
    if (composeUnit.repeat(inputStr.length / count) === inputStr)
      return { composeUnit, count: inputStr.length / count };
    count++;
  }
  return { composeUnit:inputStr, count: 1 };
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string} 
 */
var gcdOfStrings = (s1, s2) => {
  const { composeUnit: unit1, count: count1 } = findComposeOf(s1);
  const { composeUnit: unit2, count: count2 } = findComposeOf(s2);
  if (unit1 !== unit2) return "";
  const maxCount = Math.max(count1, count2);
  const minCount = Math.min(count1, count2);
  return unit1.repeat(gcd(maxCount, minCount));
};
