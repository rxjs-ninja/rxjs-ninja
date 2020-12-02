/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable number of the index in the source array of the first truthy value from the [[PredicateFn]].
 * By default a `Boolean(value)` check is made.
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy or falsy value of array values
 *
 * @example
 * ```ts
 * const input = [1, 2, 3, 4, 5]
 * of(input).pipe(findIndex(v => v > 2)).subscribe()
 * // 2
 * ```
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(findIndex(v => v.length < 5)).subscribe()
 * // 1
 * ```
 *
 * @returns An Observable that emits a number value, the index of first value where [[PredicateFn]] is true
 * @category RxJS Array Filter
 */
export function findIndex<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], number> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value) => value.findIndex((v) => (predicate ? predicate(v) : Boolean(v)))));
}
