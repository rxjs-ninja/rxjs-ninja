/**
 * @packageDocumentation
 * @module array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { binarySearcher, defaultSort } from '../utils/binary-search';
import { ArraySearchResult, SortFn } from '../types/binary-search';

/**
 * The `binarySearch` operator takes an Observable array of values T and returns a [[ArraySearchResult]]
 * containing the original array, search value and index of the search value.
 *
 * The default sorting method for this search is a basic quality check, if you need more complex sorting such as
 * objects you can pass a sorting method and additional property to search on
 *
 * @typeParam T The type in the array to search over
 * @typeParam K The type of value in array item to search
 *
 * @param searchValue The value to search for in the source array
 *
 * @example
 * ```ts
 * of([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
 *  .pipe(binarySearch(5), take(1))
 *  .subscribe(console.log) // { searchValue: 5, searchArray: [1, 2, 3,...], index: 4}
 * ```
 *
 * @returns [[ArraySearchResult]] containing the sorted array, search value and index
 * @category RxJS Array Search
 */
function binarySearch<T, K>(searchValue: K): OperatorFunction<T | T[], ArraySearchResult>;
/**
 * @param searchValue The value to search for in the source array
 * @param sort Optional sort method for sorting more complex types
 * @param property Optional property to be searched on in more complex objects
 *
 * @remarks
 * When using an additional property, if it's a number the underlying T[] is assumed
 * to be an array. If you have an object with a number property, use a string value
 * instead (e.g. `'5'` instead of `5`)
 *
 * @example
 * ```ts
 * const sort = (a: { val: number }, b: { val: number }) => {
 *  if (a.val === b.val) return 0;
 *  return a.val < b.val ? -1 : 1;
 * };
 *
 * of([
 *  { val: 1 }, { val: 4 }, { val: 7 }, { val: 2 }, { val: 5 },
 *  { val: 6 }, { val: 3 }, { val: 8 }, { val: 10 }, { val: 9}
 * ])
 *  .pipe(binarySearch<{ val: number }, number>(5, sort, 'val'), take(1))
 *  .subscribe(console.log)
 *  // { searchValue: 5, searchArray: [{ val: 1 }, { val: 2}, { val: 3 },...], index: 4}
 * ```
 *
 * @returns [[ArraySearchResult]] containing the sorted array, search value and index
 * @category RxJS Array Search
 */
function binarySearch<T, K>(searchValue: K, sort: SortFn, property: string | number): OperatorFunction<T | T[], ArraySearchResult>;
/**
 * @param searchValue The value to search for in the source array
 *
 * @example
 * ```ts
 * from([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
 *  .pipe(binarySearch(5), take(1))
 *  .subscribe(console.log) // { searchValue: 5, searchArray: [1, 2, 3,...], index: 4}
 * ```
 *
 * @returns [[ArraySearchResult]] containing the sorted array, search value and index
 * @category RxJS Array Search
 */
function binarySearch<T, K>(searchValue: K[]): OperatorFunction<T | T[], ArraySearchResult>;
/**
 * @param searchValue The value to search for in the source array
 * @param sort Optional sort method for sorting more complex types
 * @param property Optional property to be searched on in more complex objects
 *
 * @remarks
 * When using an additional property, if it's a number the underlying T[] is assumed
 * to be an array. If you have an object with a number property, use a string value
 * instead (e.g. `'5'` instead of `5`)
 *
 * @example
 * ```ts
 * const sort = (a: [number, number], b: [number, number]) => {
 *  if (a[1] === b[1]) return 0;
 *  return a[1] < b[1] ? -1 : 1;
 * };
 *
 * from<[number, number][]>([
 *  [1, 1], [2, 4], [3, 7], [4, 2], [5, 5],
 *  [6, 6], [7, 3], [8, 8], [9, 10], [10, 9]
 * ])
 *  .pipe(binarySearch<[number, number], number>(5, sort, 1), take(1))
 *  .subscribe(console.log)
 *  // { searchValue: 5, searchArray: [[1, 1], [4, 2], [7, 3],...], index: 4}
 * ```
 *
 * @returns [[ArraySearchResult]] containing the sorted array, search value and index
 * @category RxJS Array Search
 */
function binarySearch<T, K>(searchValue: K[], sort: SortFn, property: string | number): OperatorFunction<T | T[], ArraySearchResult>;
function binarySearch<T, K>(searchValue: K | K[], sort?: SortFn, property?: string | number): OperatorFunction<T | T[], ArraySearchResult> {
  const sortFn = sort ? sort : defaultSort;

  return (source: Observable<T | T[]>) =>
    source.pipe(
      reduce<T, K[]>(
        (acc, val) => (Array.isArray(val) ? (property && typeof property === 'number' ? [...acc, val] : [...acc, ...val]) : [...acc, val]),
        [],
      ),
      map((accArray) => accArray.sort(sortFn)),
      map((sortedArray) => ({
        searchValue: searchValue,
        searchArray: sortedArray,
        index: binarySearcher(searchValue, sortedArray, property),
      })),
    );
}

export { binarySearch };
