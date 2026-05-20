/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable number which is the index of the last value found in an array using Array.findLastIndex.
 * When working with data, if the array contains numbers `0` will be returned as a value to the [[PredicateFn]], but all
 * other falsy values will be ignored
 *
 * @category Query
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy or falsy value of array values
 *
 * @example
 * Returns the index of the last value that is `> 2`
 * ```ts
 * const input = [1, 2, 3, 4, 5]
 * of(input).pipe(findLastIndex(v => v > 2)).subscribe();
 * ```
 * Output: `4`
 *
 * @returns An Observable that emits the index of the last value where [[PredicateFn]] is true, or `-1` if none match
 */
export function findLastIndex<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<Iterable<T>, number> {
  return (source) =>
    source.pipe(
      map((value) =>
        [...value].findLastIndex((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
