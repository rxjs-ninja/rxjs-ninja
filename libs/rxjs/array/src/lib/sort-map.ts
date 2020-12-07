/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultSortFn } from '../utils/binary-search';
import { MapFn, SortFn } from '../types/generic-methods';

/**
 * Returns an Observable array of values where the array has been sorted with `sortFn` and then mapped
 * to type `K` using the `sortFn`.
 *
 * @typeParam T The type of data in the input array
 * @typeParam K The type of data in the output array
 *
 * @param mapFn The [[MapFn]] to map the value in the array
 * @param sortFn Optional [[SortFn]] used to sort the array, if not provided a basic equality check it used.
 *
 * @example
 * ```ts
 * const input = [5, 8, 2, 7, 1, 6];
 * of(input).pipe(sortMap(value => value >= 5 ? true : false)).subscribe();
 * // [false, false, true, true, true, true]
 * ```
 *
 * @returns Observable array of sorted values of type `K`
 * @category Array Modify
 */
export function sortMap<T extends unknown, K extends T | unknown>(
  mapFn: MapFn<T, K>,
  sortFn?: SortFn<T>,
): OperatorFunction<T[], K[]> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((arr) => arr.sort(sortFn || defaultSortFn)),
      map((arr) => arr.map(mapFn)),
    );
}
