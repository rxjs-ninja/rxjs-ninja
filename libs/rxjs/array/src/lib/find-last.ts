/**
 * @packageDocumentation
 * @module Array
 */

import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';

/**
 * Returns an Observable value of the last truthy value found in a source array using the [[PredicateFn]]. By default
 * a `Boolean(value)` check is made.
 *
 * If there no value found, `undefined` will be returned.
 *
 * @example
 * ```ts
 * const input = ['', '', 'Testing', 'One', 'Two'];
 * of(input).pipe(find()).subscribe();
 * // 'Two'
 * ```
 *
 * @example
 * ```ts
 * const input = ['Hello', 'RxJS', 'Ninja', 'is' 'very, 'useful'];
 * of(input).pipe(find(v => v.length < 5)).subscribe();
 * // 'very'
 * ```
 *
 * @returns Observable of the last found value from the array, or undefined
 * @category RxJS Array Filter
 */
export function findLast<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], T | undefined> {
  return (source: Observable<T[]>) =>
    source.pipe(
      map((value) => [...value].reverse()),
      map((value) => value.find((v) => (predicate ? predicate(v) : Boolean(v)))),
    );
}
