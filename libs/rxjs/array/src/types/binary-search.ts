/**
 * @packageDocumentation
 * @module Array
 */

/**
 * The return value of the [[binarySearch]] operator, contains in order
 *
 * - The index of the found item, or `-1` if not found
 * - The value that was passed for search
 * - The sorted `Array` used for searching
 * - The original `Array` unsorted
 *
 * @typeParam T The type of the value being searched for
 * @typeParam K The type of value in the search array
 */
export type BinarySearchResult<T extends unknown, K extends unknown> = [
  /**
   * Index of the first found result in the sorted array
   */
  index: number,
  /**
   * The value that was searched for in the array
   */
  searchValue: T,
  /**
   * The sorted array of values
   */
  sortedArray: K[],
  /**
   * The original unsorted array
   */
  searchArray: K[],
];
