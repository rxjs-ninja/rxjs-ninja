/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultSortFn } from '../utils/sort';
import { SortFn } from '../types/generic-methods';

/**
 * Returns an Observable that emits an array of sorted values from the source Array or Set using the [[SortFn]]
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param sortFn Optional [[SortFn]] used to sort the array, if not provided the `defaultSortFn` is used.
 *
 * @example
 * Returns a sorted array of numbers
 * ```ts
 * const input = [2, 4, 6, 1, 3, 5];
 * of(input).pipe(sort()).subscribe();
 * ```
 * Output: `[1, 2, 3, 4, 5, 6]`
 *
 * @example
 * Returns a sorted array of tuples, sorting on index `1`
 * ```ts
 * const input = [
 *  [10, 2], [20, 4], [30, 6],
 *  [40, 1], [50, 3], [60, 5]
 * ];
 * const sortTuple = (a, b) => {
 *  if (a[1] === b[1]) return 0;
 *  return a[1] < b[1] ? -1 : 1;
 * }
 *
 * of(input).pipe(sort(sortTuple)).subscribe();
 * ```
 * Output: `[ [40, 1], [10, 2], [50, 3], [20, 4], [60, 5], [30, 6] ]`
 *
 * @returns Observable array of values from source array sorted via [[SortFn]]
 */
export function sort<T extends unknown>(sortFn?: SortFn<T>): OperatorFunction<Iterable<T>, T[]> {
  return (source) => source.pipe(map((value) => [...value].sort(sortFn || defaultSortFn)));
}
