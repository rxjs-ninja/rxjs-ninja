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
 * Default sort method that provides a number value of comparison order
 * @private
 * @param first The first comparison parameter
 * @param second The second comparison parameter
 *
 * @returns Number related to the sort order of two comparison parameters
 */
export function defaultSort<T>(first: T, second: T): number {
  if (typeof first === 'string') {
    return first.localeCompare((second as unknown) as string);
  }
  if (first === second) return 0;
  return first < second ? -1 : 1;
}
