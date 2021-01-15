/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean when all values in the source array return truthy using Array.every
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Returns a boolean where every string item in the array is truthy
 * ```ts
 * const input = [ ['', '', ''], ['', 'Hello', 'RxJS'], ['Hello', 'RxJS', 'Ninja'] ];
 * from(input).pipe(every()).subscribe();
 * ```
 * Output: `false, false, true`
 *
 * @example
 * Returns a boolean where every string item in the array length `< 4`
 * ```ts
 * const input = [ ['', '', ''], ['', 'Foo', 'Bar'], ['Foo', 'Bar', 'Baz'] ];
 * from(input).pipe(every(v => v.length < 4)).subscribe();
 * ```
 * Output: `false, false, true`
 *
 * @example
 * Returns a boolean where every number in the array is less than `2`
 * ```ts
 * const input = [ [1, 0, 1, 0, 1, 0], [1, 0, 2, 1, 0, 2], [0, 1, 0, 1, 0, 2] ];
 * from(input).pipe(every(v => v < 2)).subscribe();
 * ```
 * Output: `true, false, false`
 *
 * @returns An Observable that emits a boolean when all values in source array return truthy
 */
export function every<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) =>
    source.pipe(
      map((value) =>
        value.every((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
