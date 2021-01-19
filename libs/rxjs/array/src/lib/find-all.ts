/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable array of truthy values from a source array
 *
 * @category Filter
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Return an array of all numbers that are truthy
 * ```ts
 * const input = [0, 10, 1, 0, 6, 6, 0, 1];
 * of(input).pipe(find()).subscribe();
 * ```
 * Output: `[10, 1, 6, 6, 1]`
 *
 * @example
 * Return an array of values where the source array value length `>= 5`
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(find(v => v.length >= 5)).subscribe();
 * ```
 * Output: `['Hello', 'Ninja']`
 *
 * @returns An Observable that emits an array containing all truthy values from a source array
 */
export function findAll<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<Iterable<T>, T[]> {
  return (source) =>
    source.pipe(
      map((value) =>
        [...value].filter((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
