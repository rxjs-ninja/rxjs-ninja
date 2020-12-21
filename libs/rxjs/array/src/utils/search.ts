/**
 * @packageDocumentation
 * @module Array
 */

/**
 * Binary searcher method
 * @param searchValue
 * @param searchArray
 * @param property
 * @private
 * @ignore
 */
export function binarySearcher<T extends unknown, K extends T | unknown>(
  searchValue: T,
  searchArray: K[],
  property?: string | number,
): number {
  let first = 0;
  let last = searchArray.length - 1;
  let position = -1;
  let found = false;
  let middle;

  while (!found && first <= last) {
    middle = Math.round((first + last) / 2);

    const checkValue =
      typeof property === 'number' || property ? (searchArray as never)[middle][property] : searchArray[middle];

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
