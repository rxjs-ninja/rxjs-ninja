/**
 * @packageDocumentation
 * @module Array
 */

/**
 * The return tuple of the [[binarySearch]] method containing the index of the value in the array,
 * the original search value and a sorted array of the values
 *
 * @typeParam T Type of items in the array
 */
export type BinarySearchResult<T extends unknown, K extends unknown> = [
  index: number,
  searchValue: T,
  searchArray: K[],
  sortedArray: K[],
];
