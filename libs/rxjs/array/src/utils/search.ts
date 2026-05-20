/**
 * @packageDocumentation
 * @module Array
 */

type Comparable = string | number | bigint;

function extractComparable<K extends unknown>(item: K, property?: string | number): Comparable | undefined {
  const raw =
    property === undefined || property === ''
      ? item
      : (item as Record<string | number, unknown>)[property];

  if (typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'bigint') {
    return raw;
  }

  return undefined;
}

/**
 * Binary searcher method
 * @param searchValue
 * @param searchArray
 * @param property
 * @private
 * @ignore
 */
export function binarySearcher<T extends Comparable, K extends unknown>(
  searchValue: T,
  searchArray: K[],
  property?: string | number,
): number {
  let first = 0;
  let last = searchArray.length - 1;
  let position = -1;
  let found = false;
  let middle: number;

  while (!found && first <= last) {
    middle = Math.round((first + last) / 2);

    const checkValue = extractComparable(searchArray[middle], property);

    if (checkValue === undefined) {
      first = middle + 1;
      continue;
    }

    if (checkValue == searchValue) {
      found = true;
      position = middle;
    } else if (checkValue > searchValue) {
      last = middle - 1;
    } else {
      first = middle + 1;
    }
  }
  return position;
}
