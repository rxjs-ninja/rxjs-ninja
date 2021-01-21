/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable value of the last truthy value found in a source array, or `undefined` using Array.find
 * When working with data, if the array contains numbers `0` will be returned as a value to the [[PredicateFn]], but all
 * other falsy values will be ignored
 *
 * @category Filter
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Return the last truthy string in the array
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja']
 * of(input).pipe(findLast()).subscribe();
 * ```
 * Output: `'Ninja'`
 *
 * @example
 * Return the last truthy string that has a length `>= 5`
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja', 'Docs'];
 * of(input).pipe(findLast(v => v.length >= 5)).subscribe();
 * ```
 * Output: `'Ninja'`
 *
 * @returns An Observable that emits the last found value from the array, or `undefined`
 */
export function findLast<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<Iterable<T>, T | undefined> {
  return (source) =>
    source.pipe(
      map((value) =>
        [...value].reverse().find((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
