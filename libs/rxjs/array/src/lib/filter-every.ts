/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable that emits an array when all values in the source array return truthy using Array.every
 *
 * @category Filter
 *
 * @see The [[every]] operator returns the boolean value instead of the array
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Returns a array where every string item in the array is truthy
 * ```ts
 * const input = [ ['', '', ''], ['', 'Hello', 'RxJS'], ['Hello', 'RxJS', 'Ninja'] ];
 * from(input).pipe(filterEvery()).subscribe();
 * ```
 * Output: `['Hello', 'RxJS', 'Ninja']`
 *
 * @example
 * Returns a array where every string item in the array length `< 4`
 * ```ts
 * const input = [ ['', '', ''], ['', 'Foo', 'Bar'], ['Foo', 'Bar', 'Baz'] ];
 * from(input).pipe(filterEvery(v => v.length < 4)).subscribe();
 * ```
 * Output: `['Foo', 'Bar', 'Baz']`
 *
 * @example
 * Returns a array where every number in the array is less than `2`
 * ```ts
 * const input = [ [1, 0, 1, 0, 1, 0], [1, 0, 2, 1, 0, 2], [0, 1, 0, 1, 0, 2] ];
 * from(input).pipe(filterEvery(v => v < 2)).subscribe();
 * ```
 * Output: `[1, 0, 1, 0, 1, 0]`
 *
 * @returns An Observable that emits a boolean when all values in source array return truthy with the [[PredicateFn]]
 */
export function filterEvery<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<ArrayOrSet<T>, T[]> {
  return (source) =>
    source.pipe(
      map((value) => [...value]), // Filter requires value to be mapped first to an array
      filter((value) =>
        value.every((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
