/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';

/**
 * Returns an Observable value of all truthy values found in a source array using the [[PredicateFn]]. By default
 * a `Boolean(value)` check is made.
 *
 * @example
 * ```ts
 * const input = [0, 10, 1, 0, 6, 6, 0, 1];
 * of(input).pipe(find()).subscribe()
 * // [10, 1, 6, 6, 1]
 * ```
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja', 'is' 'very, 'useful'];
 * of(input).pipe(find(v => v.length >= 5)).subscribe()
 * // ['Hello', 'Ninja', 'useful']
 * ```
 *
 * @returns Observable of all the [[PredicateFn]] truthy value found value from the array
 * @category RxJS Array Filter
 */
export function findAll<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], T[]> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value) => value.filter((v) => (predicate ? predicate(v) : Boolean(v))) as T[]));
}
