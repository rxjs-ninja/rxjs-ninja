/**
 * @packageDocumentation
 * @module array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { binarySearcher, defaultSortFn } from '../utils/binary-search';
import { BinarySearchResult } from '../types/binary-search';
import { SortFn } from '../types/sort';

/**
 * The `binarySearch` operator takes an Observable array of values T and returns a [[BinarySearchResult]]
 * containing the sorted array, search value and index of the search value.
 *
 * The default sorting method for this search is a basic quality check, if you need more complex sorting such as
 * objects you can pass a sorting method and additional property to search on
 *
 * @typeParam T The type in the array to search over
 * @typeParam K The type of the value in array item to search
 *
 * @param searchValue The value to search for in the source array
 * @param sort Optional sort method for sorting more complex types
 * @param property Optional property to be searched on, use a number for array index and strings for object keys
 *
 * @remarks
 * When using an additional property, if it's a number the underlying T[] is assumed
 * to be an array. If you have an object with a number property, use a string value
 * instead (e.g. `'5'` instead of `5`)
 *
 * @example
 * ```ts
 * of([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
 *  .pipe(binarySearch(5), take(1))
 *  .subscribe(console.log) // [4, 5, [1, 2, 3,...]]
 * ```
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
 *  // [4, 5, [{ val: 1 }, { val: 2}, { val: 3 },...]]
 * ```
 *
 * @example
 * ```ts
 * from([1, 4, 7, 2, 5, 6, 3, 8, 10, 9])
 *  .pipe(binarySearch(5), take(1))
 *  .subscribe(console.log) // [4, 5, [1, 2, 3,...]]
 * ```
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
 *  // [4, 5, [[1, 1], [4, 2], [7, 3],...]]
 * ```
 *
 * @returns [[BinarySearchResult]] containing the sorted array, search value and index
 * @category RxJS Array Search
 */
export function binarySearch<T = unknown, K = unknown>(
  searchValue: K | K[],
  sort?: SortFn,
  property?: string | number,
): OperatorFunction<T | T[], BinarySearchResult> {
  const sortFn = sort ? sort : defaultSortFn;

  return (source: Observable<T | T[]>) =>
    source.pipe(
      reduce((acc, val) => {
        if (Array.isArray(val)) {
          return [...acc, ...val] as K[];
        } else {
          return [...acc, val] as K[];
        }
      }, [] as K[]),
      map((accArray: K[]) => [...accArray].sort(sortFn)),
      map((sortedArray: K[]) => [binarySearcher(searchValue, sortedArray, property), searchValue, sortedArray]),
    );
}
