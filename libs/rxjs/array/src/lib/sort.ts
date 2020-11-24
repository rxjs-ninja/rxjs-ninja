/**
 * @packageDocumentation
 * @module Array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortFn } from '../types/sort';
import { defaultSortFn } from '../utils/binary-search';

/**
 * The `sort` operator takes an array of `T` items and returns the array sorted.
 *
 * By default the operator can do basic quality check on `string`, `number` and `boolean` values,
 * and can take an optional method to do more complex searches for items such as array or objects
 *
 * @typeParam T The type of data in the input array
 *
 * @param fn Optional sorting function
 *
 * @example
 * ```ts
 * of([2, 4, 6, 1, 3, 5])
 *  .pipe(sort(), tap(console.log))
 *  .subscribe() [1, 2, 3, 4, 5, 6]
 * ```
 *
 * @example
 * ```ts
 *
 * function sortTuple(a, b) {
 *    if (a[1] === b[1]) return 0;
 *    return a[1] < b[1] ? -1 : 1;
 * }
 *
 * of([ [10, 2], [20, 4], [30, 6], [40, 1], [50, 3], [60, 5] ])
 * .pipe(sort(sortTuple), tap(console.log))
 * .subscribe() // [ [40, 1], [10, 2], [50, 3], [20, 4], [60, 5], [30, 6] ]
 * ```
 *
 * @returns Array of sorted values
 * @category RxJS Array Modify
 */
export function sort<T extends unknown>(fn?: SortFn): MonoTypeOperatorFunction<T[]> {
  const sortFn = fn || defaultSortFn;
  return (source: Observable<T[]>) => source.pipe(map((arr) => arr.sort((a, b) => sortFn(a, b))));
}
