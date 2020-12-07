/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { binarySearcher, defaultSortFn } from '../utils/binary-search';
import { BinarySearchResult } from '../types/binary-search';
import { SortFn } from '../types/generic-methods';

/**
 * Returns an Observable that containers a [[BinarySearchResult]] returns. The source Observable should provide an array
 * of values to search, the array is sorted and searched for the value.
 *
 * @typeParam T The type in the incoming Observable array
 * @typeParam K The type of value in array item to search for
 *
 * @param searchValue The value to search for in the source array
 * @param sortFn Optional sort method for sorting more complex types
 * @param property Optional property of them item to return, for Array use an index number and for an object use a string key
 *
 * @remarks
 * When using an additional property, if it's a number the underlying T[] is assumed
 * to be an array. If you have an object with a number property, use a string value
 * instead (e.g. `'5'` instead of `5`)
 *
 * @example
 * ```ts
 * const input = [1, 4, 7, 2, 5, 6, 3, 8, 10, 9];
 * of(input).pipe(binarySearch(5)).subscribe();
 * // <BinarySearchResult>[4, 5, [...searchArray], [...sortedArray]]
 * ```
 *
 * @example
 * ```ts
 * const input = [
 *  { val: 1 }, { val: 4 }, { val: 7 }, { val: 2 }, { val: 5 },
 *  { val: 6 }, { val: 3 }, { val: 8 }, { val: 10 }, { val: 9}
 * ];
 * const sortObj = (a:, b) => {
 *  if (a.val === b.val) return 0;
 *  return a.val < b.val ? -1 : 1;
 * };
 * of(input).pipe(binarySearch(5, sortObj, 'val')).subscribe();
 * // <BinarySearchResult>[4, 5, [...searchArray], [...sortedArray]]
 * ```
 *
 * @example
 * ```ts
 * const input = [
 *  [1, 1], [2, 4], [3, 7], [4, 2], [5, 5],
 *  [6, 6], [7, 3], [8, 8], [9, 10], [10, 9]
 * ];
 * const sortArray = (a: [number, number], b: [number, number]) => {
 *  if (a[1] === b[1]) return 0;
 *  return a[1] < b[1] ? -1 : 1;
 * };
 * from(input).pipe(binarySearch(5, sortArray, 1)).subscribe();
 * // <BinarySearchResult>[4, 5, [...searchArray], [...sortedArray]]
 * ```
 *
 * @returns An Observable that emits a [[BinarySearchResult]]
 * @category Array Search
 */
export function binarySearch<T extends unknown, K extends T | unknown>(
  searchValue: T,
  sortFn?: SortFn<K>,
  property?: string | number,
): OperatorFunction<K[], BinarySearchResult<T, K>> {
  return (source: Observable<K[]>) =>
    source.pipe(
      map((accArray) => [accArray, [...accArray].sort(sortFn || defaultSortFn)]),
      map(([searchArray, sortedArray]) => [
        binarySearcher(searchValue, sortedArray, property),
        searchValue,
        searchArray,
        sortedArray,
      ]),
    );
}
