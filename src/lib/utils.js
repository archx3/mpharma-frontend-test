/**
 * @use for checking if a string value is empty
 * @param str
 * @returns {boolean}
 */
export const isEmpty = function (str) {
  return str === null || str === undefined ? true : /^[\s\xa0]*$/.test(str);
};

/**
 * @use for checking if a string value contains only numbers
 * @param str
 * @returns {boolean}
 */
export const isNumeric = function (str) {
  return !/[^0-9]/.test(str);
};
