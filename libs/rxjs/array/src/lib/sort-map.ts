/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultSortFn } from '../utils/sort';
import { MapFn, SortFn } from '../types/generic-methods';

/**
 * Returns an Observable that emits an array of sorted mapped values from a source array where values are mapped to
 * type `K` using a [[MapFn]].
 *
 * @category Modify
 *
 * @typeParam T The type of data in the source array
 * @typeParam K The type of data in the emitted array
 *
 * @param mapFn The [[MapFn]] to map the value in the array
 * @param sortFn Optional [[SortFn]] used to sort the array, if not provided the `defaultSortFn` is used.
 *
 * @example
 * Returns a sorted array of binary values, sorting by number then converting to boolean
 * ```ts
 * const input = [5, 8, 2, 7, 1, 6];
 * of(input).pipe(sortMap(value => value >= 5 ? true : false)).subscribe();
 * ```
 * Output: `[false, false, true, true, true, true]`
 *
 * @example
 * Returns a sorted array of strings from an object, with [[SortFn]] and [[MapFn]]
 * ```ts
 * const sortFn = (a: any, b: any) => {
 *  if (a.index === b.index) return 0;
 *  return a.index < b.index ? -1 : 0
 * }
 *
 * const mapFn = (item: any): string => item.label;
 *
 * const input = [
 *  { index: 5, label: 'Moo' }, { index:8, label: 'Baz' },
 *  { index: 2, label: 'Bar' }, { index: 7: label: 'Buzz' },
 *  { index: 1, label: 'Foo' } , { index: 6, label: 'Fizz' }
 * ];
 * of(input).pipe(sortMap(sortFn, mapFn)).subscribe();
 * ```
 * Output: `['Foo', 'Bar', 'Moo', 'Fizz', 'Buzz', 'Baz']`
 *
 * @returns Observable that emits an array of sorted mapped values
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
