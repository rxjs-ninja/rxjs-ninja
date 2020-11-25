/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';

/**
 * Returns an Observable value of the first truthy value found in a source array using the [[PredicateFn]]. By default
 * a `Boolean(value)` check is made.
 *
 * If there no value found, `undefined` will be returned.
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja', 'is' 'very, 'useful'];
 * of(input).pipe(find(v => v.length < 5)).subscribe();
 * // 'RxJS'
 * ```
 *
 * @returns Observable of the first found value from the array, or undefined
 * @category RxJS Array Filter
 */
export function find<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], T | undefined> {
  return (source: Observable<T[]>) =>
    source.pipe(map((value) => value.find((v) => (predicate ? predicate(v) : Boolean(v)))));
}
