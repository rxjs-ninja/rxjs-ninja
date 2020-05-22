/**
 * @packageDocumentation
 * @module array
 */

/**
 * Binary searcher method
 * @param searchValue
 * @param searchArray
 * @private
 * @internal
 */
export function binarySearcher<T, K>(searchValue: T, searchArray: T[], property?: string | number) {
  let first = 0; //left endpoint
  let last = searchArray.length - 1; //right endpoint
  let position = -1;
  let found = false;
  let middle;

  while (!found && first <= last) {
    middle = Math.floor((first + last) / 2);
    const checkValue = property ? searchArray[middle][property] : searchArray[middle];
    if (checkValue == searchValue) {
      found = true;
      position = middle;
    } else if (checkValue > searchValue) {
      //if in lower half
      last = middle - 1;
    } else {
      //in in upper half
      first = middle + 1;
    }
  }
  return position;
}

/**
 * @private
 * @param a
 * @param b
 */
export function defaultSearch<T>(a: T, b: T): number {
  if (typeof a === 'string') {
    return a.localeCompare(b as never);
  }
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
