/**
 * @packageDocumentation
 * @module array
 */

/**
 * The return type for an Array search result, contains the search
 * value, the search array and the index of the search result
 *
 * @typeParam T Type of array items
 */
export interface ArraySearchResult<T = unknown> {
  /**
   * The search value of type T
   */
  searchValue: T;
  /**
   * The array of values of type T
   */
  searchArray: T[];
  /**
   * The index of search value in the array, if `-1` the item has not been found
   */
  index: number;
}

/**
 * Method used to sort an Array of values
 *
 * @typeParam T The Type of the value to sort
 *
 * @param first The first value to compare
 * @param second The second value to compare
 *
 * @example
 * ```ts
 * const sortFn<string> = (first: string, second: string) => first.localCompare(second)
 * ```
 *
 * @returns A number that represents the value match position for sorting
 */
export type SortFn<T = unknown> = (first: T, second: T) => number;
