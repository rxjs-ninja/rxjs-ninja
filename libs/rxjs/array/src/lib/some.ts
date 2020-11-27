/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean value if the source array contains one item that returns truthy for the [[PredicateFn]]
 * passed.
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * ```ts
 * const input = [ [0, 0, 0], [0, 0, 1], [1, 1, 1] ]
 * fromArray(input).pipe(some()).subscribe()
 * // [false, true, true]
 * ```
 *
 * @example
 * ```ts
 * const input = [ ['RxJS', 'Rocks'], ['RxJS', 'Ninja'], ['Foo', 'Bar'] ]
 * fromArray(input).pipe(some(v => v === 'RxJS')).subscribe()
 * // [true, true, false]
 * ```
 *
 * @returns Observable boolean value if the source array contains one value that is truthy for the [[PredicateFn]]
 * @category RxJS Array Query
 */
export function some<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) => source.pipe(map((value) => value.some((v) => (predicate ? predicate(v) : Boolean(v)))));
}
