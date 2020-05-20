/**
 * @packageDocumentation
 * @module array
 */

/**
 * Binary searcher method
 * @param searchValue
 * @param searchArray
 * @internal
 */
export function binarySearcher<T>(searchValue: T, searchArray: T[]) {
  let first = 0; //left endpoint
  let last = searchArray.length - 1; //right endpoint
  let position = -1;
  let found = false;
  let middle;

  while (!found && first <= last) {
    middle = Math.floor((first + last) / 2);
    if (searchArray[middle] == searchValue) {
      found = true;
      position = middle;
    } else if (searchArray[middle] > searchValue) {
      //if in lower half
      last = middle - 1;
    } else {
      //in in upper half
      first = middle + 1;
    }
  }
  return position;
}

export function defaultSearch<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
