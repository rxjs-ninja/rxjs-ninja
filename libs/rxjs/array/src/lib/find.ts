/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable value of the first truthy value found in a source array, or `undefined` using Array.find
 *
 * @category Array Filter
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Return the first truthy string in the array
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja']
 * of(input).pipe(find()).subscribe();
 * ```
 * Output: `'Hello'`
 *
 * @example
 * Return the first truthy string that has a length `< 5`
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(find(v => v.length < 5)).subscribe();
 * ```
 * Output: `'RxJS'`
 *
 * @returns An Observable that emits the first found value from the array, or `undefined`
 */
export function find<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], T | undefined> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((value) =>
        value.find((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
