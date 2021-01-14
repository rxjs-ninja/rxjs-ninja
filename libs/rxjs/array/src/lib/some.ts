/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean when all values in the source array return truthy using Array.some
 *
 * @category Query
 *
 * @see The [[filterSome]] operator returns the array value instead of boolean
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Return a boolean value if some of the elements are truthy
 * ```ts
 * const input = [ [0, 0, 0], [0, 0, 1], [1, 1, 1] ]
 * from(input).pipe(some()).subscribe()
 * ```
 * Output: `false, true, true`
 *
 * @example
 * Return a boolean value if some of the elements are truthy with a predicate
 * ```ts
 * const input = [ ['RxJS', 'Rocks'], ['RxJS', 'Ninja'], ['Foo', 'Bar'] ]
 * fromArray(input).pipe(some(v => v === 'RxJS')).subscribe()
 * ```
 * Output: `true, true, false`
 *
 * @returns An Observable that emits a boolean when all values in source array return truthy
 */
export function some<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) =>
    source.pipe(
      map((value) =>
        value.some((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
